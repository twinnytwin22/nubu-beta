import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redisGet, redisSet } from '@/lib/providers/redis/redis'
import { supabaseUserApi } from '@/lib/providers/supabase/supabaseClient'
import { v4 as uuid } from 'uuid'

export async function POST (req: Request) {
  const entityData = await req.json()
  const { image_file } = entityData
  const cacheKey = 'entity_data_cache'
  const supabase = supabaseUserApi(cookies)
  const imageId = uuid()

  const { data, error } = await supabase.storage
    .from('entity_images')
    .upload(`${imageId}.png`, image_file)

  if (error) {
    throw new Error(JSON.stringify(error))
  }

  const updatedEntity = {
    ...entityData,
    image_url: `${imageId}.png`
  }

  const { data: entity, error: orgError } = await supabase
    .from('orgs')
    .insert([updatedEntity])
    .select()

  if (entity) {
    const cachedData = await redisGet(cacheKey)
    const existingData = cachedData ? JSON.parse(cachedData) : []
    existingData.push(entity[0])
    await redisSet(cacheKey, JSON.stringify(existingData))
    return NextResponse.json({ data: entity, status: 'success', error: null })
  }
  return NextResponse.json({
    error: orgError,
    status: 'error',
    data: null,
    entityData
  })
}

import { NextResponse } from 'next/server'
import { redis, redisGet, redisSet } from '@/lib/providers/redis/redis'
import { supabaseApi } from '@/lib/providers/supabase/supabaseClient'

export const revalidate = 0

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  //const refreshCache = searchParams.get('refreshCache')
  const entityId = searchParams.get('entityId')

  try {
    if(entityId){
    let { data: orgs, error } = await supabaseApi
      .from('orgs')
      .select('*')
      .eq('id', 'ed674594-1ddc-427f-b6e5-fa1963dff1ea')
      .single()

    if (error) {
      console.error('Error fetching orgs:', error)
      return new Response(JSON.stringify('Error fetching orgs'))
    }
    return new Response(JSON.stringify(orgs))
  }
  } catch (error) {
    console.error('Error fetching orgs:', error)
    return new Response(JSON.stringify('Error fetching orgs'))
  }
}

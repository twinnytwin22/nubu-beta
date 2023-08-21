import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redisGet, redisSet } from "@/lib/providers/redis/redis";
import { supabaseUserApi } from "@/lib/providers/supabase/supabaseClient";


export async function POST(req:Request){
const {orgData} = await req.json()
const cacheKey = "org_data_cache"
const supabase = supabaseUserApi(cookies)


const {data: org, error: orgError} = await supabase
.from('orgs')
.insert([orgData])
.select()

if (org) {
    const cachedData = await redisGet(cacheKey);
    const existingData = cachedData ? JSON.parse(cachedData) : [];
    existingData.push(org[0]);
    await redisSet(cacheKey, JSON.stringify(existingData));
    return NextResponse.json({ data: org, status: "success", error: null });

}
return NextResponse.json({ error: orgError, status: "error", data: null });
}
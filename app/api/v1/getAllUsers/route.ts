import { NextResponse } from "next/server";
import { redis, redisGet, redisSet } from "@/lib/providers/redis/redis";
import { supabaseApi } from "@/lib/providers/supabase/supabaseClient";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refreshCache = searchParams.get("refreshCache");
  const cacheKey = "all_users_cache"; // Specify a cache key for all users' data

  try {
    // Check if the query parameter "refresh" is set to true
    if (refreshCache) {
      // Delete the cache if the "refresh" parameter is set to true
      await redis.del(cacheKey);
    }
    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse && !refreshCache) {
      console.log("Cache Hit");
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    let { data: users, error } = await supabaseApi.from("profiles").select("*");

    if (error) {
      console.error("Error fetching users:", error);
      return new Response("Error fetching users");
    }

    // Store the response in Redis cache
    await redisSet(cacheKey, JSON.stringify(users));

    return new Response(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users");
  }
}

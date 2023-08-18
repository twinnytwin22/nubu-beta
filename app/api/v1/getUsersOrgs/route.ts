import { NextResponse } from "next/server";
import { redis, redisGet, redisSet } from "@/lib/providers/redis/redis";
import { supabaseApi } from "@/lib/providers/supabase/supabaseClient";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refreshCache = searchParams.get("refreshCache");
  const userId = searchParams.get("userId");

  const cacheKey = "all_orgs_cache"; // Specify a cache key for all orgs' data

  try {
    // Check if the query parameter "refresh" is set to true
    if (refreshCache) {
      // Delete the cache if the "refresh" parameter is set to true
      await redis.del(cacheKey);
    }
    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse && !refreshCache) {
      // console.log("Cache Hit");
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    let { data: orgs, error } = await supabaseApi
      .from("orgs")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      // console.error("Error fetching orgs:", error);
      return new Response(JSON.stringify("error: Error fetching data!"));
    }

    // Store the response in Redis cache
    await redisSet(cacheKey, JSON.stringify(orgs));

    return new Response(JSON.stringify(orgs));
  } catch (error) {
    console.error("Error fetching orgs:", error);
    return new Response("Error fetching orgs");
  }
}

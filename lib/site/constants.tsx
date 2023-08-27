export const bookingUrl = 'https://outlook.office365.com/owa/calendar/CRIB@cribnetwork.io/bookings/'
export const siteAccentColor = '#fca5a5'
export const fbUrl = 'https://www.facebook.com/thecribnetwork'
export const igUrl = 'https://www.instagram.com/thecribnetwork/'
export const twitterUrl = 'https://twitter.com/TheCribNetwork'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function useImagePath(url: string) {
    const imagePath = `${supabaseUrl}storage/v1/object/public/entity_images/${url}`;
    return imagePath;
}

export function useEntityImagePath(url: string) {
  const imagePath = `${supabaseUrl}/storage/v1/object/public/entity_images/${url}`;
  return imagePath;
}

export function useBgImagePath(url: string) {
    const imagePath = `https://qjfdpaecmjljkboepipm.supabase.co/storage/v1/object/public/profile_backgrounds/${url}`;
    return imagePath;
}

export function useIpfsUrl(url: string) {
    const imagePath = url?.replace("ipfs://",`https://${ipfs.hostname}/ipfs/`)
    return imagePath
  }
  
  export const ipfs = { 
    gatewayUrl: 'https://cloudflare-ipfs.com/ipfs/',
    hostname:'053c144674e91fcc39bf3a56a7511a32.ipfscdn.io'
  } 
export const defaultUserImage = "/images/icons/default_user_image.jpg";
export const homePath = 'https://subport.vercel.app'
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey,
});

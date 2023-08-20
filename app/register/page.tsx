
import React from "react";

import AuthComponent from "@/ui/Auth/AuthComponent";
import { getSiteSettings } from "@/lib/providers/sanity/sanity";

async function page() {
    const settings =  await getSiteSettings()
    if(settings) {
    return (
        <div className="h-screen items-center flex w-full bg-zinc-100 dark:bg-black">
            <AuthComponent settings={settings} />
        </div>
    );
 } 
}

export default page;

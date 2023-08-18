"use client";
import * as React from "react";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import { AuthContextProvider } from "@/app/context/auth";
import InvoiceContextProvider from "@/app/context/invoice";
import SiteContextProvider from "@/app/context/siteContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { clientId, secretKey, storage } from "./thirdweb/thirdweb";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon, Optimism } from "@thirdweb-dev/chains";

import { ThemeProvider } from "next-themes";

; const queryClient = new QueryClient()




export const Providers = ({ children, }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <SiteContextProvider>
                    <ThirdwebProvider
                        secretKey={secretKey!}
                        clientId={clientId!}
                        storageInterface={storage}
                        activeChain={Polygon}
                        supportedChains={[Ethereum, Polygon, Optimism]}
                        queryClient={queryClient}
                        sdkOptions={{
                            alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID
                        }}>
                        <Suspense>

                            <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
                                <InvoiceContextProvider>
                                    {children}
                                </InvoiceContextProvider>
                            </ThemeProvider>
                        </Suspense>
                    </ThirdwebProvider>
                </SiteContextProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    );
};

export default Providers;


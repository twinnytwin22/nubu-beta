'use client'
import React, { createContext, useContext } from 'react'

export const SiteContext = createContext({})
export const useSiteContext = () => useContext(SiteContext)

function SiteContextProvider({ children }: { children: React.ReactNode }) {

    const value = {

    }
    return (
        <SiteContext.Provider value={value}>
            {children}
        </SiteContext.Provider>
    )
}

export default SiteContextProvider
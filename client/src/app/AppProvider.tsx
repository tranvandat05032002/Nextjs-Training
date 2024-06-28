'use client'
import { clientSessionToken } from "@/lib/http"
import React from "react"

const AppContext = React.createContext({
})


export default function AppProvider({ children, initialSession = '' }: {
    children: React.ReactNode,
    initialSession: string
}) {
    React.useState(() => {
        // chạy môi trường build nên nó không còn là client-component --> không có object window
        if(typeof window !== 'undefined') {
            clientSessionToken.value = initialSession
        }
    })
    return (
        <>
            {children}
        </>
    )
}
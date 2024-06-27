'use client'
import React from "react"

const AppContext = React.createContext({
    sessionToken: '',
    setSessionToken: (sessionToken: string) => { }
})

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context;
}

export default function AppProvider({ children, initialSession = '' }: {
    children: React.ReactNode,
    initialSession: string
}) {
    const [sessionToken, setSessionToken] = React.useState(initialSession);
    return (
        <AppContext.Provider value={{ sessionToken, setSessionToken }}>
            {children}
        </AppContext.Provider>
    )
}
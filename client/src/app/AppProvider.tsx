'use client'
import { clientSessionToken, isClient } from "@/lib/http"
import { AccountResType } from "@/schemaValidations/account.schema"
import React from "react"
type User = AccountResType['data']
const AppContext = React.createContext<{ user: User | null, setUser: (user: User | null) => void }>({
    user: null,
    setUser: () => { }
})

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    return context
}

export default function AppProvider({ children, initialSession = '', user: userProps }: {
    children: React.ReactNode,
    initialSession: string,
    user: User | null
}) {
    const [user, setUser] = React.useState<User | null>(userProps)
    React.useState(() => {
        // chạy môi trường build nên nó không còn là client-component --> không có object window
        if (isClient()) {
            clientSessionToken.value = initialSession
        }
    })
    return (
        <AppContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </AppContext.Provider>
    )
}
'use client'
import authApiRequest from '@/apiRequest/auth';
import { clientSessionToken } from '@/lib/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Logout = () => {
    const pathname = usePathname()
    const router = useRouter()

    const searchParams = useSearchParams()
    const sessionToken = searchParams.get('sessionToken')
    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (sessionToken === clientSessionToken.value) {
            authApiRequest.logoutFromNextClientToNextServer(true, signal).then((res) => {
                router.push(`/login?redirectFrom=${pathname}`)
            })
        }
        return () => {
            controller.abort();
        }
    }, [sessionToken, router, pathname])
    return (
        <div>
            this is sessionToken
        </div>
    );
};

export default Logout;
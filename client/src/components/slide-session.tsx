'use client'
import authApiRequest from '@/apiRequest/auth';
import { clientSessionToken } from '@/lib/http';
import { differenceInHours } from 'date-fns'
import React from 'react';

const SlideSession = () => {
    React.useEffect(() => {
        const interval = setInterval(async () => {
            const now = new Date()
            const expiresAt = new Date(clientSessionToken.expiresAt)
            if (differenceInHours(expiresAt, now) < 1) {
                const res = await authApiRequest.slideSessionTokenFromNextClientToNextServer()
                clientSessionToken.expiresAt = res.payload.data.expiresAt
            }
        }, 1000 * 60 * 60)

        return () => clearInterval(interval)
    }, [])
    return (null);
};

export default SlideSession;
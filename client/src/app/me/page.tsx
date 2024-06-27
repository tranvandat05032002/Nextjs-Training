import envConfig from '@/config';
import { cookies } from 'next/headers';
import React from 'react';
import Profile from './profile';

const GetProfile = async () => {
    const sessionToken = cookies().get('sessionToken');
    const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken?.value}`
            // Cookie: `sessionToken=${sessionToken}`
        }
    }).then(async (res) => {
        const payload = await res.json()
        const data = {
            status: res.status,
            payload
        }
        if (!res.ok) {
            throw data
        }
        return data

    });
    return (
        <div>
            <div>Account: {result.payload.data.name}</div>
            <div>Email: {result.payload.data.email}</div>
            <Profile />
        </div>
    );
};

export default GetProfile;
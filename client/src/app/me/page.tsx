import envConfig from '@/config';
import { cookies } from 'next/headers';
import React from 'react';
import Profile from './profile';
import accountApiRequest from '@/apiRequest/account';

const GetProfile = async () => {
    const sessionToken = cookies().get('sessionToken');
    const result = await accountApiRequest.me(sessionToken?.value ?? "")
    return (
        <div>
            <div>Account: {result.payload.data.name}</div>
            <div>Email: {result.payload.data.email}</div>
            <Profile />
        </div>
    );
};

export default GetProfile;
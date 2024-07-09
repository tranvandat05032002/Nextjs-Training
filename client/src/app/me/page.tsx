import { cookies } from 'next/headers';
import React from 'react';
import accountApiRequest from '@/apiRequest/account';
import ProfileForm from './profile-form';

const GetProfile = async () => {
    const sessionToken = cookies().get('sessionToken');
    const result = await accountApiRequest.me(sessionToken?.value ?? "")
    // Vì có lấy cookies ra nên đã vi phạm trong cache của Nextjs vì thế api không được cache 
    //--> phải sử dụng router.refresh() để next-server gọi lại và refresh lại current route
    return (
        <div>
            <div>Account: {result.payload.data.name}</div>
            <div>Email: {result.payload.data.email}</div>
            <ProfileForm profile={result.payload.data} />
        </div>
    );
};

export default GetProfile;
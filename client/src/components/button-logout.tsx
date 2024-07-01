'use client'
import React from 'react';
import { Button } from './ui/button';
import { handleErrorApi } from '@/lib/utils';
import authApiRequest from '@/apiRequest/auth';
import { useRouter } from 'next/navigation';

const ButtonLogout = () => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await authApiRequest.logoutFromNextClientToNextServer()
            router.push('/login')
        } catch (error) {
            handleErrorApi({
                error
            })
        }
        // finally {
        //     router.refresh()
        // }
    }
    return (
        <Button size={'sm'} onClick={handleLogout}>
            Đăng Xuất
        </Button>
    );
};

export default ButtonLogout;
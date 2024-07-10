'use client'
import React from 'react';
import { Button } from './ui/button';
import { handleErrorApi } from '@/lib/utils';
import authApiRequest from '@/apiRequest/auth';
import { usePathname, useRouter } from 'next/navigation';

const ButtonLogout = () => {
    const router = useRouter()
    const pathname = usePathname()
    const handleLogout = async () => {
        try {
            await authApiRequest.logoutFromNextClientToNextServer()
            router.push('/login')
        } catch (error) {
            handleErrorApi({
                error
            })
            authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
                router.push(`/login?redirectFrom=${pathname}`)
            })
        }
        finally {
            router.refresh()
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
import React from 'react';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';
import ButtonLogout from './button-logout';
import { cookies } from 'next/headers';
import accountApiRequest from '@/apiRequest/account';

const Header = async () => {
    const cookiesStore = cookies()
    const sessionToken = cookiesStore.get('sessionToken')?.value
    let user = null;
    if (sessionToken) {
        const data = await accountApiRequest.me(sessionToken)
        user = data.payload.data
    }
    return (
        <div className='flex space-x-4'>
            <ul className='flex space-x-4'>
                {user ? (
                    <><li>
                        <Link href='/products'>Sản phẩm</Link>
                    </li>
                        <li>
                            <Link href={'/me'}>
                                Xin chào <strong>{user.name}</strong>
                            </Link>
                        </li>

                        <li>
                            <ButtonLogout />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href='/login'>Đăng nhập</Link>
                        </li>
                        <li>
                            <Link href='/register'>Đăng ký</Link>
                        </li>
                    </>
                )}
            </ul>
            <ModeToggle />
        </div>
    );
};

export default Header;
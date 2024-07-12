'use client'
import React from 'react';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';
import ButtonLogout from './button-logout';
import { useAppContext } from '@/app/AppProvider';
import { AccountResType } from '@/schemaValidations/account.schema';
import ModelSelectLangue from './select-box';

const Header = ({
  user
}: {
  user: AccountResType['data'] | null
}) => {
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
      <ModelSelectLangue />
    </div>
  );
};

export default Header;
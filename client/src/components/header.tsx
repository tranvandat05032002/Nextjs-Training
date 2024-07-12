'use client'
import React from 'react';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';
import ButtonLogout from './button-logout';
import { useAppContext } from '@/app/AppProvider';
import { AccountResType } from '@/schemaValidations/account.schema';
import ModelSelectLangue from './select-box';
import { useTranslations } from 'next-intl';

const Header = ({
  user
}: {
  user: AccountResType['data'] | null
}) => {
  const t = useTranslations('Navigation')
  return (
    <div className='flex space-x-4'>
      <ul className='flex space-x-4'>
        {user ? (
          <><li>
            <Link href='/products'>{t('product')}</Link>
          </li>
            <li>
              <Link href={'/me'}>
                {t('hello')} <strong>{user.name}</strong>
              </Link>
            </li>

            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/login'>{t('login')}</Link>
            </li>
            <li>
              <Link href='/register'>{t('register')}</Link>
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
import React from 'react';
import LoginForm from './login-form';
import { useTranslations } from 'next-intl';

const LoginPage = () => {
  const t = useTranslations('LoginPage')
  return (
    <div>
      <h1 className='text-xl font-semibold text-center'>{t('header_login')}</h1>
      <div className='flex justify-center'><LoginForm /></div>
    </div>
  );
};

export default LoginPage;
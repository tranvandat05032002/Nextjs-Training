import Button from '@/app/Components/Button';
import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';
import LoginForm from './login-form';

const LoginPage = () => {
    return (
        <div>
            <h1 className='text-xl font-semibold text-center'>Đăng nhập</h1>
            <div className='flex justify-center'><LoginForm /></div>
        </div>
    );
};

export default LoginPage;
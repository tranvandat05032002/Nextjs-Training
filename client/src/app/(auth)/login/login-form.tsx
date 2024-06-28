"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import envConfig from '@/config';
import { useToast } from "@/components/ui/use-toast"
import { redirect, useRouter } from 'next/navigation';
import { useAppContext } from '@/app/AppProvider';
import authApiRequest from '@/apiRequest/auth';
const LoginForm = () => {
    const { toast } = useToast()
    const { setSessionToken } = useAppContext()
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: LoginBodyType) {
        try {
            const result = await authApiRequest.login(values)
            toast({
                description: result.payload.message,
            })
            await authApiRequest.auth({ sessionToken: result.payload.data.token });
            setSessionToken(result.payload.data.token)
            router.push('/me')
        } catch (error: any) {
            const errors = error.payload.errors as {
                field: string,
                message: string
            }[]
            const status = error.status as number
            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as 'email' | 'password', {
                        type: 'server',
                        message: error.message
                    })
                })
            }
            else {
                toast({
                    title: 'Lỗi',
                    description: error.payload.message,
                    variant: 'destructive'
                })
            }
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex-shrink-0 max-w-[400px] w-full" noValidate>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập mật khẩu" type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="!mt-5 w-full">Đăng nhập</Button>
            </form>
        </Form>
    );
};

export default LoginForm;
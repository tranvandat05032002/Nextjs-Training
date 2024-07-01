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
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import authApiRequest from '@/apiRequest/auth';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { clientSessionToken } from '@/lib/http';
import { handleErrorApi } from '@/lib/utils';
const RegisterForm = () => {
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: RegisterBodyType) {
        try {
            const result = await authApiRequest.register(values)
            toast({
                description: result.payload.message,
            })
            await authApiRequest.auth({ sessionToken: result.payload.data.token });
            router.push('/me')
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError })
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex-shrink-0 max-w-[400px] w-full" noValidate>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nhập lại mật khẩu</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập lại mật khẩu" type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="!mt-5 w-full">Đăng ký</Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
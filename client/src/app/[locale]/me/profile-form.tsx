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
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '@/lib/utils';
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from '@/schemaValidations/account.schema';
import accountApiRequest from '@/apiRequest/account';
type Profile = AccountResType['data']
const ProfileForm = ({profile}: {profile: Profile}) => {
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    // 1. Define your form.
    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: ''
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: UpdateMeBodyType) {
        if (loading) return;
        setLoading(true)
        try {
            const result = await accountApiRequest.updateMe(values)
            form.setValue('name', '')
            router.refresh()
            toast({
                description: result.payload.message,
            })
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError })
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex-shrink-0 max-w-[400px] w-full" noValidate>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="Nhập email" value={profile.email} readOnly/>
                </FormControl>
                <FormMessage />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Tên" type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="!mt-5 w-full">Cập nhật</Button>
            </form>
        </Form>
    );
};

export default ProfileForm;
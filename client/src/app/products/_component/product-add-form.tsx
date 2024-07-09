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
import { CreateProductBody, CreateProductBodyType, ProductResType, UpdateProductBodyType } from '@/schemaValidations/product.schema';
import productApiRequest from '@/apiRequest/product';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
type Product = ProductResType['data']
const ProductAddForm = ({ product }: { product?: Product }) => {
    const { toast } = useToast()
    const router = useRouter()
    const [file, setFile] = React.useState<File | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = React.useState(false)
    // 1. Define your form.
    const form = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name: product?.name ?? '',
            price: product?.price ?? 0,
            description: product?.description ?? '',
            image: product?.image ?? ''
        },
    })
    const image = form.watch('image')
    // 2. Define a submit handler.
    async function createProduct(values: CreateProductBodyType) {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('file', file as Blob)
            const uploadImageResult = await productApiRequest.uploadImage(formData)
            const imageUrl = uploadImageResult.payload.data
            const result = await productApiRequest.create({
                ...values,
                image: imageUrl
            });
            toast({
                description: (result.payload as any).message,
            })
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError })
        }
        finally {
            setLoading(false)
        }
    }
    async function updateProduct(_values: UpdateProductBodyType) {
        if (!product) return;
        setLoading(true)
        let values = _values
        try {
            if (file) {
                const formData = new FormData()
                formData.append('file', file as Blob)
                const uploadImageResult = await productApiRequest.uploadImage(formData)
                const imageUrl = uploadImageResult.payload.data
                values = {
                    ..._values,
                    image: imageUrl
                }
            }
            const result = await productApiRequest.update(product.id, values);
            toast({
                description: (result.payload as any).message,
            })
            router.refresh()
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError })
        }
        finally {
            setLoading(false)
        }
    }
    async function onSubmit(values: CreateProductBodyType) {
        if (loading) return;
        if (product) {
            await updateProduct(values)
        }
        else {
            await createProduct(values)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (error) => {
                console.log(error)
                console.log(form.getValues('image'))
            })} className="space-y-2 flex-shrink-0 max-w-[400px] w-full" noValidate>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên Sản Phẩm</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên" {...field} type='text' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá Sản Phẩm</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập giá" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô Tả Sản Phẩm</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Nhập mô tả sản phẩm...' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ảnh mô tả</FormLabel>
                            <FormControl>
                                <Input type='file' ref={inputRef} accept='image/*' onChange={(e) => {
                                    const file = e.target?.files?.[0];
                                    if (file) {
                                        setFile(file)
                                        field.onChange('http://localhost:3000/' + file.name)
                                    }
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {(file || image) && (
                    <div>
                        <Image
                            src={file ? URL.createObjectURL(file) : image}
                            width={128}
                            height={128}
                            alt='preview'
                            className='w-32 h-32 object-cover'
                        />
                        <Button
                            type='button'
                            variant={'destructive'}
                            size={'sm'}
                            onClick={() => {
                                setFile(null)
                                form.setValue('image', '')
                                if (inputRef.current) {
                                    inputRef.current.value = ''
                                }
                            }}
                        >
                            Xóa hình ảnh
                        </Button>
                    </div>)}
                <Button type="submit" className="!mt-5 w-full">{product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</Button>
            </form>
        </Form>
    );
};

export default ProductAddForm;
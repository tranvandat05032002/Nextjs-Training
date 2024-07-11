import productApiRequest from '@/apiRequest/product';
import { Metadata, ResolvingMetadata } from 'next'
import { cache } from 'react'
import Image from 'next/image';
import React from 'react';
import envConfig from '@/config';
import { openGraphImage } from '@/app/shared-metadata';
type Props = {
    params: { slug: string }
}
export const getDetails = cache(productApiRequest.getDetail)

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug
    const { payload } = await getDetails(Number(slug))
    const product = payload.data
    const url = envConfig.NEXT_PUBLIC_URL + '/products' + product.id
    // fetch data
    return {
        ...openGraphImage,
        openGraph: {
            title: product.name,
            description: product.description,
            url,
            images: [
                {
                    url: product.image,
                }
            ],
        },
        alternates: {
            canonical: url,
        }
    }
}


const ProductDetail = async ({ params }: Props) => {
    let product = undefined
    try {
        const { payload } = await getDetails(Number(params.slug))
        product = payload.data
    } catch (error) { }
    return (
        <div>
            {!product && <div>Không tìm thấy sản phẩm</div>}
            {product && <div>
                <Image
                    src={product.image}
                    alt={product.name}
                    priority
                    width={180}
                    height={180}
                    className='w-32 h-32 object-cover'
                />

                <h3>{product.name}</h3>
                <div>{product.price}</div>
            </div>}
        </div>
    );
};

export default ProductDetail;
import productApiRequest from '@/apiRequest/product';
import Image from 'next/image';
import React from 'react';
import ProductAddForm from '../../_component/product-add-form';
import type { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react'

type Props = {
    params: { slug: string }
}

export const getDetails = cache(productApiRequest.getDetail)

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { payload } = await getDetails(Number(params.slug))

    const product = payload.data
    return {
        title: 'Edit sản phẩm: ' + product.name,
        description: product.description
    }
}

const ProductEdit = async ({ params }: Props) => {
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
            <ProductAddForm product={product} />
        </div>
    );
};

export default ProductEdit;
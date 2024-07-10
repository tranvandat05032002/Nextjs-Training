import productApiRequest from '@/apiRequest/product';
import Image from 'next/image';
import React from 'react';
import ProductAddForm from '../../_component/product-add-form';

const ProductEdit = async ({ params }: { params: { slug: Number } }) => {
    let product = undefined
    try {
        const { payload } = await productApiRequest.getDetail(Number(params.slug))
        product = payload.data
    } catch (error) { }
    return (
        <div>
            {!product && <div>Không tìm thấy sản phẩm</div>}
            {product && <div>
                <Image
                    src={product.image}
                    alt={product.name}
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
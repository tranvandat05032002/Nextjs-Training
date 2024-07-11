import React from 'react';
import ProductAddForm from '../_component/product-add-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thêm sản phẩm'
}
const ProductAddPage = () => {
    return (
        <div>
            <h1>Thêm sản phẩm</h1>
            <ProductAddForm /> 
        </div>
    );
};

export default ProductAddPage;
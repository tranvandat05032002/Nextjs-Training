import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const ProductAddButton = () => {
    return (
    <Link href={'/products/add'}>
        <Button variant={'secondary'}>Thêm sản phẩm</Button>
    </Link>
    );
};

export default ProductAddButton;
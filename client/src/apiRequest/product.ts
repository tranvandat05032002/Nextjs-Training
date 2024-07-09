import http from "@/lib/http"
import { CreateProductBodyType, ProductListResType, ProductResType, UpdateProductBodyType } from "@/schemaValidations/product.schema"

const productApiRequest = {
    getList: () => http.get<ProductListResType>('/products', {
        cache: 'no-store'
    }),
    getDetail: (slug: Number) => http.get<ProductResType>(`/products/${slug}`, {
        cache: 'no-store'
    }
    ),
    update: (product_id: Number, body: UpdateProductBodyType) => http.put<ProductResType>(`products/${product_id}`, body),
    create: (body: CreateProductBodyType) => http.post('/products', body),
    uploadImage: (body: FormData) => http.post<{ message: string, data: string }>('/media/upload', body)
}

export default productApiRequest
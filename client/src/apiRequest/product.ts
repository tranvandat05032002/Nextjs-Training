import http from "@/lib/http"
import { CreateProductBodyType, ProductListResType } from "@/schemaValidations/product.schema"

const productApiRequest = {
    getList: () => http.get<ProductListResType>('/products'),
    create: (body: CreateProductBodyType) => http.post('/products', body),
    uploadImage: (body: FormData) => http.post<{message: string, data: string}>('/media/upload', body)
}

export default productApiRequest
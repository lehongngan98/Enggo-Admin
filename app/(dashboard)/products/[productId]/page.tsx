"use client";
import Loader from '@/components/custom ui/Loader';
import ProductForm from '@/components/products/ProductForm';
import { useEffect, useState } from 'react';


const ProductDetail = ({params}: {params : { productId: string} }) => {
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getProductDetail();
    }, []);
    console.log(productDetail);

    const getProductDetail = async () => {
        try {
            const res = await fetch(`/api/products/${params.productId}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch product");
            }
            const data = await res.json();
            setProductDetail(data);
            setLoading(false);
        } catch (error) {
            console.error("[productId_GET]", error);
        } finally {
            setLoading(false);
        }
    };
  return  loading ? <Loader /> : (
    <ProductForm initialData={productDetail}/>
  )
}

export default ProductDetail

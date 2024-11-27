"use client";
import { DataTable } from '@/components/custom ui/DataTable';
import Loader from '@/components/custom ui/Loader';
import { columns } from '@/components/products/ProductColumn';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductType } from '@/lib/types';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const  Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts();
  },[]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products",{
        method: "GET",       
      });

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("products_GET",error);

    }
  };
  return loading ? <Loader /> : (
    <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Products</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/products/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Product
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={products} searchKey="title"/>
        </div>
  )
}

export default Products

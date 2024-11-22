"use client";
import { DataTable } from '@/components/custom ui/DataTable';
import Loader from '@/components/custom ui/Loader';
import { columns } from '@/components/infomation/InfomationColumn';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const  Infomation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [infomation, setInfomation] = useState<InformationType[]>([]);

  useEffect(() => {
    getInfomation();
  }, []);

  const getInfomation = async () => {
    try {
      const res = await fetch("/api/infomation",{
        method: "GET",       
      });

      const data = await res.json();
      setInfomation(data);
      setLoading(false);
    } catch (error) {
      console.error("infomation_GET",error);

    }
  };
  return loading ? <Loader /> : (
    <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Article</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/infomation/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Article
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={infomation} searchKey="title"/>
        </div>
  )
}

export default Infomation

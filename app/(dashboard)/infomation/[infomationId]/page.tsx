"use client";
import Loader from '@/components/custom ui/Loader';
import InfomationForm from '@/components/infomation/InfomationForm';
import { InformationType } from '@/lib/types';
import { useEffect, useState } from 'react';


const InfomationDetail = ({params}: {params : { infomationId: string} }) => {
  const [InfomationDetail, setInfomationDetail] = useState<InformationType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getInfomationDetail();
    }, []);
    console.log(InfomationDetail);

    const getInfomationDetail = async () => {
        try {
            const res = await fetch(`/api/infomation/${params.infomationId}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch infomation");
            }
            const data = await res.json();
            setInfomationDetail(data);
            setLoading(false);
        } catch (error) {
            console.error("[infomationId_GET]", error);
        } finally {
            setLoading(false);
        }
    };
  return  loading ? <Loader /> : (
    <InfomationForm initialData={InfomationDetail}/>
  )
}

export default InfomationDetail

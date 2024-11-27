"use client";

import CommunicationForm from "@/components/communication/CommunicationForm";
import { CommunicationType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const CommunicationDetail = ({ params }: { params: { communicationId: string } }) => {
    const [Communication, setCommunication] = useState<CommunicationType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCommunicationDetail = async () => {
            try {
                const res = await fetch(`/api/communication/${params.communicationId}`, {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch Communication");
                }
                const data = await res.json();
                setCommunication(data);
                setLoading(false);
            } catch (error) {
                console.error("[Communication_GET]", error);
            } finally {
                setLoading(false);
            }
        };
        getCommunicationDetail();
    },[params.communicationId]);
    

    
    return loading ? <Loader /> : (
      <CommunicationForm  initialData={Communication}/>
    )
};

export default CommunicationDetail;

"use client";

import VocabularyForm from "@/components/vocabulary/VocabularyForm";
import { CommunicationType, VocabularyType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";
import CommunicationForm from "@/components/communication/CommunicationForm";

const CommunicationDetail = ({ params }: { params: { communicationId: string } }) => {
    const [Communication, setCommunication] = useState<CommunicationType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCommunicationDetail();
    }, [getCommunicationDetail]);
    console.log(Communication);

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
    return loading ? <Loader /> : (
      <CommunicationForm  initialData={Communication}/>
    )
};

export default CommunicationDetail;

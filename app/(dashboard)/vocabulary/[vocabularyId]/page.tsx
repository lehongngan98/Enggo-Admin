"use client";

import VocabularyForm from "@/components/vocabulary/VocabularyForm";
import { VocabularyType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const VocabularyDetail = ({ params }: { params: { vocabularyId: string } }) => {
    const [vocabulary, setVocabulary] = useState<VocabularyType | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getVocabularyDetail();
    }, []);
    console.log(vocabulary);

    const getVocabularyDetail = async () => {
        try {
            const res = await fetch(`/api/vocabulary/${params.vocabularyId}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch vocabulary");
            }
            const data = await res.json();
            setVocabulary(data);
            setLoading(false);
        } catch (error) {
            console.error("[vocabulary_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    return loading ? <Loader /> : (
      <VocabularyForm  initialData={vocabulary}/>
    )
};

export default VocabularyDetail;

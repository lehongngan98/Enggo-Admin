"use client";

import QuoteForm from "@/components/quote/QuoteForm";
import { QuoteType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const QuoteDetail = ({ params }: { params: { quoteId: string } }) => {
    const [Quote, setQuote] = useState<QuoteType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getQuoteDetail = async () => {
            try {
                const res = await fetch(`/api/quote/${params.quoteId}`, {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch Quote");
                }
                const data = await res.json();
                setQuote(data);
                setLoading(false);
            } catch (error) {
                console.error("[Quote_GET]", error);
            } finally {
                setLoading(false);
            }
        };
        getQuoteDetail();
    },[params.quoteId]);
    console.log(Quote);

    
    return loading ? <Loader /> : (
      <QuoteForm  initialData={Quote}/>
    )
};

export default QuoteDetail;

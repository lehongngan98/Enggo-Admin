"use client";

import React, { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
    const [collection, setCollection] = useState<CollectionType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollection();
    }, [getCollection]);
    console.log(collection);

    const getCollection = async () => {
        try {
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch collection");
            }
            const data = await res.json();
            setCollection(data);
            setLoading(false);
        } catch (error) {
            console.error("[collection_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    return loading ? <Loader /> : (
      <CollectionForm  initialData={collection}/>
    )
};

export default CollectionDetail;

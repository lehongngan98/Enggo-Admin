"use client";
import { columns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import { useEffect, useState } from "react";

const Collections = () => {
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState([]);

    const getCollections = async () => {
        try {
            const res = await fetch("/api/collections", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch collections");
            }
            const data = await res.json();
            setCollections(data);
            setLoading(false);
        } catch (error) {
            console.error("[collections_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCollections();
    }, []);

    console.log(collections);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataTable columns={columns} data={collections} />
            )}
        </div>
    );
};

export default Collections;

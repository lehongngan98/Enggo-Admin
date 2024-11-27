"use client";

import { columns } from "@/components/communication/CommunicationColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from '@/components/custom ui/Loader';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Communication = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(true);
    const [communication, setcommunication] = useState([]);

    const getcommunication = async () => {
        try {
            const res = await fetch("/api/communication", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch communication");
            }
            const data = await res.json();
            setcommunication(data);
            setLoading(false);
        } catch (error) {
            console.error("[communication_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getcommunication();
    });

    console.log(communication);

    return loading? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">
                    Giao tiếp
                </p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/communication/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={communication} searchKey="titleEn"/>
            
             
        </div>
    );
};

export default Communication;

"use client";


import { columns } from "@/components/channel/ChannelColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from '@/components/custom ui/Loader';


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Channel = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [channel, setChannel] = useState([]);

    
    useEffect(() => {
        const getChannel = async () => {
            try {
                const res = await fetch("/api/channel", {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch channel");
                }
                const data = await res.json();
                setChannel(data);
                setLoading(false);
            } catch (error) {
                console.error("[channel_GET]", error);
            } finally {
                setLoading(false);
            }
        };
        getChannel();
    },[]);

    console.log(channel);

    return loading? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">
                    Kênh Học Youtube
                </p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/channel/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={channel} searchKey="title" />


        </div>
    );
};

export default Channel;

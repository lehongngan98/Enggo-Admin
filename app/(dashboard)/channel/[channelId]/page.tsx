"use client";

import ChannelForm from "@/components/channel/ChannelForm";
import { ChannelType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const ChannelDetail = ({ params }: { params: { channelId: string } }) => {
    const [channel, setChannel] = useState<ChannelType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getChannelDetail = async () => {
            try {
                const res = await fetch(`/api/channel/${params.channelId}`, {
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
        getChannelDetail();
    },[params.channelId]);    

    
    return loading ? <Loader /> : (
      <ChannelForm  initialData={channel}/>
    )
};

export default ChannelDetail;

"use client";


import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/user/UserColumn";

import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const User = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setuser] = useState([]);

    const getuser = async () => {
        try {
            const res = await fetch("/api/user", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await res.json();
            setuser(data);
            setLoading(false);
        } catch (error) {
            console.error("[user_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getuser();
    }, []);

    console.log(user);

    return (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">
                    Người dùng
                </p>
                
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={user} searchKey="email" />


        </div>
    );
};

export default User;

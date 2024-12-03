"use client";


import { DataTable } from "@/components/custom ui/DataTable";
import Loader from '@/components/custom ui/Loader';
import { Separator } from "@/components/ui/separator";
import { columns } from "@/components/user/UserColumn";
import { useEffect, useState } from "react";

const User = () => {    
    const [loading,setLoading] = useState(true);
    const [user, setuser] = useState([]);

    
    useEffect(() => {
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

        
        getuser();
    },[]);

    console.log(user);

    return loading? <Loader/> :
    (
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

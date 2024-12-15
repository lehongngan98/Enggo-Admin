"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TypeOfNewsType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import Loader from "../custom ui/Loader";
import { Separator } from "../ui/separator";

const formSchema = z.object({
    title: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }),
});

interface TypeOfNewsFormProps {
    initialData?: TypeOfNewsType | null;
}

const TypeOfNewsForm: React.FC<TypeOfNewsFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                  title: "",
                 
              },
    });

    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/typeofnews/${initialData._id}`
                : "/api/typeofnews";
            console.log(url);
            
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if(res.status === 400){
                setIsLoading(false);
                toast.error("Tiêu đề đã tồn tại");
                return;
            }

            if(res.status === 401){
                setIsLoading(false);
                toast.error("Tiêu đề không được để trống");
                return;
            }

            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `TypeOfNews ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/typeofnews";
                router.push("/typeofnews");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[typeofnews_POST] :", error);
            toast.error("Something went wrong! Please try again.");
        }
    };

    return  loading ? <Loader /> :
    (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">
                        Cập nhật loại tin tức
                    </p>
                    <Delete id={initialData._id} item="typeofnews"/>
                </div>
            ) : (
                <p className="text-heading3-bold">
                    Thêm mới loại tin tức
                </p>
            )}
            <Separator className=" bg-grey-1 mt-4 mb-6" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Tiêu đề
                                </FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress}/>
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    
                    

                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Xác nhận
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/typeofnews")}
                            className="bg-blue-1 text-white"
                        >
                            Huỷ
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TypeOfNewsForm;

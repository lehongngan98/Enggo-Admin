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
import { ChannelType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    title: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }).max(200),
    description: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }).max(1000),
    channelId: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }).max(200),
});

interface ChannelFormProps {
    initialData?: ChannelType | null;
}

const ChannelForm: React.FC<ChannelFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                title: "",
                description: "",
                channelId: "",                
            },

    });

    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default Enter behavior (new line)
            // const fieldValue = form.getValues("subTopic");
            // if (fieldValue) {
            //     form.setValue("subTopic", fieldValue.map((item) => ({ ...item, text: item.text + "\n\n" }))); // Append '\n\n' to each subTopic text
            // }
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/channel/${initialData._id}`
                : "/api/channel";
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
                toast.error("Chủ đề đã tồn tại!");
                return;
            }

            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `channel ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/channel";
                router.push("/channel");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[channel_POST] :", error);
            toast.error("Something went wrong! Please try again.");
        }
    };


    // const addWordField = () => {
    //     const items = form.getValues("subTopic") || [];
    //     form.setValue("subTopic", [...items, { text:"",titleEn:"",titleVn:""}], {
    //         shouldValidate: true,
    //     });
    // };

    // const removeWordField = (index: number) => {
    //     const items = form.getValues("subTopic") || [];
    //     const updatedItems = items.filter((_, i) => i !== index);
    //     form.setValue("subTopic", updatedItems, { shouldValidate: true });
    // };


    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Cập nhật</p>
                    <Delete id={initialData._id} item="channel" />
                </div>
            ) : (
                <p className="text-heading3-bold">Tạo mới</p>
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
                                    Tiêu đề kênh
                                </FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Mô tả kênh
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="channelId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Mã kênh Youtube
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} onKeyDown={handleKeyPress} />
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
                            onClick={() => router.push("/channel")}
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

export default ChannelForm;

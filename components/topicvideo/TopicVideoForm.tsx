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
import { TopicVideoType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import ImageUpload from "../custom ui/ImageUpload";
import { Separator } from "../ui/separator";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
    title: z.string().min(2).max(20),    
    background: z.string(),    
    Items: z.array(
        z.object({
            image: z.string(),
            title: z.string().min(1),
            videoId: z.string().min(1),
        })
    )
        .optional(),
});

interface TopicVideoProps {
    initialData?: TopicVideoType | null;
}

const TopicVideoForm: React.FC<TopicVideoProps> = ({ initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                title: "",
                background: "",
                Items: [{ image: "", title: "", videoId: "" }],                
            },

    });

    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default Enter behavior (new line)
            // const fieldValue = form.getValues("content");
            // form.setValue("content", fieldValue + "\n\n"); // Append '\n\n' instead of just a line break
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/topicvideo/${initialData._id}`
                : "/api/topicvideo";
            console.log(url);

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            console.log(res.body);
            
            if(res.status === 400){
                setIsLoading(false);
                toast.error("Chủ đề video đã tồn tại!");
                return
            }

            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `Topic Video ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/topicvideo";
                router.push("/topicvideo");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[story_POST] :", error);
            toast.error("Something went wrong! Please try again.");
        }
    };


    const addWordField = () => {
        const items = form.getValues("Items") || [];
        form.setValue("Items", [...items, { image: "", title: "" ,videoId:""}], {
            shouldValidate: true,
        });
    };

    const removeWordField = (index: number) => {
        const items = form.getValues("Items") || [];
        const updatedItems = items.filter((_, i) => i !== index);
        form.setValue("Items", updatedItems, { shouldValidate: true });
    };


    return isLoading ? <Loader/> :
    (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Cập nhật chủ đề video</p>
                    <Delete id={initialData._id} item="topicvideo" />
                </div>
            ) : (
                <p className="text-heading3-bold">
                    Tạo mới chủ đề video
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
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    

                    <FormField
                        control={form.control}
                        name="background"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Hình ảnh chủ đề
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    {/* Other fields */}
                    

                    <FormItem>
                        <FormLabel>
                            Danh sách video
                        </FormLabel>                        

                        {(form.watch("Items") || []).map((item, index) => (
                            <div key={index} className="flex items-start gap-4 flex-col border rounded-md p-4 w-50">
                                <p>{index+1}</p>
                                <FormControl>
                                    <ImageUpload
                                        value={item.image ? [item.image] : []}
                                        onChange={(url) =>
                                            form.setValue(`Items.${index}.image`, url)
                                        }
                                        onRemove={() => form.setValue(`Items.${index}.image`, "")}
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Tiêu đề"
                                        value={item.title}
                                        onChange={(e) =>
                                            form.setValue(`Items.${index}.title`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Video ID"
                                        value={item.videoId}
                                        onChange={(e) =>
                                            form.setValue(`Items.${index}.videoId`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                
                                <Button
                                    type="button"
                                    onClick={() => removeWordField(index)}
                                    className="bg-red-500 text-white"
                                >
                                    Xoá
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={addWordField}
                            className="mt-4 bg-blue-1 text-white"
                        >
                            Thêm video
                        </Button>
                    </FormItem>





                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Xác nhận
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/topicvideo")}
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

export default TopicVideoForm;

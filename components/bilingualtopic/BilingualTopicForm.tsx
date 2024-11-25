"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BilingualTopicsType, CommunicationType, TopicVideoType, VocabularyType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import ImageUpload from "../custom ui/ImageUpload";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    topic: z.string().min(2).max(20),   
    subTopic: z.array(
        z.object({
            titleEn: z.string(),
            titleVn: z.string(),
            text: z.string(),
        })
    )
        .optional(),
});

interface BilingualTopicsProps {
    initialData?: BilingualTopicsType | null;
}

const BilingualTopicForm: React.FC<BilingualTopicsProps> = ({ initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                topic: "",
                subTopic: [
                    {
                        titleEn: "",
                        titleVn: "",
                        text: "",
                    },
                ],
            },

    });

    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default Enter behavior (new line)
            const fieldValue = form.getValues("subTopic");
            if (fieldValue) {
                form.setValue("subTopic", fieldValue.map((item) => ({ ...item, text: item.text + "\n\n" }))); // Append '\n\n' to each subTopic text
            }
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/bilingualtopic/${initialData._id}`
                : "/api/bilingualtopic";
            console.log(url);

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `BilingualTopic ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/bilingualtopic";
                router.push("/bilingualtopic");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[bilingualtopic_POST] :", error);
            toast.error("Something went wrong! Please try again.");
        }
    };


    const addWordField = () => {
        const items = form.getValues("subTopic") || [];
        form.setValue("subTopic", [...items, { text:"",titleEn:"",titleVn:""}], {
            shouldValidate: true,
        });
    };

    const removeWordField = (index: number) => {
        const items = form.getValues("subTopic") || [];
        const updatedItems = items.filter((_, i) => i !== index);
        form.setValue("subTopic", updatedItems, { shouldValidate: true });
    };


    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Cập nhật</p>
                    <Delete id={initialData._id} item="bilingualtopic" />
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
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chủ đề</FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    



                    {/* Other fields */}


                    <FormItem>
                        <FormLabel>Bài viết của chủ đề</FormLabel>

                        {(form.watch("subTopic") || []).map((item, index) => (
                            <div key={index} className="flex items-start gap-4 flex-col border rounded-md p-4 w-50">
                                <p>{index+1}</p>
                                <FormControl>
                                    <Input
                                        placeholder="Tiêu Đề Tiếng Anh"
                                        value={item.titleEn}
                                        onChange={(e) =>
                                            form.setValue(`subTopic.${index}.titleEn`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Tiêu Đề Tiếng Việt"
                                        value={item.titleVn}
                                        onChange={(e) =>
                                            form.setValue(`subTopic.${index}.titleVn`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Textarea
                                        placeholder="Nội Dung"
                                        value={item.text}
                                        className="h-40"
                                        onChange={(e) =>
                                            form.setValue(`subTopic.${index}.text`, e.target.value)
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
                            Thêm Bài Viết
                        </Button>
                    </FormItem>





                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Xác nhận
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/bilingualtopic")}
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

export default BilingualTopicForm;

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
import { QuoteType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import Loader from "../custom ui/Loader";

const formSchema = z.object({

    author: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }).max(200),
    text: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }).max(200),
    words: z.array(
        z.object({
            word: z.string(),
            meaning: z.string(),
            pronunciation: z.string(),
            type: z.string(),
        })
    )
        .optional(),
});

interface QuoteProps {
    initialData?: QuoteType | null;
}

const QuoteForm: React.FC<QuoteProps> = ({ initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                author: "",
                text: "",
                words: [{ word: "", meaning: "", pronunciation: "", type: "" }],
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
        const { words } = values;
        if(words){
            const isType = words.every((item) => item.type);
            const isWord = words.every((item) => item.word);
            const isMeaning = words.every((item) => item.meaning);
            const isPronunciation = words.every((item) => item.pronunciation);
            
            if(!isWord){
                toast.error("Vui lòng nhập từ!");
                return;
            }
            
            if(!isPronunciation){
                toast.error("Vui lòng nhập cách phát âm!");
                return;
            }
            if(!isMeaning){
                toast.error("Vui lòng nhập nghĩa!");
                return;
            }
            if(!isType){
                toast.error("Vui lòng nhập loại từ!");
                return;
            }
        }
        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/quote/${initialData._id}`
                : "/api/quote";
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
                toast.error("Nội dung đã tồn tại!");
                return;
            }

            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `Quote ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/quote";
                router.push("/quote");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[quote_POST] :", error);
            toast.error("Something went wrong! Please try again.");
        }
    };


    const addWordField = () => {
        const items = form.getValues("words") || [];
        form.setValue("words", [...items, { meaning: "", pronunciation: "", type: "", word: "" }], {
            shouldValidate: true,
        });
    };

    const removeWordField = (index: number) => {
        const items = form.getValues("words") || [];
        const updatedItems = items.filter((_, i) => i !== index);
        form.setValue("words", updatedItems, { shouldValidate: true });
    };


    return isLoading ? <Loader /> :
    (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">
                        Cập Nhật Trích Dẫn
                    </p>
                    <Delete id={initialData._id} item="quote" />
                </div>
            ) : (
                <p className="text-heading3-bold">
                    Thêm Trích Dẫn
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
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tác giả</FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội dung</FormLabel>
                                <FormControl>
                                    <Textarea {...field} onKeyDown={handleKeyPress} className="h-5" />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />






                    {/* Other fields */}


                    <FormItem>
                        <FormLabel>Từ Vựng</FormLabel>

                        {(form.watch("words") || []).map((item, index) => (
                            <div key={index} className="flex items-start gap-4 flex-col border rounded-md p-4 w-50">
                                <FormControl>
                                    <Input
                                        placeholder="Tiếng Anh"
                                        value={item.word}
                                        onChange={(e) =>
                                            form.setValue(`words.${index}.word`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Cách Phát Âm"
                                        value={item.pronunciation}
                                        onChange={(e) =>
                                            form.setValue(`words.${index}.pronunciation`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Nghĩa Tiếng Việt"
                                        value={item.meaning}
                                        onChange={(e) =>
                                            form.setValue(`words.${index}.meaning`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Loại từ"
                                        value={item.type}
                                        onChange={(e) =>
                                            form.setValue(`words.${index}.type`, e.target.value)
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
                           Thêm Từ
                        </Button>
                    </FormItem>





                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Xác Nhận
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/quote")}
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

export default QuoteForm;

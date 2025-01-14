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
import { VocabularyType } from "@/lib/types";
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
    titleEn: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }).max(200),
    titleVn: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }).max(200),
    image: z.string().url({ message: "Bạn chưa chọn hình ảnh" }),
    vocab: z.array(
        z.object({
            en: z.string(),
            vn: z.string()
        })
    )
        .optional(),
});

interface VocabularyProps {
    initialData?: VocabularyType | null;
}

const VocabularyForm: React.FC<VocabularyProps> = ({ initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                titleEn: "",
                titleVn: "",
                image: "",
                vocab: [{ en: "", vn: "" }],
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
        const { vocab } = values;
        if(vocab){
            const isEn = vocab.every((item) => item.en);
            const isVn = vocab.every((item) => item.vn);
            if(!isEn){
                toast.error("Vui lòng nhập từ vựng tiếng anh!");
                return;
            }
            if(!isVn){
                toast.error("Vui lòng nhập từ vựng tiếng việt!");
                return;
            }
        }
        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/vocabulary/${initialData._id}`
                : "/api/vocabulary";
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
                toast.error("Chủ đề từ vựng đã tồn tại!");
                return
            }

            if(res.status === 401){
                setIsLoading(false);
                toast.error("Xin hãy điền đầy đủ thông tin!");
                return
            }

            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `Vocabulary ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/vocabulary";
                router.push("/vocabulary");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[vocabulary_POST] :", error);
            toast.error("Something went wrong! Please try again.");
        }
    };


    const addWordField = () => {
        const items = form.getValues("vocab") || [];
        form.setValue("vocab", [...items, { vn: "", en: "" }], {
            shouldValidate: true,
        });
    };

    const removeWordField = (index: number) => {
        const items = form.getValues("vocab") || [];
        const updatedItems = items.filter((_, i) => i !== index);
        form.setValue("vocab", updatedItems, { shouldValidate: true });
    };


    return isLoading ? <Loader /> :
    (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Cập nhật Từ vựng</p>
                    <Delete id={initialData._id} item="vocabulary" />
                </div>
            ) : (
                <p className="text-heading3-bold">
                    Thêm mới Từ vựng
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
                        name="titleEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chủ đề(tiếng anh)</FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="titleVn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chủ đề(tiếng việt)</FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hình ảnh</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />



                    {/* Other fields */}


                    <FormItem>
                        <FormLabel>
                            Danh sách từ vựng
                        </FormLabel>

                        {(form.watch("vocab") || []).map((item, index) => (
                            <div key={index} className="flex items-start gap-4 flex-col border rounded-md p-4 w-50">
                                <p>{index + 1}</p>
                                <FormControl>
                                    <Input
                                        placeholder="Tiếng Anh"
                                        value={item.en}
                                        onChange={(e) =>
                                            form.setValue(`vocab.${index}.en`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Tiếng Việt"
                                        value={item.vn}
                                        onChange={(e) =>
                                            form.setValue(`vocab.${index}.vn`, e.target.value)
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
                            Thêm từ mới
                        </Button>
                    </FormItem>





                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Xác nhận
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/vocabulary")}
                            className="bg-blue-1 text-white"
                        >
                            Hủy
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default VocabularyForm;

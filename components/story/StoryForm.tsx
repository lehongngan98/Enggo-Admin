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
import { StoryType } from "@/lib/types";
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
import Loader from "../custom ui/Loader";

const formSchema = z.object({
    nameEn: z.string().min(2).max(20),
    nameVn: z.string().min(2).max(20),
    image: z.string(),
    content: z.string().min(2).trim(),
    words: z.array(
        z.object({
            word: z.string().min(1, "Word cannot be empty"),
            meaning: z.string().min(1, "Meaning cannot be empty"),
        })
    )
        .optional(),
});

interface StoryProps {
    initialData?: StoryType | null;
}

const StoryForm: React.FC<StoryProps> = ({ initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                nameEn: "",
                nameVn: "",
                image: "",
                content: "",
                words: [{ word: "", meaning: "" }],
            },

    });

    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default Enter behavior (new line)
            const fieldValue = form.getValues("content");
            form.setValue("content", fieldValue + "\n\n"); // Append '\n\n' instead of just a line break
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/story/${initialData._id}`
                : "/api/story";
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
                toast.error("Truyện đã tồn tại!");
                return;
            }

            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `Story ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/story";
                router.push("/story");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[story_POST] :", error);
            toast.error("Something went wrong! Please try again.");
        }
    };


    const addWordField = () => {
        const words = form.getValues("words") || [];
        form.setValue("words", [...words, { word: "", meaning: "" }], {
            shouldValidate: true,
        });
    };

    const removeWordField = (index: number) => {
        const words = form.getValues("words") || [];
        const updatedWords = words.filter((_, i) => i !== index);
        form.setValue("words", updatedWords, { shouldValidate: true });
    };


    return isLoading ? <Loader/> :
    (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Cập nhật Truyện</p>
                    <Delete id={initialData._id} item="collections" />
                </div>
            ) : (
                <p className="text-heading3-bold">
                    Thêm mới Truyện
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
                        name="nameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Câu tiếng anh</FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="nameVn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Câu tiếng việt</FormLabel>
                                <FormControl>
                                    <Input  {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội dung</FormLabel>
                                <FormControl>
                                    <Textarea
                                        // placeholder="Description"
                                        {...field}
                                        rows={5}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Other fields */}
                    {/* <FormField
                        control={form.control}
                        name="words"
                        render={() => (
                            <FormItem>
                                <FormLabel>Words</FormLabel>
                                <FormDescription>
                                    Add words and their meanings.
                                </FormDescription>
                                {form.getValues("words")?.map((word, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <FormControl>
                                            <Input
                                                placeholder="Word"
                                                value={word.word}
                                                onChange={(e) =>
                                                    form.setValue(
                                                        `words.${index}.word`,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                placeholder="Meaning"
                                                value={word.meaning}
                                                onChange={(e) =>
                                                    form.setValue(
                                                        `words.${index}.meaning`,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            onClick={() => removeWordField(index)}
                                            className="bg-red-500 text-white"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={addWordField}
                                    className="mt-4 bg-blue-1 text-white"
                                >
                                    Add Word
                                </Button>
                            </FormItem>
                        )}
                    /> */}

                    <FormItem>
                        <FormLabel>Từ vựng</FormLabel>                        

                        {(form.watch("words") || []).map((word, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <FormControl>
                                    <Input
                                        placeholder="Từ"
                                        value={word.word}
                                        onChange={(e) =>
                                            form.setValue(`words.${index}.word`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input
                                        placeholder="Nghĩa"
                                        value={word.meaning}
                                        onChange={(e) =>
                                            form.setValue(`words.${index}.meaning`, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    onClick={() => removeWordField(index)}
                                    className="bg-red-500 text-white"
                                >
                                    Xóa
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={addWordField}
                            className="mt-4 bg-blue-1 text-white"
                        >
                            Thêm từ vựng
                        </Button>
                    </FormItem>





                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Xác nhận
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/story")}
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

export default StoryForm;

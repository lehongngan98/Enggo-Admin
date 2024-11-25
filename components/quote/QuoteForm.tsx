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
import { QuoteType, TopicVideoType, VocabularyType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import ImageUpload from "../custom ui/ImageUpload";
import { Separator } from "../ui/separator";
import { Text } from "lucide-react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({

    author: z.string().min(2).max(20),
    text: z.string().min(2),
    words: z.array(
        z.object({
            word: z.string().min(1),
            meaning: z.string().min(1),
            pronunciation: z.string().min(1),
            type: z.string().min(1),
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


    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Edit Quote</p>
                    <Delete id={initialData._id} item="quote" />
                </div>
            ) : (
                <p className="text-heading3-bold">Create Quote</p>
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
                                <FormMessage />
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
                                <FormMessage />
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
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={addWordField}
                            className="mt-4 bg-blue-1 text-white"
                        >
                            Add Vocab
                        </Button>
                    </FormItem>





                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Submit
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/quote")}
                            className="bg-blue-1 text-white"
                        >
                            Discard
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default QuoteForm;

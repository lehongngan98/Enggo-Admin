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
import { CommunicationType, TopicVideoType, VocabularyType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import ImageUpload from "../custom ui/ImageUpload";
import { Separator } from "../ui/separator";

const formSchema = z.object({
    titleEn: z.string().min(2).max(20),
    titleVn: z.string().min(2).max(20),
    image: z.string(),
    vocab: z.array(
        z.object({
            en: z.string(),
            vn: z.string()
        })
    )
        .optional(),
});

interface CommunicationProps {
    initialData?: CommunicationType | null;
}

const CommunicationForm: React.FC<CommunicationProps> = ({ initialData }) => {
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
        try {
            setIsLoading(true);

            const url = initialData
                ? `/api/communication/${initialData._id}`
                : "/api/communication";
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
                    `Communication ${initialData ? "Updated" : "Create"}!`
                );
                window.location.href = "/communication";
                router.push("/communication");
            }
        } catch (error) {
            setIsLoading(false);
            console.log("[communication_POST] :", error);
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


    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Edit Communication</p>
                    <Delete id={initialData._id} item="communication" />
                </div>
            ) : (
                <p className="text-heading3-bold">Create Communication</p>
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
                                <FormMessage />
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



                    {/* Other fields */}


                    <FormItem>
                        <FormLabel>Vocab</FormLabel>

                        {(form.watch("vocab") || []).map((item, index) => (
                            <div key={index} className="flex items-start gap-4 flex-col border rounded-md p-4 w-50">
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
                            onClick={() => router.push("/communication")}
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

export default CommunicationForm;

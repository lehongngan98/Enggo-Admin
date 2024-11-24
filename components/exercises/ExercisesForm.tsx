"use client";

import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { ExerciseType } from "@/lib/types";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

const formSchema = z.object({
    title: z.string().min(2).max(20),
    background: z.string(),
    Items: z.array(
        z.object({
            title: z.string().min(2),
            link: z.string().url(),
            image: z.string(),
            content: z
                .array(
                    z.object({
                        text: z.string().min(1),
                    })
                )
                .optional(),
            choosePhrase: z
                .array(
                    z.object({
                        question: z.string().min(1),
                        options: z.array(z.string()).min(2),
                        correctAnswer: z.string().min(1),
                    })
                )
                .optional(),
        })
    ).optional(),
});

interface ExercisesFormsProps {
    initialData?: ExerciseType | null;
}

const ExercisesForm: React.FC<ExercisesFormsProps> = ({ initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogType, setDialogType] = useState<"content" | "choosePhrase" | null>(null);
    const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            background: "",
            Items: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "Items",
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Form Submitted with values:", values);  // Log values to check if it's being submitted
        try {
            setIsLoading(true);
            

            const url = initialData
                ? `/api/exercises/${initialData._id}`
                : "/api/exercises";
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            console.log("res : ", res);


            if (res.ok) {
                setIsLoading(false);
                toast.success(
                    `Exercises ${initialData ? "Updated" : "Created"}!`
                );
                router.push("/exercises");
            }
        } catch (error) {
            setIsLoading(false);
            console.error("[exercises_POST]:", error);
            toast.error("Something went wrong! Please try again.");
        }
    };

    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading3-bold">Edit Exercise</p>
                    <Delete id={initialData._id} item="exercises" />
                </div>
            ) : (
                <p className="text-heading3-bold">Create Exercise</p>
            )}
            <Separator className="bg-grey-1 mt-4 mb-6" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
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
                                <FormLabel>Background Image</FormLabel>
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

                    <div>
                        <p className="text-heading3-bold">Items</p>
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4 border p-4 mb-4">
                                <FormField
                                    control={form.control}
                                    name={`Items.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Item Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`Items.${index}.link`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Link</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Item Link" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`Items.${index}.image`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
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

                                {/* Dialog for Content */}
                                <Dialog
                                    open={dialogType === "content" && currentItemIndex === index}
                                    onOpenChange={(open) =>
                                        open ? setDialogType("content") : setDialogType(null)
                                    }
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => {
                                                setDialogType("content");
                                                setCurrentItemIndex(index);
                                            }}
                                        >
                                            Add Content
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white ">
                                        <DialogHeader>
                                            <DialogTitle>Add Content</DialogTitle>
                                            <DialogDescription>
                                                Add text for the content.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <FormField
                                            control={form.control}
                                            name={`Items.${index}.content`}
                                            render={({ field }) => (
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Content Text"
                                                        value={field.value?.map((c) => c.text).join("\n") || ""}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value
                                                                    .split("\n")
                                                                    .map((text) => ({ text }))
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                onClick={() => setDialogType(null)}
                                            >
                                                Close
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                {/* Dialog for ChoosePhrase */}
                                <Dialog
                                    open={dialogType === "choosePhrase" && currentItemIndex === index}
                                    onOpenChange={(open) =>
                                        open ? setDialogType("choosePhrase") : setDialogType(null)
                                    }
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => {
                                                setDialogType("choosePhrase");
                                                setCurrentItemIndex(index);
                                            }}
                                        >
                                            Add ChoosePhrase
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white">
                                        <DialogHeader>
                                            <DialogTitle>Add Choose Phrase</DialogTitle>
                                            <DialogDescription>
                                                Add question, options, and correct answer.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <FormField
                                            control={form.control}
                                            name={`Items.${index}.choosePhrase`}
                                            render={({ field }) => (
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Question"
                                                        className="h-32"
                                                        value={
                                                            field.value?.map(
                                                                (c) =>
                                                                    `${c.question}\nOptions: ${c.options.join(
                                                                        ", "
                                                                    )}\nAnswer: ${c.correctAnswer}`
                                                            ).join("\n\n") || ""
                                                        }
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value.split("\n\n").map((block) => {
                                                                    const [question, options, answer] =
                                                                        block.split("\n");
                                                                    return {
                                                                        question: question.replace("Question: ", ""),
                                                                        options: options
                                                                            .replace("Options: ", "")
                                                                            .split(", "),
                                                                        correctAnswer: answer.replace("Answer: ", ""),
                                                                    };
                                                                })
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                onClick={() => setDialogType(null)}
                                            >
                                                Close
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                    className="mt-2"
                                >
                                    Remove Item
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="secondary"
                            onClick={() => append({ title: "", link: "", image: "" })}
                        >
                            Add Item
                        </Button>
                    </div>

                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Submit
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/exercises")}
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

export default ExercisesForm;










// "use client";

// import React, { useState } from "react";
// import { Separator } from "../ui/separator";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "../ui/textarea";
// import ImageUpload from "../custom ui/ImageUpload";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import Delete from "../custom ui/Delete";
// import { ExerciseType } from "@/lib/types";

// const formSchema = z.object({
//     title: z.string().min(2).max(20),
//     background: z.string(),
//     Items: z.array(
//         z.object({
//             title: z.string().min(2),
//             link: z.string().url(),
//             image: z.string(),
//         })
//     ).optional(),
// });

// interface ExercisesFormsProps {
//     initialData?: ExerciseType | null;
// }

// const ExercisesForm: React.FC<ExercisesFormsProps> = ({ initialData }) => {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: initialData || {
//             title: "",
//             background: "",
//             Items: [],
//         },
//     });

//     const { fields, append, remove } = useFieldArray({
//         control: form.control,
//         name: "Items",
//     });

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             setIsLoading(true);

//             const url = initialData
//                 ? `/api/exercises/${initialData._id}`
//                 : "/api/exercises";
//             const res = await fetch(url, {
//                 method: initialData ? "PUT" : "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//             });

//             if (res.ok) {
//                 setIsLoading(false);
//                 toast.success(
//                     `Exercises ${initialData ? "Updated" : "Created"}!`
//                 );
//                 router.push("/exercises");
//             }
//         } catch (error) {
//             setIsLoading(false);
//             console.error("[exercises_POST]:", error);
//             toast.error("Something went wrong! Please try again.");
//         }
//     };

//     return (
//         <div className="p-10">
//             {initialData ? (
//                 <div className="flex items-center justify-between">
//                     <p className="text-heading3-bold">Edit Exercise</p>
//                     <Delete id={initialData._id} item="exercises" />
//                 </div>
//             ) : (
//                 <p className="text-heading3-bold">Create Exercise</p>
//             )}
//             <Separator className="bg-grey-1 mt-4 mb-6" />

//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                     <FormField
//                         control={form.control}
//                         name="title"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Title</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="Title" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="background"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Background Image</FormLabel>
//                                 <FormControl>
//                                     <ImageUpload
//                                         value={field.value ? [field.value] : []}
//                                         onChange={(url) => field.onChange(url)}
//                                         onRemove={() => field.onChange("")}
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <div>
//                         <p className="text-heading3-bold">Items</p>
//                         {fields.map((field, index) => (
//                             <div key={field.id} className="space-y-4 border p-4 mb-4">
//                                 <FormField
//                                     control={form.control}
//                                     name={`Items.${index}.title`}
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Title</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Item Title" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name={`Items.${index}.link`}
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Link</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Item Link" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name={`Items.${index}.image`}
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Image</FormLabel>
//                                             <FormControl>
//                                                 <ImageUpload
//                                                     value={field.value ? [field.value] : []}
//                                                     onChange={(url) => field.onChange(url)}
//                                                     onRemove={() => field.onChange("")}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <Button
//                                     variant="destructive"
//                                     onClick={() => remove(index)}
//                                     className="mt-2"
//                                 >
//                                     Remove Item
//                                 </Button>
//                             </div>
//                         ))}
//                         <Button
//                             variant="secondary"
//                             onClick={() => append({ title: "", link: "", image: "" })}
//                         >
//                             Add Item
//                         </Button>
//                     </div>

//                     <div className="flex gap-10">
//                         <Button type="submit" className="bg-blue-1 text-white">
//                             Submit
//                         </Button>
//                         <Button
//                             type="button"
//                             onClick={() => router.push("/exercises")}
//                             className="bg-blue-1 text-white"
//                         >
//                             Discard
//                         </Button>
//                     </div>
//                 </form>
//             </Form>
//         </div>
//     );
// };

// export default ExercisesForm;

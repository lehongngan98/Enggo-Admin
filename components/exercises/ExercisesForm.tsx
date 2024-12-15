"use client";

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
import { ExerciseType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";

import ImageUpload from "../custom ui/ImageUpload";
import Loader from "../custom ui/Loader";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }),
  background: z.string().min(2, { message: "Bạn chưa chọn hình ảnh" }),
  Items: z.array(
    z.object({
      title: z.string(),
      link: z.string(),
      image: z.string(),
      content: z.array(
        z.object({
          text: z.string(),
        })
      ),
      choosePhrase: z.array(
        z.object({
          question: z.string(),
          options: z.array(z.string()).min(2),
          correctAnswer: z.string(),
        })
      ),
    })
  ),
  // .optional(),
});

interface ExercisesProps {
  initialData?: ExerciseType | null;
}

const ExercisesForm: React.FC<ExercisesProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          background: "",
          Items: [
            {
              title: "",
              link: "",
              image: "",
              content: [
                {
                  text: "",
                },
              ],
              choosePhrase: [
                {
                  question: "",
                  options: ["", ""],
                  correctAnswer: "",
                },
              ],
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
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, background, Items } = values;

    // Check if title and background are provided
    if (!title || !background) {
      toast.error("Vui lòng nhập đầy đủ thông tin về chủ đề.");
      return;
    }

    // Ensure all items have images, content, and questions/answers
    const isImage = Items.every((item) => item.image);
    const isContent = Items.every(
      (item) => item.content.length > 0 && item.content.every((c) => c.text)
    );
    const isChoosePhrase = Items.every(
      (item) =>
        item.choosePhrase.length > 0 &&
        item.choosePhrase.every(
          (phrase) =>
            phrase.question &&
            phrase.correctAnswer &&
            phrase.options.length >= 2
        )
    );

    if (!isImage || !isContent || !isChoosePhrase) {
      toast.error("Vui lòng nhập đầy đủ thông tin cho tất cả bài tập.");
      return;
    }
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

      console.log('API Response Status:', res.status); 

      if (res.status === 400) {
        setIsLoading(false);
        toast.error("Chủ đề bài tập đã tồn tại!");
        return;
      }
      if (res.status === 401) {
        setIsLoading(false);
        toast.error("Mời nhập đầy đủ!");
        return;
      }

      if (res.status === 200) {
        setIsLoading(false);
        toast.success(`exercises ${initialData ? "Updated" : "Created"}!`);
        router.push("/exercises");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again.");
      console.log("[exercises_POST] :", error);
    }
  };

  const addField = () => {
    const items = form.getValues("Items") || [];
    form.setValue(
      "Items",
      [
        ...items,
        {
          title: "",
          image: "",
          link: "",
          content: [{ text: "" }],
          choosePhrase: [
            {
              question: "",
              options: ["", ""],
              correctAnswer: "",
            },
          ],
        },
      ],
      {
        shouldValidate: true,
      }
    );
    console.log("Updated Items after add:", form.getValues("Items"));
  };

  const removeField = (index: number) => {
    const items = form.getValues("Items") || [];
    const updatedItems = items.filter((_, i) => i !== index);
    form.setValue("Items", updatedItems, { shouldValidate: true });
    console.log("Updated Items after remove:", updatedItems);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading3-bold">Cập nhật</p>
          <Delete id={initialData._id} item="exercises" />
        </div>
      ) : (
        <p className="text-heading3-bold">Tạo mới</p>
      )}
      <Separator className=" bg-grey-1 mt-4 mb-6" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chủ đề của bài tập:</FormLabel>
                <FormControl>
                  <Input {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh của chủ đề bài tập:</FormLabel>
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
          {/* Other fields Items*/}
          <Separator className=" bg-grey-1   mt-4" />

          <FormItem>
            <FormLabel>Danh sách bài tập:</FormLabel>

            {(form.watch("Items") || []).map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 flex-col border rounded-md p-4 w-full"
              >
                <p>Bài tập {index + 1}</p>

                <FormControl>
                  <Input
                    placeholder="Tiêu đề bài tập"
                    value={item.title}
                    onChange={(e) =>
                      form.setValue(`Items.${index}.title`, e.target.value)
                    }
                  />
                </FormControl>

                <FormControl>
                  <Input
                    placeholder="Link bài viết"
                    value={item.link}
                    onChange={(e) =>
                      form.setValue(`Items.${index}.link`, e.target.value)
                    }
                  />
                </FormControl>

                <FormControl>
                  <ImageUpload
                    value={item.image ? [item.image] : []}
                    onChange={(url) =>
                      form.setValue(`Items.${index}.image`, url, {
                        shouldValidate: true,
                      })
                    }
                    onRemove={() =>
                      form.setValue(`Items.${index}.image`, "", {
                        shouldValidate: true,
                      })
                    }
                  />
                </FormControl>

                {/* Content */}

                {(item.content || []).map((content, contentIndex) => (
                  <div
                    key={contentIndex}
                    className="flex flex-col gap-4 p-4 border rounded-md w-full"
                  >
                    <p>Nội dung audio {contentIndex + 1}</p>

                    <FormControl>
                      <Textarea
                        placeholder="Nhập nội dung"
                        value={content.text}
                        className="h-20"
                        onChange={(e) =>
                          form.setValue(
                            `Items.${index}.content.${contentIndex}.text`,
                            e.target.value,
                            { shouldValidate: true }
                          )
                        }
                      />
                    </FormControl>

                    <Button
                      type="button"
                      onClick={() => {
                        const updatedContent = item.content.filter(
                          (_, contentIdx) => contentIdx !== contentIndex
                        );
                        form.setValue(
                          `Items.${index}.content`,
                          updatedContent,
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                      className="bg-red-500 text-white mt-2 w-1/6"
                    >
                      Xoá nội dung
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() =>
                    form.setValue(
                      `Items.${index}.content`,
                      [...(item.content || []), { text: "" }],
                      { shouldValidate: true }
                    )
                  }
                  className="mt-4 bg-blue-1 text-white"
                >
                  Thêm nội dung
                </Button>

                <Separator className=" bg-grey-1   mt-4 mb-4" />

                  <p>Câu hỏi trong bài tập:</p>
                {/*choosePhrase  */}
                {(item.choosePhrase || []).map((phrase, phraseIndex) => (
                  <div
                    key={phraseIndex}
                    className="flex flex-col gap-4 p-4 border rounded-md w-full"
                  >
                    <p>Câu hỏi thứ {phraseIndex + 1}</p>
                    <FormControl>
                      <Input
                        placeholder="Câu hỏi"
                        value={phrase.question}
                        onChange={(e) =>
                          form.setValue(
                            `Items.${index}.choosePhrase.${phraseIndex}.question`,
                            e.target.value
                          )
                        }
                      />
                    </FormControl>

                    <FormItem>
                      <FormLabel>Tuỳ chọn</FormLabel>
                      {(phrase.options || []).map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-4"
                        >
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              form.setValue(
                                `Items.${index}.choosePhrase.${phraseIndex}.options.${optionIndex}`,
                                e.target.value
                              )
                            }
                          />
                          <Button
                            type="button"
                            className="bg-red-500 text-white"
                            onClick={() => {
                              const updatedOptions = phrase.options.filter(
                                (_, optIdx) => optIdx !== optionIndex
                              );
                              form.setValue(
                                `Items.${index}.choosePhrase.${phraseIndex}.options`,
                                updatedOptions,
                                { shouldValidate: true }
                              );
                            }}
                          >
                            Xoá
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() =>
                          form.setValue(
                            `Items.${index}.choosePhrase.${phraseIndex}.options`,
                            [...(phrase.options || []), ""],
                            { shouldValidate: true }
                          )
                        }
                        className="mt-2 bg-blue-1 text-white"
                      >
                        Thêm tuỳ chọn
                      </Button>
                    </FormItem>

                    <FormControl>
                      <Input
                        placeholder="Câu trả lời đúng"
                        value={phrase.correctAnswer}
                        onChange={(e) =>
                          form.setValue(
                            `Items.${index}.choosePhrase.${phraseIndex}.correctAnswer`,
                            e.target.value
                          )
                        }
                      />
                    </FormControl>

                    <Button
                      type="button"
                      onClick={() => {
                        const updatedPhrases = item.choosePhrase.filter(
                          (_, phIdx) => phIdx !== phraseIndex
                        );
                        form.setValue(
                          `Items.${index}.choosePhrase`,
                          updatedPhrases,
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                      className="mt-2 bg-red-500 text-white w-1/6"
                    >
                      Xoá câu hỏi
                    </Button>

                    <Button
                      type="button"
                      onClick={() =>
                        form.setValue(
                          `Items.${index}.choosePhrase`,
                          [
                            ...(item.choosePhrase || []),
                            {
                              question: "",
                              options: ["", ""], // Initialize with two empty options
                              correctAnswer: "",
                            },
                          ],
                          { shouldValidate: true }
                        )
                      }
                      className="mt-4 bg-blue-1 text-white w-1/6"
                    >
                      Thêm câu hỏi
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() => removeField(index)}
                  className="bg-red-500 text-white"
                >
                  Xoá Bài Tập
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addField}
              className="mt-4 bg-blue-1 text-white"
            >
              Thêm Bài Tập
            </Button>
          </FormItem>

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Xác nhận
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/exercises")}
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

export default ExercisesForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import ImageUpload from "../custom ui/ImageUpload";
import { Separator } from "../ui/separator";

import { NewsType, TypeOfNewsType } from "@/lib/types";
import Loader from "../custom ui/Loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  content: z.string().min(2, { message: "Vui lòng nhập trên 2 kí tự" }),
  image: z.string().min(2, { message: "Bạn chưa chọn hình ảnh" }),
  information: z.array(
    z.object({
      image: z.string(),
      subTitle: z.string(),
      text: z.string(),
    })
  ),
  typeofnews: z.array(z.string()),
});

interface NewsFormProps {
  initialData?: NewsType | null; //Must have "?" to make it optional
}

const NewsForm: React.FC<NewsFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [typeofnews, setTypeOfNews] = useState<TypeOfNewsType[]>([]);
  const [title, setTitle] = useState("");

  const getTypeOfNews = async () => {
    try {
      const res = await fetch("/api/typeofnews", {
        method: "GET",
      });
      const data = await res.json();
      setTypeOfNews(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.log("[typeofnews_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getTypeOfNews();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          // information
          information: Array.isArray(initialData.information)
            ? initialData.information.map((item) => ({
                image: item.image,
                subTitle: item.subTitle,
                text: item.text,
              }))
            : [],
          typeofnews: initialData.typeofnews?.map((item) => item._id),
        }
      : {
          content: "",
          image: "",
          information: [
            {
              image: "",
              subTitle: "",
              text: "",
            },
          ],
          typeofnews: [],
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values);

    const { information } = values;

    const isSubTitle = information.every((item) => item.subTitle);
    const isText = information.every((item) => item.text);
    const isImage = information.every((item) => item.image);

    if (!isSubTitle) {
      toast.error("Vui lòng nhập SubTitle");
      return;
    }
    if (!isText) {
      toast.error("Vui lòng nhập Text");
      return;
    }
    if (!isImage) {
      toast.error("Vui lòng chọn hình ảnh");
      return;
    }

    // Thêm title vào values trước khi gửi
    const payload = { ...values, title };

    try {
      setLoading(true);
      const url = initialData ? `/api/news/${initialData._id}` : "/api/news";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.status === 400) {
        setLoading(false);
        toast.error("Vui lòng nhập đủ thông tin");
        return;
      }
      if (res.status === 401) {
        setLoading(false);
        toast.error("Tin tức đã tồn tại");
        return;
      }
      if (res.ok) {
        setLoading(false);
        toast.success(`News ${initialData ? "updated" : "created"}`);
        window.location.href = "/news";
        router.push("/news");
      }
    } catch (err) {
      setLoading(false);
      console.log("[news_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const addField = () => {
    const items = form.getValues("information") || [];
    form.setValue(
      "information",
      [
        ...items,
        {
          image: "",
          subTitle: "",
          text: "",
        },
      ],
      {
        shouldValidate: true,
      }
    );
    console.log("Updated Items after add:", form.getValues("information"));
  };

  const removeField = (index: number) => {
    const items = form.getValues("information") || [];
    const updatedItems = items.filter((_, i) => i !== index);
    form.setValue("information", updatedItems, { shouldValidate: true });
    console.log("Updated Items after remove:", updatedItems);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Cập nhật tin tức</p>
          <Delete id={initialData._id} item="news" />
        </div>
      ) : (
        <p className="text-heading2-bold">Thêm mới tin tức</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input
                    // placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
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

          {/*Select Type Of News */}
          <FormField
            control={form.control}
            name="typeofnews"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại tin tức</FormLabel>
                <FormControl className="relative">
                  <Select
                    value={field.value[0] || ""}
                    onValueChange={(value) => {
                      field.onChange([value]); // Cập nhật với giá trị duy nhất được chọn
                      // Lấy tiêu đề loại tin tức dựa trên giá trị chọn
                      const selectedType = typeofnews.find(
                        (item) => item._id === value
                      );
                      if (selectedType) {
                        setTitle(selectedType.title); // Cập nhật title
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại tin tức" />
                    </SelectTrigger>
                    <SelectContent className="absolute z-50 mt-2 max-h-60 overflow-y-auto border border-gray-200 bg-white shadow-lg hover:cursor-pointer">
                      <SelectGroup>
                        {typeofnews.map((item) => (
                          <SelectItem
                            key={item._id}
                            value={item._id}
                            className="hover:bg-gray-200"
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          {/* Other fields information */}
          <FormItem>
            <FormLabel>Thông tin chi tiết</FormLabel>
            <div className="space-y-4">
              {form.getValues("information").map((_, index) => (
                <div key={index} className="space-y-4 rounded-md border p-4 ">
                  <FormField
                    control={form.control}
                    name={`information.${index}.subTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SubTitle</FormLabel>
                        <FormControl>
                          <Input
                            // placeholder="SubTitle"
                            {...field}
                            onKeyDown={handleKeyPress}
                          />
                        </FormControl>
                        <FormMessage className="text-red-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`information.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text</FormLabel>
                        <FormControl>
                          <Input
                            // placeholder="Text"
                            {...field}
                            onKeyDown={handleKeyPress}
                          />
                        </FormControl>
                        <FormMessage className="text-red-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`information.${index}.image`}
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

                  <div className="flex gap-10">
                    <Button
                      type="button"
                      onClick={() => removeField(index)}
                      className="bg-red-1 text-white"
                    >
                      Xoá
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-10">
              <Button
                type="button"
                onClick={addField}
                className="bg-blue-1 text-white"
              >
                Thêm
              </Button>
            </div>
          </FormItem>

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/news")}
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

export default NewsForm;

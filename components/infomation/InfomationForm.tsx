"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";


import Loader from "../custom ui/Loader";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import { Value } from "@radix-ui/react-select";

const formSchema = z.object({
  subTitle: z.string().min(2).max(20),
  image: z.string(),
  text: z.string().min(2).max(500).trim(),
  news: z.string(),
});

interface InfomationFormProps {
  initialData?: InformationType | null; //Must have "?" to make it optional
}

const InfomationForm: React.FC<InfomationFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsType[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const getNews = async () => {
    try {
      const res = await fetch("/api/news", {
        method: "GET",
      });
      const data = await res.json();
      setNews(data);
      setLoading(false);
    } catch (err) {
      console.log("[news_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

 console.log("initialData :", initialData);
 


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
        ...initialData,
        news: initialData.news._id ? initialData.news._id.toString() : "",
      }
      : {
        subTitle: "",
        image: "",
        text: "",
        news: "",
      },
    shouldUnregister: false,
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
    console.log("Form submitted with values:", values);
    console.log("Form values:", values);
    console.log("Errors:", form.formState.errors);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/infomation/${initialData._id}`
        : "/api/infomation";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        console.log("res :", res);

        toast.success(`Article ${initialData ? "updated" : "created"}`);
        window.location.href = "/infomation";
        router.push("/infomation");
      }
    } catch (err) {
      console.log("[infomation_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Article</p>
          <Delete id={initialData._id} item="infomation" />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Article</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="subTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
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

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    defaultValue={form.getValues("text")}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1">
                  {form.formState.touchedFields.text && form.formState.errors.text?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* formfield select news */}
          <FormField
            control={form.control}
            name="news"
            render={({ field }) => (

              <FormItem>
                <FormLabel
                  className={isFocused ? "opacity-0 h-0" : "opacity-100 h-auto"}
                >
                  News
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // Ensure only ID is passed
                    value={field.value} // Bind current value
                    
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a news" />
                    </SelectTrigger>
                    <SelectContent>
                      {news.map((item) => (
                        <SelectItem key={item._id} value={item._id.toString()}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />


          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/infomation")}
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

export default InfomationForm;
"use client"

import React from 'react'
import { Separator } from '../ui/separator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string(),
})

const CollectionForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
        },
    })

    const onSubmit = async(values: z.infer<typeof formSchema>) => {       
        console.log(values)
      }

    return (
        <div className='p-10'>
            <p className='text-heading1-bold'>Create Collection</p>
            <Separator className=' bg-grey-1 mt-4 mb-6' />
        </div>

    )
}

export default CollectionForm
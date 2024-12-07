"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"
import { NewsType, ProductType } from "@/lib/types"
import Image from "next/image"


export const columns: ColumnDef<NewsType>[] = [
	{
		accessorKey: "content",
		header: "Tiêu đề",
		cell: ({ row }) => (<Link href={`/news/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.content}</Link>),
	},
	{
		accessorKey: "image",
		cell: ({ row }) => <Image src={row.original.image} alt="news" width={80} height={80} className="w-20 h-20" />,
		// cell: ({ row }) => <img src={row.original.image} alt="news" className="w-20 h-20" />,
	},{		
		accessorKey: "typeofnews",
		header: "Loại tin tức",
		cell: ({ row }) => <span>{row.original.typeofnews?.[0]?.title}</span>,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="news" />
	},
]
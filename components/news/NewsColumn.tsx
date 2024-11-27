"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Delete from "../custom ui/Delete"
import Link from "next/link"
import { NewsType } from "@/lib/types"


export const columns: ColumnDef<NewsType>[] = [
	{
		accessorKey: "title",
		header: "Tiêu đề",
		cell: ({ row }) => (<Link href={`/news/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
		accessorKey: "content",
		header: "Nội dung",
		cell: ({ row }) => <p>{row.original.content}</p>,
	},
	{
		accessorKey: "image",
		cell: ({ row }) => <Image src={row.original.image} alt={row.original.title} width={40} height={40} className="object-cover" />,
		// cell: ({ row }) => <img src={row.original.image} alt={row.original.title} className="h-10 w-10 object-cover" />,
	},
	{
		accessorKey: "infomation",
		header: "Số lượng bài báo",
		cell: ({ row }) => {
			const info = row.original.information;
			console.log("info :", info);
			
			// Kiểm tra nếu `information` là một mảng
			return <p className="text-center">{Array.isArray(info) ? info.length : 0}</p>;
		},
	},
	


	
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="news" />
	},
]
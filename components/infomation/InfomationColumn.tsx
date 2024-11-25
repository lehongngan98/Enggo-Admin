"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"
import { InformationType } from "@/lib/types"


export const columns: ColumnDef<InformationType>[] = [
	{
		accessorKey: "subTitle",
		header: "Tiêu Đề",
		cell: ({ row }) => (<Link href={`/infomation/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.subTitle}</Link>),
	},
	{
		accessorKey: "text",
		header: "Nội Dung",
	},
	{
		accessorKey: "image",
		header: "Hình Ảnh",
		cell: ({ row }) => <img src={row.original.image} alt={row.original.subTitle} className="h-10 w-10 object-cover" />,
	},
	{
		accessorKey: "news",
		header: "Loại Tin Tức",
		cell: ({ row }) => <div className="hover:text-red-500 hover:italic">{row.original.news.title}</div>,
	},
	{
		id: "actions",
		header: "Hành Động",
		cell: ({ row }) => <Delete id={row.original._id} item="infomation" />
	},
]
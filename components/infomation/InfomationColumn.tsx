"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
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
		cell: ({ row }) => <Image src={row.original.image} alt={row.original.subTitle} width={40} height={40} className="object-cover" />,		
	},
	{
		accessorKey: "news",
		header: "Loại Tin Tức",
		cell: ({ row }) => (
			<div className="hover:text-red-500 hover:italic">
				{row.original.news ? row.original.news.title : "No News"}
			</div>
		),
	},
	{
		id: "actions",
		header: "Hành Động",
		cell: ({ row }) => <Delete id={row.original._id} item="infomation" />
	},
]
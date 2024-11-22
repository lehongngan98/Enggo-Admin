"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"


export const columns: ColumnDef<InformationType>[] = [
	{
		accessorKey: "subTitle",
		header: "Title",
		cell: ({ row }) => (<Link href={`/infomation/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.subTitle}</Link>),
	},
	{
		accessorKey: "text",
		header: "Text",
	},
	{
		accessorKey: "image",
		header: "Image",
		cell: ({ row }) => <img src={row.original.image} alt={row.original.subTitle} className="h-10 w-10 object-cover" />,
	},
	{
		accessorKey: "news",
		header: "Type of News",
		cell: ({ row }) => <div className="hover:text-red-500 hover:italic">{row.original.news.title}</div>,
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <Delete id={row.original._id} item="infomation" />
	},
]
"use client"

import { QuoteType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<QuoteType>[] = [
	{
		accessorKey: "author",
		header: "Tác giả",
		cell: ({ row }) => (<Link href={`/quote/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.author}</Link>),
	},
	{
		accessorKey: "text",
		header: "Nội dung",
		cell: ({ row }) => <p className="hover:text-red-500 hover:italic">{row.original.text}</p>,        
	},
	{
		accessorKey: "words",
		header: "Số lượng từ vựng",
		cell: ({ row }) => <p>{row.original.words.length}</p>,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="quote" />
	},
]
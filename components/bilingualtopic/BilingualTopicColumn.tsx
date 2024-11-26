"use client"

import { BilingualTopicsType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<BilingualTopicsType>[] = [
	{
		accessorKey: "topic",
		header: "Chủ đề",
		cell: ({ row }) => (<Link href={`/bilingualtopic/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.topic}</Link>),
	},
	{
		accessorKey: "subTopic",
		header: "Số lượng bài viết",
		cell: ({ row }) => <p>{row.original.subTopic.length}</p>,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="bilingualtopic" />
	},
]
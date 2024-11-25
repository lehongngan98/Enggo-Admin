"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"
import { StoryType, TopicVideoType } from "@/lib/types"


export const columns: ColumnDef<TopicVideoType>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (<Link href={`/topicvideo/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
		accessorKey: "background",
		header: "Image background",
		cell: ({ row }) => <img src={row.original.background} alt="image" className="w-20 h-20" />,
	},
	{
		accessorKey: "Items",
		header: "Items",
		cell: ({ row }) => <p>{row.original.Items.length}</p>,
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <Delete id={row.original._id} item="topicvideo" />
	},
]
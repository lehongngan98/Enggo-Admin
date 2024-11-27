"use client"

import { TopicVideoType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<TopicVideoType>[] = [
	{
		accessorKey: "title",
		header: "Tiêu đề",
		cell: ({ row }) => (<Link href={`/topicvideo/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
		accessorKey: "background",
		cell: ({ row }) => <Image src={row.original.background} alt="image" width={80} height={80} className="w-20 h-20" />,
		// cell: ({ row }) => <img src={row.original.background} alt="image" className="w-20 h-20" />,
	},
	{
		accessorKey: "Items",
		header: "Số video",
		cell: ({ row }) => <p>{row.original.Items.length}</p>,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="topicvideo" />
	},
]
"use client"

import { BilingualTopicsType, ChannelType, CommunicationType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<ChannelType>[] = [
	{
		accessorKey: "title",
		header: "Tiêu đề",
		cell: ({ row }) => (<Link href={`/channel/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
		accessorKey: "description",
		header: "Mô tả",
		cell: ({ row }) => row.original.description,		
	},
	{
		accessorKey: "channelId",
		header: "ID",
		cell: ({ row }) => (<Link href={`/channel/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.channelId}</Link>),
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="channel" />
	}
]
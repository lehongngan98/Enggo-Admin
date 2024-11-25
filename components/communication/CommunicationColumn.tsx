"use client"

import { CommunicationType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<CommunicationType>[] = [
	{
		accessorKey: "titleEn",
		header: "Chủ đề(Tiếng Anh)",
		cell: ({ row }) => (<Link href={`/communication/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.titleEn}</Link>),
	},
	{
		accessorKey: "titleVn",
		header: "Chủ đề(Tiếng Việt)",
		cell: ({ row }) => <p className="hover:text-red-500 hover:italic">{row.original.titleVn}</p>,        
	},
	{
		accessorKey: "background",
		header: "Hình ảnh chủ đề",
		cell: ({ row }) => <img src={row.original.image} alt="image" className="w-20 h-20" />,
	},
	{
		accessorKey: "vocab",
		header: "Số lượng từ vựng",
		cell: ({ row }) => <p>{row.original.vocab.length}</p>,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="communication" />
	},
]
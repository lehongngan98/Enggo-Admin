"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"
import { StoryType, TopicVideoType, VocabularyType } from "@/lib/types"


export const columns: ColumnDef<VocabularyType>[] = [
	{
		accessorKey: "titleEn",
		header: "Chủ đề(Tiếng Anh)",
		cell: ({ row }) => (<Link href={`/vocabulary/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.titleEn}</Link>),
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
		header: "Actions",
		cell: ({ row }) => <Delete id={row.original._id} item="vocabulary" />
	},
]
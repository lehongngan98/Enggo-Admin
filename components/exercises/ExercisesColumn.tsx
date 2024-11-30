"use client"

import { ExerciseType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"
import Image from "next/image"


export const columns: ColumnDef<ExerciseType>[] = [
	{
		accessorKey: "title",
		header: "Chủ đề",
		cell: ({ row }) => (<Link href={`/exercises/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
		accessorKey: "background",
		cell: ({ row }) => <Image src={row.original.background} alt={row.original.title} width={80} height={80} className="w-20 h-20" />,
		// cell: ({ row }) => <img src={row.original.background} alt={row.original.title} className="w-20 h-20" />,
		
	},
	{
		accessorKey: "subTopic",
		header: "Số lượng bài tập",
		cell: ({ row }) => <p className="ml-20">{row.original.Items.length}</p>,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="exercises" />
	},
]
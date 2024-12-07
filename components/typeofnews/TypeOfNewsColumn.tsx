"use client"
 
import { TypeOfNewsType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<TypeOfNewsType>[] = [
	{
	  accessorKey: "title",
	  header: "Title",
	  cell: ({ row }) => (<Link href={`/typeofnews/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
	  accessorKey: "news",
	  header: "Số lượng tin tức",
	  cell: ({ row }) => <p>{row.original.news.length}</p>,

	},
	{
	  id: "actions",
	  header: "Hành động",
	  cell: ({row}) => <Delete id={row.original._id} item="typeofnews"/>
	},
  ]
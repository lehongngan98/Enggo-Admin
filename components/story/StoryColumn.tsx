"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"
import { StoryType } from "@/lib/types"
import Image from "next/image"


export const columns: ColumnDef<StoryType>[] = [
	{
	  accessorKey: "nameEn",
	  header: "Tiếng Anh",
	  cell: ({ row }) => (<Link href={`/story/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.nameEn}</Link>),
	},
	{
	  accessorKey: "nameVn",
	  header: "Tiếng Việt",
		cell: ({ row }) => <p className="hover:text-red-500 hover:italic">{row.original.nameVn}</p>,        
	},
	{
	  accessorKey: "image",
		cell: ({ row }) => <Image src={row.original.image} alt="image" width={80} height={80} className="w-20 h-20" />, 
		// cell: ({ row }) => <img src={row.original.image} alt="image" className="w-20 h-20" />, 
	},
	{
	  accessorKey: "words",
	  header: "Số lượng từ vựng",
	  cell: ({ row }) => <p>{row.original.words.length}</p>,
	},
	{
	  id: "actions",
		header: "Hành động",		 		   				
		cell: ({row}) => <Delete id={row.original._id} item="story"/>
	},
  ]
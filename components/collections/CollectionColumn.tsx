"use client"
 
import { CollectionType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<CollectionType>[] = [
	{
	  accessorKey: "title",
	  header: "Title",
	  cell: ({ row }) => (<Link href={`/collections/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
	  accessorKey: "products",
	  header: "Products",
	  cell: ({ row }) => <p>{row.original.products.length}</p>,

	},
	{
	  id: "actions",
	  cell: ({row}) => <Delete id={row.original._id} item="collections"/>
	},
  ]
"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"


export const columns: ColumnDef<ProductType>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (<Link href={`/products/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "collections",
		header: "Collections",
		cell: ({ row }) => row.original.collections.map((collection) => collection.title).join(", "),
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "expense",
		header: "Expense",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <Delete id={row.original._id} item="products" />
	},
]
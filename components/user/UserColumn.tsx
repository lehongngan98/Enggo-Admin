"use client"

import { UserType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<UserType>[] = [
	{
		accessorKey: "fullname",
		header: "Họ và tên",
		cell: ({ row }) => (<Link href={`/user/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.fullname}</Link>),
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => row.original.email,		
	},
	{
		accessorKey: "photoURL",
		header: "Ảnh đại diện",
		cell: ({ row }) => <img src={row.original.photoURL} alt={row.original.fullname} className="w-10 h-10 rounded-full" />,
	},
	{
		accessorKey: "role",
		header: "Vai trò",
		cell: ({ row }) => row.original.role,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="user" />
	}
]
"use client"

import {Row} from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {documentSchema} from "./data/schema"
import {Trash, View} from "@/app/assets";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	                                           row,
                                           }: DataTableRowActionsProps<TData>) {
	const task = documentSchema.parse(row.original)
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<MoreHorizontal/>
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-full max-w-fit">
				<DropdownMenuItem className='cursor-pointer'><View/> Visualizar</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer'><Trash/> Excluir documento</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
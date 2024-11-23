"use client"

import {Table} from "@tanstack/react-table"
import {X} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import DocumentDialog from "@/app/components/dialog/document-dialog";

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({
	                                        table,
                                        }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0
	
	return (
		<div className="flex flex-col lg:flex-row items-end justify-between">
			<div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-4 lg:space-x-2 w-full lg:w-1/2">
				<div className="flex w-full flex-col items-start justify-center gap-y-2">
					<Label htmlFor="origin" className="font-semibold">Origem do documento</Label>
					<Select defaultValue="1">
						<SelectTrigger
							id="origin"
							className="w-full"
						>
							<SelectValue placeholder="Selecione a origem"/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Digitalizado</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-full flex-col items-start justify-center gap-y-2">
					<Label htmlFor="doc-type" className="font-semibold">Tipo documental</Label>
					<Select defaultValue="1">
						<SelectTrigger
							id="doc-type"
							className="w-full"
						>
							<SelectValue placeholder="Selecione a origem"/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Nota fiscal de serviço</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex w-full lg:w-1/2 justify-end items-center space-x-2">
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reiniciar filtros
						<X/>
					</Button>
				)}
				<DocumentDialog/>
			</div>
		</div>
	)
}
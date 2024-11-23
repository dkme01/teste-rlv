"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search, X} from "lucide-react";
import {Table} from "@tanstack/react-table";
import * as React from "react";

interface DataTableHeaderProps<TData> {
	table: Table<TData>
}

export function DataTableHeader<TData>({
	                                       table,
                                       }: DataTableHeaderProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0
	
	return (
		<div className="flex flex-col lg:flex-row w-full items-end justify-between space-y-2">
			<div className="w-full lg:w-1/2 ">
				<h2 className="text-2xl font-bold tracking-tight">Documentos</h2>
				<p className="text-muted-foreground">
					Crie, gerencie e visualize os documentos
				</p>
			</div>
			<div className="flex items-center justify-end w-full lg:w-1/2 space-x-2">
				<div className="w-full lg:max-w-md relative">
					<Input
						placeholder="Buscar documentos"
						value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("title")?.setFilterValue(event.target.value)
						}
						className="w-full pl-4 pr-10"
					/>
					<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
					        aria-hidden="true"/>
				</div>
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
			</div>
		</div>
	);
};
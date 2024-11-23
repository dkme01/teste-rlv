"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "./data/data"
import { Document } from "./data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { FileText } from "@/app/assets";
import { ptBR } from "date-fns/locale/pt-BR";

export const columns: ColumnDef<Document>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="size-full flex items-center justify-center space-x-2 space-y-2">
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
					className="translate-y-[2px] border-neutral-500"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="size-full flex items-center justify-center space-x-2">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
					className="translate-y-[2px] border-neutral-500"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nome do documento" />
		),
		cell: ({ row, table }) => (
			<div className="w-full flex items-center justify-center gap-x-2">
				<FileText size="32" color="#079942" />
				<div className="w-full flex items-start justify-center flex-col">
					<div className="text-xs text-[#6B7280]">{row.original.id}</div>
					<div>{row.getValue("title")}</div>
				</div>
			</div>
		),
		footer: ({ table }) => (
			<div className="flex flex-col items-start justify-center text-neutral-950">
				<div className="text-xs text-[#6B7280]">Total</div>
				{`${table.getFilteredRowModel().rows.reduce((total, row) => total + 1, 0)} documentos`}
			</div>
		),
		enableSorting: true,
		enableHiding:
			false,
	},
	{
		accessorKey: "issuer",
		header:
			({ column }) => (
				<DataTableColumnHeader column={column} title="Emitente" />
			),
		cell:
			({ row }) => {
				return (
					<div className="flex space-x-2">
						<span className="w-full ">
							{row.getValue("issuer")}
						</span>
					</div>
				)
			},
		/* footer: ({ table }) => {
			const values = table.().flatRows.map(row => row.getValue('issuers')) as string[];
			return (
				<div className="flex flex-col items-start justify-center text-neutral-950">
					<div className="text-xs text-[#6B7280]">nº de emitentes</div>
					{`${new Set(values).size} emitentes`}
				</div>
			)
		}, */
	},
	{
		accessorKey: "taxTotal",
		header:
			({ column }) => (
				<DataTableColumnHeader column={column} title="Valor total dos tributos" />
			),
		cell:
			({ row }) => {
				return (
					<div className="flex w-full max-w-[100px] items-center">
						<span>
							{Number(row.getValue("taxTotal")).toLocaleString("pt-br", {
								style: "currency",
								currency: "BRL",
							})}
						</span>
					</div>
				)
			},
		filterFn:
			(row, id, value) => {
				return value.includes(row.getValue(id))
			},
	},
	{
		accessorKey: "total",
		header:
			({ column }) => (
				<DataTableColumnHeader column={column} title="Valor líquido" />
			),
		cell:
			({ row }) => {
				return (
					<div className="flex w-full max-w-[100px] items-center">
						<span>
							{Number(row.getValue("total")).toLocaleString("pt-br", {
								style: "currency",
								currency: "BRL",
							})}
						</span>
					</div>
				)
			},
		filterFn:
			(row, id, value) => {
				return value.includes(row.getValue(id))
			},
	},
	{
		accessorKey: "created",
		header:
			({ column }) => (
				<DataTableColumnHeader column={column} title="Data de criação" />
			),
		cell:
			({ row }) => {
				return (
					<div className="flex w-full max-w-[100px] items-center">
						{format(parseISO(row.getValue("created")), "dd 'de' MMMM yyyy", { locale: ptBR })}
					</div>
				)
			},
		filterFn:
			(row, id, value) => {
				return value.includes(row.getValue(id))
			},
	},
	{
		accessorKey: "updated",
		header:
			({ column }) => (
				<DataTableColumnHeader column={column} title="Última atualização" />
			),
		cell:
			({ row }) => {
				return (
					<div className="flex w-full max-w-[100px] items-center">
						{format(parseISO(row.getValue("updated")), "dd 'de' MMMM yyyy", { locale: ptBR })}
					</div>
				)
			},
		filterFn:
			(row, id, value) => {
				return value.includes(row.getValue(id))
			},
	},
	{
		id: "actions",
		cell:
			({ row }) => <DataTableRowActions row={row} />,
	}
	,
]

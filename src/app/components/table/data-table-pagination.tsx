import {Table} from "@tanstack/react-table"
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
	table: Table<TData>
}

export function DataTablePagination<TData>({
	                                           table,
                                           }: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between px-2">
			<div className="hidden lg:block flex-1 text-sm text-muted-foreground">
				{table.getFilteredRowModel().rows.length > 0
					? `${table.getFilteredSelectedRowModel().rows.length} de
				${table.getFilteredRowModel().rows.length} linha(s) selecionada.`
					: ""
				}
			</div>
			<div className="flex w-full lg:w-max items-center space-x-6 lg:space-x-8">
				<div className="items-center w-full space-x-2 hidden lg:flex">
					<p className="text-sm font-medium">Items por página</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize}/>
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="hidden lg:flex w-[100px] items-center justify-center text-sm font-medium">
					{table.getState().pagination.pageIndex + 1} de{" "}
					{table.getPageCount()}
				</div>
				<div className="flex w-full items-center space-x-2">
					<Button
						variant="outline"
						className="w-full"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="">Anterior</span>
					</Button>
					<Button
						variant="outline"
						className="w-full"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="">Próximo</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
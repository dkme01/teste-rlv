import * as React from "react";

import {promises as fs} from "fs"
import path from "path"
import {z} from "zod"

import {columns} from "../components/table/columns"
import {DataTable} from "../components/table/data-table"
import {documentSchema} from "../components/table/data/schema"
import {Separator} from "@/components/ui/separator";

async function getTasks() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/app/components/table/data/documents.json")
	)
	
	const documents = JSON.parse(data.toString())
	
	return z.array(documentSchema).parse(documents)
}

export default async function Documents() {
	const tasks = await getTasks()
	
	return (
		<DataTable data={tasks} columns={columns}/>
	)
}

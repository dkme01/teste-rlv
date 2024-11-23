import fs from "fs"
import path from "path"
import {faker} from "@faker-js/faker"

const documents = Array.from({length: 100}, () => ({
	id: `INV-${faker.number.int({min: 1000, max: 9999})}`,
	title: faker.commerce.productName(),
	issuer: faker.company.name(),
	taxTotal: parseFloat(faker.finance.amount({min: 10, max: 200, dec: 2})),
	total: parseFloat(faker.finance.amount({min: 100, max: 5000, dec: 2})),
	created: faker.date.recent({days: 30}).toISOString(),
	updated: faker.date.recent({days: 30}).toISOString(),
}))

fs.writeFileSync(
	path.join(__dirname, "documents.json"),
	JSON.stringify(documents, null, 2)
)

console.log("✅ Tasks data generated.")
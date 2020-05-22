import InvoiceItem from "./InvoiceItem";

class Invoice {
	public id?: number;
	public title: string;
	public description: string;
	public paid: boolean;
	public creditCardId?: number;
	public month: number;
	public year: number;
	public invoiceItems: Array<InvoiceItem>;

	static schema: Realm.ObjectSchema = {
		name: 'invoice',
		primaryKey: 'id',
		properties: {
			id: { type: 'int', indexed: true },
			title: 'string',
			description: 'string',
			paid: 'bool',
			creditCardId: 'int',
			month: 'int',
			year: 'int'
		}
	};

	static fromRealmObject(object: Realm.Object): Invoice {
		const invoice = new Invoice();
		invoice.id = object['id'];
		invoice.title = object['title'];
		invoice.description = object['description'];
		invoice.paid = object['paind'];
		invoice.creditCardId = object['creditCardId'];
		invoice.month = object['month'];
		invoice.year = object['year'];
		return invoice;
	}
}

export default Invoice;

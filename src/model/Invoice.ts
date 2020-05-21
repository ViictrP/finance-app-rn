import InvoiceItem from "./InvoiceItem";

class Invoice {
	public id?: number;
	public title: string;
	public description: string;
	public paid: boolean;
	public cardId?: number;
	public month: string;
	public year: number;
	public invoiceItems: Array<InvoiceItem>;

	static schema: Realm.ObjectSchema = {
		name: 'invoiceItem',
		primaryKey: 'id',
		properties: {
			id: { type: 'int', indexed: true },
			title: 'string',
			description: 'string',
			paid: 'boolean',
			cardId: 'int',
			month: 'string',
			year: 'string'
		}
	};
}

export default Invoice;

class InvoiceItem {
	public id?: number;
	public title: string;
	public description: string;
	public when: Date;
	public value: number;
	public parcelAmount: number;
	public categoryId?: number;
	public parcelId?: number;
	public invoiceId?: number;
	public parcelNumber: number;

	static schema: Realm.ObjectSchema = {
		name: 'invoiceItem',
		primaryKey: 'id',
		properties: {
			id: { type: 'int', indexed: true },
			title: 'string',
			description: 'string',
			when: 'date',
			value: { type: 'int', default: 0 },
			parcelAmount: { type: 'int', default: 1 },
			categoryId: 'int',
			parcelId: 'int',
			invoiceId: 'int',
			parcelNumber: 'int'
		}
	};
}

export default InvoiceItem;

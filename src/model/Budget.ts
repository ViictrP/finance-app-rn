import Invoice from "./Invoice";
import InvoiceItem from "./InvoiceItem";

export default class Budget {

	public id?: number;
	public month: number;
	public year: number;
	public total: number;
	public free: number;
	public invoces: Invoice[];
	public transactions: InvoiceItem[];
	walletId: number;

	static schema = {
		name: 'budget',
		primaryKey: 'id',
		properties: {
			id: {type: 'int', indexed: true},
			month: 'int',
			year: 'int',
			total: 'double',
			free: 'double',
			walletId: 'int'
		}
	};

	addTransaction(transaction: InvoiceItem) {
		transaction.budgetId = this.id;
		transaction.walletId = this.walletId;
		this.transactions.push(transaction);
	}

	static fromRealmObject(object: Realm.Object): Budget {
		const budget = new Budget();
		budget.id = object['id'];
		budget.month = object['month'];
		budget.year = object['year'];
		budget.total = object['total'];
		budget.free = object['free'];
		budget.walletId = object['walletId'];
		return budget;
	}
}

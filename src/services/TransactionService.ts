import InvoiceItem from "../model/InvoiceItem";
import getRealm from "./Realm";
import Constants from "../../constants/Constants";

const UpdateMode = Realm.UpdateMode;
const SCHEMA = InvoiceItem.schema.name;

class TransactionService {

	public save(transaction: InvoiceItem) {
		const realm = getRealm();
		const id = realm.objects(SCHEMA).max(Constants.ID);
		transaction.id = id ? Number(id) + 1 : Constants.ONE;
		realm.write(() => realm.create(SCHEMA, transaction, UpdateMode.Modified));
	}

	findByInvoice(id: number): InvoiceItem[] {
		const realm = getRealm();
		return realm.objects(SCHEMA)
			.filtered(`invoiceId == ${id}`)
			.map(InvoiceItem.fromRealmObject);
	}

	findTransactions(filter: string): InvoiceItem[] {
		const titleQuery = `title CONTAINS[c] "${filter}"`;
		const descriptionQuery = `OR description CONTAINS[c] "${filter}"`;
		const realm = getRealm();
		return realm.objects(SCHEMA)
			.filtered(`${titleQuery} ${descriptionQuery}`)
			.map(InvoiceItem.fromRealmObject);
	}
}

export default new TransactionService();

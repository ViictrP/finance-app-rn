import InvoiceItem from "../model/InvoiceItem";
import getRealm from "./Realm";

type Transactions = Array<InvoiceItem>;
const SCHEMA = InvoiceItem.schema.name;

class InvoiceItemService {

	public findByInvoice(invoiceId: number): Transactions {
		const realm = getRealm();
		return realm.objects(SCHEMA).filtered("invoiceId == $0", invoiceId)
			.map(InvoiceItem.fromRealmObject);
	}
}

export default new InvoiceItemService();

import Invoice from "../model/Invoice";
import getRealm from "./Realm";
import Constants from "../../constants/Constants";

const UpdateMode = Realm.UpdateMode;
const SCHEMA = Invoice.schema.name;

class InvoiceService {

	public findByCreditCardMonthAndYear(creditCardId: number, month: number, year: number, limit?: number): Invoice {
		const realm = getRealm();
		let query = 'creditCardId == $0 AND month == $1 AND year == $2';
		if (limit) query += ` LIMIT(${limit})`;
		return realm.objects(SCHEMA).filtered(query, creditCardId, month, year)
			.map(Invoice.fromRealmObject)[0];
	}

	save(invoice: Invoice) {
		const realm = getRealm();
		const id = realm.objects(SCHEMA).max(Constants.ID);
		invoice.id = id ? Number(id) + 1 : Constants.ONE;
		realm.write(() => realm.create(SCHEMA, invoice, UpdateMode.Modified));
	}
}

export default new InvoiceService();

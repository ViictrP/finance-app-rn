import CreditCard from "../model/CreditCard";
import cardService from '../services/CardService';
import invoiceItemService from '../services/InvoiceItemService';
import invoiceService from '../services/InvoiceService';
import InvoiceItem from "../model/InvoiceItem";
import Invoice from "../model/Invoice";
import moment from 'moment';

type Transactions = Array<InvoiceItem>;

class CreditCardDomain {

	public save(card: CreditCard) {
		const saved = cardService.save(card);
		this.generateInvoice(saved);
	}

	private generateInvoice(creditCard: CreditCard) {
		const today = new Date();
		const month = moment(today).get('month');
		const year = moment(today).get('year');
		const invoice = new Invoice();
		invoice.creditCardId = creditCard.id;
		invoice.description = `Fatura do mês ${month} de ${year}`;
		invoice.month = month;
		invoice.year = year;
		invoice.paid = false;
		invoice.title = invoice.description;
		invoiceService.save(invoice);
	}

	public findByUser(userId: number): Array<CreditCard> {
		return cardService.findByUser(userId);
	}

	public getTransactions(creditCardId: number, month: number, year: number, quantity?: number): Transactions {
		const invoice = invoiceService.findByCreditCardMonthAndYear(creditCardId, month, year, quantity);
		if (invoice) {
			return invoiceItemService.findByInvoice(invoice.id);
		}
		return [];
	}
}

export default new CreditCardDomain();

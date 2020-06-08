import CreditCard from "../model/CreditCard";
import cardService from '../services/CardService';
import invoiceItemService from '../services/InvoiceItemService';
import invoiceService from '../services/InvoiceService';
import transactionService from '../services/TransactionService';
import InvoiceItem from "../model/InvoiceItem";
import Invoice from "../model/Invoice";
import moment from 'moment';
import Constants from "../../constants/Constants";
import {DECEMBER, JANUARY, MONTHS} from "../../components/utils/calendar/CalendarMonth";
import console from 'reactotron-react-native';

type Transactions = Array<InvoiceItem>;

class CreditCardDomain {

	public save(card: CreditCard) {
		const saved = cardService.save(card);
		this.generateInvoice(saved);
	}

	private generateInvoice(creditCard: CreditCard, date?: Date): Invoice {
		const today = date ? date : new Date();
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
		return invoice;
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

	public saveTransaction(creditCardID: number, transaction: InvoiceItem) {
		console.log(transaction);
		const month = moment(transaction.when).get('month');
		const year = moment(transaction.when).get('year');
		if (transaction.parcelAmount > Constants.ONE) {
			this.saveParcelTransaction(transaction, creditCardID, month, year);
		} else {
			this.saveInvoiceItem(transaction, creditCardID, month, year);
		}
	}

	private saveParcelTransaction(transaction: InvoiceItem, creditCardID: number, month: number, year: number) {
		const value = transaction.value / transaction.parcelAmount;
		let isDecember = false;
		for (let i = 0; i < transaction.parcelNumber; i++) {
			console.log(i);
			year = isDecember ? year + 1 : year;
			isDecember = false;
			month = i > 0 ? month + 1 : month;
			isDecember = DECEMBER === MONTHS[month];
			const parcel = new InvoiceItem(
				null,
				transaction.title,
				transaction.description,
				transaction.when,
				value,
				transaction.icon
			);
			parcel.parcelId = i;
			parcel.parcelNumber = i;
			parcel.parcelAmount = transaction.parcelAmount;
			this.saveInvoiceItem(parcel, creditCardID, month, year);
		}
	}

	private saveInvoiceItem(transaction: InvoiceItem, creditCardID: number, month: number, year: number) {
		let invoice = invoiceService.findByCreditCardMonthAndYear(creditCardID, month, year);
		const card = cardService.findById(creditCardID);
		const day = moment(transaction.when).get('day');
		if (!invoice) {
			if (day > card.closeDay) {
				let date = moment(new Date()).add(1, 'month').toDate();
				if (JANUARY === MONTHS[moment(date).get('month')]) {
					date = moment(date).add(1, 'year').toDate();
				}
				invoice = this.generateInvoice(card, date);
			} else {
				invoice = this.generateInvoice(card);
			}
		} else {
			if (day > card.closeDay) {
				let date = moment(new Date()).add(1, 'month').toDate();
				if (JANUARY === MONTHS[moment(date).get('month')]) {
					date = moment(date).add(1, 'year').toDate();
				}
				invoice = this.generateInvoice(card, date);
			}
		}
		console.log(invoice);
		invoice.addTransaction(transaction);
		transactionService.save(transaction);
	}
}

export default new CreditCardDomain();

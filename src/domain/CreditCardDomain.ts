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
		const month = moment(today).month() + Constants.ONE;
		const year = moment(today).year();
		console.log(`Gerando nova fatura para a data ${month}/${year}`);
		const invoice = new Invoice();
		invoice.creditCardId = creditCard.id;
		invoice.description = `Fatura do mês ${MONTHS[month - 1].internacional.ptBr} de ${year}`;
		invoice.month = month;
		invoice.year = year;
		invoice.paid = false;
		invoice.title = invoice.description;
		invoiceService.save(invoice);
		console.log(`Fatura gerada. ${JSON.stringify(invoice)}`);
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
		transaction.categoryId = 1;
		transaction.parcelAmount = Number(transaction.parcelAmount);
		transaction.parcelId = 1;
		transaction.parcelNumber = 1;
		console.log(transaction);
		const month = moment(transaction.when).month() + Constants.ONE;
		const year = moment(transaction.when).year();
		console.log(`${month}/${year}`);
		if (transaction.parcelAmount > Constants.ONE) {
			console.log('Iniciando registro de transação parcelada');
			this.saveParcelTransaction(transaction, creditCardID, month, year);
		} else {
			console.log('Iniciando registro de transação à vista');
			this.saveInvoiceItem(transaction, creditCardID, month, year);
		}
	}

	private saveParcelTransaction(transaction: InvoiceItem, creditCardID: number, month: number, year: number) {
		const value = transaction.value / transaction.parcelAmount;
		let isNewYear = false;
		for (let i = 1; i <= transaction.parcelAmount; i++) {
			console.log(`Gerando parcela de número ${i}`);
			isNewYear = false;
			month = i > 1 ? MONTHS[month - 1].next : month;
			console.log(`Verificando ano novo ${month} 12=${MONTHS[month - 1].previous}:${DECEMBER.calendarIndex === MONTHS[month - 1].previous}`);
			if (DECEMBER.calendarIndex === MONTHS[month - 1].previous) year += 1;
			const parcel = new InvoiceItem(
				null,
				transaction.title,
				transaction.description + ` (${i}/${transaction.parcelAmount})`,
				transaction.when,
				value,
				transaction.icon
			);
			parcel.parcelId = i;
			parcel.parcelNumber = i;
			parcel.parcelAmount = transaction.parcelAmount;
			parcel.categoryId = 1;
			this.saveInvoiceItem(parcel, creditCardID, month, year);
		}
	}

	private saveInvoiceItem(transaction: InvoiceItem, creditCardID: number, month: number, year: number) {
		const card = cardService.findById(creditCardID);
		const day = moment(transaction.when).date();
		let nextMonth = month;
		let nextYear = year;
		if (day > card.closeDay) {
			console.log(`Transação realizada com fatura aberta. Dia ${day}, Mês ${nextMonth}`);
			nextMonth = MONTHS[month - 1].next;
			if (DECEMBER.calendarIndex === month) {
				nextYear += 1;
			}
		}
		console.log(`Buscando fatura do cartão ${creditCardID} do mês ${nextMonth}/${nextYear}`);
		let invoice = invoiceService.findByCreditCardMonthAndYear(creditCardID, nextMonth, nextYear);
		if (!invoice) {
			const date = moment(`${nextYear}-${nextMonth}-02`, 'YYYY-MM-DD').toDate();
			console.log(`Fatura não encontrada, gerando nova. Data: ${date}`);
			invoice = this.generateInvoice(card, date);
		}
		console.log(`Adicionando transação na fatura`);
		invoice.addTransaction(transaction);
		console.log('Registrando transação');
		transactionService.save(transaction);
	}
}

export default new CreditCardDomain();

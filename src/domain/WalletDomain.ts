import cardDomain from "./CreditCardDomain";
import Invoice from "../model/Invoice";
import InvoiceItem from "../model/InvoiceItem";
import transactionService from "../services/InvoiceItemService";
import Wallet from "../model/Wallet";
import service from "../services/WalletService";

class WalletDomain {

	create(wallet: Wallet): Wallet {
		return service.save(wallet);
	}

	getInvoices(month: number, year: number): Invoice[] {
		return cardDomain.getAllCreditCards()
			.map(creditCard => creditCard.id)
			.map(creditCardId => cardDomain.getInvoice(creditCardId, month, year));
	}

	getTransactions(budgetId: number): InvoiceItem[] {
		return transactionService.findByBudget(budgetId);
	}
}

export default new WalletDomain();

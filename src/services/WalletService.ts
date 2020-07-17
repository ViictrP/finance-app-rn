import Wallet from "../model/Wallet";
import Budget from "../model/Budget";
import getRealm from "./Realm";
import Constants from "../../constants/Constants";
import {UpdateMode} from "realm";
import WalletIsRequiredError from "../errors/WalletIsRequiredError";

const WALLET_SCHEMA = Wallet.schema.name;
const BUDGET_SCHEMA = Budget.schema.name;

class WalletService {

	save(wallet: Wallet): Wallet {
		const realm = getRealm();
		const id = realm.objects(WALLET_SCHEMA).max(Constants.ID);
		wallet.id = id ? Number(id) + 1 : Constants.ONE;
		realm.write(() => realm.create(WALLET_SCHEMA, wallet, UpdateMode.Modified));
		return wallet;
	}

	saveBudget(budget: Budget): Budget {
		this.validateBudget(budget);
		const realm = getRealm();
		const id = realm.objects(BUDGET_SCHEMA).max(Constants.ID);
		budget.id = id ? Number(id) + 1 : Constants.ONE;
		realm.write(() => realm.create(BUDGET_SCHEMA, budget, UpdateMode.Modified));
		return budget;
	}

	getWallet(): Wallet {
		const realm = getRealm();
		const result = realm.objectForPrimaryKey<Wallet>(WALLET_SCHEMA, 1);
		return Wallet.fromRealmObject(result);
	}

	getBudget(month: number, year: number): Budget {
		const realm = getRealm();
		return realm.objects<Budget>(BUDGET_SCHEMA)
			.filtered('walletId == 1 AND month == $0 AND year == $1', month, year)
			.map(Budget.fromRealmObject)[0];
	}

	private validateBudget(budget: Budget) {
		if (budget && !budget.walletId)
			throw new WalletIsRequiredError();
	}
}

export default new WalletService();

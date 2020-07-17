import Budget from "./Budget";

export default class Wallet {

	public id?: number;
	public budgets: Budget[];

	static schema = {
		name: 'wallet',
		primaryKey: 'id',
		properties: {
			id: { type: 'int', indexed: true }
		}
	};

	constructor(id?: number) {
		this.id = id;
	}

	static fromRealmObject(realmObject: Realm.Object) {
		return new Wallet(realmObject['id']);
	}
}

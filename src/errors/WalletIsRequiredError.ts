export default class WalletIsRequiredError extends Error {

	constructor() {
		super('The wallet ID is required.');
	}
}

interface IGlobalState {
	action: 'openTransactions' | 'closeTransactions' | 'openCardForm' | 'closeCardForm' | 'openTransactionsForm' | 'closeTransactionsForm' | 'openWallet' | 'closeWallet'
}

export default IGlobalState;

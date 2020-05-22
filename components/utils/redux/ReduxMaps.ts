import IGlobalState from "../IGlobalState";

export function mapStateToProps(state: IGlobalState): object {
	return {action: state.action};
}

export function dispatchToPropsClose(dispatch) {
	return {
		closeTransactions: () => dispatch({type: 'CLOSE_TRANSACTIONS'}),
		closeCardForm: () => dispatch({type: 'CLOSE_CARD_FORM'}),
		closeTransactionsForm: () => dispatch({type: 'CLOSE_TRANSACTIONS_FORM'})
	}
}

export function dispatchToPropsOpen(dispatch) {
	return {
		openTransactions: () => dispatch({type: 'OPEN_TRANSACTIONS'}),
		openTransactionsForm: () => dispatch({type: 'OPEN_TRANSACTIONS_FORM'}),
		openCardForm: () => dispatch({type: 'OPEN_CARD_FORM'})
	}
}

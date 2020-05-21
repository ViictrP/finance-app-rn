import IGlobalState from "../IGlobalState";

export function mapStateToProps(state: IGlobalState): object {
	return {action: state.action};
}

export function dispatchToPropsClose(dispatch) {
	return {
		closeTransactions: () => dispatch({type: 'CLOSE_TRANSACTIONS'}),
		closeCardForm: () => dispatch({type: 'CLOSE_CARD_FORM'})
	}
}

export function dispatchToPropsOpen(dispatch) {
	return {
		openTransactions: () => dispatch({type: 'OPEN_TRANSACTIONS'}),
		openCardForm: () => dispatch({type: 'OPEN_CARD_FORM'})
	}
}

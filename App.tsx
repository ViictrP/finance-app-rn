import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View, Text} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import IGlobalState from './components/utils/IGlobalState';
import IReduxAction from './components/utils/redux/IReduxAction';

const initialState: IGlobalState = {
	action: 'closeTransactions'
};

const reducer = (state: IGlobalState = initialState, action: IReduxAction): IGlobalState => {
	switch (action.type) {
		case 'OPEN_TRANSACTIONS':
			return {action: 'openTransactions'};
		case 'CLOSE_TRANSACTIONS':
			return {action: 'closeTransactions'};
		case 'OPEN_CARD_FORM':
			return {action: 'openCardForm'};
		case 'CLOSE_CARD_FORM':
			return {action: 'closeCardForm'};
		default:
			return state;
	}
};

const store = createStore(reducer);

export default function App(props) {

	const [isLoadingComplete, setLoadingComplete] = useState(false);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					{Platform.OS === 'ios' && <StatusBar barStyle="dark-content"/>}
					<AppNavigator/>
				</View>
			</Provider>
		);
	} else {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					{Platform.OS === 'ios' && <StatusBar barStyle="dark-content"/>}
					<AppNavigator/>
				</View>
			</Provider>
		);
	}
}

async function loadResourcesAsync() {
	await Promise.all([
		// Asset.loadAsync([
		// 	require('./assets/images/robot-dev.png'),
		// 	require('./assets/images/robot-prod.png'),
		// ]),
		// Font.loadAsync({
		// 	// This is the font that we are using for our tab bar
		// 	...Ionicons.font,
		// 	// We include SpaceMono because we use it in HomeScreen.js. Feel free to
		// 	// remove this if you are not using it in your app
		// 	'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
		// 	'product-sans': require('./assets/fonts/ProductSans-Regular.ttf'),
		// 	'product-sans-italic': require('./assets/fonts/ProductSans-Italic.ttf'),
		// 	'product-sans-bold': require('./assets/fonts/ProductSans-Bold.ttf'),
		// 	'product-sans-bold-italic': require('./assets/fonts/ProductSans-BoldItalic.ttf')
		// }),
	]);
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

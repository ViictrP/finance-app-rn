import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import WalletScreen from '../screens/wallet/WalletScreen';
import LinksScreen from '../screens/links/LinksScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import CardsScreen from '../screens/cards/CardsScreen';
import {CreateNavigatorConfig} from "react-navigation";
import SearchTransactionScreen from "../screens/search-transactions/SearchTransactionsScreen";

const stackConfing: CreateNavigatorConfig<any, any, any, any> = {headerMode: 'none'};

const config = Platform.select({
	web: {headerMode: 'screen'},
	default: stackConfing,
});

const WalletStack = createStackNavigator(
	{
		Wallet: WalletScreen,
		SearchTransactions: SearchTransactionScreen
	},
	config
);

WalletStack.navigationOptions = {
	tabBarLabel: 'Carteira',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name="wallet"
		/>
	),
};

WalletStack.path = '';

const isTabBarVisible = (navState) => {
	if (!navState) {
		return true;
	}
	return navState.routes[navState.index].params ? navState.routes[navState.index].params.tabBarVisible : true;
};

const CardsStack = createStackNavigator(
	{
		Cartoes: CardsScreen,
	},
	config
);

CardsStack.navigationOptions = ({navigation}) => ({
	tabBarLabel: 'Cartões',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name="credit-card"
		/>
	),
	tabBarVisible: isTabBarVisible(navigation.state)
});

CardsStack.path = '';

const LinksStack = createStackNavigator(
	{
		Links: LinksScreen,
	},
	config
);

LinksStack.navigationOptions = {
	tabBarLabel: 'Links',
	tabBarIcon: ({focused}) => (
		<TabBarIcon focused={focused} name="home"/>
	),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	config
);

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ({focused}) => (
		<TabBarIcon focused={focused} name="home"/>
	),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
	WalletStack,
	CardsStack,
	LinksStack,
	SettingsStack,
});

export default tabNavigator;

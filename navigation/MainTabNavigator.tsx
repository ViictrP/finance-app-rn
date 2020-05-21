import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/home/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CardsScreen from '../screens/cards/CardsScreen';
import {CreateNavigatorConfig} from "react-navigation";

const stackConfing: CreateNavigatorConfig<any, any, any, any> = {headerMode: 'none'};

const config = Platform.select({
	web: {headerMode: 'screen'},
	default: stackConfing,
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	),
};

HomeStack.path = '';

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
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
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
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}/>
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
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
	),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
	CardsStack,
	HomeStack,
	LinksStack,
	SettingsStack,
});

export default tabNavigator;

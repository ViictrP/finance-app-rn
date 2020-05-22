import React, {useEffect, useState} from "react";

import styled from 'styled-components';
import {Animated, Button, Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ProductSansBoldText, ProductSansText} from "./StyledText";
import {connect} from 'react-redux';
import {dispatchToPropsClose, mapStateToProps} from './utils/redux/ReduxMaps';
import Colors from "../constants/Colors";
import TransactionItem from "./TransactionItem";
import Layout from "../constants/Layout";
import Separator from "./Separator";
import {Form} from "@unform/mobile";
import Input from "./Input";
import CreditCard from "./CreditCard";

const screenHeight = Dimensions.get('window').height;

function Transactions(props) {
	const [state, setState] = useState({
		top: new Animated.Value(screenHeight)
	});
	const [transactions, setTransactions] = useState([]);

	useEffect(toggleTransactionScreen, [props.action]);

	useEffect(() => {
		setTransactions([
			{
				id: 1,
				title: 'Appointments',
				subtitle: 'Appointments',
				value: 100,
				icon: 'shopping-cart'
			},
			{
				id: 2,
				title: 'Trips',
				subtitle: 'Trips',
				value: 135,
				icon: 'shopping-cart'
			},
			{
				id: 3,
				title: 'Mettings',
				subtitle: 'Mettings',
				value: 169.90,
				icon: 'shopping-cart'
			},
			{
				id: 4,
				title: 'Vacations',
				subtitle: 'Vacations',
				value: 209.05,
				icon: 'shopping-cart'
			},
			{
				id: 5,
				title: 'Calls',
				subtitle: 'Calls',
				value: 685.09,
				icon: 'shopping-cart'
			},
			{
				id: 6,
				title: 'Avoids',
				subtitle: 'Avoids',
				value: 98.09,
				icon: 'shopping-cart'
			}
		]);
	}, []);

	function toggleTransactionScreen() {
		if (props.action === 'openTransactions') {
			Animated.spring(state.top, {
				useNativeDriver: false,
				toValue: 54,
				bounciness: 6
			}).start();
		}

		if (props.action === 'closeTransactions') {
			Animated.timing(state.top, {
				useNativeDriver: false,
				toValue: screenHeight,
				duration: 300,
			}).start(props.onClose);
		}
	}

	return (
		<Animated.ScrollView style={{
			top: state.top,
			position: 'absolute',
			backgroundColor: Colors.MODAL_BACKGROUND,
			width: '100%',
			height: '100%',
			zIndex: 100,
			borderRadius: 20,
			overflow: 'hidden'
		}}>
			<Separator style={{height: 90}} />
			<TouchableOpacity
				onPress={props.closeTransactions}
				style={{position: 'absolute', top: 30, right: 30, marginLeft: -22, zIndex: 1}}>
				<CloseView>
					<Icon name='x' size={28} color="#546bfb"/>
				</CloseView>
			</TouchableOpacity>
			<Header>
				<ProductSansBoldText style={{fontSize: 30, color: Colors.TEXT_PRIMARY}}>
					Transações
				</ProductSansBoldText>
				<ProductSansText style={{fontSize: 18, color: Colors.FADDED_TEXT, marginTop: 8, textAlign: 'left'}}>
					Lista de transações no mês do cartão de crédito.
				</ProductSansText>
			</Header>
			<Content>
				<Button title="press" onPress={() => setTransactions([])} />
				<CreditCard style={{width: '100%', height: 180}}
				            shadow={true}
				            flag="Mastercard"
				            limit="12.500,00"
				            title="Itaucard Visa Gold"
				            number="1542" />
	            <Separator style={{height: 40}} />
				<FlatList
					data={transactions}
					keyExtractor={item => item.id.toString()}
					renderItem={({item}) =>
						<TransactionItem
							title={item.title}
							subtitle={item.subtitle}
							icon={item.icon}
							value={item.value}
						/>
					}
				/>
			</Content>
		</Animated.ScrollView>
	);
}

export default connect(mapStateToProps, dispatchToPropsClose)(Transactions);

const Header = styled.View`
	height: 110px;
	padding: 0 ${Layout.LAYOUT_SIDE_PADDINGS}px;
`;

const CloseView = styled.View`
	width: 44px;
	height: 44px;
	border-radius: 22px;
	background-color: white;
	justify-content: center;
 	align-items: center;
`;

const Content = styled.View`
	background-color: ${Colors.APP_BACKGROUND};
	padding: 0 ${Layout.LAYOUT_SIDE_PADDINGS}px;
`;

const Image = styled.Image`
	position: absolute;
	width: 100%;
	height: 100%;
`;

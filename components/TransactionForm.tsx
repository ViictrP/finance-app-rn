import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import {dispatchToPropsClose, mapStateToProps} from './utils/redux/ReduxMaps';

import styled from 'styled-components';
import {Animated, Button, Dimensions, Easing, StyleSheet, TouchableOpacity, View} from "react-native";
import {Form} from '@unform/mobile';
import {ProductSansBoldText, ProductSansText} from './StyledText';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import Input from './Input';
import Separator from './Separator';
import Layout from '../constants/Layout';
import creditCardDomain from '../src/domain/CreditCardDomain';
import CreditCardComponent from './CreditCard';
import * as Yup from 'yup';
import console from 'reactotron-react-native';
import DatePicker from "./DatePicker";
import InvoiceItem from "../src/model/InvoiceItem";

Yup.setLocale({
	mixed: {
		default: 'Não é válido.',
		required: 'Este campo é obrigatório',
		notType: 'Este campo é obrigatório'
	},
	number: {
		min: 'Deve ser maior ou igual a ${min}',
		max: 'Deve ser menor ou igual a ${max}'
	},
	string: {
		requiredField: 'Este campo é obrigatório'
	}
});

const screenHeight = Dimensions.get('window').height;

function TransactionForm(props) {
	const formRef = useRef(null);
	const [creditCard, setCreditCard] = useState(null);
	const [state, setState] = useState({
		top: new Animated.Value(screenHeight)
	});
	const [hasError, setHasError] = useState(true);

	useEffect(toggleCardFormScreen, [props.action]);

	useEffect(loadCreditCardInfos, [creditCard]);

	function loadCreditCardInfos() {
		console.log(creditCard);
	}

	function toggleCardFormScreen() {
		if (props.action === 'openTransactionsForm') {
			setCreditCard(props.creditCard);
			Animated.spring(state.top, {
				useNativeDriver: false,
				toValue: 54,
				bounciness: 3
			}).start();
		}

		if (props.action === 'closeTransactionsForm') {
			setCreditCard(null);
			Animated.timing(state.top, {
				useNativeDriver: false,
				toValue: screenHeight,
				duration: 300,
				easing: Easing.inOut(Easing.linear)
			}).start(props.onClose);
			formRef.current.setErrors({});
			formRef.current.reset();
		}
	}

	async function submit(transaction: InvoiceItem, {reset}) {
		if (props.creditCard) {
			console.log('Começando cadastro de transação');
			creditCardDomain.saveTransaction(props.creditCard.id, transaction);
		}
		reset();
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
			<Separator style={{height: 90}}/>
			<Header>
				<ProductSansBoldText style={{fontSize: 30, color: Colors.TEXT_PRIMARY}}>
					Adicionar nova transação
				</ProductSansBoldText>
				<ProductSansText style={{fontSize: 18, color: Colors.FADDED_TEXT, marginTop: 8, textAlign: 'left'}}>
					Para cadastrar uma nova transação, preencha todas as informações necessárias.
				</ProductSansText>
				<ProductSansBoldText style={{fontSize: 18, color: Colors.TINT_COLOR, marginTop: 8, textAlign: 'left'}}>
					Os campos com o ícone colorido são obrigatórios.
				</ProductSansBoldText>
			</Header>
			<Separator style={{height: 35}}/>
			<TouchableOpacity
				onPress={props.closeTransactionsForm}
				style={{position: 'absolute', top: 30, right: 30, marginLeft: -22, zIndex: 1}}>
				<CloseView>
					<Icon name='x' size={28} color="#546bfb"/>
				</CloseView>
			</TouchableOpacity>
			<Content>
				<CreditCardComponent
					style={style.creditCard}
					shadow={true}
					flag="Mastercard"
					limit="12.500,00"
					title="Itaucard Visa Gold"
					number="1542"
				/>
				<Separator style={{height: 60}}/>
				<Form ref={formRef} onSubmit={submit}>
					<View style={{flex: 1, flexDirection: 'column'}}>
						<Input name="title" icon="align-left" placeholder="Titulo..." required={true} mask="" style={inputStyle}/>
						<Separator style={{height: 20}}/>
						<Input name="description" icon="align-left" placeholder="Descrição..." required={true} mask="" style={inputStyle}/>
						<Separator style={{height: 20}}/>
						<Input name="value" icon="dollar-sign" placeholder="Valor..." required={true} mask="money" style={inputStyle}/>
						<Separator style={{height: 20}}/>
						<DatePicker name="when" icon="calendar" required={true} />
						<Separator style={{height: 20}}/>
						<Input name="parcelAmount" icon="shopping-bag" placeholder="Quantidade de parcelas..." required={true} mask="only-numbers" style={inputStyle}/>
						<Separator style={{height: 30}}/>
						<Button
							title="Cadastrar"
							onPress={() => formRef.current.submitForm()}
						/>
					</View>
				</Form>
			</Content>
		</Animated.ScrollView>
	);
}

export default connect(mapStateToProps, dispatchToPropsClose)(TransactionForm);

const inputStyle = {
	container: {},
	childContainer: {},
	input: {
		fontSize: 20,
		color: Colors.TEXT_PRIMARY,
		width: '100%',
		height: '100%',
		paddingLeft: 10
	}
};

const style = StyleSheet.create({
	creditCard: {
		width: '90%',
		height: 180
	}
});

const Header = styled.View`
	height: 142px;
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
	height: ${screenHeight}px;
	background-color: ${Colors.APP_BACKGROUND};
	justify-content: center;
	align-items: center;
`;

const Image = styled.Image`
	position: absolute;
	width: 100%;
	height: 100%;
`;

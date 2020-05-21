import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import {dispatchToPropsClose, mapStateToProps} from './utils/redux/ReduxMaps';

import styled from 'styled-components';
import {Animated, Button, Dimensions, TouchableOpacity, View} from "react-native";
import {Form} from '@unform/mobile';
import {ProductSansBoldText, ProductSansText} from "./StyledText";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import Input from "./Input";
import Separator from "./Separator";
import Layout from "../constants/Layout";
import cardService from '../src/services/CardService';
import Card from "../src/model/Card";

const screenHeight = Dimensions.get('window').height;

function CreditCardForm(props) {
	const formRef = useRef(null);
	const [state, setState] = useState({
		top: new Animated.Value(20)
	});

	useEffect(() => {
		toggleCardFormScreen();
	}, [props.action]);

	function submit(card: Card, {reset}) {
		cardService.save(card).then(saved => console.log(saved));
		reset();
	}

	function toggleCardFormScreen() {
		if (props.action === 'openCardForm') {
			Animated.spring(state.top, {
				useNativeDriver: false,
				toValue: 54,
				bounciness: 6
			}).start();
		}

		if (props.action === 'closeCardForm') {
			Animated.timing(state.top, {
				useNativeDriver: false,
				toValue: screenHeight,
				duration: 300,
			}).start(props.onClose);
			formRef.current.reset();
		}
	}

	// @ts-ignore
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
			<Header>
				<ProductSansBoldText style={{fontSize: 30, color: Colors.TEXT_PRIMARY}}>
					Novo cartão de crédito
				</ProductSansBoldText>
				<ProductSansText style={{fontSize: 18, color: Colors.FADDED_TEXT, marginTop: 8, textAlign: 'left'}}>
					Para cadastrar um novo cartão, preencha todas as informações necessárias.
				</ProductSansText>
				<ProductSansBoldText style={{fontSize: 18, color: Colors.TINT_COLOR, marginTop: 8, textAlign: 'left'}}>
					Os campos com o ícone colorido são obrigatórios.
				</ProductSansBoldText>
			</Header>
			<Separator style={{height: 35}} />
			<TouchableOpacity
				onPress={props.closeCardForm}
				style={{position: 'absolute', top: 30, right: 30, marginLeft: -22, zIndex: 1}}>
				<CloseView>
					<Icon name='x' size={28} color="#546bfb"/>
				</CloseView>
			</TouchableOpacity>
			<Content>
				<Form ref={formRef} onSubmit={submit}>
					<View style={{flex: 1, flexDirection: 'column'}}>
						<Input name="description" icon="align-left" placeholder="Descrição..." required={true} type="text" />
						<Separator style={{height: 20}} />
						<Input name="closeDay" icon="calendar" placeholder="Dia de fechamento..." required={true} type="number" />
						<Separator style={{height: 20}} />
						<Input name="limit" icon="dollar-sign" placeholder="Limite..." required={true} type="number" />
						<Separator style={{height: 20}} />
						<Input name="flag" icon="credit-card" placeholder="Bandeira..." required={true} type="text" />
						<Separator style={{height: 20}} />
						<Input name="cardNumber" icon="hash" placeholder="Número..." required={true} type="number" />
						<Separator style={{height: 30}} />
						<Button title="Cadastrar" onPress={() => formRef.current.submitForm()} />
					</View>
				</Form>
			</Content>
		</Animated.ScrollView>
	);
}

export default connect(mapStateToProps, dispatchToPropsClose)(CreditCardForm);

const Header = styled.View`
	height: 142px;
	padding: 0 ${Layout.LAYOUT_SIDE_PADDINGS - 10}px;
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
`;

const Image = styled.Image`
	position: absolute;
	width: 100%;
	height: 100%;
`;

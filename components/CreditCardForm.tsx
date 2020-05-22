import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import {dispatchToPropsClose, mapStateToProps} from './utils/redux/ReduxMaps';

import styled from 'styled-components';
import {Animated, Button, Dimensions, TouchableOpacity, View, Easing} from "react-native";
import {Form} from '@unform/mobile';
import {ProductSansBoldText, ProductSansText} from "./StyledText";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import Input from "./Input";
import Separator from "./Separator";
import Layout from "../constants/Layout";
import cardService from '../src/services/CardService';
import Card from "../src/model/Card";
import * as Yup from 'yup';
import console from 'reactotron-react-native';

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

function CreditCardForm(props) {
	const formRef = useRef(null);
	const [state, setState] = useState({
		top: new Animated.Value(screenHeight)
	});
	const [hasError, setHasError] = useState(true);

	useEffect(() => {
		toggleCardFormScreen();
	}, [props.action]);

	function toggleCardFormScreen() {
		if (props.action === 'openCardForm') {
			Animated.timing(state.top, {
				useNativeDriver: false,
				toValue: 54,
				duration: 200,
				easing: Easing.inOut(Easing.linear)
			}).start();
		}

		if (props.action === 'closeCardForm') {
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

	async function submit(card: Card, {reset}) {
		try {
			// Remove all previous errors
			formRef.current.setErrors({});
			const schema = Yup.object().shape({
				description: Yup.string().required(),
				closeDay: Yup.number().min(1).max(31),
				limit: Yup.number().required(),
				flag: Yup.string().required(),
				cardNumber: Yup.string().required()
			});
			await schema.validate(card, {
				abortEarly: false,
			});
			// Validation passed
			cardService.save(card);
			alert('Cartão registrado com sucesso.');
			reset();
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			}
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
						<Input name="description" icon="align-left" placeholder="Descrição..." required={true} mask="" />
						<Separator style={{height: 20}} />
						<Input name="closeDay" icon="calendar" placeholder="Dia de fechamento..." required={true} mask="only-numbers" />
						<Separator style={{height: 20}} />
						<Input name="limit" icon="dollar-sign" placeholder="Limite..." required={true} mask="money" />
						<Separator style={{height: 20}} />
						<Input name="flag" icon="credit-card" placeholder="Bandeira..." required={true} mask="" />
						<Separator style={{height: 20}} />
						<Input name="cardNumber" icon="hash" placeholder="Número..." required={true} mask="only-numbers" />
						<Separator style={{height: 30}} />
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

export default connect(mapStateToProps, dispatchToPropsClose)(CreditCardForm);

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
`;

const Image = styled.Image`
	position: absolute;
	width: 100%;
	height: 100%;
`;

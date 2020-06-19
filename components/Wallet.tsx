import React, {useEffect, useRef, useState} from "react";

import styled from 'styled-components';
import {Animated, Button, Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ProductSansBoldText, ProductSansText} from "./StyledText";
import {connect} from 'react-redux';
import {dispatchToPropsClose, mapStateToProps} from './utils/redux/ReduxMaps';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Separator from "./Separator";
import console from 'reactotron-react-native';
import Input from "./Input";
import {Form} from "@unform/mobile";
import makeElevation from "./utils/ElevationShadowStyle";

const screenHeight = Dimensions.get('window').height;

function Wallet(props) {
	const formRef = useRef(null);
	const [hasError, setHasError] = useState(true);
	const [state, setState] = useState({
		top: new Animated.Value(screenHeight)
	});

	useEffect(toggleWalletScreen, [props.action]);

	function toggleWalletScreen() {
		console.log(props.action);
		if (props.action === 'openWallet') {
			Animated.spring(state.top, {
				useNativeDriver: false,
				toValue: 54,
				bounciness: 3
			}).start();
		}

		if (props.action === 'closeWallet') {
			Animated.timing(state.top, {
				useNativeDriver: false,
				toValue: screenHeight,
				duration: 300,
			}).start(props.onClose);
		}
	}

	function submit(obj) {
		console.log(obj);
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
				onPress={props.closeWallet}
				style={{position: 'absolute', top: 30, right: 30, marginLeft: -22, zIndex: 1}}>
				<CloseView>
					<Icon name='x' size={28} color="#546bfb"/>
				</CloseView>
			</TouchableOpacity>
			<Header>
				<ProductSansBoldText style={{fontSize: 30, color: Colors.TEXT_PRIMARY}}>
					Carteira
				</ProductSansBoldText>
				<ProductSansText style={{fontSize: 18, color: Colors.FADDED_TEXT, marginTop: 8, textAlign: 'left'}}>
					gerenciar saldo da carteira.
				</ProductSansText>
			</Header>
			<Content>
				<Form ref={formRef} onSubmit={submit}>
					<View style={{flex: 1, flexDirection: 'column'}}>
						<Input name="value" icon="" placeholder="Valor..." required={true} mask="money" style={inputStyle}/>
						<Separator style={{height: 40}} />
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

export default connect(mapStateToProps, dispatchToPropsClose)(Wallet);

const inputStyle = {
	container: {
		marginLeft: 0,
		marginRight: 0,
		maxHeigth: 100
	},
	childContainer: {
		borderWidth: 0,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: Colors.FADDED,
	},
	input: {
		fontSize: 40,
		color: Colors.TEXT_PRIMARY,
		width: '100%',
		height: '100%',
		paddingLeft: 10
	}
};

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

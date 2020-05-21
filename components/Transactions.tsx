import React, {useEffect, useState} from "react";

import styled from 'styled-components';
import {Animated, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ProductSansBoldText, ProductSansText} from "./StyledText";
import {connect} from 'react-redux';
import {dispatchToPropsClose, mapStateToProps} from './utils/redux/ReduxMaps';
import Colors from "../constants/Colors";

const screenHeight = Dimensions.get('window').height;

function Transactions(props) {
	const [state, setState] = useState({
		top: new Animated.Value(screenHeight)
	});

	useEffect(() => {
		toggleTransactionScreen();
	}, [props.action]);

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
		<Animated.View style={{
			top: state.top,
			position: 'absolute',
			backgroundColor: Colors.MODAL_BACKGROUND,
			width: '100%',
			height: '100%',
			zIndex: 100,
			borderRadius: 20,
			overflow: 'hidden'
		}}
		>
			<Cover>
				<Image source={require('../assets/images/background2.jpg')}/>
				<ProductSansBoldText style={{fontSize: 24, color: 'white'}}>
					Transações
				</ProductSansBoldText>
				<ProductSansText style={{fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 8}}>
					Lista de todas as transações do cartão
				</ProductSansText>
			</Cover>
			<TouchableOpacity
				onPress={props.closeTransactions}
				style={{position: 'absolute', top: 120, left: "50%", marginLeft: -22, zIndex: 1}}>
				<CloseView>
					<Icon name='x' size={28} color="#546bfb"/>
				</CloseView>
			</TouchableOpacity>
			<Content/>
		</Animated.View>
	);
}

export default connect(mapStateToProps, dispatchToPropsClose)(Transactions);

const Cover = styled.View`
	height: 142px;
	background-color: black;
	justify-content: center;
	align-items: center;
`;

const CloseView = styled.View`
	width: 44px;
	height: 44px;
	border-radius: 22px;
	background-color: white;
	justify-content: center;
 	align-items: center;
 	box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`;

const Content = styled.View`
	height: ${screenHeight}px;
	background-color: #f0f3f5;
`;

const Image = styled.Image`
	position: absolute;
	width: 100%;
	height: 100%;
`;

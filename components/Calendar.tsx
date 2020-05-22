import React, {useState} from "react";

import styled from 'styled-components';
import {Animated} from "react-native";
import {ProductSansText} from "./StyledText";
import Icon from "react-native-vector-icons/Feather";
import {JANUARY, MONTHS} from "./utils/calendar/CalendarMonth";
import Colors from "../constants/Colors";
import LinearGradient from "react-native-linear-gradient";

export default function Calendar(props) {
	const [month, setMonth] = useState(MONTHS[JANUARY.index]);
	const [scale, setScale] = useState(new Animated.Value(1));

	function previewsMonth() {
		setMonth(MONTHS[month.previous]);
		animateMonth();
		props.onMonthChange(month.previous);
	}

	function nextMonth() {
		setMonth(MONTHS[month.next]);
		animateMonth();
		props.onMonthChange(month.next);
	}

	function animateMonth() {
		Animated.timing(scale, {
			useNativeDriver: false,
			toValue: 1.2,
			duration: 250
		}).start(() => {
			Animated.timing(scale, {
				useNativeDriver: false,
				toValue: 1,
				duration: 200
			}).start()
		})
	}

	return (
		<Container>
			<Button onPress={() => previewsMonth()}>
				<ProductSansText style={{fontSize: 20}}>
					<Icon name="arrow-left" size={20} color={Colors.WHITE}/>
				</ProductSansText>
			</Button>
			<Animated.View style={{transform: [{scale: scale}]}}>
				<ProductSansText style={{fontSize: 25}}>{month.internacional.ptBr}</ProductSansText>
			</Animated.View>
			<Button onPress={() => nextMonth()}>
				<ProductSansText style={{fontSize: 20}}>
					<Icon name="arrow-right" size={20} color={Colors.WHITE}/>
				</ProductSansText>
			</Button>
		</Container>
	);
}

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px 30px;
`;

const Button = styled.TouchableOpacity`
	background-color: ${Colors.PRIMARY};
	padding: 10px;
	border-radius: 10px;
`;

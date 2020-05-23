import React, {useEffect, useState} from "react";

import styled from 'styled-components';
import {Animated, View} from "react-native";
import {ProductSansText} from "./StyledText";
import Icon from "react-native-vector-icons/Feather";
import {JANUARY, DECEMBER, MONTHS} from "./utils/calendar/CalendarMonth";
import Colors from "../constants/Colors";
import moment from 'moment';
import console from 'reactotron-react-native';

export default function Calendar(props) {
	const [month, setMonth] = useState(MONTHS[moment(new Date()).get('month')]);
	const [year, setYear] = useState(moment(new Date()).get('year'));
	const [scale, setScale] = useState(new Animated.Value(1));

	function previewsMonth() {
		const previousMonth = MONTHS[month.previous];
		setMonth(previousMonth);
		let previousYear = year;
		if (previousMonth.index === DECEMBER.index) {
			previousYear -= 1;
			setYear(previousYear);
		}
		animateMonth();
		props.onMonthChange(month.previous, previousYear);
	}

	function nextMonth() {
		const nextMonth = MONTHS[month.next];
		setMonth(nextMonth);
		let nextYear = year;
		if (nextMonth.index === JANUARY.index) {
			nextYear += 1;
			setYear(nextYear);
		}
		animateMonth();
		props.onMonthChange(nextMonth.index, nextYear);
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
			<View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
				<ProductSansText>{year}</ProductSansText>
				<Animated.View style={{transform: [{scale: scale}]}}>
					<ProductSansText style={{fontSize: 25}}>{month.internacional.ptBr}</ProductSansText>
				</Animated.View>
			</View>
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

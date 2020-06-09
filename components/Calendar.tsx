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
	const [month, setMonth] = useState(MONTHS[moment(new Date()).month()]);
	const [year, setYear] = useState(moment(new Date()).year());
	const [scale, setScale] = useState(new Animated.Value(1));

	function previewsMonth() {
		const previousMonth = MONTHS[month.previous - 1];
		setMonth(previousMonth);
		let previousYear = year;
		if (previousMonth.calendarIndex === DECEMBER.calendarIndex) {
			previousYear -= 1;
			setYear(previousYear);
		}
		animateMonth();
		props.onMonthChange(previousMonth.arrayIndex, previousYear);
	}

	function nextMonth() {
		const nextMonth = MONTHS[month.next - 1];
		setMonth(nextMonth);
		let nextYear = year;
		if (nextMonth.calendarIndex === JANUARY.calendarIndex) {
			nextYear += 1;
			setYear(nextYear);
		}
		animateMonth();
		props.onMonthChange(nextMonth.arrayIndex, nextYear);
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

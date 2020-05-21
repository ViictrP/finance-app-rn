import React, {useEffect, useState} from 'react';
import {Animated, FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, YellowBox} from 'react-native';
import CreditCardCarousel from '../../components/CreditCardCarousel';
import {ContentContainer, IndicatorSquare, RootView, Square} from './Style';
import {ProductSansBoldText, ProductSansText} from '../../components/StyledText';
import Layout from '../../constants/Layout';
import Card from '../../src/model/Card';
import ProgressBar from "../../components/ProgressBar";
import Separator from "../../components/Separator";
import Icon from 'react-native-vector-icons/Feather';
import Transactions from "../../components/Transactions";
import {connect} from 'react-redux';
import {dispatchToPropsOpen, mapStateToProps} from '../../components/utils/redux/ReduxMaps';
import Calendar from "../../components/Calendar";
import {MONTHS} from "../../components/utils/calendar/CalendarMonth";
import Colors from "../../constants/Colors";
import CreditCardForm from "../../components/CreditCardForm";

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested', 'Calling `getNode()`']);

function CardsScreen(props) {
	const [cards, setCards] = useState(new Array<Card>());
	const [card, setCard] = useState(new Card());
	const [percentage, setPercentage] = useState(0);
	const [scale, setScale] = useState(new Animated.Value(1));
	const [opacity, setOpacity] = useState(new Animated.Value(1));

	useEffect(() => {
		toggleScale();
	}, [props.action]);

	useEffect(() => buildCards(), []);

	function buildCards() {
		const card = generateNew();
		cards.push(card);
		setPercentage(100 - (card.availableLimit * 100) / card.limit);
	}

	function generateNew() {
		const card = new Card();
		card.limit = parseFloat(Math.random().toFixed(2)) * 10000;
		card.closeDay = 10;
		card.availableLimit = 1500.00;
		card.description = 'Itaucard Latam Pass';
		card.flag = 'MASTERCARD';
		card.cardNumber = 9162;
		card.userId = 1;
		return card;
	}


	function openTransactions() {
		Animated.timing(scale, {
			useNativeDriver: false,
			toValue: 0.9,
			duration: 150
		}).start();

		Animated.spring(opacity, {
			useNativeDriver: false,
			toValue: 0.5,
		}).start();
		StatusBar.setBarStyle('light-content', true);
	}

	function closeTransactions() {
		Animated.timing(scale, {
			useNativeDriver: false,
			toValue: 1,
			duration: 150
		}).start();

		Animated.spring(opacity, {
			useNativeDriver: false,
			toValue: 1
		}).start();
		StatusBar.setBarStyle('dark-content', true);
	}

	function openCardForm() {
		Animated.timing(scale, {
			useNativeDriver: false,
			toValue: 0.9,
			duration: 150
		}).start();

		Animated.spring(opacity, {
			useNativeDriver: false,
			toValue: 0.5,
		}).start();
		StatusBar.setBarStyle('light-content', true);
	}

	function closeCardForm() {
		Animated.timing(scale, {
			useNativeDriver: false,
			toValue: 1,
			duration: 150
		}).start();

		Animated.spring(opacity, {
			useNativeDriver: false,
			toValue: 1
		}).start();
		StatusBar.setBarStyle('dark-content', true);
	}

	function executeAction(action: string): any {
		return {
			'openCardForm': () => openCardForm(),
			'closeCardForm': () => closeCardForm(),
			'openTransactions': () => openTransactions(),
			'closeTransactions': () => closeTransactions()
		}[action]();
	}

	function toggleScale() {
		executeAction(props.action);
	}

	function onMonthChanged(index) {
		console.log(MONTHS[index].internacional.ptBr);
	}

	const list = [
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
	];

	function creditCardChanged(index: number) {
		const card = cards[index];
		setCard(card);
		setPercentage(
			100 - (card.availableLimit * 100) / card.limit
		);
	}

	function Item({title, subtitle, icon, value}) {
		return (
			<View style={{paddingBottom: 10}}>
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<View style={{flexDirection: 'row'}}>
						<View style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: 48,
							height: 48,
							marginRight: 20,
							borderRadius: 10
						}}>
							<Icon name={icon} size={28} color={Colors.FADDED_TEXT}/>
						</View>
						<View style={{alignContent: 'flex-start'}}>
							<ProductSansText
								style={{fontSize: 20, color: Colors.TEXT_PRIMARY}}>{title}</ProductSansText>
							<ProductSansText
								style={{fontSize: 13, color: Colors.FADDED_TEXT}}>{subtitle}</ProductSansText>
						</View>
					</View>
					<ProductSansText style={{fontSize: 20, color: Colors.TEXT_ACCENT}}>-
						R${value}</ProductSansText>
				</View>
				<Separator style={{height: 15, borderBottomWidth: 0.2, borderBottomColor: Colors.SEPARATOR}}/>
			</View>
		);
	}

	return (
		<RootView>
			<Transactions onClose={buildCards}/>
			<CreditCardForm />
			<Animated.View style={{
				flex: 1,
				transform: [{scale: scale}],
				opacity: opacity,
				backgroundColor: Colors.APP_BACKGROUND,
				borderTopRightRadius: 20,
				borderTopLeftRadius: 20,
			}}
			>
				<SafeAreaView>
					<ScrollView showsVerticalScrollIndicator={false} style={{height: '100%'}}>
						<ContentContainer/>
						<Separator style={{height: 20}}/>
						<ContentContainer style={{
							flexDirection: 'row',
							alignContent: 'center',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}>
							<ProductSansBoldText style={{fontSize: Layout.TITLE_FONT_SIZE}}>
								Seus cartões
							</ProductSansBoldText>
							<TouchableOpacity onPress={props.openCardForm}>
								<ProductSansText>Add novo</ProductSansText>
							</TouchableOpacity>
						</ContentContainer>
						<CreditCardCarousel cards={cards} onSnapToItem={creditCardChanged}/>
						<Separator style={{height: 20}}/>
						<Calendar onMonthChange={onMonthChanged}/>
						<Separator style={{height: 20}}/>
						<ContentContainer>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
								<ProductSansBoldText
									style={{fontSize: Layout.TITLE_FONT_SIZE}}>Balanço</ProductSansBoldText>
								<ProductSansText style={{fontSize: 20}}>{percentage.toFixed(2)}%</ProductSansText>
							</View>
							<Separator style={{height: 20}}/>
							<View>
								<ProgressBar style={{height: 20, backgroundColor: Colors.ACCENT}}
								             shadow={false}
								             progress={percentage}
								             progressBarColor={Colors.PRIMARY}
								/>
								<Separator style={{height: 20}}/>
								<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
									<View style={{flex: 1, flexDirection: 'row'}}>
										<IndicatorSquare>
											<Icon name="arrow-down" size={30} color={Colors.PRIMARY}/>
										</IndicatorSquare>
										<Square>
											<ProductSansText
												style={{color: Colors.FADDED_TEXT}}>Gasto</ProductSansText>
											<ProductSansBoldText
												style={{fontSize: 20}}>R${(card.limit - card.availableLimit).toFixed(0)}</ProductSansBoldText>
										</Square>
									</View>
									<Separator style={{flex: .5}}/>
									<View style={{flex: 1, flexDirection: 'row'}}>
										<IndicatorSquare>
											<Icon name="arrow-up" size={30} color={Colors.ACCENT}/>
										</IndicatorSquare>
										<Square>
											<ProductSansText
												style={{color: Colors.FADDED_TEXT}}>Disponível</ProductSansText>
											<ProductSansBoldText
												style={{fontSize: 20}}>R${card.availableLimit}</ProductSansBoldText>
										</Square>
									</View>
								</View>
							</View>
						</ContentContainer>
						<Separator style={{height: 20}}/>
						<ContentContainer>
							<View style={{
								flexDirection: 'row',
								alignContent: 'center',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}>
								<ProductSansBoldText
									style={{flex: 1, fontSize: Layout.TITLE_FONT_SIZE}}>Transações</ProductSansBoldText>
								<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
									<Separator style={{width: 10}}/>
									<TouchableOpacity>
										<ProductSansText>Add</ProductSansText>
									</TouchableOpacity>
									<TouchableOpacity onPress={props.openTransactions}>
										<ProductSansText>Ver todas</ProductSansText>
									</TouchableOpacity>
								</View>
							</View>
							<Separator style={{height: 30}}/>
							<FlatList
								data={list}
								keyExtractor={item => item.id.toString()}
								renderItem={({item}) =>
									<Item
										title={item.title}
										subtitle={item.subtitle}
										icon={item.icon}
										value={item.value}
									/>
								}
							/>
						</ContentContainer>
					</ScrollView>
				</SafeAreaView>
			</Animated.View>
		</RootView>
	);
}

export default connect(mapStateToProps, dispatchToPropsOpen)(CardsScreen);

CardsScreen.navigationOptions = {
	header: null,
};

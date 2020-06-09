import React, {useEffect, useState} from 'react';
import {Animated, FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, YellowBox} from 'react-native';
import CreditCardCarousel from '../../components/CreditCardCarousel';
import {ContentContainer, IndicatorSquare, RootView, Square} from './Style';
import {ProductSansBoldText, ProductSansText} from '../../components/StyledText';
import Layout from '../../constants/Layout';
import CreditCard from '../../src/model/CreditCard';
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
import TransactionItem from "../../components/TransactionItem";
import Constants from "../../constants/Constants";
import domain from '../../src/domain/CreditCardDomain';
import InvoiceItem from "../../src/model/InvoiceItem";
import moment from 'moment';
import console from 'reactotron-react-native';
import TransactionForm from "../../components/TransactionForm";

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested', 'Calling `getNode()`']);

function CardsScreen(props) {
	const [cards, setCards] = useState(domain.findByUser(Constants.ONE));
	const [card, setCard] = useState(cards[0]);
	const [percentage, setPercentage] = useState(0);
	const [scale, setScale] = useState(new Animated.Value(1));
	const [opacity, setOpacity] = useState(new Animated.Value(1));
	const [transactions, setTransactions] = useState(new Array<InvoiceItem>());

	useEffect(toggleScale, [props.action]);

	useEffect(reload, []);

	useEffect(reloadCreditCardInfos, [card]);

	function reload() {
		const cards = domain.findByUser(Constants.ONE);
		if (cards) {
			setCards(cards);
			creditCardChanged(0);
		}
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

	function openTransactionsForm() {
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

	function closeTransactionsForm() {
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
			'closeTransactions': () => closeTransactions(),
			'openTransactionsForm': () => openTransactionsForm(),
			'closeTransactionsForm': () => closeTransactionsForm()
		}[action]();
	}

	function toggleScale() {
		executeAction(props.action);
	}

	function onMonthChanged(index, year) {
		if (card) {
			const monthId = MONTHS[index].calendarIndex;
			console.log(`${monthId}/${year}`);
			setTransactions(domain.getTransactions(card.id, monthId, year, 10));
		}
	}

	function reloadCreditCardInfos() {
		if(card) {
			const today = new Date();
			const month = MONTHS[moment(today).get('month')];
			const year = moment(today).get('year');
			setTransactions(domain.getTransactions(card.id, month.calendarIndex, year, 10));
			setPercentage(
				100 - (card.availableLimit * 100) / card.limit
			);
		}
	}

	function creditCardChanged(index: number) {
		if (cards.length) {
			const creditCard = cards[index];
			setCard(creditCard);
		}
	}

	return (
		<RootView>
			<Transactions/>
			<CreditCardForm onClose={reload}/>
			<TransactionForm creditCard={card} onClose={reload}/>
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
							<View style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
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
												style={{fontSize: 20}}>R${(card ? (card.limit - card.availableLimit) : 0).toFixed(0)}</ProductSansBoldText>
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
												style={{fontSize: 20}}>R${card ? card.availableLimit : 0}</ProductSansBoldText>
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
									style={{
										flex: 1,
										fontSize: Layout.TITLE_FONT_SIZE
									}}>Transações</ProductSansBoldText>
								<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
									<Separator style={{width: 10}}/>
									<TouchableOpacity onPress={props.openTransactionsForm}>
										<ProductSansText>Add</ProductSansText>
									</TouchableOpacity>
									<TouchableOpacity onPress={props.openTransactions}>
										<ProductSansText>Ver todas</ProductSansText>
									</TouchableOpacity>
								</View>
							</View>
							<Separator style={{height: 30}}/>
							<FlatList
								data={transactions}
								keyExtractor={item => item.id.toString()}
								renderItem={({item}) =>
									<TransactionItem
										title={item.title}
										description={item.description}
										icon={item.icon}
										value={item.value}
										when={moment(item.when).format('LL')}
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

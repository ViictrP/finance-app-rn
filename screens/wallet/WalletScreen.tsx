import React, {useEffect, useState} from 'react';
import {
	Animated,
	Button,
	FlatList,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	View
} from 'react-native';
import Transactions from "../../components/Transactions";
import Colors from "../../constants/Colors";
import {ContentContainer, RootView} from "../cards/Style";
import {MoneyBox, SearchBox, SearchView, ViewContainer} from './Style';
import {ProductSansBoldText, ProductSansText} from "../../components/StyledText";
import makeElevation from "../../components/utils/ElevationShadowStyle";
import Layout from "../../constants/Layout";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Separator from "../../components/Separator";
import TransactionItem from "../../components/TransactionItem";
import moment from "moment";
import {connect} from "react-redux";
import {dispatchToPropsOpen, mapStateToProps} from "../../components/utils/redux/ReduxMaps";
import Wallet from "../../components/Wallet";
import TransactionForm from "../../components/TransactionForm";

function WalletScreen(props) {

	const {navigation} = props;

	const [scale, setScale] = useState(new Animated.Value(1));
	const [opacity, setOpacity] = useState(new Animated.Value(1));

	useEffect(() => executeAction(props.action), [props.action]);

	function openModal() {
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

	function closeModal() {
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
			'openCardForm': () => {},
			'closeCardForm': () => {},
			'openWallet': () => openModal(),
			'closeWallet': () => closeModal(),
			'openTransactions': () => openModal(),
			'closeTransactions': () => closeModal(),
			'openTransactionsForm': () => openModal(),
			'closeTransactionsForm': () => closeModal()
		}[action]();
	}

	return (
		<RootView>
			<Transactions/>
			<TransactionForm />
			<Wallet />
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
					<ScrollView>
						<SearchView>
							<View style={{alignItems: "flex-start"}}>
								<ProductSansBoldText
									style={{
										fontSize: Layout.TITLE_FONT_SIZE
									}}
								>
									Buscar
								</ProductSansBoldText>
								<ProductSansText style={{fontSize: 17, marginTop: 10}}>Buscar transações por nome, valor
									ou categoria</ProductSansText>
							</View>
							<TouchableOpacity style={{marginTop: 25}} onPress={() => navigation.navigate('SearchTransactions')}>
								<SearchBox style={{...makeElevation(Platform.OS === 'ios' ? 15 : 10)}}>
									<FontAwesome5
										name="search"
										size={20}
										style={{marginBottom: -3, marginRight: 20}}
										color={Colors.FADDED_TEXT}
									/>
									<ProductSansText style={{fontSize: 20, color: Colors.FADDED_TEXT}}>Buscar transações</ProductSansText>
								</SearchBox>
							</TouchableOpacity>
						</SearchView>
						<ViewContainer style={{
							...makeElevation(
								Platform.OS === 'ios' ? 15 : 10
							)
						}}>
							<View style={{height: '100%'}}>
								<ContentContainer>
									<View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30, padding: 10}}>
										<ProductSansBoldText style={{fontSize: Layout.TITLE_FONT_SIZE}}>Carteira</ProductSansBoldText>
										<Button title="configurar" onPress={props.openWallet} />
									</View>
									<MoneyBox>
										<View>
											<ProductSansText style={{fontSize: 20, color: Colors.FADDED_TEXT}}>saldo disponível</ProductSansText>
											<ProductSansBoldText style={{fontSize: 50, marginBottom: 10, marginTop: 5}}>8.563,87</ProductSansBoldText>
										</View>
										<ProductSansText style={{fontSize: 20, color: Colors.FADDED_TEXT}}>saldo total R$ 12.600,00</ProductSansText>
									</MoneyBox>
									<Separator style={{marginTop: 30, marginBottom: 30, borderBottomWidth: 0.3, borderColor: Colors.ACCENT}}/>
									<View>
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
												<Button title="add" onPress={props.openTransactionsForm} />
												<Button title="ver todas" onPress={props.openTransactions} />
											</View>
										</View>
										<Separator style={{height: 30}}/>
										<FlatList
											data={[
												{
													id: 1,
													title: 'Apple Inc',
													description: 'Online',
													icon: 'shopping-cart',
													value: 1199,
													when: moment(new Date()).format('LL')
												},
												{
													id: 2,
													title: 'Facebook Inc',
													description: 'Online',
													icon: 'shopping-cart',
													value: 560,
													when: moment(new Date()).format('LL')
												}
											]}
											keyExtractor={item => item.id.toString()}
											renderItem={({item}) =>
												<TransactionItem
													title={item.title}
													description={item.description}
													icon={item.icon ? item.icon : 'shopping-cart'}
													value={item.value}
													when={moment(item.when).format('LL')}
													touchable={false}
												/>
											}
										/>
									</View>
								</ContentContainer>
							</View>
						</ViewContainer>
					</ScrollView>
				</SafeAreaView>
			</Animated.View>
		</RootView>
	);
}

export default connect(mapStateToProps, dispatchToPropsOpen)(WalletScreen);

WalletScreen.navigationOptions = {
	header: null,
};

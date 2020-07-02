import React, {useEffect, useRef, useState} from 'react';
import {
	CloseButtonContainer,
	Content,
	Header,
	HeaderButton,
	HeaderButtonText,
	HeaderContent,
	InputContainer,
	RootView,
	SearchBox,
	SearchBoxContainer
} from "./Style";
import {
	Dimensions,
	FlatList,
	Platform,
	SafeAreaView,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import moment from "moment";
import TransactionItem from "../../components/TransactionItem";
import Colors from "../../constants/Colors";
import makeElevation from "../../components/utils/ElevationShadowStyle";
import FeatherIcon from "react-native-vector-icons/Feather";
import console from 'reactotron-react-native';
import {ProductSansText} from "../../components/StyledText";
import transactionService from '../../src/services/TransactionService';

const screenWidth = Dimensions.get('window').width;
const MINIMUM_SEARCH_LENGTH = 4;

export default function SearchTransactionScreen({navigation}) {
	const inputRef = useRef(null);
	const [searchParam, setSearchParam] = useState('');
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(searchTransactions, [searchParam]);

	function searchTransactions() {
		if (searchParam && searchParam.length >= MINIMUM_SEARCH_LENGTH) {
			setLoading(true);
			const transactions = transactionService.findTransactions(searchParam);
			console.log(transactions);
			setTransactions(transactions);
			setTimeout(() => setLoading(false), 1000);
		} else {
			setTransactions([])
			setLoading(false);
		}
	}

	return (
		<RootView>
			<Header>
				<HeaderContent>
					<HeaderButton onPress={() => navigation.goBack()}>
						<HeaderButtonText>voltar</HeaderButtonText>
					</HeaderButton>
				</HeaderContent>
			</Header>
			<SearchBox>
				<SearchBoxContainer style={{...makeElevation(Platform.OS === 'ios' ? 15 : 10)}}>
					<InputContainer>
						<FeatherIcon
							style={{
								paddingRight: 20
							}}
							name='search'
							size={28}
							color={Colors.FADDED_TEXT}
						/>
						<TextInput
							style={{
								fontSize: 20,
								paddingRight: 50,
								maxWidth: screenWidth - 84
							}}
							ref={inputRef}
							defaultValue={searchParam}
							keyboardAppearance="dark"
							placeholder="buscar por título ou descrição..."
							placeholderTextColor={Colors.FADDED_TEXT}
							onChangeText={value => {
								if (inputRef.current) {
									inputRef.current.value = value;
									setSearchParam(value);
								}
							}}
						/>
					</InputContainer>
					<CloseButtonContainer>
						{
							searchParam ?

								<TouchableOpacity onPress={() => {
									inputRef.current.value = null;
									setSearchParam('');
								}}>
									<FeatherIcon name='x' size={28} color={Colors.BUTTON}/>
								</TouchableOpacity>

								: null
						}
					</CloseButtonContainer>
					<CloseButtonContainer>
						{ loading ? <ProductSansText style={{color: Colors.FADDED_TEXT}}>carregando...</ProductSansText> : null }
					</CloseButtonContainer>
				</SearchBoxContainer>
			</SearchBox>
			<Content>
				<SafeAreaView>
					{ transactions.length ?
						<ScrollView style={{paddingTop: 50, height: '100%'}} showsVerticalScrollIndicator={false}>
							<FlatList
								data={transactions}
								keyExtractor={item => item.id.toString()}
								renderItem={({item}) =>
									<TransactionItem
										title={item.title}
										description={item.description}
										icon={item.icon ? item.icon : 'shopping-cart'}
										value={item.value}
										when={moment(item.when).format('LL')}
										touchable={true}
										item={item}
										onPress={(id) => navigation.navigate('Transaction', {id})}
									/>
								}
							/>
						</ScrollView>
						:
						<View style={{paddingTop: 50, height: '80%', justifyContent: 'center', alignItems: 'center'}}>
							<FeatherIcon
								style={{
									paddingRight: 20
								}}
								name='shopping-cart'
								size={80}
								color={Colors.FADDED}
							/>
							<ProductSansText style={{fontSize: 40, color: Colors.FADDED}}>transações</ProductSansText>
						</View>
					}
				</SafeAreaView>
			</Content>
		</RootView>
	);
}


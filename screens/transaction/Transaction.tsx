import React, {useEffect, useState} from 'react';
import {Container, RootView} from "./Style";
import service from '../../src/services/TransactionService';
import {ProductSansText} from "../../components/StyledText";
import TransactionItem from "../../components/TransactionItem";
import moment from "moment";
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import CreditCardComponent from "../../components/CreditCard";
import Separator from "../../components/Separator";
import {Header, HeaderButton, HeaderButtonText, HeaderContent} from "../search-transactions/Style";

const style = StyleSheet.create({
	creditCard: {
		width: '101%',
		height: 180
	}
});

export default function Transaction(props) {
	const {navigation} = props;
	const {id: transactionId} = navigation.state.params;
	const [transaction, setTransaction] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(findTransaction, []);

	function findTransaction() {
		const transaction = service.findById(transactionId);
		setTransaction(transaction);
		setLoading(false);
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
			<SafeAreaView style={{backgroundColor: Colors.APP_BACKGROUND}}>
				<ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
					{loading ? <ProductSansText>carregando...</ProductSansText> :
						<Container>
							<CreditCardComponent
								style={style.creditCard}
								shadow={true}
								flag="Mastercard"
								limit="12.500,00"
								title="Itaucard Visa Gold"
								number="1542"
							/>
							<Separator style={{height: 20}}/>
							<TransactionItem
								title={transaction.title}
								description={transaction.description}
								icon={transaction.icon ? transaction.icon : 'shopping-cart'}
								value={transaction.value}
								when={moment(transaction.when).format('LL')}
								touchable={false}
							/>
						</Container>
					}
				</ScrollView>
			</SafeAreaView>
		</RootView>
	);
}

import React from 'react';
import {Content, Header, HeaderContent, RootView, SearchBox} from "./Style";
import {Button, SafeAreaView, ScrollView, View} from "react-native";
import {ProductSansBoldText, ProductSansText} from "../../components/StyledText";
import Separator from "../../components/Separator";

export default function SearchTransactionScreen({navigation}) {

	return (
		<RootView>
			<Header>
				<HeaderContent>
					<Button title="voltar" onPress={() => navigation.goBack()} />
				</HeaderContent>
			</Header>
			<SearchBox>
				<ProductSansBoldText style={{fontSize: 30}}>Busca</ProductSansBoldText>
			</SearchBox>
			<Separator style={{height: 20}}/>
			<Content>
				<SafeAreaView>
					<ScrollView>
						<View>
							<ProductSansText>Buscar transações</ProductSansText>
						</View>
					</ScrollView>
				</SafeAreaView>
			</Content>
		</RootView>
	);
}

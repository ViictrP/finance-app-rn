import React, {useRef, useState} from 'react';
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
import {Dimensions, FlatList, Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity} from "react-native";
import moment from "moment";
import TransactionItem from "../../components/TransactionItem";
import Colors from "../../constants/Colors";
import makeElevation from "../../components/utils/ElevationShadowStyle";
import FeatherIcon from "react-native-vector-icons/Feather";
import {ProductSansItalicText} from "../../components/StyledText";

const screenWidth = Dimensions.get('window').width;

export default function SearchTransactionScreen({navigation}) {
	const inputRef = useRef(null);
	const [searchParam, setSearchParam] = useState('');

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
							placeholder="título, descrição, valor ou data..."
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
									<FeatherIcon
										style={{}}
										name='x'
										size={28}
										color={Colors.BUTTON}
									/>
								</TouchableOpacity>

								: null
						}
					</CloseButtonContainer>
				</SearchBoxContainer>
			</SearchBox>
			<Content>
				<SafeAreaView>
					<ScrollView style={{paddingTop: 50, height: '100%'}} showsVerticalScrollIndicator={false}>
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
								/>
							}
						/>
					</ScrollView>
				</SafeAreaView>
			</Content>
		</RootView>
	);
}


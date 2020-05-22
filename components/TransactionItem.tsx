import {View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import {ProductSansText} from "./StyledText";
import Separator from "./Separator";
import React from "react";

export default function TransactionItem({title, description, icon, value, when}) {
	return (
		<View style={{paddingBottom: 10}}>
			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<View style={{flexDirection: 'row'}}>
					<View style={{
						alignItems: 'center',
						justifyContent: 'center',
						marginRight: 20,
						borderRadius: 10
					}}>
						<Icon name={icon} size={28} color={Colors.FADDED_TEXT}/>
					</View>
					<View style={{flexDirection: 'column', alignContent: 'flex-start'}}>
						<ProductSansText style={{fontSize: 15, marginBottom: 5, color: Colors.FADDED_TEXT}}>
							Transporte
						</ProductSansText>
						<ProductSansText style={{fontSize: 20, marginBottom: 7, color: Colors.TEXT_PRIMARY}}>
							{title}
						</ProductSansText>
						<ProductSansText style={{fontSize: 18}}>
							R$&nbsp;{value}
						</ProductSansText>
					</View>
				</View>
				<View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end'}}>

					<ProductSansText style={{color: Colors.FADDED_TEXT}}>
						{when}
					</ProductSansText>
				</View>
			</View>
			<Separator style={{height: 15, borderBottomWidth: 0.2, borderBottomColor: Colors.SEPARATOR}}/>
		</View>
	);
}

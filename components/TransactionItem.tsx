import {View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import {ProductSansText} from "./StyledText";
import Separator from "./Separator";
import React from "react";

export default function TransactionItem({title, subtitle, icon, value}) {
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

import {Button, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import {ProductSansText} from "./StyledText";
import Separator from "./Separator";
import React from "react";
import Layout from "../constants/Layout";
import FeatherIcon from "react-native-vector-icons/Feather";
import makeElevation from "./utils/ElevationShadowStyle";

export default function TransactionItem({title, description, icon, value, when, touchable, ...rest}) {
	return (
		<View style={{backgroundColor: Colors.FADDED, marginBottom: 8, padding: 10, borderRadius: 20}}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<View style={{flexDirection: 'row'}}>
					<View style={{
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: Colors.BUTTON,
						borderWidth: 2,
						borderColor: Colors.BUTTON,
						marginRight: 15,
						borderRadius: 10,
						paddingLeft: 5,
						paddingRight: 7
					}}>
						<Icon name={icon} size={28} color={Colors.WHITE}/>
					</View>
					<View style={{flexDirection: 'column', alignContent: 'flex-start'}}>
						<ProductSansText style={{fontSize: 15, marginBottom: 5, color: Colors.FADDED_TEXT}}>
							{description}
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
					{touchable ?
						<TouchableOpacity onPress={() => rest.onPress(rest.item.id)} style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
							<ProductSansText style={{fontSize: Layout.BUTTON_FONT_SIZE, color: Colors.BUTTON, marginRight: 5}}>abrir</ProductSansText>
							<FeatherIcon name='external-link' size={Layout.BUTTON_FONT_SIZE} color={Colors.BUTTON}/>
						</TouchableOpacity>
					: null}
				</View>
			</View>
		</View>
	);
}

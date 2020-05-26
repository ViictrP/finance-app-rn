import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {StyleSheet, View} from "react-native";
import {useField} from "@unform/core";
import RNDatePicker from 'react-native-datepicker'
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import FeatherIcon from "react-native-vector-icons/Feather";
import Separator from "./Separator";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {ProductSansText} from "./StyledText";

export default function DatePicker({name, placeholder, icon, required}) {

	const [value, setValue] = useState("");
	const inputRef = useRef(null);
	const {fieldName, registerField, defaultValue, error} = useField(name);
	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);
	useEffect(() => {
		// @ts-ignore
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
			clearValue(ref) {
				ref.value = '';
				setValue('');
				if (ref.clear) {
					ref.clear();
				}
			},
			setValue(ref, value) {
				ref.setNativeProps({text: value});
				inputRef.current.value = value;
				// @ts-ignore
				setValue(value)
			},
			getValue(ref) {
				return ref.value;
			},
		});
	}, [fieldName, registerField]);

	return (
		<Container>
			<ChildContainer>
				<FeatherIcon
					name={icon}
					size={28}
					color={required && required == true ? Colors.TINT_COLOR : Colors.FADDED_TEXT}
				/>
				<RNDatePicker
					ref={inputRef}
					customStyles={{
						dateInput: {
							fontSize: '20px',
							borderColor: '#FFF',
							textAlign: 'left',
							alignItems: 'flex-start'
						},
						placeholderText: {
							fontSize: 20,
							color: Colors.FADDED_TEXT
						},
						dateText: {
							fontSize: 20
						}
					}}
					allowFontScalling={true}
					style={style.RNDatePicker}
					date={value}
					mode="date"
					showIcon={false}
					placeholder={placeholder}
					format="DD-MM-YYYY"
					confirmBtnText="confirmar"
					cancelBtnText="cancelar"
					onDateChange={date => {
						if (inputRef.current) {
							inputRef.current.value = date;
							setValue(date);
						}
					}}
				/>
			</ChildContainer>
			<Separator style={{height: 5}}/>
			{ error &&
            <View style={{flexDirection: 'row'}}>
                <FontAwesome5Icon name="times" size={15} color={Colors.TEXT_ACCENT} />
                <ProductSansText style={{color: Colors.TEXT_ACCENT, marginLeft: 4}}>{error}</ProductSansText>
            </View>
			}
		</Container>
	);
}

const style = StyleSheet.create({
	RNDatePicker: {
		fontSize: 20,
		color: Colors.TEXT_PRIMARY,
		width: '100%',
		height: '100%',
		paddingLeft: 10,
		borderColor: '#FFF',
		borderWidth: 0,
		textAlign: 'left'
	}
});

const Container = styled.View`
	margin: 7px ${Layout.LAYOUT_SIDE_PADDINGS}px;
	max-height: 50px;
`;

const ChildContainer = styled.View`
	flex-direction: row;	
	justify-content: center;
	align-items: center;
	border-color: rgba(0, 0, 0, 0.1);
	border-width: 2px;	
	padding: 3px 25px;
	border-radius: 15px;
`;

import React, {useEffect, useRef, useState} from 'react';
import {useField} from '@unform/core';
import {StyleSheet, Text, View} from "react-native";
import styled from 'styled-components';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TextInputMask} from 'react-native-masked-text'
import {ProductSansText} from "./StyledText";
import Separator from "./Separator";

function Input({name, icon, placeholder, required, mask}) {
	const [value, setValue] = useState("");
	const inputRef = useRef(null);
	const {fieldName, registerField, defaultValue, error} = useField(name);
	useEffect(() => {
		inputRef.current.value = defaultValue;
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
			},
			getValue(ref) {
				if (mask) return ref.getRawValue();
				return ref.value;
			},
		});
	}, [fieldName, registerField]);

	function MaskInput() {
		return (
			<Container>
				<ChildContainer>
					<FeatherIcon
						name={icon}
						size={28}
						color={required && required == true ? Colors.TINT_COLOR : Colors.FADDED_TEXT}
					/>
					<TextInputMask
						type={mask}
						style={style.input}
						ref={inputRef}
						keyboardAppearance="dark"
						placeholder={placeholder}
						value={value}
						defaultValue={defaultValue}
						placeholderTextColor={Colors.FADDED_TEXT}
						onChangeText={value => {
							if (inputRef.current) {
								inputRef.current.value = value;
								setValue(value);
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

	function NormalInput() {
		return (
			<Container>
				<ChildContainer>
					<FeatherIcon
						name={icon}
						size={28}
						color={required && required == true ? Colors.TINT_COLOR : Colors.FADDED_TEXT}
					/>
					<InputText
						ref={inputRef}
						required={required}
						keyboardAppearance="dark"
						placeholder={placeholder}
						defaultValue={defaultValue}
						placeholderTextColor={Colors.FADDED_TEXT}
						onChangeText={value => {
							if (inputRef.current) {
								inputRef.current.value = value;
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

	if (mask) {
		return MaskInput();
	} else {
		return NormalInput();
	}
}

const style = StyleSheet.create({
	input: {
		fontSize: 20,
		color: Colors.TEXT_PRIMARY,
		width: '100%',
		height: '100%',
		paddingLeft: 10
	}
});

const InputText = styled.TextInput`
	font-size: 20px;
	color: ${Colors.TEXT_PRIMARY};
	width: 100%;
	height: 100%;
	padding-left: 10px;
`;

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
	padding: 10px 25px;
	border-radius: 15px;
`;

export default Input;

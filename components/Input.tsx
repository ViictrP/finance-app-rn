import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {useField} from '@unform/core';
import styled from 'styled-components';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Icon from 'react-native-vector-icons/Feather';

const window = Dimensions.get('window');

function Input({name, icon, placeholder, required, ...rest}) {
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
				ref.clear();
			},
			setValue(ref, value) {
				ref.setNativeProps({text: value});
				inputRef.current.value = value;
			},
			getValue(ref) {
				return ref.value;
			},
		});
	}, [fieldName, registerField]);
	return (
		<Container>
			<Icon
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
				{...rest}
			/>
		</Container>
	);
}


const InputText = styled.TextInput`
	font-size: 20px;
	color: ${Colors.TEXT_PRIMARY};
	width: 100%;
	height: 100%;
	padding-left: 10px;
`;

const Container = styled.View`
	border-color: rgba(0, 0, 0, 0.1);
	border-width: 2px;	
	padding: 0 25px;
	margin: 0 ${Layout.LAYOUT_SIDE_PADDINGS}px;
	flex: 1;
	flex-direction: row;
	max-height: 50px;
	border-radius: 15px;
	justify-content: center;
	align-items: center;
`;

export default Input;

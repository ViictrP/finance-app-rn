import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useField} from "@unform/core";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import FeatherIcon from "react-native-vector-icons/Feather";
import Separator from "./Separator";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {ProductSansText} from "./StyledText";

export default function DatePicker({name, icon, required}) {
	const [date, setDate] = useState(new Date(1598051730000));
	const {fieldName, registerField, defaultValue, error} = useField(name);
	const inputRef = useRef(null);

	useEffect(() => {
		setDate(date);
	}, [defaultValue]);
	useEffect(() => {
		// @ts-ignore
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
			clearValue(ref) {
				ref.value = new Date();
				setDate(new Date());
			},
			setValue(_, value) { inputRef.current.value = value; },
			getValue(ref) { return ref.value; },
		});
	}, [fieldName, registerField]);

	const onChange = (_, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
		inputRef.current.value = currentDate;
	};

	return (
		<Container>
			<ChildContainer>
				<FeatherIcon
					name={icon}
					size={28}
					color={required && required == true ? Colors.TINT_COLOR : Colors.FADDED_TEXT}
				/>
				<DateTimePicker
					// @ts-ignore
					ref={inputRef}
					value={date}
					style={{width: '100%', height: 100}}
					testID="dateTimePicker"
					timeZoneOffsetInMinutes={0}
					mode="date"
					display="default"
					onChange={onChange}
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

const Container = styled.View`
	margin: 7px ${Layout.LAYOUT_SIDE_PADDINGS}px;
	max-height: 100px;
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

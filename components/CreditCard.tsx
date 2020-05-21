import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import Card from './Card';
import {ProductSansBoldText, ProductSansText} from './StyledText';
import Separator from "./Separator";
import Colors from "../constants/Colors";

export default function CreditCard(props) {
    return (
        <CreditCardContainer style={{...props.style}}>
            <Card shadow={props.shadow} style={style.creditCard}>
                <ProductSansText style={{fontSize: 17, textAlign: 'right', color: Colors.TEXT_PRIMARY}}>{props.flag}</ProductSansText>
                <Separator/>
                <Separator/>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <ProductSansBoldText style={{fontSize: 14, textAlign: 'right', color: Colors.TEXT_PRIMARY}}>R$</ProductSansBoldText>
                    <ProductSansBoldText style={{fontSize: 30, textAlign: 'right', color: Colors.TEXT_PRIMARY}}>&nbsp;</ProductSansBoldText>
                    <ProductSansBoldText style={{fontSize: 30, textAlign: 'right', color: Colors.TEXT_PRIMARY}}>{props.cardLimit}</ProductSansBoldText>
                </View>
                <Separator/>
                <View style={{flexDirection: 'row'}}>
                    <ProductSansBoldText>*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;</ProductSansBoldText>
                    <ProductSansText style={style.cardName}>{props.cardNumber}</ProductSansText>
                </View>
            </Card>
        </CreditCardContainer>
    );
}

const CreditCardContainer = styled.View`
  padding: 5px;
  height: 100%;
`;

const style = StyleSheet.create({
    creditCard: {
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'space-between'
    },
    cardName: {
        fontSize: 19,
        color: Colors.PRIMARY
    }
});

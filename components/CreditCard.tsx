import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import Card from './Card';
import {ProductSansBoldText, ProductSansText} from './StyledText';
import Separator from "./Separator";
import Colors from "../constants/Colors";

export default function CreditCard(props) {
    return (
        <CreditCardContainer style={{...props.style}}>
            <Card shadow={props.shadow} style={style.creditCard}>
                <ProductSansText style={{fontSize: 17, textAlign: 'right', color: Colors.WHITE}}>{props.flag}</ProductSansText>
                <Separator/>
                <Separator/>
                <View>
                    <ProductSansText style={{fontSize: 18, color: 'rgba(255,255,255,0.7)'}}>{props.title}</ProductSansText>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ProductSansBoldText style={{fontSize: 25, textAlign: 'right', color: Colors.WHITE}}>R$</ProductSansBoldText>
                        <ProductSansBoldText style={{fontSize: 34, textAlign: 'right', color: Colors.WHITE}}>&nbsp;</ProductSansBoldText>
                        <ProductSansBoldText style={{fontSize: 34, textAlign: 'right', color: Colors.WHITE}}>{props.limit}</ProductSansBoldText>
                    </View>
                </View>
                <Separator/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image
                        style={{width: 58, height: 58}}
                        source={require('../assets/images/credit_card_chip.png')}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <ProductSansBoldText style={{fontSize: 20, color: 'rgba(255,255,255,0.7)'}}>*&nbsp;*&nbsp;*&nbsp;*&nbsp;&nbsp;</ProductSansBoldText>
                        <ProductSansText style={style.cardName}>{props.number}</ProductSansText>
                    </View>
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
        backgroundColor: Colors.TINT_COLOR,
        justifyContent: 'space-between'
    },
    cardName: {
        fontSize: 20,
        color: Colors.WHITE
    }
});

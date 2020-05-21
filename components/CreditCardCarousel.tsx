import React, {useEffect} from 'react';

import Carousel from 'react-native-snap-carousel';
import CreditCard from './CreditCard';
import Layout from '../constants/Layout';
import {Platform} from "react-native";

export default function CreditCardCarousel(props) {

    useEffect(() => {

    }, []);

    function _renderItem({index}) {
        const card = props.cards[index];
        return (
            <CreditCard style={{width: 250, height: 330}}
                        shadow={true}
                        flag={card.flag}
                        limit={card.limit.toFixed(2)}
                        title={card.description}
                        number={card.cardNumber} />
        );
    }

    return (
        <Carousel
            containerCustomStyle={{paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 25}}
            activeSlideAlignment={'start'}
            style={{...props.style}}
            data={props.cards}
            renderItem={_renderItem}
            sliderWidth={Layout.WINDOW.width}
            itemWidth={Layout.CAROUSEL_ITEM_WIDTH}
            onSnapToItem={props.onSnapToItem}
            snapToStart
            inactiveSlideScale={0.97}
            inactiveSlideOpacity={ Platform.OS === 'ios' ? 0.5 : 1 }
        />
    );
}

import React from 'react';
import {Text} from 'react-native';

export function MonoText(props) {
    return (
        <Text {...props} style={[props.style, {fontFamily: 'SpaceMono-Regular'}]}/>
    );
}

export function ProductSansText(props) {
    return (
        <Text {...props} style={[props.style, {fontFamily: 'ProductSans-Regular'}]}/>
    );
}

export function ProductSansBoldText(props) {
    return (
        <Text {...props} style={[props.style, {fontFamily: 'ProductSans-Bold'}]}/>
    );
}

export function ProductSansBoldItalicText(props) {
    return (
        <Text {...props} style={[props.style, {fontFamily: 'ProductSans-BoldItalic'}]}/>
    );
}

export function ProductSansItalicText(props) {
    return (
        <Text {...props} style={[props.style, {fontFamily: 'ProductSans-Italic'}]}/>
    );
}

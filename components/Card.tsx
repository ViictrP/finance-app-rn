import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import makeElevation from "./utils/ElevationShadowStyle";
import Colors from "../constants/Colors";

export default function Card(props) {
    return (
        <Container {...props} style={[props.style, props.shadow ? styles.shadow : {}]} />
    );
}

const styles = StyleSheet.create({
    shadow: {
        ...makeElevation(
            Platform.OS === 'ios' ? 15 : 10
        )
    }
});


const Container = styled(LinearGradient).attrs({
    colors: [Colors.TINT_COLOR, Colors.TINT_COLOR_DARKER],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1}
})`
  flex: 1;
  border-radius: 20px;
  background-color: #FFF;
  padding: 20px;
`;

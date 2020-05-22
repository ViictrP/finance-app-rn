import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import makeElevation from "./utils/ElevationShadowStyle";
import Colors from "../constants/Colors";

export default function Card(props) {
    return (
        <Container style={[props.style, props.shadow ? styles.shadow : {}]}>
            <Child {...props} />
        </Container>
    );
}

const styles = StyleSheet.create({
    shadow: {
        ...makeElevation(
            Platform.OS === 'ios' ? 15 : 10
        )
    }
});

const Child = styled(LinearGradient).attrs({
    colors: [Colors.TINT_COLOR, Colors.TINT_COLOR_DARKER],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1}
})`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 20px
`;

const Container = styled.View`
  flex: 1;
`;

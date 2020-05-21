import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components';
import makeElevation from "./utils/ElevationShadowStyle";

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


const Container = styled.View`
  flex: 1;
  border-radius: 25px;
  background-color: #FFF;
  padding: 20px;
`;

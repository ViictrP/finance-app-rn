import React, {useEffect, useState} from "react";

import {Animated, StyleSheet, Platform} from "react-native";
import styled from 'styled-components';
import makeElevation from "./utils/ElevationShadowStyle";

export default function ProgressBar(props) {
	const [progress, setProgress] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.spring(progress, {
			toValue: props.progress,
			useNativeDriver: false
		}).start();
	}, [props.progress]);

	return (
		<Container {...props} style={[props.style, props.shadow ? styles.shadow : {}]}>
			<Animated.View
				style={{
					width: progress.interpolate({
						inputRange: [0, 1],
						outputRange: ['0%', '1%']
					}),
					height: props.style.height,
					backgroundColor: props.progressBarColor,
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					borderTopRightRadius: 10
				}}
			/>
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

const Container = styled.View`
  flex: 1;
  border-radius: 8px;
  background-color: #FFF;
`;

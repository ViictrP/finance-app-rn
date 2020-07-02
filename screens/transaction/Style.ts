import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

export const RootView = styled.View`
	flex: 1;
	background-color: black;
`;


export const Container = styled.View`
	height: 100%;
	justify-content: center;
	background-color: ${Colors.APP_BACKGROUND};
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	padding: 0 ${Layout.LAYOUT_SIDE_PADDINGS}px;
`;

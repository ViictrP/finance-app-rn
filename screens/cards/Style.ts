import styled from "styled-components";
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export const RootView = styled.View`
	flex: 1;
	background-color: black;
`;

export const Container = styled.View`
	flex: 1;
	background-color: ${Colors.APP_BACKGROUND};
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
`;

export const ContentContainer = styled.View`
	padding: ${Layout.LAYOUT_TOP_BOTTOM_PADDINGS}px ${Layout.LAYOUT_SIDE_PADDINGS}px;
`;

export const Square = styled.View`
	flex: 1;
	height: 50px;
	justify-content: space-around;
`;

export const IndicatorSquare = styled.View`
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	margin-right: 10px;
	width: 28px;
	height: 28px;
	border-radius: 8px;
`;

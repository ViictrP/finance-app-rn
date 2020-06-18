import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

export const RootView = styled.View`
	flex: 1;
	background-color: ${Colors.WHITE};
`;

export const Header = styled.View`
	width: 100%;
	height: 100px;
	justify-content: center;
	background-color: ${Colors.WHITE};
	padding: 0 3px;
`;

export const HeaderContent = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-top: 5px;
`;

export const Content = styled.View`
	flex: 1;
	background-color: ${Colors.WHITE};
	padding: 0 ${Layout.LAYOUT_SIDE_PADDINGS}px
`;

export const SearchBox = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.WHITE};
	border-bottom-width: 0.3px ;
	border-bottom-color: ${Colors.ACCENT};
	padding-bottom: 10px;
`;

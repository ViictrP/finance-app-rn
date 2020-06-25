import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

export const RootView = styled.View`
	width: 100%;
	height: 100%;
	background-color: ${Colors.APP_BACKGROUND};
`;

export const Header = styled.View`
	width: 100%;
	height: 100px;
	justify-content: center;
	background-color: ${Colors.PRIMARY};
	padding: 0 3px;
`;

export const HeaderContent = styled.View`
	width: 100%;
	height: 100%;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-top: 5px;
`;

export const HeaderButton = styled.TouchableOpacity`
	padding: 0 7px;
`;

export const HeaderButtonText = styled.Text`
	font-size: 19px;
 	color: ${Colors.WHITE} 
`;

export const Content = styled.View`
	width: 100%;
	height: 100%;
	padding-left: ${Layout.LAYOUT_SIDE_PADDINGS}px;
	padding-right: ${Layout.LAYOUT_SIDE_PADDINGS}px;
`;

export const SearchBox = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.WHITE};
`;

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
	background-color: ${Colors.WHITE};
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
	font-size: ${Layout.BUTTON_FONT_SIZE}px;
 	color: ${Colors.BUTTON} 
`;

export const Content = styled.View`
	width: 100%;
	height: 100%;
	padding: 0 ${Layout.LAYOUT_SIDE_PADDINGS}px;
`;

export const SearchBox = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.WHITE};
	padding: 0 ${Layout.LAYOUT_SIDE_PADDINGS - 10}px;
`;

export const SearchBoxContainer = styled.View`
	width: 100%;
	padding: 15px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${Colors.WHITE};
	border-radius: 20px;
	border-width: 1px;
	border-color: ${Colors.FADDED};
`;

export const InputContainer = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const CloseButtonContainer = styled.View`
	position: absolute;
	right: 0;
	padding: 0 20px;
	background-color: ${Colors.WHITE};
	justify-content: center;
	align-items: center;
`;

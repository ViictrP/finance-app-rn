import styled from 'styled-components';
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

export const ViewContainer = styled.View`
	height: 100%;
	background-color: ${Colors.WHITE};
	border-top-left-radius: 40px;
	border-top-right-radius: 40px;
`;

export const Container = styled.View`
	flex-direction: column;
	justify-content: space-between;
	align-content: center;
`;

export const SearchView = styled.View`
	height: 200px;
	justify-content: center;
	padding-left: ${Layout.LAYOUT_SIDE_PADDINGS}px;
	padding-right: ${Layout.LAYOUT_SIDE_PADDINGS}px;
`;

export const SearchBox = styled.View`
	background-color: ${Colors.ACCENT};
	padding: 10px 15px;
	border-radius: 15px;
	flex-direction: row;
	align-items: center;
`;

export const MoneyBox = styled.View`
	align-items: center;
`;

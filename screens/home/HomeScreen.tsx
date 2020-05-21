import React from 'react';
import {View, SafeAreaView} from 'react-native';

import {ProductSansText} from '../../components/StyledText';
import Style from './Style';

export default function HomeScreen() {
	return (
		<SafeAreaView style={Style.safeAreaContainer}>
			<View style={Style.container}>
				<ProductSansText style={{fontSize: 18}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis metus vel justo facilisis
					scelerisque. Fusce ullamcorper dolor sit amet neque posuere, dignissim ullamcorper ipsum imperdiet.
					Etiam fermentum sapien dui, quis gravida purus congue eu. Vivamus sagittis mauris in nisi
					condimentum, vitae convallis nulla feugiat. Proin molestie lorem dui, nec tristique neque vulputate
					non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus pharetra neque, sit amet
					accumsan leo malesuada sed. Vivamus a felis sed enim molestie aliquet at vitae nibh.
					Donec scelerisque sapien ac lorem maximus, quis imperdiet augue mattis. Fusce dictum nunc vel
					molestie finibus. Cras ut congue est. Phasellus ultrices enim magna, sed sodales risus pretium
					pharetra. Donec nec molestie diam. Quisque dignissim, lectus in imperdiet sodales, ex neque mollis
					velit, a scelerisque quam est id libero. Proin id quam sem. Integer volutpat sit amet urna at
					pulvinar. Proin varius id nisi vitae pulvinar. Ut faucibus orci nec lacus auctor congue. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Phasellus ac nisi ultricies, dictum dolor efficitur,
					condimentum tortor. Vivamus dapibus porta leo quis blandit. Fusce porttitor justo dapibus semper
					semper.
				</ProductSansText>
			</View>
		</SafeAreaView>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

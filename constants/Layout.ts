import {Dimensions} from 'react-native';
import Colors from "./Colors";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    WINDOW: {
        width,
        height,
    },
    IS_SMALL_DEVICE: width < 375,
    SEPARATOR_HEIGHT: 40,
    MIN_CAROUSEL_HEIGHT: 160,
    LAYOUT_SIDE_PADDINGS: 30,
    LAYOUT_TOP_BOTTOM_PADDINGS: 15,
    TITLE_FONT_SIZE: 30,
    BUTTON_FONT_SIZE: 19,
    CAROUSEL_ITEM_WIDTH: 250
};

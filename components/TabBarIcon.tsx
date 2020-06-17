import React from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
    return (
        // <Ionicons
        //     name={props.name}
        //     size={26}
        //     style={{marginBottom: -3}}
        //     color={props.focused ? Colors.TAB_ICON_SELECTED : Colors.TAB_ICON_DEFAULT}
        // />
        <FontAwesome5
            name={props.name}
            size={26}
            style={{marginBottom: -3}}
            color={props.focused ? Colors.TAB_ICON_SELECTED : Colors.TAB_ICON_DEFAULT}
        />
    );
}

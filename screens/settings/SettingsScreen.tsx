import React from 'react';
import {ScrollView, Text} from "react-native";

export default function SettingsScreen() {
    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
    return (
        <ScrollView>
            <Text>Config Screen</Text>
        </ScrollView>
    );
}

SettingsScreen.navigationOptions = {
    title: 'app.json',
};

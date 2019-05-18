import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

import Welcome from "./src/screens/Welcome.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_time: false,
            message: "Start Recording",
            isRecording: false,
            debug: "default state"
        };
    }

    onPress = () => {
        const { isRecording } = this.state;
        console.log(isRecording);
        this.setState({
            debug: "onPress activated",
            isRecording: !isRecording
        });
    };

    onPressIn = () => {
        const { isRecording } = this.state;
        this.setState({
            message: "Recording.........",
            isRecording: !isRecording,
            debug: "onPressIn activated"
        });
    };

    onPressOut = () => {
        const { isRecording } = this.state;
        this.setState({
            message: "Recording stopped",
            isRecording: !isRecording,
            debug: "onPressOut activated"
        });
    };

    render() {
        const { first_time, message, debug } = this.state;
        return (
            <View style={styles.container}>
                {/* first line is hidden under status bar due branson's tricky screen */}
                {first_time ? <Welcome /> : null}
                <TouchableOpacity
                    onPressIn={this.onPressIn}
                    onPressOut={this.onPressOut}
                >
                    <Text>{message} </Text>
                </TouchableOpacity>
                <Text style={styles.text}>{debug}</Text>
            </View>
        );
    }
}

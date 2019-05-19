import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Welcome from "./src/screens/Welcome.js";
import { AudioRecorder, AudioUtils } from 'react-native-audio'
import styles from "./styles";

<<<<<<< Updated upstream
=======
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const LIVE_COLOR = "#FF0000";
const RATE_SCALE = 3.0;
const BACKEND_API = "127.0.0.1:5000/uploader";
>>>>>>> Stashed changes

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

    componentDidMount = () => {
        AudioRecorder.requestAuthorization().then(isAuthorized => {
            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = data => {
                this.setState({debug: "recording in progress"});
            }

            AudioRecorder.onFinished = data => {
                this.setState({debug: "recording completed"});
            }
        });
    }

    prepareRecordingPath = (path) => {
        console.log("prepareRecordingPath");
        AudioRecorder.prepareRecordingAtPath(path, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingRate: 32000,
        });
    }

    // this is a useless function now
    onPress = () => {
        const { isRecording } = this.state;
        console.log(isRecording);
        this.setState({
            debug: "onPress activated",
            isRecording: !isRecording
        });
    };

<<<<<<< Updated upstream
    onPressIn = () => {
        const { isRecording } = this.state;
=======
    const body = new FormData();
    for(var name in file) {
      body.append(name, file[name]);
    }

    fetch(BACKEND_API, {
      method: "POST",
      body
    })
      .then(res => res.json())
      .then(res => {
>>>>>>> Stashed changes
        this.setState({
            message: "Recording.........",
            isRecording: !isRecording,
            debug: "onPressIn activated"
        });
    };

    onPressOut = () => {
        const { isRecording } = this.state;
        try {
            const filePath = await AudioRecorder.stopRecording();
        } catch (err) {
            console.log(err);
        }

        this.setState({
            message: "Recording stopped",
            isRecording: !isRecording,
            debug: "onPressOut activated"
        });
    };

    render() {
        const { first_time, message, debug } = this.state;
        const imgSrc = isRecording ? "./assets/clicked_heart.png" : "./assets/heart.png";
        return (
            <View style={styles.container}>
                {/* first line is hidden under status bar due branson's tricky screen */}
                {first_time ? <Welcome /> : null}
                <TouchableOpacity
                    style={styles.recordButton}
                    onPressIn={this.onPressIn}
                    onPressOut={this.onPressOut}
                >
                    <Image source={require(imgSrc)}/>
                    <Text>{message} </Text>
                </TouchableOpacity>
                <Text style={styles.text}>{debug}</Text>
            </View>
        );
    }
}

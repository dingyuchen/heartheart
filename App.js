import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid
} from "react-native";
import Welcome from "./src/screens/Welcome.js";
import { AudioRecorder, AudioUtils } from "react-native-audio";
import styles from "./styles";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_time: false,
      message: "Start Recording",
      isRecording: false,
      debug: "default state",
      isAuthorized: false,
      audioPath: AudioUtils.DocumentDirectoryPath,
      audioSettings: {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        AudioEncodingRate: 32000
        // SampleRate: 22050,
        // Channels: 1,
        // AudioQuality: "Low",
        // AudioEncoding: "aac",
        // MeteringEnabled: true,
        // IncludeBase64: true,
        // AudioEncodingBitRate: 32000
      }
    };
  }

  componentDidMount() {
    this.checkPermission().then(async isAuthorized => {
      console.log("permission checked");
      this.setState({ isAuthorized });
      if (!isAuthorized) return;
      await AudioRecorder.prepareRecordingAtPath(
        this.state.audioPath,
        this.state.audioSettings
      );
      AudioRecorder.onProgress = data => {
        console.log(data, "onProgress data");
      };
      AudioRecorder.onFinished = data => {
        console.log(data, "on finish");
      };
    });
  }

  checkPermission() {
    if (Platform.OS !== "android") {
      return Promise.resolve(true);
    }
    const rationale = {
      title: "Microphone Permission",
      message:
        "AudioExample needs access to your microphone so you can record audio."
    };
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale
    ).then(result => {
      console.log("Permission result:", result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  // prepareRecordingPath = path => {
  //   console.log("prepareRecordingPath");
  //   AudioRecorder.prepareRecordingAtPath(path, {
  //     SampleRate: 22050,
  //     Channels: 1,
  //     AudioQuality: "Low",
  //     AudioEncoding: "aac",
  //     AudioEncodingRate: 32000
  //   });
  // };

  // this is a useless function now

  onPress = () => {
    const { isRecording } = this.state;
    console.log(isRecording);
    this.setState({
      debug: "onPress activated",
      isRecording: !isRecording
    });
  };

  handleAudio = async () => {
    const { isRecording } = this.state;
    if (!isRecording) {
      this.setState({
        isRecording: true
      });
      await AudioRecorder.startRecording();
    } else {
      this.setState({ startAudio: false });
      await AudioRecorder.stopRecording();
      const { audioPath } = this.state;
      const fileName = "heartbeat.aac";
      console.log(fileName + "to be stored");
      const file = {
        uri: Platform.OS === "ios" ? audioPath : `file://${audioPath}`,
        name: fileName,
        type: `audio/aac`
      };
    }
  };

  onPressOut = () => {
    const { isRecording } = this.state;
    try {
      const filePath = AudioRecorder.stopRecording();
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
    const { first_time, message, debug, isRecording } = this.state;
    return (
      <View style={styles.container}>
        {/* first line is hidden under status bar due branson's tricky screen */}
        {first_time ? <Welcome /> : null}
        <TouchableOpacity
          style={styles.recordButton}
          // onPressIn={this.onPressIn}
          onPressIn={this.handleAudio}
          onPressOut={this.handleAudio}
          // onPressOut={this.onPressOut}
        >
          {isRecording ? (
            <Image source={require("./assets/clicked_heart.png")} />
          ) : (
            <Image source={require("./assets/heart.png")} />
          )}
          <Text>{message} </Text>
        </TouchableOpacity>
        <Text style={styles.text}>{debug}</Text>
      </View>
    );
  }
}

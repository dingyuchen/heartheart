import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Audio, Permissions } from "expo";
import Welcome from "./src/screens/Welcome.js";
import styles from "./styles";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_time: false,
      message: "Start Recording",
      isRecording: false,
      debug: "default state",
      isAuthorized: false
    };
    this.recording = null;
    this.recordingSetting = JSON.parse(
      JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)
    );
  }

  componentDidMount() {
    this._askForPermissions();
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === "granted"
    });
  };

  onPressIn = async () => {
    const { isRecording } = this.state;
    console.log(isRecording);
    /* set audio settings */
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSetting);
    this.recording = recording;

    this.setState({
      debug: "should start recording",
      isRecording: !isRecording
    });
  };

  onPressOut = async () => {
    const { isRecording } = this.state;
    try {
      this.recording.stopAndUnloadAsync();
    } catch (err) {
      console.log(err);
    }

    this.setState({
      message: "Recording stopped",
      isRecording: !isRecording,
      debug: this.recording.getURI()
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
          onPressIn={this.onPressIn}
          // onPressIn={this.handleAudio}
          // onPressOut={this.handleAudio}
          onPressOut={this.onPressOut}
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

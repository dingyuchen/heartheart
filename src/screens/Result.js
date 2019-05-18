import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

export default class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {heartbeat} = this.props;
    return (
      <View style={styles.container}>
        <Text>Congratulations, you have a: {heartbeat} cardiac pattern !!</Text>
      </View>
    );
  }
}

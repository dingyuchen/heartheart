import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

export default class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Shows results</Text>
      </View>
    );
  }
}

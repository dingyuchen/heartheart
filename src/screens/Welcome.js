import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This should be the tutorial to show how to use the app</Text>
      </View>
    );
  }
}

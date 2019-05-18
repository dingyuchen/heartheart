import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import Welcome from './views/Welcome.js';

export default class App extends React.Component {
    first_time = true;
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hey branson is this hot-reloading working?</Text>
                <Text>{this.first_time}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 33,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

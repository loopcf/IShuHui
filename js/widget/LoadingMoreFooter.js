import React, { Component } from 'react';

import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';


export default class LoadingMoreFooter extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text style={styles.text}>
                  正在加载中...
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({

    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 14,
        color: '#CCCCCC',
        marginLeft: 10
    }
})

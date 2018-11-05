import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textTransform: 'uppercase',
        fontFamily: 'Lato Bold'
    },
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch',
    },
    detailColumn: {
        flexDirection: 'column',
        flexGrow: 9,
    },
    titleView: {
        textAlign: 'center'
    }
})

export default ({children}) => (
    <View style={styles.container}>
        <View style={styles.detailColumn}>
            <View style={styles.titleView}>
                <Text style={styles.title}>{children}</Text>
            </View>
        </View>
    </View>
)
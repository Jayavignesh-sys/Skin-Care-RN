import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { useState, useRef } from 'react';
import Imgpick from './Imgpick';




export default function Second() {
    const navigation = useNavigation();

    // const heightU = useRef(new Animated.Value(0)).current;
    // const [opacityU, setOpacityU] = useState(new Animated.Value(1));

    const [opacityU, setOpacityU] = useState(1);

    // const leftToRight = () => {
    //     Animated.parallel([
    //         Animated.spring(heightU, {
    //             toValue: 500,
    //             duration: 1,
    //             useNativeDriver: false,
    //         }),
    //         // Animated.timing(opacityU, {
    //         //     toValue: 0,
    //         //     duration: 100,
    //         //     useNativeDriver: false,
    //         // }),
    //     ]).start();
    // };

    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -offset.value }],
        };
    });


    // const Drawup = () => {
    //     const curr_style = styles;
    //     const curr_moveUp = curr_style.moveUp;
    //     var curr_height = 0;
    //     for (let i = 0; i < 100; i++) {
    //         curr_height += 1;
    //         var new_style = {...curr_style, container: {opacity: 0.5}, moveUp: {...curr_moveUp , height: curr_height}};
    //         setStyles(new_style);
    //     }
    // }

    return (
        <View>
            <View style={{
                opacity: opacityU,
            }}
            onPress={() => {
                // if(offset.value === 200) {
                //     offset.value = 0;
                // }
                console.log(offset.value);
            }}
            >
                <ProgressBar progress={0.5}/>
                <ImageBackground source={require('../../assets/Crystal.jpg')} resizeMode="cover" style={styles.Image}>
                    <Button mode="contained" style={styles.capture} title='Camera' onPress={() => navigation.navigate('Camerapage')}>Use Camera</Button>
                    <Image source={require('../../assets/Capture_img.gif')} style={styles.Gif}/>
                    <Button mode="contained" style={styles.capture} title='Pick from library' onPress={() => {offset.value = withSpring(500);setOpacityU(0.3)}}>Get a picture from Gallery</Button>
                </ImageBackground>
            </View>
            <Animated.View style={[{
                height: 500,
                width: 393, 
                position: "absolute", 
                backgroundColor: "#dbf3fa", 
                bottom: -500, 
                right: 0,
            },animatedStyles]}>
                <Button mode="contained" icon="cancel" style={styles.close} onPress={() => {offset.value = withSpring(0);setOpacityU(1)}}>Close</Button>
                <Imgpick />
            </Animated.View>
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        opacity: 1,
    },
    capture: {
        margin: 20,
        borderRadius: 20
    },
    Image: {
        height: '100%',
        backgroundColor: '#000',
    },
    Gif: {
        width: 350,
        marginLeft: 25,
        borderRadius: 20,
    },
    close : {
        margin: 10,
        marginBottom: 20,
        width: 100,
        position: "absolute",
        right: 0,
        backgroundColor: "black",
    }
})


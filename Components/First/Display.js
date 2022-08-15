import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Button} from 'react-native-paper';
// import { Button, Layout } from '@ui-kitten/components';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import {useFonts} from 'expo-font'
import Second from '../Second/Second';
import { registerBackend } from '@tensorflow/tfjs-core';

export default function Display() {
    const navigation = useNavigation(); 
    const [loaded] = useFonts({
        Montserrat: require('../../assets/fonts/JosefinSans-VariableFont_wght.ttf'),
    });
    return (
        <View style={styles.container}>
        <ImageBackground source={require('../../assets/bg_img.jpg')} resizeMode="cover" style={styles.Image}>
            <View style={styles.card}>
                <Grid>
                    <Col>
                        <Image source={require('../../assets/Click.png')} style={styles.image}/>
                    </Col>
                    <Col>
                        <Text style={styles.text}>We take your picture as an input ...</Text>
                    </Col>
                </Grid>
            </View>

            <View style={styles.card}>
                <Grid>
                    <Col>
                        <Text style={styles.text}>Reconstruct the Hyperspectral equivalent</Text>
                    </Col>
                    <Col>
                        <Image source={require('../../assets/RGB2HS.png')} style={styles.ImageR}/>
                    </Col>
                </Grid>
            </View>

            <View style={styles.card}>
                <Grid>
                    <Col>
                        <Image source={require('../../assets/Fitz1.png')} style={styles.image}/>
                    </Col>
                    <Col>
                        <Text style={styles.text}>Classify the skin disease type ...</Text>
                    </Col>
                </Grid>
            </View>

            <View style={styles.card}>
                <Grid>
                    <Col>
                        <Text style={styles.text}>And finally !!, Get you your results ....</Text>
                    </Col>
                    <Col>
                        <Image source={require('../../assets/Click.png')} style={styles.ImageR}/>
                    </Col>
                </Grid>
            </View>
            <Button style={styles.button} icon={{source: "arrow-right", direction: "ltr "}} color="#ADD8E6" mode="contained"  onPress={() => navigation.navigate('Second')} status='primary'>
                <Text>
                    Continue
                </Text>
            </Button>
            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#B6BE52',
        flex: 1,
        paddingTop: 0,
    },
    icon:{
    },
    Image: {
        flex: 1,
        justifyContent: "center"
    },
    card:{
        backgroundColor: "white",
        flexDirection: "row",
        flexWrap: 'wrap',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 25,
    },
    image:{
        width: 150,
        height: 150,
        borderRadius: 25,
    },
    ImageR:{
        width: 150,
        height: 150,
        borderRadius: 25,
        marginLeft: 26,
    },
    text:{
        alignSelf: "center",
        fontSize: 20,
        marginLeft: 20,
        marginRight: 10,
        marginTop: 40,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
    },
    button:{
        marginTop: 40,
        width: 200,
        alignSelf: "center",
        borderRadius: 20,
    }
})
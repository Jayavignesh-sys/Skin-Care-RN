import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useState } from 'react'
import axios from 'axios'


export default function Third({navigation, route}) {
    
    const [loader, setLoader] = useState(false);
    const [tone, setTone] = useState(-1);

    const image = route.params.image;

    const getResultsTone = async () => {
        console.log(image);
        if(image){
            const formData = new FormData();
            formData.append('image', {
                uri: image,
                name: 'image.jpg',
                type: 'image/jpg'
            });
            try {
                setLoader(true);
                const response = await axios.post('http://192.168.43.191:5000/Tone', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(response.data)
                setTone(response.data);
                setLoader(false);
            }
            catch (error) {
                console.log(error)
            }
            // Api_call();
        }
        else{
            console.log("face not detected")
        }
    }

    const getResultsDisease = async () => {
        console.log(image);
        if(image){
            const formData = new FormData();
            formData.append('image', {
                uri: image,
                name: 'image.jpg',
                type: 'image/jpg'
            });
            try {
                setLoader(true);
                const response = await axios.post('http://192.168.43.191:5000/Disease', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(response.data)
                setTone(response.data);
                setLoader(false);
            }
            catch (error) {
                console.log(error)
            }
            // Api_call();
        }
        else{
            console.log("face not detected")
        }
    }

    const handlePress = async() => {
        getResultsTone();
    }
    
    return (
        <View>
        {loader ? 
            <View>
                <Image source={require('../../assets/Curve-Loading.gif')} style={styles.Gif} />
            </View>
            :
            <></>
        }
            <Button mode='contained' style={styles.Results} onPress={()=>{handlePress()}}>Get Results</Button>
        {tone>=0 ?
            <View style={styles.TContainer}>
                <Text style={styles.text}>Your tone is {tone} .....</Text>
            </View>
            :
            <View style={styles.TContainer}>
                <Text style={styles.text}>Click here to view your results</Text>
            </View>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    Results : {
        width: 200,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 100,
    },
    text : {
        fontSize: 20,
        fontWeight: "100",
        color: "green"
    },
    TContainer : {
        position: 'absolute',
        marginLeft: 75,
        marginTop: 50,
    },
    Gif: {
        width: 350,
        marginLeft: 25,
        marginTop: 100,
        borderRadius: 20,
    },
})
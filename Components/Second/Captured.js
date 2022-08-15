import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Camera } from 'expo-camera';
import {Avatar} from 'react-native-paper'
import { useState, useEffect } from 'react';
import * as FaceDetector from 'expo-face-detector';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons'; 
import { Button } from 'react-native-paper';
// import { Icon } from 'react-native-elements'

export default function Captured({iscaptured, setIscaptured, camera, setCamera, type, setType, takePicture, image, setImage}) {
    const navigation = useNavigation(); 
    const [error, setError] = useState(0);
    useEffect(() => {
        setError(0);
    }, [iscaptured]);

    const Api_call = async (image) => {
        console.log("Inside Api call");
        const res = await axios.get("http://192.168.43.191:5000/im_size");
        console.log(res)
    }

    const CheckFace = async () => {
        if(image){
                const formData = new FormData();
                formData.append('image', {
                    uri: image,
                    name: 'image.jpg',
                    type: 'image/jpg'
                });
                try {
                    const response = await axios.post('http://192.168.43.191:5000/Detect_skin', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    console.log(response.data)
                    if(response.data == "Absent"){
                        setError(1);
                    }
                    else{
                        navigation.navigate('Third', {image: image});
                    }
                }
                catch (error) {
                    console.log(error)
                }
                // Api_call();
            }
            else{
                console.log("face not detected")
            }
    };
    console.log(iscaptured);
    return (
        iscaptured?(
            
            <View style={styles.container}>
                {error?(
                    <Text>Face not detected !!!!! Retake required .....</Text>
                ):(
                    <Text></Text>
                )}
                <View style={styles.imagecontainer}>
                    <Text style={{color:'#000',fontSize:20}}>
                        {console.log(image)}
                        <Avatar.Image id="avatar" size={350} borderRadius={35} style={{backgroundColor:"#454545"}} source={{uri:image}}></Avatar.Image>
                    </Text>
                    <View style={styles.buttonrow}>
                        <Button mode="contained" style={styles.button2} onPress={() => {CheckFace()}}
                            // style={styles.capture}
                            // title="Proceed"
                            // id="proceed"
                            // onPress={() => {
                            //     CheckFace();
                            // }}
                        >
                            Proceed
                        </Button>
                        <Button mode="contained"
                            title="Retake"
                            style={styles.button2}
                            id="retake"
                            onPress={() => {
                                setIscaptured(false);
                                setImage(null);
                            }}
                        >
                            Retake
                        </Button>
                    </View>
                </View>
            </View>
        ):
        (
            <View style={styles.cameraContainer}>
                <Button mode="contained"
                    style={styles.capture}
                    icon="camera-switch"
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }}>
                    <Text style={{color:'#fff'}}>Flip</Text>
                </Button>
                <Camera 
                    ref={ref => setCamera(ref)} 
                    style={styles.camera} 
                    type={type} 
                    ratio={'1:1'} 
                />
                <Button mode="contained" icon="camera" title="Take Picture" style={styles.capture} onPress={() => takePicture()} >
                    <Text style={{color:'#fff'}}>Capture</Text>
                </Button>
            </View>
        )
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 0,
        aspectRatio: 0.7,
    },
    container: {
        marginTop: 100,
    },
    cameraContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 0,
    },
    imagecontainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    button: {
        height: '50%',
        // width: 50,
    },
    button2: {
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'black',
        alignSelf: "center", 
        justifyContent: "center",
        marginLeft: 30,
    },
    buttonrow: {
        flexDirection: 'row',
        marginTop: 40,
    },
    text: {
        marginTop: 5
    },
    capture: {
        width: 150,
        alignSelf: "center",
        margin: 20,
        borderRadius: 20
    },
    stretch: {
        width: 350,
        height: 350,
        resizeMode: 'center',
    },
})
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Captured from './Captured';
import DashedLine from 'react-native-dashed-line';
import * as ImagePicker from 'expo-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Imgpick from './Imgpick';
import {detectFaces} from "face-recognition-react-native";
import { ProgressBar, MD3Colors } from 'react-native-paper';


export default function Camerapage() {

    

    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [camera, setCamera] = useState(null);
    const [iscaptured, setIscaptured] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
            (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
        }, []);
    const takePicture = async () => {
                if(camera){
                const data = await camera.takePictureAsync(null);
                //console.log(data.uri)
                console.log(data)
                setIscaptured(true)
                setImage(data.uri)
            }
    };

    const onImageSelect = async (media) => {

        console.log(media.uri)
        setIscaptured(true)
        setImage(media.uri)
    }

    let openImagePickerAsync = () => {
        launchImageLibrary({mediaType: 'image'}, onImageSelect);
    }

        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styles.container}>
                <ProgressBar progress={0.75}/>
                <View>
                    <Captured iscaptured={iscaptured} setIscaptured={setIscaptured} camera={camera} setCamera={setCamera} type={type} setType={setType} takePicture={takePicture} image={image} setImage={setImage}></Captured>
                </View>
                <View><Text style={styles.text}></Text></View>
            </View>
        );
        }
        const styles = StyleSheet.create({
            capture: {
                height: 200,
                width: 300,
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: '#B6BE52',
                alignSelf: "center", 
                justifyContent: "center",
                borderRadius: 20
            },
        });
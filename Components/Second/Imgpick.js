import React, { useState, useEffect } from 'react';
import {Image, View, Platform, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Third from '../Third/Third';

export default function Imgpick() {
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [imageCheck, setImagecheck] = useState(false);
    const [skin, setSkin] = useState(1);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    const CheckFace = async () => {
        console.log(image)
        if(image){
            const formData = new FormData();
                formData.append('image', {
                    uri: image,
                    name: 'image.jpg',
                    type: 'image/jpg'
                });
                try {
                    setLoader(true);
                    const response = await axios.post('http://192.168.43.191:5000/Detect_skin', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    console.log(response.data)
                    setLoader(false);
                    setImagecheck(true);
                    if(response.data == "Present"){
                        setSkin(1);
                    }
                    else{
                        setSkin(0);
                    }
                }
                catch (error) {
                    console.log(error)
            }
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {!imageCheck ?
            image && loader ? 
                <View>
                    <Image source={require('../../assets/Curve-Loading.gif')} />
                </View>
                :
                image ?
                    <View>
                        <Image source={{ uri: image }} style={styles.pickedImage} />
                        <Button style={styles.Repick} mode='contained' onPress={pickImage}>Re-Pick</Button>
                        <Button style={styles.proceed} mode='contained' onPress={CheckFace}>Check Correctness</Button>
                    </View>
                    :
                    <View>
                        <Button style={styles.pick} mode='contained' onPress={pickImage}>Pick</Button>
                    </View>
            :
            <View>
                {skin === 1 ?
                    <View>
                        <Text style={{color: "green", fontSize: 20, fontWeight: "100"}}>Skin pixels detected !!!</Text>
                        <Button style={styles.proceed} mode='contained' icon="arrow-right" onPress={() => {navigation.navigate("Third",{image: image})}}>Proceed</Button>
                    </View>
                    :
                    <View>
                        <Text style={{color: "red", fontSize: 20, fontWeight: "100"}}>No skin pixels detected ....</Text>
                        <Button style={styles.proceed} mode='contained' onPress={() => {setImagecheck(false)}}>Re-pick Image</Button>
                    </View>
                }
            </View>
        }
        </View>
    );
}

var styles = StyleSheet.create({
    pick: {
        width: 100,
        marginBottom: 10,
        marginTop: 40,
        backgroundColor: 'black',
    },
    pickedImage: {
        width: 300,
        height: 300,
        marginBottom: 10,
        marginTop: 40,
    },
    proceed: {
        backgroundColor: "black",
        marginTop: 10,
        position: 'relative',
    },
});
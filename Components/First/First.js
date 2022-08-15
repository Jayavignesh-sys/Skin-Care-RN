import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Display from './Display';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar, MD3Colors } from 'react-native-paper';


export default function First() {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
        <ProgressBar progress={0.25}/>
        <Display/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

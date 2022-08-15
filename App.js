import { StyleSheet, Text, View } from 'react-native';
import First from './Components/First/First';
import Second from './Components/Second/Second';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Imgpick from './Components/Second/Imgpick';
import Camerapage from './Components/Second/Camerapage';
import Third from './Components/Third/Third';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PRISM App for Skin Care"
          component={First}
        />
        <Stack.Screen
          name="Second"
          component={Second}
        />
        <Stack.Screen
          name="Pick"
          component={Imgpick}
        />
        <Stack.Screen
          name="Camerapage"
          component={Camerapage}
        />
        <Stack.Screen
          name="Third"
          component={Third}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

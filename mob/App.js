import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Videos from './screens/Videos';
import { NativeBaseProvider } from 'native-base';
import VideoPlayerScreen from './screens/VideoPlayer';
const Stack = createStackNavigator();
//oi
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <Stack.Navigator>
        <Stack.Screen name="Videos" component={Videos} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
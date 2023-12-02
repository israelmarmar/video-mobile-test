import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Videos from './screens/Videos';
import { NativeBaseProvider } from 'native-base';
const Stack = createStackNavigator();
//oi
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <Stack.Navigator>
        <Stack.Screen name="Videos" component={Videos} />
      </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
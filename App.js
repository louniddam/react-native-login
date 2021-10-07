import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screen
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Profil from "./screens/Profil"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }}/>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

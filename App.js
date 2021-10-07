import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screen
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Profil from "./screens/Profil"
import ForgottenPassword from './screens/ForgottenPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }}/>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
      <Stack.Screen name="Profil" component={Profil} options={{ title: 'Profil' }} />
      <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} options={{ title: 'ForgottenPassword' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

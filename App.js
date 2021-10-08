import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screen
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Profil from "./screens/Profil"
import ForgottenPassword from './screens/ForgottenPassword';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = React.useState(false)

  const _getStoreData = async () => {
    try {
      const xsrfToken = await  AsyncStorage.getItem('xsrfToken')
      if(xsrfToken !== null)
          setIsSignedIn(true)
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    _getStoreData()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !isSignedIn ? (
            <React.Fragment>
              <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }}/>
              <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
              <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} options={{ title: 'ForgottenPassword' }} />
              <Stack.Screen name="Profil" component={Profil}  />
              <Stack.Screen name="Home" component={Home}  />
            </React.Fragment>
            )
            :
            (
            <React.Fragment>
            </React.Fragment>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

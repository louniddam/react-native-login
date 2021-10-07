import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import  AsyncStorage from '@react-native-async-storage/async-storage';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles';
import { View } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
// import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {

  const [hidePassword, setHidePassword] = useState(true);

  const _storeData = async (token) => {
    try {
      await AsyncStorage.setItem(
        "token", token
      );
    } catch (error) {
      console.log(error);
    }
  };

  const _getStoreData = async () => {
      try {
        const value = await  AsyncStorage.getItem('token')
        if(value !== null)
            // console.log("xsrf token from storage:",value);
            navigation.navigate('Profil')
      } catch (error) {
      console.log(error);
      }
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('../assets/flower.png')} />
        <PageTitle>Flower Crib</PageTitle>
        <SubTitle>Account Login</SubTitle>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
              const { email, password } = values
              try {
                axios.post("https://api.pote.dev/auth/login", {email, password})
                .then(res => {
                    console.log(res.data);
                    _storeData(res.data.xsrfToken)
                    try {
                        _getStoreData()
                    } catch (error) {
                        console.log(error);
                    }
                })
              } catch (error) {
                  console.log(error);
              }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                placeholder="andyj@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                icon="mail"
              />
              <MyTextInput
                label="Password"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                icon="lock"
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Login</ButtonText>
              </StyledButton>
              <ExtraView>
                <ExtraText>Don't have an account already? </ExtraText>
                <TextLink>
                  <TextLinkContent onPress={() => navigation.navigate('Signup')}>Signup</TextLinkContent>
                </TextLink>
              </ExtraView>
              <ExtraView>
                <ExtraText>You forgot your password?</ExtraText>
                <TextLink>
                  <TextLinkContent onPress={() => navigation.navigate('ForgottenPassword')}>Forgotten password</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        {/* <Octicons name={icon} size={30} color={brand} /> */}
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {/* {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
        </RightIcon>
      )} */}
    </View>
  );
};

export default Login;
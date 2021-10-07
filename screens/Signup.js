import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'

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
import { View, ScrollView } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
// import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <StyledContainer>
        <ScrollView>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('../assets/flower.png')} />
        <PageTitle>Flower Crib</PageTitle>
        <SubTitle>Account register</SubTitle>

        <Formik
          initialValues={{ email: '', password: '', lastname: '', firstname: '', username: '' }}
          onSubmit={(values) => {
            const { username, password, lastname, firstname, email } = values
            try {
                axios.post("https://api.pote.dev/users", {username, password, lastname, firstname, email})
                .then(res => {
                    console.log(res);
                    if(res)
                        navigation.navigate('Login')
                })
            } catch (error) {
                console.log(error);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Username"
                placeholder="Caballeiro"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
                <MyTextInput
                label="Firstname"
                placeholder="Jean"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
                value={values.firstname}
              />
                <MyTextInput
                label="Lastname"
                placeholder="Olive"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                value={values.lastname}
              />
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
                <ButtonText>Register</ButtonText>
              </StyledButton>
              <ExtraView>
                <ExtraText>Already have an account?</ExtraText>
                <TextLink>
                  <TextLinkContent onPress={() => navigation.navigate('Login')}>Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
      </ScrollView>
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
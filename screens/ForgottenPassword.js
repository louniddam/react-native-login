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
} from '../components/styles';
import { View } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
// import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

const ForgottenPassword = ({ navigation }) => {

  const [hidePassword, setHidePassword] = useState(true);
  const [isValid, setIsValid] = React.useState()

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('../assets/flower.png')} />
        <PageTitle>Flower Crib</PageTitle>
        <SubTitle>Forgotten password</SubTitle>

        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => {
              const { email } = values

              try {
                  axios.post("https://api.pote.dev/auth/forgot_password", { email })
                  .then(res => {
                      if(res.status === 200)
                      setIsValid(true)
                  })
              } catch (error) {
                  console.log(error);
              }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address you registered with"
                placeholder="andyj@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                icon="mail"
              />
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Send email</ButtonText>
              </StyledButton>
              {
                  isValid === true &&
                  <ExtraView>
                    <ExtraText style={{ color: "green" }}>An email to reset your password have been sent!</ExtraText>
                </ExtraView>
              }
              <ExtraView>
                <ExtraText>Go back to</ExtraText>
                <TextLink>
                  <TextLinkContent onPress={() => navigation.navigate('Login')}>Login</TextLinkContent>
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
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default ForgottenPassword;
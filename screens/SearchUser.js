import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import { _getStoreData, _storeData } from '../utils/localStorage';
import { addToken } from '../utils/api'
import api from '../utils/api'

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
  ColumnContainer,
  Colors,
} from './../components/styles';
import { View } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
// import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

const SearchUser = ({ navigation }) => {

  const [user, setUser] = React.useState([]);


  const getUser = async (email) => {
    try {
        const user = await api.get(`/users/email/${email}`)
        setUser(user.data)
        console.log(user.data);

    } catch (error) {
        const err = JSON.parse(JSON.stringify(error))
        if(err.status === 401) {
            const refreshToken = await _getStoreData("refreshToken")
            const userEmail = await _getStoreData("userInfos")
            const tokens = await api.post("auth/token", { "refresh_token": refreshToken, "email": userEmail.email })
            console.log(tokens.data);
            try {
              await _storeData("xsrfToken", tokens.data.xsrfToken)
              await  _storeData("accessToken", tokens.data.accessToken)
              await _storeData("refreshToken", tokens.data.refreshToken)
              await addToken()
              const user = await api.get(`/users/email/${email}`)
              setUser(user.data)
            } catch (error) {
              navigation.navigate("Login")
            }
        }
    }
  }

  return (
     <StyledContainer>
     <StatusBar style="dark" />
     <InnerContainer>
       <PageLogo resizeMode="cover" source={require('../assets/flower.png')} />
       <SubTitle>Search a user</SubTitle>

       <Formik
         initialValues={{ email: '' }}
         onSubmit={async (values) => {
             const { email } = values
             try {
                 console.log("lol");
                getUser(email)
               } catch (error) {
                 console.log(error);
             }
         }}
       >
         {({ handleChange, handleBlur, handleSubmit, values }) => (
           <StyledFormArea>
             <MyTextInput
               label="Search by Email"
               placeholder="andyj@gmail.com"
               placeholderTextColor={darkLight}
               onChangeText={handleChange('email')}
               onBlur={handleBlur('email')}
               value={values.email}
               keyboardType="email-address"
               icon="mail"
             />
             <StyledButton onPress={handleSubmit}>
               <ButtonText>Search</ButtonText>
             </StyledButton>
             <ExtraView>
               <TextLink>
                <TextLinkContent onPress={() => navigation.navigate('Home')}>Home</TextLinkContent>
                <TextLinkContent onPress={() => navigation.navigate('Profil')}>Profil</TextLinkContent>
               </TextLink>
             </ExtraView>
           </StyledFormArea>
         )}
       </Formik>

       <ColumnContainer>
            <ExtraText style={{color: 'purple'}} >Username</ExtraText>
            <ExtraText>{user.username}</ExtraText>
            <Line />
            <ExtraText style={{color: 'purple'}} >Firstname</ExtraText>
            <ExtraText>{user.firstname}</ExtraText>
            <Line />
            <ExtraText style={{color: 'purple'}} >Lastname</ExtraText>
            <ExtraText>{user.lastname}</ExtraText>
            <Line />
            <ExtraText style={{color: 'purple'}} >Email</ExtraText>
            <ExtraText>{user.email}</ExtraText>
        </ColumnContainer>
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
  

export default SearchUser;
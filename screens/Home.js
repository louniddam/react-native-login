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

const Home = ({ navigation }) => {

  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    try {
        const users = await api.get("/users")
        setUsers(users.data)
    } catch (error) {
        const err = JSON.parse(JSON.stringify(error))
        if(err.status === 401) {
            const refreshToken = await _getStoreData("refreshToken")
            const userEmail = await _getStoreData("userInfos")
            const tokens = await api.post("auth/token", { "refresh_token": refreshToken, "email": userEmail.email })
            console.log(tokens.data);
            //restock les token
            //recall
            //if fail navigate
        }
    }
  }

  React.useEffect(() => {
    getUsers()
  }, [])

  return (
    <StyledContainer>
        <ColumnContainer>
      {
          users.map((user, index) => {
            return(
                <React.Fragment key={index}>
                    <ExtraView>
                        <ExtraText>Username</ExtraText>
                        <ExtraText>{user.username}</ExtraText>
                    </ExtraView>
                    <ExtraView>
                        <ExtraText>email</ExtraText>
                        <ExtraText>{user.email}</ExtraText>
                    </ExtraView>
                    <ExtraView>
                        <ExtraText>firstname</ExtraText>
                        <ExtraText>{user.firstname}</ExtraText>
                    </ExtraView>
                    <Line />
                </React.Fragment>
            )
          })
      }
      </ColumnContainer>
    </StyledContainer>
  );
};

export default Home;
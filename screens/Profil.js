import React from 'react';
import { _getStoreData } from '../utils/localStorage';
import {
    ColumnContainer, ExtraText, Line, StyledContainer, ExtraView, TextLink, TextLinkContent
} from './../components/styles';


const Profil = ({ navigation }) => {

    const [email, setEmail] = React.useState("")
    const [firstname, setFirstname] = React.useState("")
    const [lastname, setLastname] = React.useState("")
    const [username, setUsername] = React.useState("")

    const getUserInfos = async () => {

    const infos = await _getStoreData("userInfos")
        setEmail(infos.email)
        setFirstname(infos.firstname)
        setLastname(infos.lastname)
        setUsername(infos.username)
    }

    React.useEffect(() => {
        getUserInfos()
    }, [])

    return(
        <StyledContainer>
            <ColumnContainer>
                <ExtraText style={{color: 'purple'}} >Username</ExtraText>
                <ExtraText>{username}</ExtraText>
                <Line />
                <ExtraText style={{color: 'purple'}} >Firstname</ExtraText>
                <ExtraText>{firstname}</ExtraText>
                <Line />
                <ExtraText style={{color: 'purple'}} >Lastname</ExtraText>
                <ExtraText>{lastname}</ExtraText>
                <Line />
                <ExtraText style={{color: 'purple'}} >Email</ExtraText>
                <ExtraText>{email}</ExtraText>
            </ColumnContainer>
            <ExtraView>
                <TextLink>
                  <TextLinkContent onPress={() => navigation.navigate('Home')}>Home</TextLinkContent>
                  <TextLinkContent onPress={() => navigation.navigate('SearchUser')}>Search a User</TextLinkContent>
                </TextLink>
            </ExtraView>
        </StyledContainer>
    )
}

export default Profil
import React, { useState } from 'react';
import { Ionicons, Octicons } from '@expo/vector-icons';
import {
  ButtonText,
  Colors,
  ExtraText,
  ExtraView,
  InnerContainer,
  LeftIcon,
  Line,
  MessageBox,
  PageLogo,
  PageTitle,
  RightIcon,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  SubTitle,
  TextLink,
  TextLinkContent,
} from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { ActivityIndicator, View } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import Config from '../Config';

const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials, setSubmitting) => {
    axios.post(`${Config.URL}/user/login`, credentials)
      .then((response) => {
        const result = response.data;
        const {user_id, session_token} = result
        console.log(user_id, session_token)
        navigation.navigate("HomeScreen")
        setSubmitting(false)
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            handleMessage("Email or Password doesn't match")
          } else if (error.response.status === 500) {
            handleMessage("Service Not Available Now")
          }
        } else {
          handleMessage("No Internet")
        }
        setSubmitting(false)
      })
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style='dark' />
        <InnerContainer>
          <PageLogo resizeMode='cover' source={require('./../assets/img/coffee_cup_transparent.jpg')} />
          <PageTitle>CoffiDa</PageTitle>
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, {setSubmitting}) => {
              if (values.email === '' || values.password === '') {
                handleMessage('Please fill all the  fields')
                setSubmitting(false)
              } else {
                handleLogin(values, setSubmitting)
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values , isSubmitting}) => <StyledFormArea>
              <MyTextInput
                label='Email Address'
                icon='mail'
                placeholder='johndoe@example.com'
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType='email-address'
                value={values.email}
              />

              <MyTextInput
                label='Password'
                icon='lock'
                placeholder='* * * * * * * *'
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MessageBox type={messageType}>{message}</MessageBox>
              {!isSubmitting && <StyledButton onPress={handleSubmit}>
                <ButtonText>Login</ButtonText>
              </StyledButton>}
              {isSubmitting && <StyledButton disabled={true}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </StyledButton>}
              <Line />

              <ExtraView>
                <ExtraText>Don't have an account already?</ExtraText>
                <TextLink onPress={() => {navigation.navigate("SignUpScreen")}}>
                  <TextLinkContent>Signup</TextLinkContent>
                </TextLink>
              </ExtraView>

            </StyledFormArea>}
          </Formik>
        </InnerContainer>
      </StyledContainer>

    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {

  return (<View>
    <StyledInputLabel>{label}</StyledInputLabel>
    <LeftIcon>
      <Octicons name={icon} size={30} color={Colors.brand} />
    </LeftIcon>
    <StyledTextInput {...props} />
    {isPassword && (
      <RightIcon onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight} />
      </RightIcon>
    )}
  </View>);
};
export default Login;

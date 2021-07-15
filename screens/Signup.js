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
import { View } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import Config from '../Config';

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleSignup = (credentials, setSubmitting) => {
    axios.post(`${Config.URL}/user`, credentials)
      .then((response) => {
        const result = response.data;
        const { user_id, session_token } = result;
        console.log(user_id, session_token);
        setSubmitting(false);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            handleMessage('Email or Password doesn\'t match');
          } else if (error.response.status === 500) {
            handleMessage('Service Not Available Now');
          }
        } else {
          handleMessage('No Internet');
        }
        setSubmitting(false);
      });
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style='dark' />
        <InnerContainer>
          <PageTitle>CoffiDa</PageTitle>
          <SubTitle>Create Account</SubTitle>
          <Formik
            initialValues={{
              last_name: '',
              first_name: '',
              email: '',
              password: '',
              password2: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.last_name === '' || values.first_name === ''
                || values.email === '' || values.password === ''
                || values.password2 === '') {
                handleMessage('Please fill all the  fields');
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => <StyledFormArea>
              <MyTextInput
                label='First Name'
                icon='person'
                placeholder='John'
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
              />
              <MyTextInput
                label='Last Name'
                icon='person'
                placeholder='Doe'
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
              />
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
              <MyTextInput
                label='Confirm Password'
                icon='lock'
                placeholder='* * * * * * * *'
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('password2')}
                onBlur={handleBlur('password2')}
                value={values.password2}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MessageBox />
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Create Account</ButtonText>
              </StyledButton>
              <Line />

              <ExtraView>
                <ExtraText>Already have an account?</ExtraText>
                <TextLink>
                  <TextLinkContent>Login</TextLinkContent>
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
export default SignUp;

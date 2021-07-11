import React from 'react';
import { Octicons } from '@expo/vector-icons';
import {
  Colors,
  InnerContainer,
  LeftIcon,
  PageLogo,
  PageTitle,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  SubTitle,
} from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View } from 'react-native';

const Login = () => {
  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <InnerContainer>
        <PageLogo resizeMode='cover' source={require('./../assets/img/coffee_cup_transparent.jpg')} />
        <PageTitle>CoffiDa</PageTitle>
        <SubTitle>Account Login</SubTitle>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => <StyledFormArea>
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
              secureTextEntry={true}
            />
          </StyledFormArea>}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, ...props }) => {
  return (<View>
    <StyledInputLabel>{label}</StyledInputLabel>
    <LeftIcon>
      <Octicons name={icon} size={30} color={Colors.brand} />
    </LeftIcon>
    <StyledTextInput {...props} />
  </View>);
};
export default Login;

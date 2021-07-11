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
import { View } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
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
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("HomeScreen")
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
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MessageBox>...</MessageBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Login</ButtonText>
              </StyledButton>
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

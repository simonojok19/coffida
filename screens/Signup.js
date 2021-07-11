import React, { useState } from 'react';
import { Ionicons, Octicons, Fontisto } from '@expo/vector-icons';
import {
  ButtonText,
  Colors, ExtraText, ExtraView,
  InnerContainer,
  LeftIcon, Line, MessageBox,
  PageLogo,
  PageTitle,
  RightIcon,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  SubTitle, TextLink, TextLinkContent,
} from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View } from 'react-native';

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
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
            password1: '',
            password2: ''
          }}
          onSubmit={(values) => {
            console.log(values);
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
              onChangeText={handleChange('password1')}
              onBlur={handleBlur('password1')}
              value={values.password1}
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
            <MessageBox/>
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

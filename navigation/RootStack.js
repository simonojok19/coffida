import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/Signup';
import HomeScreen from '../screens/HomeScreen';
import { Colors } from '../components/styles';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent'
        },
        headerTintColor: Colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20
        }
      }}
      initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
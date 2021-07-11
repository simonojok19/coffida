import React from 'react';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Text, View } from 'react-native';

const HomeScreen = () => {
  return (<KeyboardAvoidingWrapper>
    <View>
      <Text>Hello Dashboard</Text>
    </View>
  </KeyboardAvoidingWrapper>);
}

export default HomeScreen
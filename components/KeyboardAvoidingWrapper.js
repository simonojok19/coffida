import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingWrapper;
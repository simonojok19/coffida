import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingWrapper;
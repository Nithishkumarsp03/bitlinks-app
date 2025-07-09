import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const InputField = ({ placeholder, secureTextEntry, keyboardType }) => {
  const [borderColor, setBorderColor] = useState('#ccc'); // Default border color

  return (
    <View style={[styles.inputContainer, { borderColor }]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setBorderColor('#2867b2')}  // Change border on focus
        onBlur={() => setBorderColor('#ccc')}      // Reset border on blur
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 40,
    justifyContent: 'center',
    // marginVertical: 10,
    color: 'black',
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
});

export default InputField;

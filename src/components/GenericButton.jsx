import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { genericButtonStyle } from '../styles/buttons';

export const GenericButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={genericButtonStyle.button} onPress={onPress}>      
      <Text style={genericButtonStyle.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
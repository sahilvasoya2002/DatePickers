import React from 'react';
import { Text, TouchableOpacity } from "react-native";


const Button = ({title, onPress , buttonStyle , textStyle}: any) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
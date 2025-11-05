import React, { useCallback, useState } from 'react';
import { TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface InputFieldProps {
  placeholder: string;
  isPassword?: boolean;
  inputStyle?: any;
  containerStyle?: any;
  value: string;
  onChangeText: (text: string) => void;
}
const InputField = ({
  placeholder,
  isPassword = false,
  inputStyle,
  containerStyle,
  value,
  onChangeText,
}: InputFieldProps) => {
    const [isVisible , setIsVisisble] = useState(false);

    const onPressIcon = useCallback(()=>{
        setIsVisisble(!isVisible);
    },[isVisible]);
  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={isVisible}
        value={value}
        onChangeText={onChangeText}
      />
      {/* {isPassword && <TouchableOpacity style={styles.iconContainer} onPress={onPressIcon}><Image source={!isVisible ? require('../Assets/Images/visible.png') : require('../Assets/Images/invisible.png')} style={!isVisible ? styles.visibleIcon : styles.inVisibleIcon}/></TouchableOpacity>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer : {
    height : 20 , width : 20 , justifyContent:'center' , alignItems:'center' , textAlign:'center',
  },
  visibleIcon : {
    height:12 , width:18,
  },
  inVisibleIcon : {
    height:16 , width:18,
  },
  });

export default InputField;

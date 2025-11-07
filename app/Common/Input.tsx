import React, { useCallback, useState } from 'react';
import { TextInput, View, StyleSheet, Image, TouchableOpacity, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  isPassword?: boolean;
  inputStyle?: any;
  containerStyle?: any;
}

const InputField = ({
  placeholder,
  isPassword = false,
  inputStyle,
  containerStyle,
  value,
  onChangeText,
  ...rest
}: InputFieldProps) => {
  const [isVisible, setIsVisible] = useState(isPassword);

  const onPressIcon = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={isPassword && isVisible}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#666',
  },
});

export default InputField;

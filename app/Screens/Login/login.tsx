import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import InputField from '../../Common/Input';
import Button from '../../Common/button';
import { isEmail, isEmpty } from '../../Common/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images } from '../../Common/images';

const Login = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = useCallback(async () => {
    try {
      if (isEmpty(email) || isEmpty(password)) {
        Alert.alert('Fields cannot be empty');
        return;
      }
      if (!isEmail(email)) {
        Alert.alert('Please enter a valid email address');
        return;
      }

      const payload = { email, password };

      // Save email and password to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(payload));

      Alert.alert('Login Successful', 'Your credentials have been saved.');
      navigation.navigate('Home');

      console.log('Login Payload:', payload);
    } catch (error) {
      console.log('Error during login:', error);
    }
  }, [email, navigation, password]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Image
        source={Images.Logo}
        style={styles.logo}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Please Sign In to continue</Text>
        <View style={{flexDirection: 'column', gap: 20, marginTop: 10}}>
          <InputField
            placeholder="Email"
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={handleEmailChange}
            value={email}
          />
          <InputField
            placeholder="Password"
            isPassword
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={handlePasswordChange}
            value={password}
          />
        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button title="SIGN IN" onPress={handleSubmit} buttonStyle={styles.button} textStyle={styles.buttonText}/>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.signUpText}>
          Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
},
logo: {
    width: 140,
    height: 140,
    marginBottom: 40,
    marginTop :80
  },
  card: {
    backgroundColor: '#555',
    // padding: 20,
    borderRadius: 10,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign:'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    height: 50,
    // justifyContent:'space-between'
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#fff',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#B64425',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#fff',
    marginTop: 20,
  },
  signUpLink: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
});

export default Login;

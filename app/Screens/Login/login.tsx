import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import InputField from '../../Common/Input';
import Button from '../../Common/button';
import { isEmail, isEmpty } from '../../Common/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../api/auth';
import { IMAGES } from '../../Assets/Images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../Common/colors';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    navigation.navigate('Home');
    setEmailError('');
    setPasswordError('');
    setApiError('');

    let hasError = false;

    if (isEmpty(email)) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!isEmail(email)) {
      setEmailError('Please enter a valid email.');
      hasError = true;
    }

    if (isEmpty(password)) {
      setPasswordError('Password is required.');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const data = await loginUser(email, password);
      console.log('Login Response:', data);

      if (data?.status === 'success') {
        await AsyncStorage.setItem('user', JSON.stringify(data));
        navigation.navigate('Home');
      } else {
        setApiError(data?.message || 'Invalid credentials. Please try again.');
      }
    } catch (error: any) {
      setApiError(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDF6EC' }} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#FDF6EC" barStyle="dark-content" />

            <Image
              source={IMAGES.LOGO}
              style={[
                styles.logo,
                { marginTop: isKeyboardVisible ? 0 : 80 },
              ]}
              resizeMode="contain"
            />

            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.bottomSheet}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue your journey</Text>

                <View style={styles.formContainer}>
                  <InputField
                    placeholder="Email"
                    inputStyle={styles.input}
                    containerStyle={[
                      styles.inputContainer,
                      emailError ? styles.errorBorder : {},
                    ]}
                    onChangeText={text => {
                      setEmail(text);
                      if (emailError) setEmailError('');
                    }}
                    value={email}
                  />
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                  <InputField
                    placeholder="Password"
                    isPassword
                    inputStyle={styles.input}
                    containerStyle={[
                      styles.inputContainer,
                      passwordError ? styles.errorBorder : {},
                    ]}
                    onChangeText={text => {
                      setPassword(text);
                      if (passwordError) setPasswordError('');
                    }}
                    value={password}
                  />
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                {loading ? (
                  <ActivityIndicator size="large" color="#8B4513" style={{ marginTop: 20 }} />
                ) : (
                  <Button
                    title="SIGN IN"
                    onPress={handleSubmit}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                  />
                )}

                {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}

                <View style={styles.bottomContainer}>
                  <Text style={styles.signUpText}>
                    Don’t have an account?{' '}
                    <Text style={styles.signUpLink}>Sign Up</Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 180,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 35,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6D4C41',
    marginBottom: 25,
    textAlign: 'center',
  },
  formContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
  },
  errorBorder: {
    borderColor: '#D32F2F',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#3C2A21',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 6,
  },
  apiErrorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotPassword: {
    color: '#A0522D',
    fontWeight: '600',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#3C2A21',
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: '700',
    color: '#8B4513',
  },
});

export default Login;

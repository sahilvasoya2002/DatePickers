import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SpalshScreen = ({navigation}: any) => {
  const [screen, setScreen] = useState('Login'); // Default to 'Login'

  useEffect(() => {
    const loadScreen = async () => {
      try {
        const data = await AsyncStorage.getItem('user'); // Await the async call
        console.log(data)
        if (data && JSON.parse(data)) {
          setScreen('Home');
        } else {
          setScreen('Login');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadScreen();
  }, []);

  const loadData = useCallback(async () => {
    // remove user signup so pass Start screen
    try {
      setTimeout(async () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          }),
        );
      }, 1000);
    } catch (error) {
      console.log('error', error);
    }
  }, [navigation]);

  useEffect(() => {
    loadData(), [];
  });

  return (
    <View></View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    color: 'red',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default SpalshScreen;

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGES } from '../../Assets/Images';

const SpalshScreen = ({navigation}: any) => {
  const [screen, setScreen] = useState('Login');

  useEffect(() => {
    const loadScreen = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
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
    try {
      setTimeout(async () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: screen,
              },
            ],
          }),
        );
      }, 1500);
    } catch (error) {
      console.log('error', error);
    }
  }, [navigation, screen]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.LOGO} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 160,
    resizeMode: 'contain',
  },
});

export default SpalshScreen;

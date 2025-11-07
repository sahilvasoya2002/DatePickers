import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import SpalshScreen from '../Screens/Splash/splash';
import Login from '../Screens/Login/login';
import BombGame from '../Screens/Home/home';

const Stack = createStackNavigator();

const ShowHeader = {
  headerShown: true,
};
const HideHeader = {
  headerShown: false,
};

export default function AppNavigator() {
  return (
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name={'Splash'} component={SpalshScreen} options={HideHeader} />
          <Stack.Screen name={'Login'} component={Login} options={HideHeader} />
          <Stack.Screen name={'Home'} component={BombGame} options={HideHeader} />
        </Stack.Navigator>
  );
}

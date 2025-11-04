import * as React from 'react';
import {Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreenModule/splashScreen';
// import Home from '../Screens/HomeModule/home';

const Stack = createNativeStackNavigator();

const ShowHeader = {
  headerShown: true,
};
const HideHeader = {
  headerShown: false,
};

const Homes = () => (
  <View style={{justifyContent: 'center', backgroundColor: 'red', alignItems:'center' , flex: 1}}>
    <Text style={{color: 'black'}}>Hello</Text>
  </View>
);
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}>
      <Stack.Screen
        name={'Splash'}
        component={SplashScreen}
        options={HideHeader}
      />
      <Stack.Screen name={'Login'} component={Homes} options={HideHeader} />
      {/* <Stack.Screen name={'Home'} component={Home} options={HideHeader} /> */}
      <Stack.Screen name={'Gallery'} component={Homes} options={ShowHeader} />
      <Stack.Screen name={'Products'} component={Homes} options={ShowHeader} />
      <Stack.Screen
        name={'ProductDetail'}
        component={Homes}
        options={ShowHeader}
      />
    </Stack.Navigator>
  );
}
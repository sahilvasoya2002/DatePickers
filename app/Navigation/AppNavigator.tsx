import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Text, View} from 'react-native';
// import { useSelector } from 'react-redux';
import SpalshScreen from '../Screens/Splash/splash';
import Login from '../Screens/Login/login';
import Home from '../Screens/Home/home';

const Stack = createStackNavigator();

const ShowHeader = {
  headerShown: true,
};
const HideHeader = {
  headerShown: false,

};

const Homes: any = () => (
  <View style={{justifyContent:'center' , backgroundColor:'red' , flex :1}}>
    <Text style={{color:'red'}}>Hello</Text>
  </View>
);

export default function AppNavigator() {
  // const productReducer = useSelector((state: any) => state.app);
    // const {loading} = productReducer;
    // console.log('--',loading)
  return (
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name={'Splash'} component={SpalshScreen} options={HideHeader} />
          <Stack.Screen name={'Login'} component={Login} options={HideHeader} />
          <Stack.Screen name={'Home'} component={Home} options={ShowHeader} />
          <Stack.Screen name={'Gallery'} component={Homes} options={ShowHeader} />
          <Stack.Screen name={'Products'} component={Homes} options={ShowHeader} />
          <Stack.Screen name={'ProductDetail'} component={Homes} options={ShowHeader} />
        </Stack.Navigator>
  );
}

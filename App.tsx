import React from 'react';
import { StyleSheet, View} from 'react-native';
// import {Provider, useSelector} from 'react-redux';
// import store from './app/Reducers/Store';
import AppNavigator from './app/Navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  console.log('hello')
  return (
    <SafeAreaProvider style={{flex:1}}>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        <AppNavigator />
        </NavigationContainer>
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
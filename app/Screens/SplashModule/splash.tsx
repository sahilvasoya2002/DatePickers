import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {CommonActions} from '@react-navigation/native';

const SplashScreen = ({navigation}:any) => {

//   const loadData = useCallback(async () => {
//     try {
//       setTimeout(async () => {
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [
//               {
//                 name: 'Home',
//               },
//             ],
//           }),
//         );
//       }, 1000);
//     } catch (error) {
//       console.log('error', error);
//     }
//   }, [navigation]);


//   useEffect(() => {
//     loadData();
//   },[loadData]);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Text>dsd</Text>
      </>
    </SafeAreaView>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {height: 294, width: 294},
});
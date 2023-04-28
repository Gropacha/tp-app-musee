import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleContext } from '../contexts/style.context';
import Musee from './Musee';
import Accueil from './Accueil';

const Stack = createNativeStackNavigator();

const NavigationMusee = () => {
    const { styles } = useContext(StyleContext);
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={Accueil} name="accueil"/>
        <Stack.Screen component={Musee} name="musee"/>
    </Stack.Navigator>
  );
}

export default NavigationMusee


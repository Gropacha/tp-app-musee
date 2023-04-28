import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleContext } from '../contexts/style.context';
import { ProfilContext } from '../contexts/profil.context';
import Accueil from './Accueil';
import Login from './Login';
import { maintenant } from '../utilitaires/formatDate';

const Menu = createBottomTabNavigator();

const Affichage = ({tokenConnexion}) => {
  const { styles } = useContext(StyleContext);
  const { token, setToken} = useContext(ProfilContext);

  useEffect( ()=> {
    setToken(tokenConnexion);
    console.log(maintenant(),"| token (Affichage)", tokenConnexion);
  } , [])

  return (
    
    <View style={styles.container}>
      <NavigationContainer>
        <Menu.Navigator
        id="menuPrincipal"
        screenOptions={{
          tabBarActiveBackgroundColor: '#456',
          tabBarShowLabel : false
        }}>
            <Menu.Screen 
            name="Accueil" 
            component={Accueil}
            options={{
              tabBarIcon : function(){
                return <MaterialCommunityIcons name ="home" color="#dcb" size={40} />
              }
            }} />
            <Menu.Screen 
            name="Profil" 
            component={Login}
            options={{
              tabBarIcon : function(){
                return <MaterialCommunityIcons name="account" color="#dcb" size={40} />
              }
            }} />


        </Menu.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true}/>
    </View>
  )
}

export default Affichage;

///////////////// FIN DU FICHIER
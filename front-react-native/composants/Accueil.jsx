import { Button, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleContext } from '../contexts/style.context';
import { ProfilContext } from '../contexts/profil.context';

import { getProfilServeur } from '../controllers/profil.controller';


const Accueil = () => {

  const { styles } = useContext(StyleContext);
  const { profil, setProfil, token, setToken, isLogged, setIsLogged } = useContext(ProfilContext);

  const  [message, setMessage] = useState("message par défaut");
  
  return (
  <View style={styles.box}>
    <Text style={styles.titre}> Bienvenue sur notre musée virtuel </Text>
  </View>
  );
  

  
}

export default Accueil
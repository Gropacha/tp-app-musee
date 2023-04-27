import { Text, View } from 'react-native'
import React, { useContext } from 'react'
import { StyleContext } from '../contexts/style.context';


const Accueil = () => {
  const { styles } = useContext(StyleContext);
  return (
    <View  style={ styles.box }>
      <Text style={ styles.titre }>Accueil</Text>
    </View>
  )
}

export default Accueil
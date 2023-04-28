import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { url } from '../config.front'

const Musee = () => {
    [ collection, setCollection] = useState([])

const oeuvresFromServeur = async () => {
    const res = await fetch(url+"oeuvre");
    const collectionMusee = await res.json();
    setCollection(collectionMusee);
}

useEffect( ()=> oeuvresFromServeur(), [])

  return (
    <View>
      <Text>Musee</Text>
      { (collection.length!==0)?  
          <FlatList
          data={collection}
          keyExtractor={item=>item._id}
          renderItem={ ({item}) =>
          <View>

          </View>

          }
          />
          :
          <></>
      }
    </View>
  )
}

export default Musee
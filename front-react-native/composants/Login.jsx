import { Button, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleContext } from '../context/style.context';
import { UserContext } from '../context/user.context';
import axios from 'axios';


const Login = () => {

  const { user, userInit } = useContext(UserContext);
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [message, setMessage] = useState('hello');

  const creationCompte = async  () => {
    const identifiants = {
      "email": email.trim(),
      "password": password.trim()
    };
    console.log("avant fetch: ", identifiants);
    ////////////////////////////////////////////////////////// ARRGGGGGGGGGGGGGGHHHHH____________/
   ////////      REACT-NATIVE                    //////////// ARRGGGGGGGGGGGGGGHHHHH____________/
  ////////     http://localhost: devient !!!    //////////// ARRGGGGGGGGGGGGGGHHHHH____________/
 ////////    http://10.0.2.2:                  //////////// ARRGGGGGGGGGGGGGGHHHHH____________/
//////////////////////////////////////////////////// ARRGGGGGGGGGGGGGGHHHHH____________/
//             //    //      //////   ////   //  ///  ////   //   ///////
 //           //    ////     //  //   // //  //  ///  // //  //   //
  //    //   //    //  //    /////    //  // //  ///  //  // //   //  ///
   // // // //    ////////   //  //   //   ////  ///  //   ////   //   //
    //    //     //      //  //   //  //     //  ///  //    ///   ///////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
/////  remarque : créer une CONST qui contient l'adresse de l'API   //////
/////////////////////////////////////////////////////////////////////////
        const url = new URL("http://10.0.2.2:777/user");
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(identifiants)
        }).then((res)=>res.json())
          .then((data)=>console.log("succès ",data))
          .catch((err)=>console.log("erreur ", err))
        
  }

  const { styles } = useContext(StyleContext);
  return (
    <View  style={ styles.box }>
      <Text style={ styles.titre }>Login</Text>
      <TextInput maxLength={50} inputMode='email' placeholder='email' style={styles.input} onChangeText={(text)=>setEmail(text)} value={email}/>
      <TextInput maxLength={50} placeholder='password' style={styles.input} onChangeText={(text)=>setPassword(text)} value={password}/>
      <Button title="créer un compte" onPress={creationCompte}/>
      {/* {message && <Text style={styles.alert}>{message}</Text>} */}
    </View>
  )
}

export default Login
import { url } from "../config.front";
import { Button, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleContext } from '../contexts/style.context';
import { maintenant } from '../utilitaires/formatDate';
import { ProfilContext } from '../contexts/profil.context';
import { saveTokenIntoSQLITE } from '../utilitaires/saveSqlite';

const Login = () => {
 
  const { profil, setProfil, token, setToken, setIsLogged } = useContext(ProfilContext);

  const [ message, setMessage ] = useState("Rejoignez-nous");

  const [identifiants, setIdentifiants] = useState({
    email: "testfinal@yahoo.fr",
    password: "Qwerty12345"
  });

  const creationCompte = async  () => {
       try {
            const res = await fetch(
              url+"user", {
                method: 'POST', 
                headers:{'Content-Type': 'application/json;charset=utf-8'}, 
                body: JSON.stringify(identifiants)
              });
            const reponseJson = await res.json();
            if (res.status==200){
                const { pseudo, email, password }  = reponseJson;
                setProfil({...profil, pseudo, email, password})
                setIdentifiants({email:"", password:""});
                setMessage("Création de compte : "+pseudo);
              } else {
                setMessage(reponseJson.msg);
            }
        } catch (err) {
            setMessage("err");
            console.log(maintenant(), "| creationCompte : ", err);
      }       
  } // FIN DE creationCompte()

  const loginJWT = async  () => {
      try {
          const res = await fetch(
            url+"login", {
            method: 'POST', 
            headers:{'Content-Type': 'application/json;charset=utf-8'}, 
            body: JSON.stringify(identifiants)
          });
          const reponseJson = await res.json();
          if (res.status==200){
            const { _id, token }  = reponseJson;
              setToken({ _id, token });
              setIsLogged(true);
              saveTokenIntoSQLITE({ _id, token });
              setMessage("Login réussi");
              console.log(maintenant(),"| token (Login)", { _id, token });
              setIdentifiants({email:"", password:""});
          } else {
              setMessage(reponseJson.msg);
          }
        //   console.log(maintenant(), "| Login.jsx | Login : ", profil.pseudo, reponseJson);
      } catch (err) {
        //   setMessage("err");
          console.log(maintenant(), "| loginJWT : ", err);
      }       
} // FIN DE loginJWT()

  const { styles } = useContext(StyleContext);
  return (<View  style={ styles.box }>

      {(profil.email==="")&&<><Text style={ styles.titre }>Connexion</Text>
      <TextInput maxLength={50} inputMode='email' placeholder='email' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, email:text})} value={identifiants.email}/>
      <TextInput maxLength={50} placeholder='password' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, password:text})} value={identifiants.password}/>
      <Button title="Créer un compte" onPress={()=>creationCompte()}/>
      <Button title="Login" onPress={loginJWT}/>
      <Text style={ styles.titre }>{message} </Text>
      </>}

      {(profil.email!=="")&&(token.token=="")&&<><Text style={ styles.titre }>Login</Text>
      <TextInput maxLength={50} inputMode='email' placeholder='email' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, email:text})} value={identifiants.email}/>
      <TextInput maxLength={50} placeholder='password' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, password:text})} value={identifiants.password}/>
      <Button title="Login" onPress={()=>loginJWT()}/>
      <Text style={ styles.titre }>{message} </Text>
      </>}
      
    </View>
  
  
  )
}

export default Login;
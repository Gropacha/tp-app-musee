import { Button, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleContext } from '../contexts/style.context';
import { maintenant } from '../utilitaires/formatDate';
import { ProfilContext } from '../contexts/profil.context';



const Login = () => {

  const url = new URL("http://10.0.2.2:777/");
  
  const { profil, saveProfil } = useContext(ProfilContext);

  const [ message, setMessage ] = useState("Bienvenue");

  const [identifiants, setIdentifiants] = useState({
    email: "",
    password: ""
  });


  const creationCompte = async  () => {
       try {
            const res = await fetch(url+"user", {method: 'POST', headers:{'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(identifiants)});
            const reponseJson = await res.json();
            if (res.status==200){
                const { pseudo, email, password, _id, role } = reponseJson;
                saveProfil({ pseudo, email, password, _id, role });
                setIdentifiants({email:"", password:""});
                setMessage(pseudo);
            } else {
                setMessage("pas de création de compte");
            }
            console.log(maintenant(), "| Login.jsx | Création d'un compte : ", reponseJson);
        } catch (err) {
            setMessage("err");
            console.log(maintenant(), "| Login.jsx | Erreur création de compte : ", err);
      }       
  } // FIN DE creationCompte()

  const loginJWT = async  () => {
      try {
          const res = await fetch(url, {method: 'POST', headers:{'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(identifiants)});
          const reponseJson = await res.json();
          if (res.status==200){
              const token = reponseJson;
              console.log("token: ",token);
              setMessage("bienvenue"+profil.pseudo);
              saveProfil({ ...profil, token:token });
              setIdentifiants({email:"", password:""});
          } else {
              setMessage("login incorrect");
          }
          console.log(maintenant(), "| Login.jsx | Login : ", profil.pseudo, reponseJson);
      } catch (err) {
          setMessage("err");
          console.log(maintenant(), "| Login.jsx | erreur Login : ", err);
      }       
} // FIN DE loginJWT()

  const { styles } = useContext(StyleContext);
  return (<View  style={ styles.box }>

      {(profil.email=="")&&<><Text style={ styles.titre }>Création de compte</Text>
      <TextInput maxLength={50} inputMode='email' placeholder='email' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, email:text})} value={identifiants.email}/>
      <TextInput maxLength={50} placeholder='password' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, password:text})} value={identifiants.password}/>
      <Button title="créer un compte" onPress={creationCompte}/></>}
      {(profil.email!=="")&&(profil.token==null)&&<><Text style={ styles.titre }>Login</Text>
      <TextInput maxLength={50} inputMode='email' placeholder='email' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, email:text})} value={identifiants.email}/>
      <TextInput maxLength={50} placeholder='password' style={styles.input} onChangeText={(text)=>setIdentifiants({...identifiants, password:text})} value={identifiants.password}/>
      <Button title="Login" onPress={loginJWT}/></>}
      <Text style={ styles.titre }>{message} </Text>
    </View>
  
  
  )
}

export default Login;
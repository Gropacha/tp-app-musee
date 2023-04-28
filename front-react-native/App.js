

import { StyleContextProvider } from './contexts/style.context';
import { ProfilContextProvider } from './contexts/profil.context';
import Affichage from './composants/Affichage';
import { demarrageSQLITE, selectTokenFromSQLITE } from './utilitaires/saveSqlite';
import { Text, View, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import { maintenant } from './utilitaires/formatDate';

export default function App() {

  const [ verif, setVerif ] = useState(false);

  const [ tokenSQLITE, setTokenSQLITE ]  = useState({});

  useEffect ( ()=> { 
    const start = async () => { 
      console.log(maintenant(), "------------------------------------------------------------");
      console.log(maintenant(), "---------------DEMARRAGE DE L'APPLICATION-------------------");
      console.log(maintenant(), "------------------------------------------------------------");
      const isConnectedSQLITE = await demarrageSQLITE(); 
      const tokenAwait = await selectTokenFromSQLITE();
      setTokenSQLITE(tokenAwait);
      console.log(maintenant(),"|", isConnectedSQLITE?"Connecté à SQLITE":"Erreur de connexion à SQLITE","token(App)", tokenAwait);
      setVerif(true)
     }
   start();

  }, [])



  
  if (verif) {
    return (
      <ProfilContextProvider>
        <StyleContextProvider>
          <Affichage tokenConnexion={tokenSQLITE}/>
        </StyleContextProvider>
      </ProfilContextProvider>
    );
  } else {
    return (
      <View style={{flex:1, backgroundColor: 'green', justifyContent: 'center'}}>
        {/* <ActivityIndicator/> */}
        <Text style={{fontSize:34, fontWeight:700, color: "red", textAlign: 'center'}}>err</Text>
      </View>
    );
  }

  (async ()=> {
    try {
      const TEST = {_id:"", token:""}
      // const isConnectSQLITE = await demarrageSQLITE();
      // const tokenConnexion = isConnectSQLITE? await selectTokenFromSQLITE(): {_id:"", token:""};
      return (
        <ProfilContextProvider>
          <StyleContextProvider>
            <Affichage tokenConnexion={TEST}/>
          </StyleContextProvider>
        </ProfilContextProvider>
      );
    
    }
    catch(err) {
      console.log(err);
      return (
        <View style={{flex:1, backgroundColor: 'green', justifyContent: 'center'}}>
          <Text style={{fontSize:34, fontWeight:700, color: "red", textAlign: 'center'}}>{err}</Text>
        </View>
      );
    };
  })();

}
////////////// FIN DU FICHIER
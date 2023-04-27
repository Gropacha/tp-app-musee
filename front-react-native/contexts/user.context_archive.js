import { createContext, useState, useEffect } from "react";
import * as SQLITE from 'expo-sqlite';
import { maintenant } from "../utilitaires/formatDate";

export const UserContext = createContext(); // store contenant les données de l'utilisateur en cours

export const UserContextProvider = ( props ) => { // composant Provider permettant aux composants enfant d'avoir accès au store
    
  const NAME_DB_SQLITE = "user_API_museum3.sqlite";
    function openDB(){
      if(Platform.OS === "web"){
          return {
            transaction : () => {
              return {
                executeSql : () => {} 
              }
            }
          }
        }
      return SQLITE.openDatabase(NAME_DB_SQLITE);
  }
    
  let db;

  useEffect ( ()=>{
      db = openDB() ; 
      console.log( maintenant(), "connexion à SQLite: "+NAME_DB_SQLITE);
        db.transaction(
            (tx)=>{tx.executeSql(
              `
                CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pseudo VARCHAR(30),
                email TEXT,
                password TEXT,
                token TEXT,
                _id TEXT ) ;
              `,  
              [], 
              (transact, resultat)=>{ console.log( maintenant(),"succès initialisation de la table 'users' SQlite"); },
              (transact, err)=>{ console.error( maintenant(), "erreur d'initialisation de la table 'users' SQlite", err); } 
        )});
        db.transaction(
          (tx)=>{tx.executeSql(
                  `
                  SELECT pseudo, email, password, token FROM users ;
                `, 
                [], 
                (transact, resultat)=>{ 
                  const data=resultat.rows._array;
                  console.log( maintenant(),"succès select FROM users", data);
                  console.log( maintenant(), `user : ${data[0]? data[0] :"pas encore attribué" }`);
                  if (data[0]) {

                    setUser({
                      pseudo: data[0].pseudo,
                      email: data[0].email,
                      password: data[0].password,
                      userToken: data[0].userToken,
                      _id: data[0]._id,
                      isLogged: false
                    });

                    const url = new URL("http://10.0.2.2:777/user/"+data[0]._id);
                    fetch(url, {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      }
                    }).then((res)=>res.json())
                      .then((data)=>console.log(maintenant(), "succès GET user ",data))
                      .catch((err)=>console.log(maintenant(), "erreur GET user ", err))
                  }//fin du if
                  console.log( maintenant(), `${user.isLogged? data[0].pseudo+"est connecté": "connection incomplète"}`);
                },
                (transact, err)=>{ 
                  console.error( maintenant(), "erreur select FROM  users", err); 
                } 
        )});
  }, []);







    const [ user, setUser ] = useState ({
        pseudo:"",
        email:"",
        password:"",
        userToken:"",
        _id:"",
        role:"USER",
        isLogged: false,
    });
   
    const userInit = ( {"email":email, "password":password, "_id":_id, "role":role} ) => {
      setUser({...user, "email":email, "password":password, "_id":_id, "role":role});
      console.log(maintenant(), "userInit ", {"email":email, "password":password, "_id":_id, "role":role}); 
    }

    const userLogin = ( payload ) => {
        const userLog = {
            userToken: payload.token
        };
        setUser(...user, userLog)
    }

    // useEffect( ()=>{
    //   db.transaction(
    //     (tx)=>{tx.executeSql(
    //       `
    //         UPDATE users SET pseudo = ?, password = ?, token = ?, _id = ?
    //         WHERE email = ? ;
    //       `,  
    //       [user.pseudo, user.password, user.token, user._id, user.email], 
    //       (transact, resultat)=>{ console.log( maintenant(),"succès useEffect SQlite"); },
    //       (transact, err)=>{ console.error( maintenant(), "erreur useEffect SQlite", err); } 
    // )});
    // }, [userInit, userLogin])


    return <UserContext.Provider value={{ user, userInit, userLogin  }}>
        { props.children }
    </UserContext.Provider>

}// fin du fichier
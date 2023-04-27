import { createContext, useState, useEffect } from "react";
import * as SQLITE from "expo-sqlite";
import { maintenant } from "../utilitaires/formatDate";

export const ProfilContext = createContext();

export const ProfilContextProvider = ( props ) => {

    const [ profil, setProfil] = useState({
        pseudo:"",
        email:"",
        password:"",
        token:"",
        _id:"",
        role:""
    });

let db;

const NAME_DB_SQLITE = "Profil_API_2.sqlite";

function openDB(){
    if(Platform.OS === "web"){return {transaction : () => {return {executeSql : () => {} }}}}
    return SQLITE.openDatabase(NAME_DB_SQLITE);
}
/////////////////////////////////////////////////////////////////
////////     DEBUT INITIALISATION DU PROFIL     ////////////////
///////////////////////////////////////////////////////////////
    useEffect( ()=>{   
    db = openDB();
    console.log( maintenant(), "connexion à SQLite: "+NAME_DB_SQLITE);
   
    db.transaction( //initialisation de la BDD SQLITE locale au Client
        (tx)=>{tx.executeSql(
            `
            CREATE TABLE IF NOT EXISTS profils (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pseudo VARCHAR(30),
            email TEXT,
            password TEXT,
            token TEXT,
            _id TEXT,
            role VARCHAR(15) ) ;
            `,  
            [], 
            (transact, resultat)=>{ console.log( maintenant(),"succès initialisation de la table 'profils' "); },
            (transact, err)=>{ console.error( maintenant(), "erreur d'initialisation de la table 'profils' ", err); } 
    )});
    db.transaction( // Récupération des données de profil si elles existent déjà dans la BDD SQLITE locale
        (tx)=>{tx.executeSql(
            `
            SELECT pseudo, email, password, token, _id, role FROM profils ;
            `,  
            [], 
            (transact, resultat)=>{ 
                console.log( maintenant(),"vérification de la table 'profils' "); 
                const data=resultat.rows._array[0];
                if (data) {setProfil(data); console.log(maintenant(),"State Profil initialisé grâce à SQLite", data)}       
            },
            (transact, err)=>{ console.error( maintenant(), "Erreur d'accès à la table 'profils' ", err); } 
    )});}, []);

/////////////////////////////////////////////////////////////////
////////     FIN INITIALISATION DU PROFIL     ////////////////
///////////////////////////////////////////////////////////////

    const saveProfil = ({pseudo, email, password, token, _id, role}) =>{
        setProfil({pseudo, email, password, token, _id, role});
        // if (email===profil.email) {
        //     db.transaction((tx)=>{tx.executeSql(
        //         `UPDATE profils SET pseudo = ?, password = ?, token = ? WHERE email = ? ; `,
        //         [pseudo, password, token, profil.email],
        //         (transact, resultat)=>{ setProfil({pseudo, email, password, token, _id, role}); console.log(maintenant(), "Sauvegarde du profil (UPDATE) en SQLITE") },
        //         (transact, err)=>{console.log(maintenant(), "Erreur de sauvegarde du profil (UPDATE) en SQLITE", err)}
        //     )}); // fin UPDATE
        // } else {
            // db.transaction((tx)=>{tx.executeSql(
            //     `INSERT INTO profils ( pseudo, email, password, token, _id, role )
            //      VALUES ( ?, ?, ?, ?, ?, ?) ;`,
            //     [pseudo, email, password, token, _id, role],
            //     (transact, resultat)=>{ setProfil({pseudo, email, password, token, _id, role}); console.log(maintenant(), "Sauvegarde du profil (INSERT) en SQLITE") },
            //     (transact, err)=>{console.log(maintenant(), "Erreur de sauvegarde du profil (INSERT) en SQLITE", err)}
            // )});// fin INSERT
    //     }
    }// FIN DE saveProfil()

return  <ProfilContext.Provider value={{ profil, saveProfil }}>
                { props.children }
        </ProfilContext.Provider>
}
///////////////////////////////////////////////////////// FIN DU FICHIER
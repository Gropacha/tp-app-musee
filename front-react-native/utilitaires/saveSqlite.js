import * as SQLITE from 'expo-sqlite';
import { maintenant } from './formatDate';


const NAME_DB_SQLITE = "profil3.sqlite";

let DB;
let alreadyOpen=false; // permet facilement de faire de DB un singleton

export const saveTokenIntoSQLITE = async (token) => {
    if (!alreadyOpen) return false;
    try {
        await DB.transaction(function(tx){tx.executeSql(
            `
            INSERT INTO profil ( mongodb , token ) VALUES ( ?, ? ) ;
            `,
            [ token._id, token.token]  ),
            ()=>{},
            ()=>{}
        });
        console.log( maintenant(),"| Succès de sauvegarde du token en SQLITE", token);
        return true;
    } catch (err) {
        console.error( maintenant(), "| Erreur de sauvegarde du token en SQLITE", err);
        return false;
    }
}
////////////////////////// FIN DE saveToken(token) : true|false

export const selectTokenFromSQLITE = async () => {
    const token = {_id:"", token:""};
    if (!alreadyOpen) return token;
    try {
        await DB.transaction(function(tx){tx.executeSql(
            `
            SELECT mongodb, token FROM profil ;
            `, 
            [], 
            (transact, resultat) => { 
                const data=resultat.rows._array; 
                if (data.length!==0) {
                    token._id=data[0].mongodb;
                    token.token=data[0].token;
                } 
            },
            ()=>{}    
        )});
        console.log( maintenant(),"| Succès de SELECT du token en SQLITE", token);
        return token;
    } catch (err) {
        console.error( maintenant(), "| Erreur du SELECT du token en SQLITE", err);
        return token;
    }
}
////////////////////////// FIN DE selectToken() : {id:?, token:?}

        const openDB = () => {
            console.log(maintenant(), "| connexion DB SQLITE")
            if(Platform.OS === "web"){
                return {transaction : () => {return {executeSql : () => {} }}}} 
        return SQLITE.openDatabase(NAME_DB_SQLITE);};

export const demarrageSQLITE = async  () => {
    if (alreadyOpen) return true;
        DB =  openDB() ;
        try {
                DB.transaction(function(tx){tx.executeSql(
                `
                CREATE TABLE IF NOT EXISTS profil (
                    id INTEGER PRIMARY KEY AUTOINCREMENT
                    mongodb TEXT,
                    token TEXT ) ;
                `,  
                [],
                ()=>{},
                ()=>{}
                )});
            alreadyOpen=true; 
            console.log( maintenant(),"| Succès : accès à la table 'profil' SQlite");
            return true;
        } catch (err) {
            console.error( maintenant(), "| Erreur d'accès à la table 'profil' SQlite", err);
            return false;
        }
    
}
////////////////////////// FIN DE demarrageSQLITE : true | false
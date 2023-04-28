import { url } from "../config.front";
import { maintenant } from "../utilitaires/formatDate"




export const getProfilServeur = async ( token, setProfil )=> {
    try {
        const res = await fetch(
                `${url}user/${token._id}`, {
                method: 'GET', 
                headers:{'user-token': token.token , 'Content-Type': 'application/json;charset=utf-8'}, 
                });
        const reponseJson = await res.json();
        if (res.status==200){
            setProfil( reponseJson ) ;
            return true;
        } 

        return reponseJson.msg;
    } catch (err) {
      console.log(maintenant(), "| getProfilServeur : ", err);
      return   "erreur getProfilServeur" ;
    }          
}
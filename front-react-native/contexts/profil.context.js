import { createContext, useState } from "react";

export const ProfilContext = createContext();

export const ProfilContextProvider = ( props ) => {

    const [ profil, setProfil] = useState({
        pseudo:"",
        email:"",
        likes:[],
        commentaires:[]
    });

    const [ isLogged, setIsLogged ] = useState(false);
    const [ token, setToken ] = useState({});
  
    

return  <ProfilContext.Provider value={{ profil, setProfil, token, setToken, isLogged, setIsLogged }}>
                { props.children }
        </ProfilContext.Provider>
}
///////////////////////////////////////////////////////// FIN DU FICHIER
import { createContext, useState } from "react";

export const UserContext = createContext(); // store contenant les données de l'utilisateur en cours

export const UserContextProvider = ( props ) => { // composant Provider permettant aux composants enfant d'avoir accès au store

    const [ user, setUser ] = useState ({
        email:"",
        password:"",
        userToken:"",
        isLogged: false,
        pseudo:""
    });
   
    const userInit = ( payload ) => {
       
        const newUser = {
            email: payload.email,
            password: payload.password,
        };
        setUser(...user, newUser);
    }

    const userLogin = ( payload ) => {
        const userLog = {
            userToken: payload.token
        };
        setUser(...user, userLog)
    }

    return <UserContext.Provider value={{ user, userInit, userLogin  }}>
        { props.children }
    </UserContext.Provider>

}// fin du fichier
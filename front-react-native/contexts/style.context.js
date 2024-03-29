import { createContext, useState } from "react";
import { StyleSheet } from "react-native";

export const StyleContext = createContext();

export const StyleContextProvider = ( props ) => {

const myStyles = StyleSheet.create({
    titre: {
        fontSize:34,
        fontWeight:700,
        color: "#fed",
        textAlign: 'center'
    },
    box: {
        flex:1,
        backgroundColor: '#234',
        alignItems: 'center',
        justifyContent: 'center',
        // alignContent:'space-around',
        // height:400,
        // width:400
    },
    input: {
        fontSize:25,
        borderWidth:2,
        padding:10,
        margin:10,
        width:300,
        color: "#fed",
        backgroundColor:'#456'
    },
    alert: {
        padding:10,
        color:'yellow',
        fontSize:20
    },
    container: {
        flex:1,
        backgroundColor: '#green',
        justifyContent: 'center'
      }
});

const [ styles, setStyles ] = useState( myStyles );




    return <StyleContext.Provider value={{ styles }}>
        { props.children }
    </StyleContext.Provider>

}
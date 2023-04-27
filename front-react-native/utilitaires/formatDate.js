import moment from 'moment';
// const moment = require("moment"); // permet de gérer facilement le format d'affichage des dates


export const maintenant = ()=>{
    moment.locale("fr-FR"); // format d'affichage des dates en version française
    
    return moment().format('HH:mm:ss,SSS');
}



// format('dddd DD MMMM YYYY HH:mm:ss,SSS');
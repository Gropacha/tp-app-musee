const moment = require("moment"); // permet de gérer facilement le format d'affichage des dates
moment.locale("fr-FR"); // format d'affichage des dates en version française

const maintenant = ()=>moment().format('HH:mm:ss,SSS');

module.exports.maintenant = maintenant;

// format('dddd DD MMMM YYYY HH:mm:ss,SSS');
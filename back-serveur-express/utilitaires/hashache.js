const {genSaltSync, hashSync, compareSync} = require("bcrypt");

const itemHashe = (item) => {
    const salt =  genSaltSync(10);
    const item_hashe = hashSync(item, salt);
    return item_hashe;
}

const USER = "USER" ;
const REDACTEUR = "REDACTEUR" ;
const ADMIN = "ADMIN";
const roles= [USER, REDACTEUR, ADMIN ];


 
module.exports.itemHashe = itemHashe;




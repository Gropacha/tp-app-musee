const userRoute = require("./user.route");
const oeuvreRoute = require("./oeuvre.route");
const loginRoute = require("./login.route");

/////////////////////////// FIN DES IMPORTS

/////////////////////////// RACCORDEMENT DE TOUTES LES ROUTES
const raccordementDesRoutes =  (express) => {
express.use("/user", userRoute);
express.use("/oeuvre", oeuvreRoute);
express.use("/login", loginRoute);
}
//////////////////////////////////////////// EXPORT DU RACCORDEMENT
module.exports = raccordementDesRoutes;
////////////////////////////////////////////FIN DU FICHIER
const userRoute = require("./user.route");
const oeuvreRoute = require("./oeuvre.route");
const loginRoute = require("../authentification/login");






const raccordementDesRoutes =  (express) => {
express.use("/user", userRoute);
express.use("/oeuvre", oeuvreRoute);
express.use("/", loginRoute);
}

module.exports = raccordementDesRoutes;
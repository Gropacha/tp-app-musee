const userRoute = require("./user.route");
const oeuvreRoute = require("./oeuvre.route");
const loginRoute = require("../authentification/login");



const enableCORS = function (req, res, next) {
    if (!process.env.DISABLE_XORIGIN) {
      const allowedOrigins = ["http://10.0.2.2:777"];
      const origin = req.headers.origin;
      if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
        console.log(req.method);
        res.set({
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        });
      }
    }
    next();
  };


const raccordementDesRoutes =  (express) => {
express.use("/user",enableCORS, userRoute);
express.use("/oeuvre",enableCORS, oeuvreRoute);
express.use("/",enableCORS, loginRoute);
}

module.exports = raccordementDesRoutes;
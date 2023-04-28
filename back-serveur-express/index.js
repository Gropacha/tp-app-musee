const  connexionMongoDB  = require("./config.back");
const raccordementDesRoutes = require("./routes/routes");
const { maintenant } = require("./utilitaires/formatDate");


(async ()=> {
    try  {        
        const app = await connexionMongoDB(); 
        console.log(`${maintenant()} | Connexion à mongoDB en mode ${process.env.NODE_ENV?"PROD":"DEV"}`);
        raccordementDesRoutes(app);
        
        const PORT = process.env.PORT || 777; // choix d'un port pour le localhost:
        app.listen(PORT, ()=>console.log(`${maintenant()} | Serveur à l'écoute sur :${PORT}`));
    }
    catch(err) {console.log(err)};
})();

const URL_RN="http://10.0.2.2:777"

module.exports.URL_RN = URL_RN; 
const {envs} = require("./config/config");
const {startServer} = require("./config/service/service");

 const main = () => {
     startServer(envs);
 }
 (async () => {
     main();
 })();
console.log("hola")
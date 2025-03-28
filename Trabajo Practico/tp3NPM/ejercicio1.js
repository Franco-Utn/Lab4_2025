const yargs = require('yargs');

const argv = yargs
  .command("saludar", "Muestra un saludo", {
    nombre: {
      describe: "Nombre de la persona a saludar",
      demandOption: true,
      type: "string",
    },
  })
  .command("despedir", "Muestra una despedida", {
    nombre: {
      describe: "Nombre de la persona a despedir",
      demandOption: true,
      type: "string",
    },
  })
  .help().argv;

if (argv._.includes("saludar")) {
  console.log(`Hola, ${argv.nombre}!`);
}if(argv._.includes("despedir")){
    if (argv._.includes("despedir")) {
        console.log(`Adiós, ${argv.nombre}!`);
}}

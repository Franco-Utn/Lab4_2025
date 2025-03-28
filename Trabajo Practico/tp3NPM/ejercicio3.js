const yargs = require("yargs");
const fs = require("fs");
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .command(
    "leer",
    "Leer un archivo json y transcribirlo en terminal",
    {
      archivo: {
        describe: "Ruta del archivo JSON",
        demandOption: true,
        type: "string",
      }
    },
    (argv) => {
        fs.readFile(argv.archivo, "utf-8", (err, data) => {
            if (err) {
              console.error("Error al leer el archivo");
              return;
            } try {
                const jsonData = JSON.parse(data);
                console.log("Contenido del archivo JSON:", jsonData);
              } catch (error) {
                console.error("Error al parsear el JSON:", error.message);
              }
          });
    }
  )
  .help().argv;

const fs = require("fs");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command(
    "leer",
    "Lee un archivo JSON y muestra su contenido",
    {
      archivo: {
        describe: "Ruta del archivo JSON",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      if (!argv.archivo) {
        console.error("❌ Error: Debes proporcionar un archivo JSON con --archivo=<nombre>");
        process.exit(1);
      }

      fs.readFile(argv.archivo, "utf8", (err, data) => {
        if (err) {
          console.error("❌ Error al leer el archivo:", err.message);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          console.log("📄 Contenido del archivo JSON:", jsonData);
        } catch (error) {
          console.error("❌ Error al parsear el JSON:", error.message);
        }
      });
    }
  )
  .help()
  .argv;
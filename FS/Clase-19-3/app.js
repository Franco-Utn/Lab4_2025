const fs = require("fs");
const crearArchivo = require("./archivo.js"); // Importamos la función desde archivo.js

console.log(process.argv);

const [, , base = 5] = process.argv;

const basePased =
    typeof base === "string" && base.includes("=")
        ? parseInt(base.split("=")[1])
        : parseInt(base);

        let table = `Tabla del ${basePased}\n`;

        for (let i = 0; i <= 10; i++) {
          table += `${basePased} * ${i} = ${basePased * i}\n`;
        }
        
        // Verificar si la carpeta 'Ctabla' existe o crearla
        if (!fs.existsSync("Ctabla")) {
          fs.mkdirSync("Ctabla");
        }
        
        // Llamar a la función exportada para crear el archivo
        crearArchivo(basePased, table);
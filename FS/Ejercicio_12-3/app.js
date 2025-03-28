// Importa el módulo 'fs' para trabajar con el sistema de archivos
const fs = require("fs");

// Muestra en consola los argumentos pasados al script
console.log(process.argv);

// Desestructura el tercer argumento de 'process.argv' y lo asigna a 'base', con un valor por defecto de 5
const [, , base = 5] = process.argv;

// Verifica si 'base' es un string que contiene un '=' y extrae el número después del '='
// Si no, convierte 'base' a un número entero
const basePased =
  typeof base === "string" && base.includes("=")
    ? parseInt(base.split("=")[1])
    : parseInt(base);

// Inicializa una cadena con el encabezado de la tabla de multiplicar
let table = `tabla del ${basePased}\n`;

// Genera la tabla de multiplicar del 0 al 10 y la agrega a la cadena 'table'
for (let i = 0; i <= 10; i++) {
  table += `${basePased} * ${i} = ${basePased * i}\n`;
}

// Verifica si la carpeta 'Ctabla' existe
if (fs.existsSync("Ctabla")) {
  console.log("la carpeta ya existia, procedo a hacer el archivo");
  // Si la carpeta existe, crea el archivo con la tabla de multiplicar
  crearArchivo(table);
} else {
  try {
    // Si la carpeta no existe, la crea y luego crea el archivo con la tabla de multiplicar
    fs.mkdirSync(`Ctabla`);
    crearArchivo(table);
  } catch (err) {
    // Si ocurre un error, lo lanza
    if (err) throw err;
  }
}

// Función para crear el archivo con la tabla de multiplicar
function crearArchivo(tabla) {
  try {
    // Escribe la tabla de multiplicar en un archivo dentro de la carpeta 'Ctabla'
    fs.writeFileSync(`./Ctabla/tabla${basePased}.txt`, tabla, "utf-8");
  } catch (err) {
    // Si ocurre un error, lo lanza
    if (err) throw err;
  }
}
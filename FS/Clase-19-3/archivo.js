const fs = require("fs"); // Importamos el módulo fs

// Función para crear un archivo con la tabla de multiplicar
function crearArchivo(base, tabla) {
  try {
    fs.writeFileSync(`./Ctabla/tabla${base}.txt`, tabla, "utf-8");
    console.log(`Archivo tabla${base}.txt creado con éxito.`);
  } catch (err) {
    console.error("Error al crear el archivo:", err);
  }
}

// Exportamos la función para que esté disponible en otros archivos
module.exports = crearArchivo;
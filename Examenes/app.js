import fs from "fs/promises";
import readline from "readline";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Configurar yargs para recibir el argumento --file o -f
const argv = yargs(hideBin(process.argv)).option("file", {
  alias: "f",
  type: "string",
  description: "Nombre del archivo JSON donde se guardarán los productos",
  default: "productos.json",
}).argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pedirDato = (pregunta) => {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
};

// Función principal que usa await
const main = async () => {
  try {
    const nombre = await pedirDato("¿Cuál es el nombre del producto? ");
    const precio = await pedirDato("¿Cuál es el precio? ");
    const cantidad = await pedirDato(
      "¿Cuál es la cantidad de unidades del producto? "
    );

    if (isNaN(precio) || isNaN(cantidad)) {
      throw new Error("El precio y la cantidad deben ser valores numéricos.");
    }
    const nuevoProducto = { nombre, precio, cantidad };
    const archivo = argv.file;
    let productos = [];
    try {
      // Intentar leer el archivo si existe
      const data = await fs.readFile(archivo, "utf-8");
      productos = JSON.parse(data);
      if (!Array.isArray(productos)) {
        throw new Error("El contenido del archivo no es un array válido.");
      }
    } catch (error) {
      // Si el archivo no existe o hay un error de formato, se inicializa con un array vacío
      console.log("El archivo no existe o está vacío. Se creará uno nuevo.");
    }

    // Agregar el nuevo producto al array
    productos.push(nuevoProducto);

    // Guardar en el archivo JSON
    await fs.writeFile(archivo, JSON.stringify(productos, null, 2));
    console.log(`Producto guardado en ${archivo}`);

    // Leer y mostrar el contenido actualizado del archivo
    const data = await fs.readFile(archivo, "utf-8");
    console.log("Contenido del archivo actualizado:", data);
  } catch (error) {
    console.error("Error al guardar datos:", error);
  } finally {
    rl.close(); // Cerrar la interfaz después de terminar
  } //Cerrar la interfaz después de terminar
};

// Ejecutar la función principal
main();

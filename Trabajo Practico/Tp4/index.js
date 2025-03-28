//Ejercicio 1)
//  IMPORTAMOS DOTENV
// require('dotenv').config(); --REQUIRE
// import dotenv from "dotenv"; //--IMPORT
import "dotenv/config"; // --IMPORT
//Ej 4
import fs from "fs/promises";

// CARGAMOS VARIABLES DE ENTORNO
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

// MOSTRAMOS LAS VARIABLES DE ENTORNO
console.log(dbConfig.host);
console.log(dbConfig.user);
console.log(dbConfig.password);

//Ejercicio 2
// const sumar = require('./math'); // Importamos la función -- REQUIRE
import { sumar } from "./math.js"; // Importamos la función -- IMPORT

//Definimos los numeros
const num1 = 5;
const num2 = 3;
//Mostramos el resultado de la suma
console.log("Resultado suma: ", sumar(num1, num2));

//ejercicio 3
import readline from "readline";
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
    const nombre = await pedirDato("¿Cuál es tu nombre? ");
    const email = await pedirDato("¿Cuál es tu correo electrónico? ");
    const anioNacimiento = await pedirDato("¿Que edad tienes? ");

    // Convertir año a número y calcular edad
    const edad = new Date().getFullYear() - parseInt(anioNacimiento, 10);

    const datos = `\nNombre: ${nombre}\nEmail: ${email}\nNaciste en: ${
      isNaN(edad) ? "Dato incorrecto" : edad
    }\n`;

    // Guardar en datos.txt usando la versión correcta de fs
    await fs.writeFile("datos.txt", datos);

    // Leer el archivo datos.txt usando fs.promises.readFile() (versión basada en promesas)
    const data = await fs.readFile("datos.txt", "utf-8");
    console.log("✅ Datos guardados en datos.txt:", data);
  } catch (error) {
    console.error("❌ Error al guardar datos:", error);
  } finally {
    rl.close(); // Cerrar la interfaz después de terminar
  } //Cerrar la interfaz después de terminar
};

// Ejecutar la función principal
main();

const fs = require('fs');
//process.argv[2] es el argumento que se le pasa al ejecutar el archivo
//[2] en el array es porque el array empieza en 0 y en la posición 0 está la ruta del ejecutable de node, la posición 1 es la ruta del archivo que se está ejecutando y la posición 2 es el argumento que se le pasa al archivo
const argumento = process.argv[2];
// el argumento "base=7" se pasa como un string, por lo que hay que separarlo para obtener el número, se hace con split('=') y se obtiene la posición 1 del array que se genera. Si no se pasa argumento, se asigna un valor por defecto 5
const base = argumento ? argumento.split('=')[1] : 5;
console.log(process.argv)

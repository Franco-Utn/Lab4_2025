// Ejercicio 1
// Escribir en el archivo un mensaje de inicio cada vez que el programa se ejecuta, con la fecha y hora actual en el formato:
// [YYYY-MM-DD HH:MM:SS] - Inicio del programa
// Simular la ejecución de una tarea que tarda 5 segundos. Mientras la tarea se ejecuta, escribir en log.txt:
// [YYYY-MM-DD HH:MM:SS] - Ejecutando tarea...
// Cuando la tarea finaliza, escribir en log.txt:

// [YYYY-MM-DD HH:MM:SS] - Tarea completada
const fs = require('fs').promises //Importación del módulo fs.promises || La propiedad .promises te da acceso a una API basada en promesas, que es moderna y facilita el manejo de operaciones asíncronas.

//Función registroMensaje || Propósito: Registra mensajes en el archivo log.txt con una marca de tiempo (fecha y hora actual en formato ISO).
async function registroMensaje(mensaje) {
    try{
        const fecha = new Date().toISOString(); //new Date().toISOString(): Genera la marca de tiempo en formato ISO (YYYY-MM-DDTHH:MM:SSZ).
        await fs.appendFile('log.txt', `[${fecha}] ${mensaje}\n`); //fs.appendFile: Agrega texto al final del archivo especificado. Si el archivo no existe, lo crea.
    }catch(err){
        console.error('Error al escribir en el log:', err);
        }
}

//Función EjecutarTarea || Propósito: Simula el flujo de un programa con diferentes estados y registra los mensajes correspondientes.
async function EjecutarTarea(){
    await registroMensaje("Inicio del programa");
    
    await registroMensaje("Ejecutando tarea...");
    //Similar 5 segundos
    await new Promise(resolve=> setTimeout(resolve, 5000)); //setTimeout (envuelto en una promesa): Simula una pausa de 5 segundos de manera asíncrona

    await registroMensaje("Tarea completada");

}



//Prueba de limpiar el Log:
async function limpiarLog() {
    try {
        await fs.writeFile("log.txt", "");

    } catch (error) {
        console.error('Error al limpiar el archivo:', error);
    }
}

limpiarLog(); //Limpia el archivo log.txt
EjecutarTarea();
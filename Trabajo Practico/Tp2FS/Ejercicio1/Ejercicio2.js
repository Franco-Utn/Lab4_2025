const fs = require('fs').promises //Importación del módulo fs.promises || La propiedad .promises te da acceso a una API basada en promesas, que es moderna y facilita el manejo de operaciones asíncronas.

async function crearArchivo(nombreArchivo, contenido) {
    try {
        await fs.writeFile(nombreArchivo, contenido);
    } catch (error) {
        console.error('Error al crear el archivo:', error);
    }
    
}
//Llamada a la función crearArchivo
crearArchivo("datos.txt", "Nombre: Franco\nEdad: 20\nCarrera:Programación");

//Leer archivo
async function leerArchivo(rutaArchivo) {
    try {
        const contenido = await fs.readFile(rutaArchivo, 'utf-8');
        console.log("Contenido del archivo:");
        console.log(contenido);

    } catch (error) {
        console.error('Error al leer el archivo:', error);
    }
    }
leerArchivo("datos.txt");
//Agregar fecha y Hora
async function agregarContenido(rutaArchivo) {
    try {
    const fecha = new Date().toISOString(); 
    await fs.appendFile(rutaArchivo, `Fecha de modificación: ${fecha}\n`);
    } catch (error) {
    console.error('Error al agregar contenido:', error);
    }
}
agregarContenido("datos.txt");

//Renombrar Archivo:
async function renombrarArchivo(rutaArchivo) {
    try {
        await fs.rename(rutaArchivo, "informacion.txt");
    } catch (error) {
        console.error('Error al renombrar el archivo:', error);
    }
}


//Eliminar Archivo:
async function eliminarArchivo(rutaArchivo) {
   try {
    renombrarArchivo("datos.txt");
    await new Promise (resolve=> setTimeout(resolve, 10000))
    await fs.unlink(rutaArchivo);
   } catch (error) {
         console.error('Error al eliminar el archivo:', error);
   } 
}

eliminarArchivo("informacion.txt");
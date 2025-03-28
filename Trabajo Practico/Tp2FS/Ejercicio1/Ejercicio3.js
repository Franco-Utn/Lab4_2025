const fs = require('fs').promises;

// Crear archivo inicial
async function crearArchivo(nombreArchivo, parametros) {
    try {
        const contenidoJSON = JSON.stringify(parametros, null, 3); // Formatear el JSON
        await fs.writeFile(nombreArchivo, contenidoJSON, 'utf-8');
        console.log(`Archivo "${nombreArchivo}" creado exitosamente.`);
    } catch (error) {
        console.error('Error al crear el archivo:', error);
    }
}

// Agregar datos al array en el archivo JSON
async function agregarContacto(nombreArchivo, nuevoContacto) {
    try {
        // Leer el contenido actual del archivo
        const contenido = await fs.readFile(nombreArchivo, 'utf-8');
        const datos = Array.isArray(JSON.parse(contenido)) ? JSON.parse(contenido) : []; // Validar si es un array

        // Agregar el nuevo contacto al array existente
        datos.push(nuevoContacto);

        // Escribir los datos actualizados de nuevo en el archivo
        await fs.writeFile(nombreArchivo, JSON.stringify(datos, null, 3), 'utf-8');
        console.log('Nuevo contacto agregado exitosamente.');
    } catch (error) {
        console.error('Error al agregar datos al archivo JSON:', error);
    }
}

// Eliminar un contacto por nombre
async function eliminarPorNombre(nombreArchivo, nombreAEliminar) {
    try {
        // Leer el contenido actual del archivo
        const contenido = await fs.readFile(nombreArchivo, 'utf-8');
        const datos = JSON.parse(contenido); // Convertir el contenido en un array de objetos

        // Filtrar los datos para eliminar el elemento con el nombre especificado
        const datosActualizados = datos.filter(contacto => contacto.nombre !== nombreAEliminar);

        // Escribir los datos actualizados de nuevo en el archivo
        await fs.writeFile(nombreArchivo, JSON.stringify(datosActualizados, null, 3), 'utf-8');
        console.log(`El contacto con nombre "${nombreAEliminar}" ha sido eliminado exitosamente.`);
    } catch (error) {
        console.error('Error al eliminar datos por nombre:', error);
    }
}

// Parámetros iniciales
const parametros = [
    {
        "nombre": "Juan Pérez",
        "telefono": "123-456-7890",
        "email": "juan@example.com"
    }
];

// Llamadas a las funciones con orden garantizado
(async () => {
    await crearArchivo("contactos.json", parametros); // Crear archivo inicial
    await agregarContacto("contactos.json", {
        nombre: "Ana López",
        telefono: "098-765-4321",
        email: "ana@example.com"
    }); // Agregar un nuevo contacto
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simular una pausa de 3 segundos
    await eliminarPorNombre("contactos.json", "Juan Pérez"); // Eliminar un contacto por nombre
})();
const fs = require('fs');

const contarPalabras = (nombreArchivo, palabraBuscada) => {
    try {
        // Verificar si el archivo existe
        if (!fs.existsSync(nombreArchivo)) {
            console.error(`El archivo "${nombreArchivo}" no existe.`);
            return;
        }

        // Leer el archivo de forma síncrona
        const contenido = fs.readFileSync(nombreArchivo, 'utf-8').trim();

        if (!contenido) {
            console.log(`El archivo "${nombreArchivo}" está vacío.`);
            return;
        }

        // Normalizar texto: quitar signos de puntuación y convertir en minúsculas
        const textoNormalizado = contenido.replace(/[.,;!?]/g, '').toLowerCase();

        // Separar palabras correctamente (evita problemas con espacios múltiples o saltos de línea)
        const palabras = textoNormalizado.split(/\s+/);

        // Contar las apariciones de la palabra buscada
        const cantidad = palabras.filter(palabra => palabra === palabraBuscada.toLowerCase()).length;

        // Imprimir el resultado
        console.log(`La palabra "${palabraBuscada}" aparece ${cantidad} veces en el archivo "${nombreArchivo}".`);
    } catch (error) {
        console.error(`Error al leer el archivo: ${error.message}`);
    }
};

// Crear el archivo si no existe
const crearArchivoSiNoExiste = (rutaArchivo) => {
    try {
        if (!fs.existsSync(rutaArchivo)) {
            fs.writeFileSync(rutaArchivo, ''); // Crea el archivo vacío
            console.log(`Archivo "${rutaArchivo}" creado automáticamente.`);
        }
    } catch (error) {
        console.error(`Error al crear el archivo: ${error.message}`);
    }
};

// Configuración y ejecución
const nombreArchivo = './archivo.txt';
const palabraBuscada = 'palabras';

crearArchivoSiNoExiste(nombreArchivo);
contarPalabras(nombreArchivo, palabraBuscada);

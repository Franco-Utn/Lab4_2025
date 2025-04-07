//2do Paso - Crear el store de tareas

import { create } from "zustand";
// ITarea, que es la interfaz que define cómo deben estructurarse las tareas (desde un archivo ../types/tareas).
import { ITarea } from "../types/tareas";

//definimos la interfaz del store de tareas
interface ITareaStore {
  tareas: ITarea[]; //→ Es un array que almacena todas las tareas.
  tareaActiva: ITarea | null; //→ Representa la tarea que está seleccionada actualmente. Puede ser null si no hay ninguna activa.
  setTareaActiva: (tarea: ITarea | null) => void; // → Es una función que recibe una tarea o null y la establece como activa.
  setArrayTareas: (arrayDeTareas: ITarea[]) => void; // → Es una función que recibe un array de tareas y lo guarda en tareas.
  agregarNuevaTarea: (nuevaTarea: ITarea) => void; // → Es una función que recibe una nueva tarea y la agrega al array de tareas.
  editarUnaTarea: (tareaActualizada: ITarea) => void; // → Es una función que recibe una tarea actualizada y la reemplaza en el array de tareas.
  eliminarUnaTarea: (idTarea: string) => void; // → Es una función que recibe el id de una tarea y la elimina del array de tareas.
}

//creamos el store de tareas || create desde Zustand, que nos permite crear un estado global.
export const tareaStore = create<ITareaStore>((set) => ({
  //Estado inicial del store
  tareas: [], //→ Al inicio, el array de tareas está vacío.
  tareaActiva: null, //→ Al inicio, no hay ninguna tarea activa.

  //funciones modificadoras para el array
  //Agregar array de tareas (persistido) || Esta función permite actualizar la lista completa de tareas.
  setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })), // Recibe un arrayDeTareas de tipo ITarea[]. || Llama a set(() => ({ tareas: arrayDeTareas })), lo que: Reemplaza el estado actual de tareas con el nuevo array.

  //Agregar una tarea al array

  agregarNuevaTarea: (nuevaTarea) =>
    set((state) => ({ tareas: [...state.tareas, nuevaTarea] })), // Recibe una nuevaTarea de tipo ITarea. || Llama a set((state) => ({ tareas: [...state.tareas, nuevaTarea] })), lo que: Agrega la nueva tarea al final del array de tareas.
  
  //editar una tarea del array
  editarUnaTarea: (tareaEditada) => //Recibe el objeto tareaEditada de tipo ITarea. 
    set((state) => { //Llama a set((state) => { ... }), lo que: Actualiza el array de tareas.
      const arregloTareas = state.tareas.map((tarea) => //recorre el array de tareas uno por uno 
        tarea.id === tareaEditada.id //Compara el id de cada tarea en el array con el id de tareaEditada. || Si el id coincide, significa que encontramos la tarea que queremos modificar.
        ? { ...tarea, ...tareaEditada }  //Si el id coincide, se crea una nueva tarea combinando los valores de la anterior (...tarea) con los valores actualizados (...tareaEditada). || Esto mantiene los valores previos y solo sobrescribe las propiedades que han cambiado.
        : tarea //Si el id NO coincide, mantiene la tarea original sin cambios.
      );
      return { tareas: arregloTareas }; // Devuelve el nuevo array modificado al estado global de Zustand.
    }),

  //eliminar una tarea del array
  eliminarUnaTarea: (idTarea) => // La función recibe idTarea, que es el identificador de la tarea que queremos eliminar.
    set((state) => { //Llama a set((state) => { ... }), lo que: Actualiza el array de tareas.
      const arregloTareas = state.tareas.filter( 
        (tarea) => tarea.id !== idTarea //.filter(...) recorre el array y devuelve solo las tareas cuyo id NO coincide con idTarea. || Esto significa que la tarea con idTarea se excluye del nuevo array, eliminándola
      );
      return { tareas: arregloTareas }; //Se reemplaza el estado tareas con el nuevo array que ya no tiene la tarea eliminada.
    }),

  //setear tarea activa || Permite cambiar qué tarea está activa en el store.
  setTareaActiva: (tareaActivaIn) =>
    set(() => ({ tareaActiva: tareaActivaIn })), //Recibe una tarea (ITarea | null). || Llama a set(() => ({ tareaActiva: tareaActivaIn })), lo que: Actualiza la variable tareaActiva.
}));

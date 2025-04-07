
import axios from "axios";
//Importamos ITarea, que es la interfaz que define la estructura de una tarea.
import { ITarea } from "../types/tareas";

// código que usa Axios para hacer peticiones HTTP a un backend en http://localhost:3000/tareas.
const API_URL = "http://localhost:3000/tareas";

//Este código define cuatro funciones para interactuar con una API REST que maneja tareas (tareas). Se usa la librería Axios para hacer peticiones HTTP (GET, POST, PUT, DELETE) al backend.
export const getAllTareas = async () => {
  try {
    const response = await axios.get<ITarea[]>(API_URL); //Se hace una petición GET a http://localhost:3000/tareas. ||La respuesta se espera en formato ITarea[] (un array de tareas).
    return response.data; //Si la petición es exitosa, se devuelve response.data (las tareas).
  } catch (error) {
    console.error("Error al obtener las tareas", error);
  }
};

export const postNuevaTarea = async (nuevaTarea: ITarea) => { //Se recibe un objeto nuevaTarea de tipo ITarea (contiene título y descripción).
  try {
    const response = await axios.post<ITarea>(API_URL, { //Se envía una petición POST a http://localhost:3000/tareas con el objeto en el cuerpo. || La respuesta se espera en formato ITarea (la tarea creada).
      ...nuevaTarea,
    });
    return response.data; //
  } catch (error) {
    console.error("Error al obtener las tareas", error);
  }
};

export const editarTarea = async (tareaActualizada: ITarea) => { //Se recibe un objeto tareaActualizada de tipo ITarea (contiene título y descripción).
  try {
    const response = await axios.put<ITarea>( //Se envía una petición PUT a http://localhost:3000/tareas con el objeto en el cuerpo. || La respuesta se espera en formato ITarea (la tarea actualizada).
      `${API_URL}/$(tareaActualizada.id)`, //Se usa el id de la tarea para armar la URL. 
      {
        ...tareaActualizada, //Se envía el objeto tareaActualizada en el cuerpo de la petición.
      }
    );
    return response.data; //Si la petición es exitosa, se devuelve response.data (la tarea actualizada).
  } catch (error) {
    console.error("Error al obtener las tareas", error);
  }
};

export const eliminarTareaPorId = async (idTarea: string) => { //Se recibe el id de la tarea a eliminar.
  try {
    const response = await axios.delete<ITarea>(`${API_URL}/${idTarea}`); //Se envía una petición DELETE a http://localhost:3000/tareas con el id de la tarea a eliminar. || La respuesta se espera en formato ITarea (la tarea eliminada).
    return response.data; //Si la petición es exitosa, se devuelve response.data (la tarea eliminada).
  } catch (error) {
    console.error("Error al obtener las tareas", error);
  }
};

import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3000";

export const getAllTareas = async () =>{
    try {
        const response = await axios.get<ITarea[]>(`${API_URL}/backlog`)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.error("Error posting nuevaTarea:", error);
    }
};

export const postNuevaTarea = async (nuevaTarea: ITarea) =>{
    try {
        const response = await axios.post<ITarea>(`${API_URL}/backlog`, nuevaTarea);
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const editarTarea = async (tareaActualizada: ITarea) =>{
    try {
        const response = await axios.put<ITarea>(`${API_URL}/backlog/${tareaActualizada.id}`,{
            ...tareaActualizada,
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const eliminarTareaPorID = async (idTarea: string) =>{
    try {
        const response = await axios.delete<ITarea>(`${API_URL}/backlog/${idTarea}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};
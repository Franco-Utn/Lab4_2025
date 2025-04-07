import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import {
  editarTarea,
  eliminarTareaPorId,
  getAllTareas,
  postNuevaTarea,
} from "../http/tareas";
import { ITarea } from "../types/tareas";
import Swal from "sweetalert2";

export const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    editarUnaTarea,
    eliminarUnaTarea,
  } = tareaStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarUnaTarea: state.eliminarUnaTarea,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );

  const getTareas = async () => {
    const data = await getAllTareas();
    if (data) setArrayTareas(data);
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
      Swal.fire("Tarea Creada", "La tarea se creo correctamente", "success");
    } catch (error) {
      eliminarUnaTarea(nuevaTarea.id!);
      console.log("Algo salio mal", error);
    }
  };

  const putEditarTarea = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);

    editarUnaTarea(tareaEditada);
    try {
      await editarTarea(tareaEditada);
      Swal.fire("Tarea Editada", "La tarea se edito correctamente", "success");
    } catch (error) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio!);
      console.log("Algo salio mal", error);
    }
  };

  const eliminarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);

    eliminarUnaTarea(idTarea);

    try {
      await eliminarTareaPorId(idTarea);
      Swal.fire(
        "Tarea Eliminada",
        "La tarea se elimino correctamente",
        "success"
      );
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("Algo salio mal", error);
    }
  };
  return {
    getTareas,
    crearTarea,
    putEditarTarea,
    eliminarTarea,
    tareas,
  };
};

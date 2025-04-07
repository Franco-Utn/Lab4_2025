import { FC } from "react";
import { ITarea } from "../../../types/tareas";
import styles from "./CardList.module.css";
import { useTareas } from "../../../hooks/useTareas";

type ICardList = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
  
  const {eliminarTarea} = useTareas()
  const eliminarTareaById = () => {
    eliminarTarea(tarea.id!);
    console.log("Eliminar tarea");
  };
  const editarTarea = () => {
    handleOpenModalEdit(tarea);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h3>Titulo: {tarea.titulo}</h3>
        <p>Descripcion: {tarea.descripcion}</p>
        <p>
          <b>Fecha Limite: {tarea.fechaLimite}</b>
        </p>
      </div>
      <div className={styles.cardActions}>
        <button onClick={editarTarea}>Editar</button>
        <button onClick={eliminarTareaById}>Eliminar</button>
      </div>
    </div>
  );
};

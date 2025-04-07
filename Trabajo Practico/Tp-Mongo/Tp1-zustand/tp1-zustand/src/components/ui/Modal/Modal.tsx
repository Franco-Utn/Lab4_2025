import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./Modal.module.css";
import { ITarea } from "../../../types/tareas";
import { useTareas } from "../../../hooks/useTareas";
type IModal = {
  handleCloseModal: VoidFunction;
};

const initaialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const { crearTarea, putEditarTarea } = useTareas();

  const [formValues, setFormValues] = useState<ITarea>(initaialState);

  useEffect(() => {
    if (tareaActiva) {
      setFormValues(tareaActiva);
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tareaActiva) {
      putEditarTarea(formValues);
    } else {
      crearTarea({ ...formValues, id: new Date().toDateString() });
    }
    setTareaActiva(null)
    handleCloseModal();
    console.log(formValues);

  };
  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div>
          <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div>
            <input
              placeholder="Ingrese un Titulo"
              type="text"
              required
              onChange={handleChange}
              value={formValues.titulo}
              autoComplete="off"
              name="titulo"
            />
            <textarea
              placeholder="Ingrese una Descripción"
              required
              onChange={handleChange}
              value={formValues.descripcion}
              name="descripcion"
            />

            <input
              type="date"
              onChange={handleChange}
              required
              value={formValues.fechaLimite}
              autoComplete="off"
              name="fechaLimite"
            />
          </div>
          <div className={styles.buttonCard}>
            <button type="submit">
              {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
            </button>
            <button onClick={handleCloseModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

//1er paso: Instanciar la Tarea
// interfaz que define cómo deben estructurarse las tareas
export interface ITarea{
    //El signo de interrogación (?) en una interfaz de TypeScript indica que la propiedad es opcional.
    id?: string;
    titulo: string;
    descripcion: string;
    fechaLimite: string;
}
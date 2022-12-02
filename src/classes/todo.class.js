

export class Todo {

   //metodo static para recrear el obj desde LocalStorage (desestructuro props del obj de entrada)
   static fromJson({id, tarea, completado, creado}) {
      const tmpTodo = new Todo(tarea);
      tmpTodo.id = id;
      tmpTodo.completado = completado;
      tmpTodo.creado = creado;

      return tmpTodo;
   }

   constructor(tarea) {
      this.tarea = tarea;

      this.id = new Date().getTime();  // 1669229695930  retorna un numero q representa hora+minutos+segs+etc actual
      this.completado = false;
      this.creado = new Date();
   }

   imprimirClase() {
      console.log(`${this.tarea} - ${this.id}`);
   }
}
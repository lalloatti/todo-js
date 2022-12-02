import { Todo } from './todo.class';

export class TodoList {

   constructor() {
      // this.todos = [];
      this.cargarLocalStorage();
   }

   nuevoTodo(todo) {
      this.todos.push(todo);

      this.guardarLocalStorage();
   }

   eliminarTodo(id) {
      //podriamos hacer algo similar al 'marcarCompletado' iterando
      // pero vamos a utilizar el metodo 'filter' de los arrays
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

      //debo utilizar '!=' en lugar de '!==' para q no chequee la identidad (tipo, me llega id de tipo string desde html)
      // el filter va a devolver un nuevo array con todos los elementos excluyendo el del id
      this.todos = this.todos.filter( todo => todo.id != id);

      this.guardarLocalStorage();
   }

   marcarCompletado(id) {

      for (const todo of this.todos) {
         //ver tipo de datos q llegan
         // console.log(id, todo.id)

         if (todo.id == id) {
            todo.completado = !todo.completado;
            this.guardarLocalStorage();
            break;
         }
      }

   }

   eliminarCompletados() {

      //genera un nuevo array con todos los 'no completados', y es lo que tengo q dejar en el array
      this.todos = this.todos.filter( todo => !todo.completado);
      
      this.guardarLocalStorage();
   }

   guardarLocalStorage() {

      //localStorage: es una palabra "media" reservada, si definimos algo con el mismo nombre pisariamos y ocultariamos
      // la original (evitarlo)
      // se guarda por cada dominio (localhost:8080)

      localStorage.setItem('todo', JSON.stringify(this.todos));

   }

   cargarLocalStorage() {

      //verificar que el objeto exista
      // if (localStorage.getItem('todo')) {
      //    this.todos = JSON.parse(localStorage.getItem('todo'));

      //    console.log('cargarLocal: ', this.todos);
      //    console.log(typeof this.todos);

      // } else {  //si no inicializo array vacio

      //    this.todos = [];

      // }

      //simplificado
      this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];

      //this.todos = this.todos.map( obj => Todo.fromJson(obj))
      this.todos = this.todos.map(Todo.fromJson);

   }

}

//import { saludar } from './js/componentes';
import './styles.css';

// simplifico con un solo import a un archivo index.js q se carga por defecto al importar la carpeta
// el index.js se carga solo al no especificar nada en el from.
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';

import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';



export const todoList = new TodoList();

//llamo al crearTodoHtml para actualizar pantalla desde LocalStorage
//todoList.todos.forEach( todo => crearTodoHtml(todo) );
//simplificado, cuando el unico parametro se pasa como arg en la func =>
todoList.todos.forEach( crearTodoHtml );

//veo que los tipos de los Todo se pierden
// const newTodo = new Todo('Aprender JavaScript');
// todoList.nuevoTodo(newTodo);
// newTodo.imprimirClase();
// todoList.todos[0].imprimirClase();
// console.log('todos', todoList.todos);


// const tarea = new Todo('Aprender JavaScript!');
// todoList.nuevoTodo(tarea);

// // console.log(tarea);
// console.log(todoList);

// crearTodoHtml(tarea);


//prueba del localStorage
// localStorage.setItem('mi-llave', 'ABC1234');
// sessionStorage.setItem('mi-llave', 'ABC1234');

// localStorage.setItem('mi-llave-0.5', 'Se almacenara durante 1.5 segundos...')

// //el setTimeout define un callback q se va a llamar a una det. cantidad de milisegundos (1.5 seg despues)
// setTimeout(()=>{
//    localStorage.removeItem('mi-llave-0.5');
//    console.log('borrada...')
// }, 1500);


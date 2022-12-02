import { todoList } from "..";
import { Todo } from "../classes";

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const cmdBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const lnkFilters = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
   const htmlTodo = `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
                        <div class="view">
                           <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                           <label>${todo.tarea}</label>
                           <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                     </li>`;

   const div = document.createElement('div');
   div.innerHTML = htmlTodo;

   divTodoList.append(div.firstElementChild);  //solo inserto en el doc el primer elem del div (no todo el elemento, evito el div contenedor)

   return div.firstElementChild;  //y retorno lo mismo q inserto en el doc
}

// Eventos
txtInput.addEventListener('keyup', (event) => {
   // console.log(event);

   //no funciona (undefined), lo hice con la prop 'target' del evento
   //console.log(txtInput.value.lenght);
   //console.log(event.target.value.length);
   // && txtInput.value.lenght > 0

   if (event.keyCode === 13 && event.target.value.length > 0){
      console.log(txtInput.value);
      const nuevoTodo = new Todo(txtInput.value);
      todoList.nuevoTodo(nuevoTodo);

      crearTodoHtml(nuevoTodo);
      txtInput.value = '';
   }
});

divTodoList.addEventListener('click', (event) => {

   //para identificar adonde hago el click, del evento tomo el target
   //console.log('click', event.target);

   const nombreElemento = event.target.localName;  //me da que elemento es: input, label, button
   const todoElemento = event.target.parentElement.parentElement;  //obtengo el elem LI sobre el q hago click
   const todoId = todoElemento.getAttribute('data-id');  //puedo obtener por el getAttribute cualquier atributo del obj html

   // console.log(nombreElemento);
   // console.log(todoId);

   if (nombreElemento.includes('input')) {  //click en el check
      todoList.marcarCompletado(todoId);
      todoElemento.classList.toggle('completed');  //toggle agrega/quita de una lista si esta o no (aqui agrego o quito la clase 'completed')
   }
   else if (nombreElemento.includes('button')) {  //click en el boton (borrar el todo)
      todoList.eliminarTodo(todoId);
      divTodoList.removeChild(todoElemento);  //elimina un elemento de una lista
   }

   //console.log(todoList);
});

cmdBorrar.addEventListener('click', () => {
   todoList.eliminarCompletados();
   
   //al aplicar filter puede q el orden del array cambie, me complica entonces elimino desde el HTML
   //borro para atras (desde el ultimo hasta el primero, para q el index a medida q voy borrando no se altere)
   for (let i = divTodoList.children.length-1; i >= 0; i--) {
      const e = divTodoList.children[i];

      //lo mas sencillo en evaluar si tiene la clase 'completed' (q evaluar el checked interno)
      if (e.classList.contains('completed')) {
         divTodoList.removeChild(e);
      }

      //console.log(e);
   }
});

ulFilters.addEventListener('click', (event) => {
   // console.log(event.target.text);
   const filtro = event.target.text;

   //para evitar los click q traen Undefined
   if (!filtro) return;

   //ajusto la clase de los links para q se marque el filtro seleccionado
   lnkFilters.forEach( elem => elem.classList.remove('selected'));
   //console.log(event.target);
   event.target.classList.add('selected');

   //se usa una clase 'hidden' para no mostrar segun se elijan los filtros
   for (const elemento of divTodoList.children) {
      // console.log(elemento);

      elemento.classList.remove('hidden');  //inicializo sin ocultar c/u
      const completado = elemento.classList.contains('completed');

      switch (filtro) {
         case 'Pendientes':
            if (completado) elemento.classList.add('hidden');
            break;

         case 'Completados':
            if (!completado) elemento.classList.add('hidden');
            break;
      }
   }
})
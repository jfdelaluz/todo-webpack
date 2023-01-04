import { todoList } from '../index';
import { Todo } from '../classes';

// HTML References
const divTodoList = document.querySelector( '.todo-list' );
const txtInput = document.querySelector( '.new-todo' );
const btnClearCompleted = document.querySelector( '.clear-completed' );
const ulFilters = document.querySelector( '.filters' );
const aFilters = document.querySelectorAll( '.filter' );

export const init = () => {
  todoList.todos.forEach( createTodoHTML );
};

const createTodoHTML = ( todo ) => {

  const htmlTodo = `
    <li class="${ todo.completed ? 'completed' : '' }" data-id="${ todo.id }">
      <div class="view">
        <input class="toggle" type="checkbox" ${ todo.completed ? 'checked' : '' }>
        <label>${ todo.description }</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
    </li>
  `;

  const div = document.createElement( 'div' );
  div.innerHTML = htmlTodo;

  divTodoList.append( div.firstElementChild );

};

txtInput.addEventListener( 'keyup', ( event ) => {

  if ( event.keyCode !== 13 || event.target.value.trim() === '' ) return;

  const newTodo = new Todo( event.target.value );
  todoList.createTodo( newTodo );

  event.target.value = '';
  createTodoHTML( newTodo );

});

divTodoList.addEventListener( 'click', ( event ) => {

  const elementContainer = event.target.closest( '[data-id]' );
  const elementId = elementContainer.getAttribute('data-id');

  switch( event.target.className ) {
    case 'toggle':
      todoList.markAsCompleted( elementId );
      elementContainer.classList.toggle( 'completed' );
      break;
    case 'destroy':
      todoList.deleteTodo( elementId );
      elementContainer.replaceWith( '' );
      break;
  }
});

btnClearCompleted.addEventListener( 'click', () => {
  todoList.removeCompleted();
  reloadTodosContainer();
});

ulFilters.addEventListener( 'click', ( event ) => {

  const filter = event.target.text;
  if ( !filter ) return;

  aFilters.forEach( aFilter => aFilter.classList.remove( 'selected' ) );
  event.target.classList.add( 'selected' );

  for ( const element of divTodoList.children ) {
    
    element.classList.remove( 'hidden' );
    const completed = element.classList.contains( 'completed' );

    switch( filter ) {
      case 'All':
        break;
      case 'Pending':
        if ( completed ) element.classList.add( 'hidden' );
        break;
      case 'Completed':
        if ( !completed ) element.classList.add( 'hidden' );
        break;
    }
  }
  
});

const reloadTodosContainer = () => {
  divTodoList.innerHTML = '';

  todoList.todos.forEach( element => {
    createTodoHTML( element );
  });
};

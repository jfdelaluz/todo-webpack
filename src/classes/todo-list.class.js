import { Todo } from './todo.class';

export class TodoList {

  constructor() {

    this.loadLocalStorage();

  };

  createTodo( todo ) {
    this.todos.push( todo );
    this.saveLocalStorage();
  };

  deleteTodo( id ) {
    this.todos = this.todos.filter( todo => todo.id.toString() !== id );
    this.saveLocalStorage();
  };

  markAsCompleted( id ) {

    this.todos = this.todos.map( todo => {
      if ( todo.id.toString() === id ) todo.completed = !todo.completed;
      return todo;
    });
    this.saveLocalStorage();

  };

  removeCompleted() {
    this.todos = this.todos.filter( todo => !todo.completed );
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem( 'todos-data', JSON.stringify( this.todos ) );
  }

  loadLocalStorage() {

    this.todos = localStorage.getItem( 'todos-data' )
      ? JSON.parse( localStorage.getItem( 'todos-data' ) )
      : [];

    this.todos = this.todos.map( Todo.fromJson );

  }

}

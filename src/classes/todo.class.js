export class Todo {

  static fromJson({ id, description, completed, created }) {

    const tempTodo = new Todo( description );
    tempTodo.id = id;
    tempTodo.completed = completed;
    tempTodo.created = created;

    return tempTodo;
  };

  constructor( description ) {

    this.description = description;
    
    this.id = new Date().getTime();
    this.completed = false;
    this.created = new Date();

  }

}

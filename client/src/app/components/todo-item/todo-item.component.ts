import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Todo } from "../../models/Todo";
import { TodosService } from "../../services/todos.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(
    private todosService: TodosService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  setClasses() {
    let classes = {
      // todo: true,
      "is-complete": this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    todo.completed = !todo.completed;
    const user = this.authService.getCurrentUser();
    this.todosService
      .toggleTodo(todo, user.username, user.token)
      .subscribe(todo => console.log(todo));
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}

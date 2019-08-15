import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/Todo";
import { User } from "../../models/User";
import { TodosService } from "../../services/todos.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  // user:User;

  constructor(
    private todosService: TodosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.todosService.getTodos(user.username, user.token).subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(todo: Todo) {
    const user = this.authService.getCurrentUser();
    this.todosService
      .addTodo(todo, user.username, user.token)
      .subscribe(todo => {
        this.todos.push(todo);
      });
  }

  deleteTodo(todo: Todo) {
    const user = this.authService.getCurrentUser();
    this.todos = this.todos.filter(t => t._id !== todo._id);
    this.todosService.deleteTodo(todo, user.username, user.token);

  }
}

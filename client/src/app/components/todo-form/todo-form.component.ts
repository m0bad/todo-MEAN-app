import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.css"]
})
export class TodoFormComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  text: string;
  completed: boolean;
  constructor() {}
  ngOnInit() {}

  onSubmit() {
    const todo = {
      text: this.text,
      completed: this.completed
    };
    this.addTodo.emit(todo);
    // reset the form
    this.text = "";
  }
}

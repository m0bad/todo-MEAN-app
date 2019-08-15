import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../models/Todo";

@Injectable({
  providedIn: "root"
})
export class TodosService {
  url = "http://localhost:8080/todos";

  constructor(private http: HttpClient) {}

  getTodos(username: string, userToken: string): Observable<Todo[]> {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${userToken}` })
    };
    const _url = `${this.url}/${username}`;
    return this.http.get<Todo[]>(_url, httpOptions);
  }

  addTodo(todo: Todo, username: string, userToken: string): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${userToken}` })
    };
    const _url = `${this.url}/${username}`;
    return this.http.post<Todo>(_url, todo, httpOptions);
  }

  toggleTodo(todo: Todo, username: string, userToken: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${userToken}` })
    };
    const _url = `${this.url}/${username}/${todo._id}`;
    return this.http.put<Todo>(_url, todo, httpOptions);
  }

  deleteTodo(
    todo: Todo,
    username: string,
    userToken: string
) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${userToken}` })
    };
    const _url = `${this.url}/${username}/${todo._id}`;
    return this.http.delete<Todo>(_url, httpOptions).subscribe();
  }
}

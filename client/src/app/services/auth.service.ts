import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/User";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(
    email: string,
    username: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .post<User>("auth/signup", {
        email,
        username,
        password
      })
      .pipe(
        map(result => {
          const user = {
            id: result.id,
            username: result.username,
            email: result.email,
            token: result.token
          };
          localStorage.setItem("current_user", JSON.stringify(user));
          return true;
        })
      );
  }

  signin(email: string, password: string): Observable<boolean> {
    return this.http
      .post<User>("auth/signin", {
        email,
        password
      })
      .pipe(
        map(result => {
          const user = {
            id: result.id,
            username: result.username,
            email: result.email,
            token: result.token
          };
          localStorage.setItem("current_user", JSON.stringify(user));
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem("current_user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("current_user"));
  }

  public get loggedIn(): boolean {
    return localStorage.getItem("current_user") !== null;
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(
    email: string,
    username: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .post<{ token: string }>("http://localhost:8080/auth/signup", {
        email,
        username,
        password
      })
      .pipe(
        map(result => {
          localStorage.setItem("access_token", result.token);
          return true;
        })
      );
  }

  signin(email: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>("http://localhost:8080/auth/signin", {
        email,
        password
      })
      .pipe(
        map(result => {
          localStorage.setItem("access_token", result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem("access_token");
  }

  public get loggedIn(): boolean {
    return localStorage.getItem("access_token") !== null;
  }
}

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  email: string;
  password: string;
  error: string;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth
      .signin(this.email, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate([""]),
        err => {
          this.error = err.error.error;
        }
      );
  }
}

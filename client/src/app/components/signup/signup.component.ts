import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  error: string;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth
      .signup(this.email, this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate([""]),
        err => {
          this.error = err.error.error;
        }
      );
  }
}

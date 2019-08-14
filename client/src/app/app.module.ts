import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { TodosComponent } from './components/todos/todos.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NavbarComponent, SignupComponent, WelcomePageComponent, TodosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/auth']
      }
    })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

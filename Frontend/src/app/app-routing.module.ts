import { RhMainComponent } from './components/rh/rh-main/rh-main.component';
import { LoginComponent } from './components/login/login.component';
import { FormMainComponent } from './components/form/form-main/form-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/login"},
  {path: "login", component: LoginComponent},
  {path: "form", component: FormMainComponent},
  {path: "rh", component: RhMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

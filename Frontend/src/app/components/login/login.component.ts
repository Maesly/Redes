import { Component, OnInit } from '@angular/core';
import { loginData, usuario } from 'src/app/Data/structures';
//--Import para el control de los Forms usados en la toma de inforamción para LogIn--//
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
//--Import que nos ayudará con el desplazamiento entre componentes--//
import { Router } from '@angular/router';
//--Import de Servicios de Autenticación--/
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * @class: Clase LoginMain. 
 * @description: Aquí se maneja la lógica relacionada con el ingreso de credenciales.
 * @param: Router & AuthService
 * @author: Roy Acevedo.
 */
export class LoginComponent implements OnInit {

  n = new usuario();
  //---Variables---//
  
  loginData = new loginData();//Objeto LogIn

  errorMSG = "";//Mensaje de error
  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit(): void {
    
  }

  //Funcion que gestiona la captura y envio de credenciales mediante el uso de http.//
  onSubmit(){
    //localStorage.setItem('token', "holandaaaaa");
    this.auth.sendLoginData(this.loginData.information).subscribe(
      result => {
        console.log(result);
        if(result == true){this.router.navigate(['/rh']);}
        else{this.router.navigate(['/form'])}
        //localStorage.setItem('token', result.token); //token del backend
        //this.router.navigate(['/form']);//redirecciono a la seleccion d cliente.
    },
      err => {
        console.log(err)
        this.errorMSG = "Usuario o Contraseña incorrecta."
      })
  }

  goToForm(){
    this.router.navigate(['/form']);
  }

}

import { Injectable } from '@angular/core';
//--Http--//
import { HttpClient, HttpHeaders } from '@angular/common/http'
//--Router//
import { Router } from '@angular/router';
//Globals
import * as myGlobals from '../Data/globals';

@Injectable({
  providedIn: 'root'
})

/**
 * @class: AuthService
 * @description: Clase para el uso de modulos Http para la autenticación de los usuarios.
 */
export class AuthService {

  //URL Base
  private url:string = myGlobals.baseURL + "/Usuario";

  constructor(private http:HttpClient, private router:Router, ) { }

  //--User Post--//
  sendLoginData(loginData:any){

    return this.http.get<any>(this.url + '/' + loginData.correo + '/' + loginData.clave);
  }


  //Get Values from Local Storage//
  getValue(key:string): any{

    return localStorage.getItem(key); //Key es el tipo de token a solicitar al local storage
  }

  //Cerrar Sesión//
  logOut(){

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

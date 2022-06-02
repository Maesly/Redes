import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
//--Http--//
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Globals
import * as myGlobals from '../Data/globals';

@Injectable({
  providedIn: 'root'
})
export class CurriculumsService {

  constructor(private http:HttpClient, private auth:AuthService) { }

  //URL Base
  private url:string = myGlobals.baseURL + "/Usuario";
  private url1:string = myGlobals.baseURL + "/Usuario/buscar_ti";
  private url2:string = myGlobals.baseURL + "/Usuario/ingles_avanzado";
  private url3:string = myGlobals.baseURL + "/Usuario/buscar_no_ti";

  //Send new User
  sendUser(user:any){
    
    return this.http.post<any>(this.url, user);
  }

  //Get User List
  getUserList(){
    
    return this.http.get<any>(this.url)
  }


  getUNO(){

    return this.http.get<any>(this.url1)
  }

  getDOS(){
    return this.http.get<any>(this.url2)
  }

  getTRES(){
    return this.http.get<any>(this.url3)
  }

}

import { CurriculumsService } from './../../../services/curriculums.service';
import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/Data/structures';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-main',
  templateUrl: './form-main.component.html',
  styleUrls: ['./form-main.component.css']
})
export class FormMainComponent implements OnInit {

  //----Variables----//

  //User
  newUser = new usuario();

  //Control
  Form = true;

  //Inputs
  inputTitulos = "";
  inputLenguajes = "";
  inputIdiomas = "";

  constructor(private router: Router,
    private auth: AuthService,
    private curriculumsService: CurriculumsService) { }

  ngOnInit(): void {
    
  }

  //Register function
  onSubmit(){

    this.newUser.information.titulos = this.splitTitulo();
    this.newUser.information.lenguajes = this.splitLenguaje();
    this.newUser.information.idiomas = this.splitIdioma();
    
    console.log(this.newUser.information);
    //Sending User...
    this.sendNewUser(this.newUser.information);
    this.router.navigate(['/login']);
    
  }



  //Split Titulos Inputs
  splitTitulo(){
    let listTitulos = this.inputTitulos.split(",", 100);
    return listTitulos;
  }

  //Split Lenguajes Inputs
  splitLenguaje(){
    let listLenguajes = this.inputLenguajes.split(",", 100);
    return listLenguajes;
  }

  //Split Idiomas Inputs//
  splitIdioma(){
    
    let listIdiomas = this.inputIdiomas.split(",", 100);
    let idiomas = [];
    for(let obj of listIdiomas){
      let splitedList = obj.split(":", 100);

      let jsonObject = {idioma:splitedList[0], nivel:splitedList[1]}

      idiomas.push(jsonObject);
      console.log(idiomas);
    }
    return idiomas;
  }
  
  //Send Users
  sendNewUser(user:any){
    this.curriculumsService.sendUser(user).subscribe(
      result => {
        console.log("Sending user: ", user);
      }
    )
  }

}
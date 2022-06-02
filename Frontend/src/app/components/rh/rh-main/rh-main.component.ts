import { CurriculumsService } from './../../../services/curriculums.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { usuario } from 'src/app/Data/structures';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rh-main',
  templateUrl: './rh-main.component.html',
  styleUrls: ['./rh-main.component.css']
})
export class RhMainComponent implements OnInit {



  //---Variables---//

  //Control
  userListControl:boolean = true;
  infoFormControl:boolean = false;

  filterOneControl:boolean = false;
  filterTwoControl:boolean = false;
  filterThreeControl:boolean = false;

  //Users List->[{},{}]
  userList:any;

  //Filtered List
  unoList:any;
  dosList:any;
  tresList:any;


  //Store User Info
  userInfo = new usuario();

  //idiomasText
  idiomasText = "";

  //Paginaiton//
	currentPg: number = 1;

  alo = [{nombre: "Ruso", nivel: "Bajo"}, {nombre: "Ingles", nivel: "Medio"}];

  beta = [{
    correo:"roygtcr@hotmail.com",
    nombre: "Roy Acevedo Méndez",
    pais: "Costa Rica",
    titulos: ["Kinder, Primaria, Secundaria"],
    area: "CE",
    lenguajes: ["Python, Typescript, Java"],
    idiomas: [{nombre: "Ruso", nivel: "Bajo"}, {nombre: "Ingles", nivel: "Medio"}]
  },
  {
    correo:"mulisha@gmail.com",
    nombre: "Pablo Azofeifa Bond",
    pais: "Costa Rica",
    titulos: ["Kinder, Primaria"],
    area: "CE",
    lenguajes: ["Python, Prolog, C++"],
    idiomas: [{nombre: "Ruso", nivel: "Bajo"}, {nombre: "Ingles", nivel: "Medio"}]
  },
  {
    correo:"maesly@hotmail.com",
    nombre: "Maesly Velasquez Rivera",
    pais: "Costa Rica",
    titulos: ["Kinder, Manipulación Alimentos"],
    area: "CE",
    lenguajes: ["Python, C#, Java"],
    idiomas: [{nombre: "Ruso", nivel: "Bajo"}, {nombre: "Ingles", nivel: "Medio"}]
  },
  {
    correo:"adminRH@gmail.com",
    nombre: "Zeik Uart Chuda",
    pais: "Costa Rica",
    titulos: ["Kinder, Primaria, Secundaria"],
    area: "ATI",
    lenguajes: ["Python, Typescript, Java"],
    idiomas: [{nombre: "Ruso", nivel: "Bajo"}, {nombre: "Ingles", nivel: "Medio"}]
  }]


  constructor(private auth:AuthService, private curriculumService:CurriculumsService) { }

  ngOnInit(): void {
    
    //Solicito la lista de Usuarios:
		this.curriculumService.getUserList().subscribe(
			result => {
				console.log("Clientes: ", result);
				this.userList = result;//Actualizar variable de prueba
				//this.router.navigate(['/products']);//redireccionamiento a la página de productos
			}
		)

  }

  userSubmit(obj:any){

    this.userInfo.information.nombre = obj.nombre;
    this.userInfo.information.pais = obj.pais;
    this.userInfo.information.correo = obj.correo;
    this.userInfo.information.area = obj.area;
    this.userInfo.information.titulos = obj.titulos;
    this.userInfo.information.lenguajes = obj.lenguajes;
    this.idiomasText = this.test(obj.idiomas);
    this.userInfo.information.idiomas = obj.idiomas;

    //HTML Control
    this.userListControl = false;
    this.infoFormControl = true
  }


  test(textList:any){
    
    let texto = "";
    let size = textList.length;
    let counter = 1;
    console.log(size);
    for(let obj of textList){

      let tex = obj.idioma + ":" + obj.nivel;
      if(counter < size){
        texto = texto + tex + ",";
        
      }
      else{
        texto = texto + tex;
      }
      counter++;
      console.log(tex);
      console.log(texto);
    }

    return texto;
  }

  //Go back to User List
  goBack(){

    this.infoFormControl = false;
    this.filterOneControl = false;
    this.filterTwoControl = false;
    this.filterThreeControl = false;
    this.userListControl = true;
  }

  //Filtro Usuarios de ATI
  getFilter1(){

    this.curriculumService.getUNO().subscribe(
      result =>{
        console.log("Llegó esto: ", result)
        this.unoList = result;
      }
    )
    this.filterOneControl = true;
    this.filterTwoControl = false;
    this.filterThreeControl = false;
    this.infoFormControl = false;
    this.userListControl = false;

  }

  //Filtro Ingles avanzado
  getFilter2(){

    this.curriculumService.getDOS().subscribe(
      result =>{
        console.log("Llegó esto: ", result)
        this.dosList = result;
      }
    )
    this.filterOneControl = false;
    this.filterTwoControl = true;
    this.filterThreeControl = false;
    this.infoFormControl = false;
    this.userListControl = false;
  }

  //Filtro ATI Titulos
  getFilter3(){

    this.curriculumService.getTRES().subscribe(
      result =>{
        console.log("Llegó esto: ", result)
        this.tresList = result;
      }
    )
    this.filterOneControl = false;
    this.filterTwoControl = false;
    this.filterThreeControl = true;
    this.infoFormControl = false;
    this.userListControl = false;

  }

}


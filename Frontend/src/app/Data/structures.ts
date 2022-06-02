export class loginData{

    information = {

        correo: "",
        clave: ""
    }
}

//Estructura Usuario TI
export class usuario{

    information = {

        correo: "",
        clave: "",
        nombre: "",
        pais: "",
        titulos: [""],
        area: "",
        lenguajes: [""],
        idiomas: [{}],
        rol: "Usuario"
    }
}

//----Sub Estructuras----//

//Lenguaje
export class lenguaje{

    informarion = {

        lenguaje: ""
    }
}
//Estructura Titulo
export class titulo{

    information = {

        link: ""
    }
}

//Estructura Idioma
export class idioma{

    information = {

        idioma: "",
        nivel: ""
    }
}


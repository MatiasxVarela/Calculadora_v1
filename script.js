const btn_cero = document.querySelector("#btn_cero");
const btn_uno = document.querySelector("#btn_uno");
const btn_dos = document.querySelector("#btn_dos");
const btn_tres = document.querySelector("#btn_tres");
const btn_cuatro = document.querySelector("#btn_cuatro");
const btn_cinco = document.querySelector("#btn_cinco");
const btn_seis = document.querySelector("#btn_seis");
const btn_siete = document.querySelector("#btn_siete");
const btn_ocho = document.querySelector("#btn_ocho");
const btn_nueve = document.querySelector("#btn_nueve");
const btn_suma = document.querySelector("#btn_suma");
const btn_resta = document.querySelector("#btn_resta");
const btn_division = document.querySelector("#btn_division");
const btn_multiplicacion = document.querySelector("#btn_multiplicacion");
const btn_delete = document.querySelector("#btn_delete");
const btn_deleteAll = document.querySelector("#btn_deleteAll");
const btn_resultado = document.querySelector("#btn_resultado");
const texto_resultado = document.querySelector("#texto_resultado")
const resultado_final = document.querySelector("#resultado_final")
let contenido_texto = [0]
texto_resultado.innerHTML = contenido_texto.join("");

let verificador_operador = function() {
    if (contenido_texto[contenido_texto.length - 1] == " * " ||contenido_texto[contenido_texto.length - 1] == " - " ||contenido_texto[contenido_texto.length - 1] == " + " ||contenido_texto[contenido_texto.length - 1] == " / "){
        contenido_texto.pop()
    }
}

let visualizador = function(a) {
    if (resultado_final.innerHTML != ""){
        contenido_texto = [0];
    }
    resultado_final.innerHTML = "";
    contenido_texto.push(a);
    texto_resultado.innerHTML = contenido_texto.join("");
}

let visualizadorNumero = function(a) {
    /* if (contenido_texto[0] == 0 && contenido_texto[1] == undefined){ */
    if (contenido_texto[contenido_texto.length - 1] == 0 && (contenido_texto[contenido_texto.length - 2] == undefined || contenido_texto[contenido_texto.length - 2] == " + " || contenido_texto[contenido_texto.length - 2] == " - "|| contenido_texto[contenido_texto.length - 2] == " * "|| contenido_texto[contenido_texto.length - 2] == " / ") /* && contenido_texto[1] == undefined */){
        contenido_texto.pop();
    }
    visualizador(a);
}

btn_cero.onclick = function(){
    visualizadorNumero("0");
}

btn_uno.onclick = function(){
    visualizadorNumero("1");
}

btn_dos.onclick = function(){
    visualizadorNumero("2");
}

btn_tres.onclick = function(){
    visualizadorNumero("3");
}

btn_cuatro.onclick = function(){
    visualizadorNumero("4");
}

btn_cinco.onclick = function(){
    visualizadorNumero("5");
}

btn_seis.onclick = function(){
    visualizadorNumero("6");
}

btn_siete.onclick = function(){
    visualizadorNumero("7");
}

btn_ocho.onclick = function(){
    visualizadorNumero("8");
}

btn_nueve.onclick = function(){
    visualizadorNumero("9");
}

btn_suma.onclick = function(){
    verificador_operador();
    visualizador(" + ");
}

btn_resta.onclick = function(){
    verificador_operador();
    visualizador(" - ");
}

btn_division.onclick = function(){
    verificador_operador();
    visualizador(" / ");
}

btn_multiplicacion.onclick = function(){
    verificador_operador();
    visualizador(" * ");
}

btn_delete.onclick = function(){
    if(contenido_texto.length == 1){
        contenido_texto = [0];
        texto_resultado.innerHTML = contenido_texto.join("");
    }else {
        contenido_texto.pop();
        texto_resultado.innerHTML = contenido_texto.join("");
    }
}

btn_deleteAll.onclick = function(){
    contenido_texto = [0];
    texto_resultado.innerHTML = contenido_texto;
}


/// Acá empieza el funcionamiento de las sumás
let calculadora = function(){
    const numerosCalucular = {}; 
    const numerosSumar = {}
    let resultado = contenido_texto.join("");
    let espacios = 0;
    let longitud = []
    let resultadoFinal = 0;


    /* recorre los valores del iput */
    for (let i = 0; i < resultado.length; i++){

    /* Si el valor recorrido es un espacio no hace nada */
        if (resultado[i] == " "){
    /* Revisa si el valor recorrido es un numero */
    /* En el caso de que sea un numero lo agrega a un objeto */
    /* Si es el primer numero de un entero crea un parametro en el objeto, si no le suma al ya creado */
    /* Siempre el primer if para el primer numero agregado al objeto no ejecute un error */
    /* "espacios" se usa para saber el lugar en donde sumar o en donde crear el numero */
        }else if (resultado[i] == 0 || resultado[i] == 1 || resultado[i] == 2 || resultado[i] == 3|| resultado[i] == 4|| resultado[i] == 5|| resultado[i] == 6|| resultado[i] == 7|| resultado[i] == 8|| resultado[i] == 9){
            if (numerosCalucular[espacios] == undefined){
                numerosCalucular[espacios] = resultado[i];
            } else {
                numerosCalucular[espacios] += resultado[i];
            }
    /* Agrega a un objeto el operador de calculo respectivo*/
    /* los espacios se usan para saber como nombrarlo al momento de agregarlo a un objeto (siempre se nombran con numeros) */
        } else if (resultado[i] === "+"){
            espacios++;
            numerosCalucular[espacios] = "sumar";
            espacios++;
        }else if (resultado[i] === "-"){
            espacios++;
            numerosCalucular[espacios] = "restar";
            espacios++;
        }else if (resultado[i] === "*"){
            espacios++;
            numerosCalucular[espacios] = "multiplicar";
            espacios++;
        }else if (resultado[i] === "/"){
            espacios++;
            numerosCalucular[espacios] = "dividir";
            espacios++;
        }
    }
    
    
    /* una vez con todos los valores agregados a un objeto se recorre el objeto con el fin de encontrar multiplicaciones o divisiones*/
    /* una vez que encontramos una division o multiplicación verificamos si se trata de una u otra */
    /* Al momento de recorrerlo se busca realizar las multiplaciones o divisiones con las que nos topemos */
    /*  para sacar la multiplicacion o division lo que se hace es que se agarra la propiedad anterior y la siguiente al operador*/
    /* una vez que se hace esto, la operacion realizada guarda en el lugar de la segunda propiedad operada */
    /*  despues se elimina la primera propiedad operada y la propiedad que contiene el operador*/
    for (let i in numerosCalucular){
        if (numerosCalucular[i] == "multiplicar" || numerosCalucular[i] == "dividir"){
                if (numerosCalucular[i] == "multiplicar"){
                    numerosCalucular[parseInt(i) + 1] = (parseInt(numerosCalucular[parseInt(i) -1]) * parseInt(numerosCalucular[parseInt(i) + 1]));
                delete numerosCalucular[parseInt(i)]
                delete numerosCalucular[parseInt(i) - 1]
                } else if (numerosCalucular[i] == "dividir"){
                    numerosCalucular[parseInt(i) + 1] = (parseInt(numerosCalucular[parseInt(i) -1]) / parseInt(numerosCalucular[parseInt(i) + 1]));
                delete numerosCalucular[parseInt(i)]
                delete numerosCalucular[parseInt(i) - 1]
                }
            }
        }

        /* los siguientes dos for se hacen con el fin de "Depurar" el objeto para que no hayan problemas al recorrerlo*/
        /* Se pasan los valores que quedan en el objeto a un array */
        for (var contenido in numerosCalucular){
            longitud.push(numerosCalucular[contenido])
        }
        /* Y despues se pasan los valores a un nuevo objeto */
        for (let i = 0; i < longitud.length; i++){
            numerosSumar[i] = longitud[i]
        }

        /* Ahora se recorre el nuevo objeto para terminar de operar */
        /* Este procedimiento es exactamente igual al de las divisiones y multiplicaciones, nada más que con restas */
        /* Variable resultadoFinal es para cuando retornamos el resultado saber en que parte del objeto se encuentra nuestra cuenta */
        for (let i in numerosSumar){
            if (numerosSumar[i] == "sumar" || numerosSumar[i] == "restar"){
                if (numerosSumar[i] == "sumar"){
                    numerosSumar[parseInt(i) + 1] = (parseInt(numerosSumar[parseInt(i) -1]) + parseInt(numerosSumar[parseInt(i) + 1]));
                delete numerosSumar[parseInt(i)]
                delete numerosSumar[parseInt(i) - 1]
                resultadoFinal = parseInt(i) + 1;
                } else if (numerosSumar[i] == "restar"){
                    numerosSumar[parseInt(i) + 1] = (parseInt(numerosSumar[parseInt(i) -1]) - parseInt(numerosSumar[parseInt(i) + 1]));
                delete numerosSumar[parseInt(i)]
                delete numerosSumar[parseInt(i) - 1]
                resultadoFinal = parseInt(i) + 1;
                }
            }
        }
        resultado_final.innerHTML = "Resultado: " + numerosSumar[resultadoFinal];
}

btn_resultado.onclick = function(){
    calculadora();
}
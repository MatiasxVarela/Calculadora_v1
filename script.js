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
/* const btn_raiz = document.querySelector("#btn_raiz") */
const btn_elevacion = document.querySelector("#btn_elevacion")
let contenido_texto = [0]
texto_resultado.innerHTML = contenido_texto.join("");

let verificador_operador = function() {
    if (contenido_texto[contenido_texto.length - 1] == " * " ||contenido_texto[contenido_texto.length - 1] == " - " ||contenido_texto[contenido_texto.length - 1] == " + " ||contenido_texto[contenido_texto.length - 1] == " / " || contenido_texto[contenido_texto.length - 1] == " ^ " || contenido_texto[contenido_texto.length - 1] == " √ " ){
        contenido_texto.pop()
    }
}

let vacio = function(){
    if (resultado_final.innerHTML != ""){
        contenido_texto = [0];
        resultado_final.innerHTML = "";
    }
}
let visualizador = function(a) {
    vacio();
    contenido_texto.push(a);
    texto_resultado.innerHTML = contenido_texto.join("");
}

let visualizadorNumero = function(a) {
    vacio();
    if (contenido_texto[contenido_texto.length - 1] == 0 && (contenido_texto[contenido_texto.length - 2] == undefined || contenido_texto[contenido_texto.length - 2] == " + " || contenido_texto[contenido_texto.length - 2] == " - "|| contenido_texto[contenido_texto.length - 2] == " * "|| contenido_texto[contenido_texto.length - 2] == " / ") ){
        contenido_texto.pop();
    }
    contenido_texto.push(a);
    texto_resultado.innerHTML = contenido_texto.join("");
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

/* btn_raiz.onclick = function(){
    verificador_operador();
    visualizadorNumero(" √ ");
} */

btn_elevacion.onclick = function(){
    verificador_operador();
    visualizador(" ^ ");
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

// Empieza calculadora

let calculadora = calculo => {
    let calculoPasado = calculo;
    let deleteAnteriorPosterior = (i) =>{
        calculoPasado.splice(i, 2);
        i = i - 1;
        return i;
    }

    for (let i = 0; i <= calculoPasado.length; i++) {
        if(calculoPasado[i] == " ^ "){
            calculoPasado[i - 1] = calculoPasado[i -1] ** calculoPasado[i + 1];
            i = deleteAnteriorPosterior(i)
        }
    }

    for (let i = 0; i <= calculoPasado.length; i++) {
        if(calculoPasado[i] == " * " || calculoPasado[i] == " / "){
            if (calculoPasado[i] == " * "){
                calculoPasado[i - 1] = calculoPasado[i -1] * calculoPasado[i + 1];
                i = deleteAnteriorPosterior(i)
            } else if (calculoPasado[i] == " / ") {
                calculoPasado[i - 1] = calculoPasado[i -1] / calculoPasado[i + 1];
                i = deleteAnteriorPosterior(i)
            }
        }
    }

    for (let i = 0; i < calculoPasado.length; i++) {
        if(calculoPasado[i] == " - " || calculoPasado[i] == " + "){
            if (calculoPasado[i] == " + "){
                calculoPasado[i - 1] = parseInt(calculoPasado[i -1]) + parseInt(calculoPasado[i + 1]);
                i = deleteAnteriorPosterior(i)
            } else if (calculoPasado[i] == " - ") {
                calculoPasado[i - 1] = parseInt(calculoPasado[i -1]) - parseInt(calculoPasado[i + 1]);
                i = deleteAnteriorPosterior(i)
            }
        }
    }
    resultado_final.innerHTML = "Resultado: " + calculoPasado;
}

// Termina calculadora


btn_resultado.onclick = function(){
    if (contenido_texto[contenido_texto.length - 1] != " + " && contenido_texto[contenido_texto.length - 1] != " - " && contenido_texto[contenido_texto.length - 1] != " / " && contenido_texto[contenido_texto.length - 1] != " * " && contenido_texto[contenido_texto.length - 1] != " ^ "){
        calculadora(contenido_texto);
    }
}
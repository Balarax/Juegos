
/*
Funcion para generar la palabra Aleatoria, se ejecuta a través del evento onload="GenerarPalabraAleatoria(); en la etiqueta body
NOTA LA ETIQUETA QUE MUESTRA EL RESULTADO DE ESTA FUNCION ESTA COMO "HIDDEN";
@version 1.0
*/

function GenerarPalabraAleatoria() {
    palabras = new Array("acarrear", "acogedor", "atrevido", "celebrar", "creencia", "diputado", "dolorido", "grabador", "molestar", "suciedad");

    PalabraAleatoria = Math.floor(Math.random() * (palabras.length));
    seleccion = palabras[PalabraAleatoria]

    document.getElementById("palabra").innerHTML = seleccion;
}

/*
Funcion para controlar que solo se ha introducido una letra, se ejecuta a través del evento onchange="FiltroSoloUnaLetra(); en la primera etiqueta <input>
@return Devuelve la letra validada;
@version 1.0
*/

function FiltroSoloUnaLetra(letra) {
    var re = new RegExp('^[a-z|A-Z]?$'); //Creamos un objeto que es una expresion regular

    var valida = letra.match(re);

    if (valida) {
        document.getElementById("alerta").innerHTML = "";
        return letra.toLowerCase(); //Se devuelve la letra en minúsculas para luego poder compararla
    } else {
        document.getElementById("alerta").innerHTML = "!Solo se puede introducir una letra!";
    }

}

/*
Funcion para ver si una letra se encuentra en una palabra
@version 1.0
*/

function BuscarLetra() {
    letra = FiltroSoloUnaLetra(document.getElementById('letra').value);

    var re = new RegExp(letra + "+", 'g'); //Creamos un objeto que es una expresion regular

    palabra = document.getElementById("palabra").innerHTML;

    var valida = palabra.match(re);

    if (valida) {
        document.getElementById("encontrada").innerHTML = "La letra SI se encuentra en la palabra";
    } else {
        document.getElementById("encontrada").innerHTML = "La letra NO se encuentra en la palabra";
    }

}





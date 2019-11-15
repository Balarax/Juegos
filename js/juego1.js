
/*
Funcion para generar la palabra Aleatoria, se ejecuta a través del evento onload="GenerarPalabraAleatoria(); en la etiqueta body;
NOTA LA ETIQUETA QUE MUESTRA EL RESULTADO DE ESTA FUNCION ESTA COMO "HIDDEN";
@version 1.0
*/
var intentos = 10;
var primera = true;
var letrasArray = new Array();
var ganas = false;
var PalabraAleatoria = 0;

function GenerarPalabraAleatoria() {
    palabras = new Array("acarrear", "acogedor", "atrevido", "celebrar", "creencia", "diputado", "dolorido", "grabador", "molestar", "suciedad");

    PalabraAleatoria = Math.floor(Math.random() * (palabras.length));
    seleccion = palabras[PalabraAleatoria]

    document.getElementById("palabra").innerHTML = seleccion;
    document.getElementById('intentos').innerHTML = intentos;
    document.getElementById('palabraOculta').innerHTML = introduceGuiones(seleccion);
}

/*
Funcion para controlar que solo se ha introducido una letra, se ejecuta a través del evento onchange="FiltroSoloUnaLetra(); en la primera etiqueta <input>;
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
Funcion para ver si una letra se encuentra en una palabra;
@version 1.0
*/

function BuscarLetra() {
    letra = FiltroSoloUnaLetra(document.getElementById('letra').value);

    var re = new RegExp(letra + "+", 'g'); //Creamos un objeto que es una expresion regular

    palabra = document.getElementById("palabra").innerHTML;

    var valida = palabra.match(re);

    if (valida) {
        document.getElementById('msg').innerHTML = "";
        var aux = compruebaPalabras(letra);
        ganas = sonIguales(aux, ganas);
        document.getElementById('letra').value = "";
    } else {
        document.getElementById('msg').innerHTML = "no existe";

    }

    primera = false;
    usadas(letra, letrasArray);
    if (ganas && intentos > 0) {
        document.getElementById('msg').innerHTML = "Has ganado";
        document.getElementById('cambia').innerHTML = "<a href='juego1.html'>volver a jugar</a>"
    }
    if (!ganas && intentos < 1) {
        document.getElementById('msg').innerHTML = "Has perdido";
        document.getElementById('cambia').innerHTML = "<a href='juego1.html'>volver a jugar</a>"
    }
    // controla que baje el primer intento 
    if (primera) {
        document.getElementById('intentos').innerHTML = intentos--;
        document.getElementById('intentos').innerHTML = intentos--;
    } else {
        document.getElementById('intentos').innerHTML = intentos--;
    }
}

// funcion para sacar guiones con una longitud igual a la de la palabra secreta
function introduceGuiones(seleccion) {
    var guiones = "";
    for (let i = 0; i < seleccion.length; i++) {
        guiones += "_";
    }
    return guiones;
}

function compruebaPalabras(letra) {
    var secreta = document.getElementById('palabra').innerHTML;
    var descubrir = document.getElementById('palabraOculta').innerHTML;
    var aux = descubrir.split("");
    for (let i = 0; i < secreta.length; i++) {
        if (letra == secreta.charAt(i)) {
            aux[i] = secreta.charAt(i);
        }
    }
    descubrir = aux.join("");
    console.log(descubrir);
    return descubrir;
}

function sonIguales(descubrir, ganas) {
    var secreta = document.getElementById('palabra').innerHTML;

    if (descubrir == secreta) {
        document.getElementById('palabraOculta').innerHTML = secreta;
        ganas = true;
    } else {
        document.getElementById('palabraOculta').innerHTML = descubrir;
    }
    return ganas;
}
// funcion que guarda las letras que ya se han introducido
function usadas(letra, letrasArray) {
    letrasArray.push(letra);
    var informar = "Has usado las siguientes letras: ";

    for (let i = 0; i < letrasArray.length; i++) {
        informar += letrasArray[i] + " ";
    }
    document.getElementById('introducidas').innerHTML = informar;
}

/* 
funcion que genera una pista acorde a la palabra
@version 3.0
*/
function VerPista() {
    var pistas = new Array("Transportar una carga de un lugar a otro.", "Que recibe y acoge en su casa o en su tierra a los visitantes o extranjeros con amabilidad y toda clase de atenciones.", "Que no siente miedo o temor al realizar acciones que comportan riesgo.", "Llevar a cabo actos públicos, como reuniones, ceremonias, espectáculos, etc.", "Idea o pensamiento que se asume como verdadero.", "Persona que ha sido elegida por votación popular para formar parte de una cámara legislativa.", "Que duele, generalmente por estar resentido a causa de un fuerte dolor sentido con anterioridad.", "Que graba o sirve para grabar.", "Hacer [alguien o algo] que una persona o un animal pierda la tranquilidad o el bienestar, obligándole a hacer algo que no desea, impidiéndole que lo realice cómodamente o causándole una impresión desagradable en los sentidos.", "Polvo, basura, manchas o impurezas que hay en algo.");

    document.getElementById('pista').innerHTML = pistas[PalabraAleatoria];
    document.getElementById('pistaButton').style.display = "none";
}



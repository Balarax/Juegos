// funcion que al iniciar una nueva partida nos crea un formulario para introducir los nombres de los jugadores
function newGame() {
    var pinta = "<form>";
    pinta += "<p>Introduce los nombres de los jugadores:</p><br>";
    pinta += "<p>Jugador1:<input type=text name=p1 id=p1></p><br>";
    pinta += "<p>Jugador2:<input type=text name=p2 id=p2></p><br>";
    pinta += "<p>Jugador3:<input type=text name=p3 id=p3></p><br>";
    pinta += "</form>";
    pinta += "<button type=button onclick='jugar()'>Jugar</button>";
    document.getElementById('mainScreen').innerHTML = pinta;
}

/*
Funcion que rellena arrays con 2 numeros aleatorios entre el 1 y el 12
@version 2.0
*/

function RepartirCartas(cartas) {
    for (let i = 0; i < 2; i++) {
        // con round se redondea el numero generado con random, la cuenta numerica de la funcion establece el rango
        // porque la funcion por si misma solo devuelve valores del 0 al 1
        cartas[i] = Math.round(Math.random() * (12 - 1) + 1);
    }

    return cartas;
}

/*
Funcion que determina cual es la carta mayor de las dos que se encuentran en el array
@param Array con valores
@return Valor mayor del array
@version 2.0
*/

function DeterminarMayor(cartas) {

    var mayor = 0;

    if (cartas[0] > cartas[1]) {
        mayor = cartas[0];
    } else {
        mayor = cartas[1];
    }

    return mayor;
}


// funcion para comenzar el juego. Recoge los nombres de los jugadores y devuelve las cartas y los resultados del juego
function jugar() {
    // asigna los nombres a variables
    var player1 = document.getElementById('p1').value;
    var player2 = document.getElementById('p2').value;
    var player3 = document.getElementById('p3').value;
    // purga los nombres por si hay espacios al principio y al final
    player1.trim();
    player2.trim();
    player3.trim();
    // string para lanzar los resultados por pantalla posteriormente
    var pintaCartas = "";
    // expresion regular para no permitir caracteres especiales
    var comprueba = new RegExp('^\\w+$'); //Si la creamos de esta manera es necesario escapar w dos veces
    
    // comprueba si falta algun nombre de jugador por introducir o si contiene caracteres no permitidos, en caso de ser asi lanzara un mensaje de error y se deberan volver a introducir
    if (player1 === "" || player2 === "" || player3 === "" || !comprueba.test(player1) || !comprueba.test(player2) || !comprueba.test(player3)) {
        document.getElementById('mensajes').innerHTML = "<span style=color:red>Faltan jugadores o son incorrectos, intentelo de nuevo. Recuerde no usar caracteres especiales</span>";
    } else {


        // REPARTIR CARTAS
        // se crean 3 arrays para almacenar las cartas de cada jugador
        var cartasP1 = new Array();
        var cartasP2 = new Array();
        var cartasP3 = new Array();

        // variables para almacenar la carta mas alta de cada jugador

        var mayor1 = 0;
        var mayor2 = 0;
        var mayor3 = 0;

        do {

            var empate = true; //Esta variable es por si 

            
            // Llamamos a la función para repartir las cartas

            RepartirCartas(cartasP1);
            RepartirCartas(cartasP2);
            RepartirCartas(cartasP3);

            // Llamamos a la función para determinar cuál es la carta mas alta de las dos que se han repartido

             mayor1=DeterminarMayor(cartasP1)
             mayor2=DeterminarMayor(cartasP2)
             mayor3=DeterminarMayor(cartasP3)


            // saca los valores de las cartas de cada jugador pon pantalla
            pintaCartas += "Las cartas de <b>" + player1 + "</b> son: " + cartasP1[0] + " y " + cartasP1[1] + "<br>";
            pintaCartas += "Las cartas de <b>" + player2 + "</b> son: " + cartasP2[0] + " y " + cartasP2[1] + "<br>";
            pintaCartas += "Las cartas de <b>" + player3 + "</b> son: " + cartasP3[0] + " y " + cartasP3[1] + "<br>";
            // comprueba que carta es mayor o si son iguales y envia al ganador

            if (mayor1 > mayor2 && mayor1 > mayor3) {
                empate = false;
                pintaCartas += "<span style=color:lightgreen>" + player1 + "</span><span> se impone con un " + mayor1 + " sobre los demas jugadores </span>";
            } else if (mayor2 > mayor1 && mayor2 > mayor3) {
                empate = false;
                pintaCartas += "<span style=color:lightgreen>" + player2 + "</span><span> se impone con un " + mayor2 + " sobre los demas jugadores </span>";
            } else if (mayor3 > mayor1 && mayor3 > mayor2) {
                empate = false;
                pintaCartas += "<span style=color:lightgreen>" + player3 + "</span><span> se impone con un " + mayor3 + " sobre los demas jugadores </span>";
            } else {
                empate = true;
                pintaCartas += "<span>Parece que ha habido un empate, procediendo a repartir nuevas cartas... </span><br>";
            }
        } while (empate==true);
    

    document.getElementById('mainScreen').innerHTML = pintaCartas;
    document.getElementById('mensajes').innerHTML = "";

    }
}

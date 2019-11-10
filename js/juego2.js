// funcion que al iniciar una nueva partida nos crea un formulario para introducir los nombres de los jugadores
function newGame() {
    var pinta = "<form>";
    pinta += "<input type=text name=p1 id=p1><br>";
    pinta += "<input type=text name=p2 id=p2><br>";
    pinta += "</form>";
    pinta += "<button type=button onclick='jugar()'>Jugar</button>";
    document.getElementById('mainScreen').innerHTML = pinta;
}
// funcion para comenzar el juego. Recoge los nombres de los jugadores y devuelve las cartas y los resultados del juego
function jugar() {
    // asigna los nombres a variables
    player1 = document.getElementById('p1').value;
    player2 = document.getElementById('p2').value;
    // purga los nombres por si hay espacios al principio y al final
    player1.trim();
    player2.trim();
    // string para lanzar los resultados por pantalla posteriormente
    var pintaCartas = "";
    // expresion regular para no permitir caracteres especiales
    var comprueba = new RegExp();
    comprueba = /\w+$/;
    // comprueba si falta algun nombre de jugador por introducir o si contiene caracteres no permitidos, en caso de ser asi lanzara un mensaje de error y se deberan volver a introducir
    if (player1 === "" || player2 === "" || !comprueba.test(player1) || !comprueba.test(player2)) {
        document.getElementById('mensajes').innerHTML = "<span style=color:red>Faltan jugadores o son incorrectos, intentelo de nuevo. Recuerde no usar caracteres especiales</span>";
    } else {
        // se crean 2 arrays para almacenar las cartas de cada jugador
        var cartasP1 = new Array();
        var cartasP2 = new Array();
        // 2 variables para almacenar la carta mas alta de cada jugador
        var mayor1 = 0;
        var mayor2 = 0;
        // se rellenan los arrays con 2 numeros aleatorios entre 1 y 12
        for (let i = 0; i < 2; i++) {
            // con round se redondea el numero generado con random, la cuenta numerica de la funcion establece el rango
            // porque la funcion por si misma solo devuelve valores del 0 al 1
            cartasP1[i] = Math.round(Math.random()*(12-1) + 1);
            cartasP2[i] = Math.round(Math.random()*(12-1) + 1);
        }
        // estructura que guarda la carta mayor de cada jugador
        if (cartasP1[0] > cartasP1[1]) {
            mayor1 = cartasP1[0];
        } else {
            mayor1 = cartasP1[1];
        }
        if (cartasP2[0] > cartasP2[1]) {
            mayor2 = cartasP2[0];
        } else {
            mayor2 = cartasP2[1];
        }
        // saca los valores de las cartas de cada jugador pon pantalla
        pintaCartas = "Las cartas de <b>"+player1+"</b> son: "+cartasP1[0]+" y "+cartasP1[1]+"<br>";
        pintaCartas += "Las cartas de <b>"+player2+"</b> son: "+cartasP2[0]+" y "+cartasP2[1]+"<br>";
        // comprueba que carta es mayor o si son iguales y envia al ganador
        if (mayor1 > mayor2) {
            pintaCartas += "<span style=color:lightgreen>"+player1+"</span> se impone con un "+mayor1+" sobre <span style=color:red>"+player2+"</span> que tiene solamente un "+mayor2;
        } else {
            if (mayor1 < mayor2) {
                pintaCartas += "<span style=color:lightgreen>"+player2+"</span> se impone con un "+mayor2+" sobre <span style=color:red>"+player1+"</span> que tiene solamente un "+mayor1;
            } else {
                pintaCartas += "Empate, <span style=color:orange>"+player1+"</span> y <span style=color:orange>"+player2+"</span> empatan con "+mayor1+" puntos";
            } 
        }
        document.getElementById('mainScreen').innerHTML = pintaCartas;
        document.getElementById('mensajes').innerHTML = "";
    }
}
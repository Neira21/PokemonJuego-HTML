const seleccionaPokemonContainer = document.getElementById("pokemon");
const texto = document.getElementById("pokemontexto")
const combate = document.getElementById("combate");
//const music = new Audio("audio.mp3");

let jugador = 10;
let enemigo = 10;
let ataqueJugador;
let ataqueEnemigo;

const ataques = ["FUEGO", "AGUA", "PLANTA"];
let resultado = document.getElementById("resultadoPelea");

function iniciarJuego(){
    let botonSeleccionarPokemon = document.getElementById("boton-seleccionar-pokemon");
    botonSeleccionarPokemon.addEventListener("click", SeleccionarPokemon);

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", AtaqueFuego);
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", AtaqueAgua);
    let botonPlanta = document.getElementById("boton-planta");
    botonPlanta.addEventListener("click", AtaquePlanta);
    vidaEnemigo.innerHTML = "10";
    vidaJugador.innerHTML = "10";
}

function AtaqueFuego(){
    ataqueJugador = "FUEGO";
    AtaqueEnemigo();
    MostarResultado();
    CompararAtaques();
    CambiarVida();
    CompararVidas();
}
function AtaqueAgua(){
    ataqueJugador = "AGUA";
    AtaqueEnemigo();
    MostarResultado();
    CompararAtaques();
    CambiarVida();
    CompararVidas();
}
function AtaquePlanta(){
    ataqueJugador = "PLANTA";
    AtaqueEnemigo();
    MostarResultado();
    CompararAtaques();
    CambiarVida();
    CompararVidas();
}

function AtaqueEnemigo(){
    const random = Math.floor(Math.random() * ataques.length);
    ataqueEnemigo = ataques[random];
}

function MostarResultado(){
    let spanAtaqueJugador = document.getElementById("ataqueJugadorMensaje");
    spanAtaqueJugador.innerHTML= ataqueJugador;
    let spanAtaqueEnemigo = document.getElementById("ataqueEnemigoMensaje");
    spanAtaqueEnemigo.innerHTML= ataqueEnemigo;
}
function CompararAtaques(){
    if(ataqueJugador === ataqueEnemigo){
        resultado.innerHTML = "AMBOS ATAQUES IMPACTAN ENTRE SÍ!!!!";
        enemigo--;
        jugador--;
    }else if(ataqueJugador === "FUEGO" && ataqueEnemigo === "PLANTA"){
        resultado.innerHTML = "BIEN HECHO!!!!, LE OCASIONAS DAÑO AL ENEMIGO";
        enemigo = enemigo-2;
    }else if(ataqueJugador === "AGUA" && ataqueEnemigo === "FUEGO"){
        resultado.innerHTML = "BIEN HECHO!!!!, LE OCASIONAS DAÑO AL ENEMIGO";
        enemigo = enemigo-2;
    }else if(ataqueJugador === "PLANTA" && ataqueEnemigo === "AGUA"){
        resultado.innerHTML = "BIEN HECHO!!!!, LE OCASIONAS DAÑO AL ENEMIGO";
        enemigo = enemigo-2;
    }else{
        resultado.innerHTML = "TU POKEMÓN SUFRIÓ DAÑO!!!";
        jugador = jugador-2;
    }
}

function CambiarVida(){
    console.log(jugador, enemigo);
    let vidaJugador = document.getElementById("vidaJugador");
    vidaJugador.innerHTML = ""+jugador;
    let vidaEnemigo = document.getElementById("vidaEnemigo"); 
    vidaEnemigo.innerHTML = ""+enemigo;
}

function CompararVidas(){
    if(jugador <= 0){
        alert("HAS PERDIDO EL COMBATE 😒😒😒");
        window.location.reload();
    }
    if(enemigo <= 0){
        alert("HAS GANADO EL COMBATE 😎😎😎");
        window.location.reload();
    }
    
}

function SeleccionarPokemon(){
    let pokemonSquirtle = document.getElementById("Squirtle").checked;
    let pokemonCharmander = document.getElementById("Charmander").checked;
    let pokemonBulbasaur = document.getElementById("Bulbasaur").checked;

    let spanPokemonNamePlayer = document.getElementById("pokemonNamePlayer");
    let spanPokemonNameEnemy = document.getElementById("pokemonNameEnemy");
    
    if(pokemonSquirtle){
        spanPokemonNamePlayer.innerHTML = "Squirtle";
        SeleccionarPokemonEnemigo(spanPokemonNameEnemy);
        OcultarSeleccionPokemon();
        
    }else if(pokemonCharmander){
        spanPokemonNamePlayer.innerHTML = "Charmander";
        SeleccionarPokemonEnemigo(spanPokemonNameEnemy);
        OcultarSeleccionPokemon();
        
    }else if(pokemonBulbasaur){
        spanPokemonNamePlayer.innerHTML = "Bulbasaur";
        SeleccionarPokemonEnemigo(spanPokemonNameEnemy);
        OcultarSeleccionPokemon();
        
    }else{
        alert("Selecciona un pokemon para continuar");
    }
}

function SeleccionarPokemonEnemigo(spanPokemonNameEnemy){
    const pokemon = ["squirtle", "charmander", "bulbasaur"];
    const random = Math.floor(Math.random() * pokemon.length);
    spanPokemonNameEnemy.innerHTML = pokemon[random];
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const OcultarSeleccionPokemon = () => {
    seleccionaPokemonContainer.className = "hide";
    texto.classList.remove("hide");
    combate.classList.remove("hide");

}
window.addEventListener("load", iniciarJuego);



const reiniciar = () => {
    window.location.reload();
}

//Pantallas de juego

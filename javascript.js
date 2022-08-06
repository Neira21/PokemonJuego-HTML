//Contenedores
const seleccionaPokemonContainer = document.getElementById("pokemon");
const combate = document.getElementById("contenedor-juego");
const mensajes = document.getElementById("contenedor-mensajes");
const mensajeFinalJuego = document.getElementById("contenedor-mensaje-final");

const botonSeleccionarPokemon = document.getElementById("boton-seleccionar-pokemon");
const spanPokemonNamePlayer = document.getElementById("pokemonNamePlayer");
const spanPokemonNameEnemy = document.getElementById("pokemonNameEnemy");

const spanVictorias = document.getElementById("victorias");
const spanEmpates = document.getElementById("empates");
const spanDerrotas = document.getElementById("derrotas");
const mensajeAtaque = document.getElementById("contenedor-mensaje-ataque");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let pokemonCharmander;
let pokemonSquirtle;
let pokemonBulbasaur;

const contenedorTarjetasPokemon = document.getElementById("contenedor-tarjetas-pokemon");
const contenedorAtaque = document.getElementById("contenedor-ataques");

//Jugador
//Array para guardar los pokemons 
let pokemons = [];

let pokemonJugadorObjeto;

//Ataque
let secuenciaAtaqueJugador = [];
let secuenciaAtaquesEnemigo=[];
let ataquesPokemonEnemigo = [];

//Variables de victorias, empates y derrotas
let Victorias = 0;
let Derrotas = 0;
let Empates = 0;

//Pokemon seleccionado por botón
let pokemonJugador;

//Opciones L
let opcionesPokemons;
let opcionesAtaques;

//Botones
let botonFuego;
let botonAgua;
let botonPlanta;
let botones = [];

let indexAtaqueJugador;
let indexAtaqueEnemigo;

//Canvas
let lienzo = mapa.getContext("2d");

let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./img/fondo.png";

//Clases y Objetos de los pokemons
class Pokemon{
    constructor(nombre, imagen, vida, fotoPokemonMapa, x=140, y=100){
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];
        this.x = x;
        this.y = y;
        this.ancho = 100;
        this.alto = 100;
        this.mapaImagen = new Image();
        this.mapaImagen.src = fotoPokemonMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarPokemon(){
        lienzo.drawImage(
            this.mapaImagen,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        );
    }

}

let Charmander = new Pokemon("Charmander", "./img/Charmander.png", 5, './img/CharmanderMapa.png');
let Squirtle = new Pokemon("Squirtle", "./img/Squirtle.png", 5, './img/SquirtleMapa.png');
let Bulbasaur = new Pokemon("Bulbasaur", "./img/Bulbasaur.png", 5, './img/BulbasaurMapa.png');


let CharmanderEnemigo = new Pokemon("Charmander", "./img/Charmander.png", 5, './img/CharmanderMapa.png', 600,120);
let SquirtleEnemigo = new Pokemon("Squirtle", "./img/Squirtle.png", 5, './img/SquirtleMapa.png', 150, 370);
let BulbasaurEnemigo = new Pokemon("Bulbasaur", "./img/Bulbasaur.png", 5, './img/BulbasaurMapa.png', 400, 280);

Bulbasaur.ataques.push(
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "💧", id: "boton-agua",}
);

BulbasaurEnemigo.ataques.push(
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "💧", id: "boton-agua",}
);

Charmander.ataques.push(
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "💧", id: "boton-agua",},
    {nombre: "🌿", id: "boton-planta",}
);

CharmanderEnemigo.ataques.push(
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "🔥", id: "boton-fuego",},
    {nombre: "💧", id: "boton-agua",},
    {nombre: "🌿", id: "boton-planta",}
);

Squirtle.ataques.push(
    {nombre: "💧", id: "boton-agua",},
    {nombre: "💧", id: "boton-agua",},
    {nombre: "💧", id: "boton-agua",},
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🔥", id: "boton-fuego",}
);

SquirtleEnemigo.ataques.push(
    {nombre: "💧", id: "boton-agua",},
    {nombre: "💧", id: "boton-agua",},
    {nombre: "💧", id: "boton-agua",},
    {nombre: "🌿", id: "boton-planta",},
    {nombre: "🔥", id: "boton-fuego",}
);

pokemons.push(Bulbasaur, Squirtle, Charmander);

function iniciarJuego(){
    
    pokemons.forEach(pokemon => {
        opcionesPokemons = `
                <input type="radio" id="${pokemon.nombre}" name="pokemon" value="${pokemon.nombre}">
                <label class="tarjeta-pokemon" for="${pokemon.nombre}">
                    <p>${pokemon.nombre}</p>
                    <img src="${pokemon.imagen}" height="80px" alt="">
                </label>
        `
        contenedorTarjetasPokemon.innerHTML += opcionesPokemons;    
    });
    pokemonCharmander = document.getElementById("Charmander");
    pokemonSquirtle = document.getElementById("Squirtle");
    pokemonBulbasaur = document.getElementById("Bulbasaur");
    botonSeleccionarPokemon.addEventListener("click", SeleccionarPokemon);
    combate.style.display = "none";
    sectionVerMapa.style.display = "none";

}

function SeleccionarPokemon(){
    if(pokemonSquirtle.checked){
        spanPokemonNamePlayer.innerHTML = pokemonSquirtle.id;
        pokemonJugador = pokemonSquirtle.id;
    }else if(pokemonCharmander.checked){
        spanPokemonNamePlayer.innerHTML = pokemonCharmander.id;
        pokemonJugador = pokemonCharmander.id;
    }else if(pokemonBulbasaur.checked){
        spanPokemonNamePlayer.innerHTML = pokemonBulbasaur.id;
        pokemonJugador = pokemonBulbasaur.id;
    }else{
        alert("Selecciona un pokemon para continuar");
        return;
    }
    ExtraerAtaques(pokemonJugador);
    
    seleccionaPokemonContainer.style.display = "none";
    
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
}

function ExtraerAtaques(pokemonJugador){
    let ataques = [];
    for (let i = 0; i < pokemons.length; i++) {
        if(pokemonJugador === pokemons[i].nombre){
            ataques = pokemons[i].ataques;
        }
    }
    MostrarAtaques(ataques);
}

function MostrarAtaques(ataques){
    ataques.forEach(ataque => {
        opcionesAtaques = `
        <button id="${ataque.id}"  class="container-ataque-item BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaque.innerHTML += opcionesAtaques;
    });
    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonPlanta = document.getElementById("boton-planta");
    botones = document.querySelectorAll(".BAtaque");
}

function SecuenciaAtaque(){
    botones.forEach(boton => {
        boton.addEventListener("click", (e) =>{
            if(e.target.textContent === "🔥"){
                secuenciaAtaqueJugador.push('Fuego');
                boton.style.backgroundColor = "red";
                boton.disabled = true;
                console.log(secuenciaAtaqueJugador);
            }else if(e.target.textContent === "💧"){
                secuenciaAtaqueJugador.push('Agua');
                boton.style.backgroundColor = "red";
                boton.disabled = true;
                console.log(secuenciaAtaqueJugador);
            }else {
                secuenciaAtaqueJugador.push('Planta');
                boton.style.backgroundColor = "red";
                boton.disabled = true;
                console.log(secuenciaAtaqueJugador);
            }
            AtaqueAleatorioEnemigo();
        });
    })
}

function AtaqueAleatorioEnemigo(){
    let ataqueAleatorio = Math.floor(Math.random() * ataquesPokemonEnemigo.length);
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        secuenciaAtaquesEnemigo.push('Fuego');
    }else if(ataqueAleatorio == 2 || ataqueAleatorio == 3){
        secuenciaAtaquesEnemigo.push('Agua');
    }else {
        secuenciaAtaquesEnemigo.push('Planta');
    }
    console.log(secuenciaAtaquesEnemigo);
    if(secuenciaAtaqueJugador.length === 5){
        CombatePokemon();
    }
}

function indiceAmbosAtaques(jugador, enemigo){
    indexAtaqueJugador = secuenciaAtaqueJugador[jugador];
    indexAtaqueEnemigo = secuenciaAtaquesEnemigo[enemigo];
}

function CombatePokemon(){
    for (let i = 0; i < secuenciaAtaqueJugador.length; i++) {
        if(secuenciaAtaqueJugador[i] === secuenciaAtaquesEnemigo[i]){
            indiceAmbosAtaques(i, i)
            MostrarMensaje("Empate ");
            Empates++;
        }else if(secuenciaAtaqueJugador[i] === "Fuego" && secuenciaAtaquesEnemigo[i] === "Planta"){
            indiceAmbosAtaques(i, i)
            MostrarMensaje("Ganaste ");
            Victorias++;
        }else if(secuenciaAtaqueJugador[i] === "Agua" && secuenciaAtaquesEnemigo[i] === "Fuego"){
            indiceAmbosAtaques(i, i)
            MostrarMensaje("Ganaste ");
            Victorias++;
        }else if(secuenciaAtaqueJugador[i] === "Planta" && secuenciaAtaquesEnemigo[i] === "Agua"){
            indiceAmbosAtaques(i, i)
            MostrarMensaje("Ganaste ");
            Victorias++;
        }else{
            indiceAmbosAtaques(i, i)
            MostrarMensaje("Perdiste ");
            Derrotas++;
        }
    }
    CalcularVictorias();
}

function MostrarMensaje(resultado){
    let mensajeAtaqueJugador = document.createElement("p");
    let mensajeAtaqueEnemigo = document.createElement("p");
    let resultadoAtaque = document.createElement("p");
    mensajeAtaqueJugador.innerHTML = indexAtaqueJugador;
    mensajeAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;
    
    mensajeAtaqueJugador.className = "mensaje";
    mensajeAtaqueEnemigo.className = "mensaje";
    resultadoAtaque.className = "mensaje";
    resultadoAtaque.innerHTML = resultado;
    
    mensajes.appendChild(mensajeAtaqueJugador);
    mensajes.appendChild(mensajeAtaqueEnemigo);
    mensajes.appendChild(resultadoAtaque);
}

function CalcularVictorias(){
    spanVictorias.innerHTML = "Victorias: " + Victorias;
    spanEmpates.innerHTML = "Empates: " + Empates;
    spanDerrotas.innerHTML = "Derrotas: " + Derrotas;
    RevisarQuienGano();
}

function RevisarQuienGano(){
    if(Victorias > Derrotas){
        ResultadoFinal("Ganaste 😎😎😎");
    }else if(Victorias < Derrotas){
        ResultadoFinal("Perdiste 💀💀💀");
    }else if(Victorias === Derrotas){
        ResultadoFinal("Empate 😐😐😐");
    }
}

function ResultadoFinal(mensajeFinal){
    let parrafo = document.createElement("p");
    parrafo.innerHTML = mensajeFinal;
    mensajeFinalJuego.appendChild(parrafo);
    DesabilitarBotones();
}

function DesabilitarBotones(){
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonPlanta.disabled = true;
}

function SeleccionarPokemonEnemigo(enemigo){
    //let random = Math.floor(Math.random() * pokemons.length);
    spanPokemonNameEnemy.innerHTML = enemigo.nombre;
    ataquesPokemonEnemigo = enemigo.ataques;
    console.log(ataquesPokemonEnemigo);
    SecuenciaAtaque();
}

function PintarCanvas(){
    pokemonJugadorObjeto.x = pokemonJugadorObjeto.x + pokemonJugadorObjeto.velocidadX;
    pokemonJugadorObjeto.y = pokemonJugadorObjeto.y + pokemonJugadorObjeto.velocidadY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    pokemonJugadorObjeto.pintarPokemon();
    BulbasaurEnemigo.pintarPokemon();
    CharmanderEnemigo.pintarPokemon();
    SquirtleEnemigo.pintarPokemon();

    if(pokemonJugadorObjeto.velocidadX !== 0 || pokemonJugadorObjeto.velocidadY !== 0){
        RevisarColision(SquirtleEnemigo)
        RevisarColision(CharmanderEnemigo)
        RevisarColision(BulbasaurEnemigo)
    }

}
function moverDereha(){
    pokemonJugadorObjeto.velocidadX = 5;
}
function moverIzquierda(){
    pokemonJugadorObjeto.velocidadX = -5;
}
function moverAbajo(){
    pokemonJugadorObjeto.velocidadY = 5;
}
function moverArriba(){
    pokemonJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento(){
    
    pokemonJugadorObjeto.velocidadX = 0;
    pokemonJugadorObjeto.velocidadY = 0;
}

function sePresionoTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDereha()
            break
        default:
            break;
    }
}

function iniciarMapa(){
    mapa.width = 700;
    mapa.height = 500;
    pokemonJugadorObjeto = ObtenerObjetoPokemon(pokemonJugador);
    intervalo = setInterval(PintarCanvas, 50);

    window.addEventListener("keydown", sePresionoTecla);
    window.addEventListener("keyup", detenerMovimiento);   
}

function ObtenerObjetoPokemon(){
    for (let i = 0; i < pokemons.length; i++) {
        if(pokemonJugador === pokemons[i].nombre){
            return pokemons[i];
        }
    }   
}

function RevisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaPokemon = pokemonJugadorObjeto.y;
    const abajoPokemon = pokemonJugadorObjeto.y + pokemonJugadorObjeto.alto;
    const derechaPokemon = pokemonJugadorObjeto.x + pokemonJugadorObjeto.ancho;
    const izquierdaPokemon = pokemonJugadorObjeto.x;

    if(
        abajoPokemon < arribaEnemigo ||
        arribaPokemon > abajoEnemigo ||
        derechaPokemon < izquierdaEnemigo ||
        izquierdaPokemon > derechaEnemigo
    ){
        return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    combate.style.display = "flex";
    sectionVerMapa.style.display = "none";
    SeleccionarPokemonEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);

const reiniciar = () => {
    location.reload();
}
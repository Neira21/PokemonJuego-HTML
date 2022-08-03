const seleccionaPokemonContainer = document.getElementById("pokemon");
const texto = document.getElementById("pokemontexto")

const seleccionPokemon = () => {
    seleccionaPokemonContainer.className = "hide";
    texto.classList.remove("hide");

}
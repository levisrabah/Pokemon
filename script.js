const pokemonSelect = document.getElementById("pokemonSelect");
const pokemonSprite = document.getElementById("pokemonSprite");

// Fetch Pokémon names from the API
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.text = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            option.value = pokemon.name;
            pokemonSelect.add(option);
        });
    })
    .catch(error => console.error("Error fetching Pokémon names:", error));

// Function to fetch Pokémon sprite
function fetchPokemon() {
    const selectedPokemon = pokemonSelect.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch Pokémon data");
            }
            return response.json();
        })
        .then(data => {
            const pokemonSpriteUrl = data.sprites.front_default;
            pokemonSprite.src = pokemonSpriteUrl;
            pokemonSprite.style.display = "block";
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));
}

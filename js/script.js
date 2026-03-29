// script.js

// Select DOM elements
const loadBtn = document.getElementById("loadBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const dataContainer = document.getElementById("dataContainer");

/**
 * Utility function to create a Pokémon card
 * @param {Object} details - Pokémon details from API
 */
function createPokemonCard(details) {
  const card = document.createElement("div");
  card.innerHTML = `
    <h3>${details.name.toUpperCase()}</h3>
    <img src="${details.sprites.front_default}" alt="${details.name}">
    <p><strong>Type:</strong> ${details.types.map(t => t.type.name).join(", ")}</p>
    <p><strong>Height:</strong> ${details.height}</p>
  `;
  // Simple styling
  card.style.background = "#f9f9f9";
  card.style.border = "1px solid #ddd";
  card.style.padding = "15px";
  card.style.marginTop = "12px";
  card.style.borderRadius = "8px";
  card.style.textAlign = "center";

  return card;
}

/**
 * Fetch and display the first N Pokémon
 */
async function loadPokemon() {
  loadingMessage.style.display = "block";
  errorMessage.textContent = "";
  dataContainer.innerHTML = "";

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
    if (!response.ok) throw new Error("Failed to fetch Pokémon list.");

    const data = await response.json();
    const pokemonList = data.results;

    // Fetch details for each Pokémon
    for (let pokemon of pokemonList) {
      const res = await fetch(pokemon.url);
      if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
      const details = await res.json();

      const card = createPokemonCard(details);
      dataContainer.appendChild(card);
    }

  } catch (error) {
    errorMessage.textContent = "Something went wrong. Please try again.";
    console.error(error);
  } finally {
    loadingMessage.style.display = "none";
  }
}

/**
 * Search for a Pokémon by name
 */
async function searchPokemon() {
  const name = searchInput.value.toLowerCase().trim();
  if (!name) return;

  loadingMessage.style.display = "block";
  errorMessage.textContent = "";
  dataContainer.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Pokémon not found");

    const details = await response.json();
    const card = createPokemonCard(details);
    dataContainer.appendChild(card);

  } catch (error) {
    errorMessage.textContent = "Pokémon not found. Please check the name.";
    console.error(error);
  } finally {
    loadingMessage.style.display = "none";
  }
}

// Event listeners
loadBtn.addEventListener("click", loadPokemon);
searchBtn.addEventListener("click", searchPokemon);

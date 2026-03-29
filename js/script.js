async function loadPokemon() {
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const dataContainer = document.getElementById("dataContainer");

  // Show loading
  loadingMessage.style.display = "block";
  errorMessage.textContent = "";
  dataContainer.innerHTML = "";

  try {
    // Fetch Pokémon list
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");

    // Check if response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }

    const data = await response.json();
    console.log(data); // Verify structure in console

  } catch (error) {
    errorMessage.textContent = "Something went wrong. Please try again.";
    console.error(error);
  } finally {
    loadingMessage.style.display = "none";
  }
}

// Add button listener
document.getElementById("loadBtn").addEventListener("click", loadPokemon);

const pokemonList = data.results; // Array of Pokémon

for (let pokemon of pokemonList) {
  const res = await fetch(pokemon.url);
  const details = await res.json();

  console.log(details); // Shows image, types, abilities, etc.
}
pokemonList.forEach(async (pokemon) => {
  const res = await fetch(pokemon.url);
  const details = await res.json();

  const card = document.createElement("div");
  card.innerHTML = `
    <h3>${details.name.toUpperCase()}</h3>
    <img src="${details.sprites.front_default}" alt="${details.name}">
    <p><strong>Type:</strong> ${details.types.map(t => t.type.name).join(", ")}</p>
    <p><strong>Height:</strong> ${details.height}</p>
  `;
  card.style.background = "#f9f9f9";
  card.style.border = "1px solid #ddd";
  card.style.padding = "15px";
  card.style.marginTop = "12px";
  card.style.borderRadius = "8px";
  card.style.textAlign = "center";

  dataContainer.appendChild(card);
});

loadingMessage.style.display = "block"; // Show
...
loadingMessage.style.display = "none";  // Hide

document.getElementById("searchBtn").addEventListener("click", async () => {
  const name = document.getElementById("searchInput").value.toLowerCase();
  if (!name) return;

  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const dataContainer = document.getElementById("dataContainer");

  loadingMessage.style.display = "block";
  errorMessage.textContent = "";
  dataContainer.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Pokémon not found");

    const details = await response.json();

    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${details.name.toUpperCase()}</h3>
      <img src="${details.sprites.front_default}" alt="${details.name}">
      <p><strong>Type:</strong> ${details.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Height:</strong> ${details.height}</p>
    `;
    card.style.background = "#f9f9f9";
    card.style.border = "1px solid #ddd";
    card.style.padding = "15px";
    card.style.marginTop = "12px";
    card.style.borderRadius = "8px";
    card.style.textAlign = "center";

    dataContainer.appendChild(card);

  } catch (error) {
    errorMessage.textContent = "Pokémon not found. Please check the name.";
    console.error(error);
  } finally {
    loadingMessage.style.display = "none";
  }
});

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

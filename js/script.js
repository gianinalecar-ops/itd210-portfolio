    // Select elements from DOM
    var factBox = document.getElementById("fact-box");
    var btn = document.getElementById("new-fact-btn");

    // Create function to fetch fact
    async function getFact() {
        try {
            factBox.textContent = "Loading...";

            const response = await fetch("https://catfact.ninja/fact");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Convert response to JSON
        const data = await response.json();

        // Displays the fact
        factBox.textContent = data.fact;

    } catch (error) {
        factBox.textContent = "Could not load fact. Try again!";
        console.error(error);
    }
}

    // Run on page load
    getFact();

    // Run when button clicked
    btn.addEventListener("click", getFact);

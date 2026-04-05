const API_URL = "https://6vfymx6bb5.execute-api.eu-central-1.amazonaws.com/prod/counter";

async function loadCounter() {
    const counterEl = document.getElementById("visitor-count");

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('HTTP ${response.status}');
        }

        const data = await response.json();
        counterEl.textContent = data.views ?? "n/a";
    } catch (error) {
        console.error("Counter load failed:", error);
        counterEl.textContent = "not available";
    }
}

loadCounter();
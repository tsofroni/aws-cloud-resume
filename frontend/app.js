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
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const finalValue = Number(data.views ?? 0);

    animateCounter(counterEl, finalValue);
  } catch (error) {
    console.error("Counter load failed:", error);
    counterEl.textContent = "not available";
  }
}

function animateCounter(element, target) {
  const duration = 1200;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);

    element.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.textContent = "🌙";
  } else {
    themeIcon.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    if (isLight) {
      localStorage.setItem("theme", "light");
      themeIcon.textContent = "🌙";
    } else {
      localStorage.setItem("theme", "dark");
      themeIcon.textContent = "☀️";
    }
  });
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

setupThemeToggle();
setupRevealAnimations();
loadCounter();
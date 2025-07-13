const githubUsername = "amirmohammad-hamzei";

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }
});

async function loadProfile() {
  const bioEl = document.getElementById("bio");
  const projectsList = document.getElementById("projects-list");
  const formStatus = document.getElementById("form-status");

  try {
    const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
    if (!userRes.ok) throw new Error("Failed to fetch user");
    const userData = await userRes.json();

    bioEl.textContent = userData.bio || "No bio available.";

    const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=8`);
    if (!reposRes.ok) throw new Error("Failed to fetch repos");
    const reposData = await reposRes.json();

    projectsList.innerHTML = "";

    reposData.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description"}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      `;
      projectsList.appendChild(card);
    });
  } catch (error) {
    bioEl.textContent = "Could not load bio.";
    projectsList.textContent = "Could not load projects.";
    console.error(error);
  }
}

loadProfile();

// Contact form (UI only, no backend)
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const status = document.getElementById("form-status");
  status.textContent = "Thanks for reaching out! (This is just a demo form)";
  contactForm.reset();
});

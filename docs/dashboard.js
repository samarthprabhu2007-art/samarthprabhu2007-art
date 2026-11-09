const filters = document.querySelector(".filters");
const projects = document.querySelectorAll(".project");
filters.hidden = false;
filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  for (const option of filters.querySelectorAll("button")) {
    option.setAttribute("aria-pressed", String(option === button));
  }
  for (const project of projects) {
    project.hidden = button.dataset.filter !== "all" && button.dataset.filter !== project.dataset.category;
  }
});

const heatmap = document.querySelector("#heatmap");
function showHeatmapFallback() {
  heatmap.hidden = true;
  document.querySelector("#heatmap-status").hidden = false;
}
heatmap.addEventListener("error", showHeatmapFallback);
if (heatmap.complete && !heatmap.naturalWidth) showHeatmapFallback();

async function loadStats() {
  const response = await fetch("https://api.github.com/users/samarthprabhu2007-art");
  if (!response.ok) return;

  const { public_repos, followers } = await response.json();
  document.querySelector("#repos").textContent = public_repos.toLocaleString();
  document.querySelector("#followers").textContent = followers.toLocaleString();
}

loadStats().catch(() => {
  // The profile and projects remain available when GitHub’s API is unreachable.
});

// main.js - SHARED external JavaScript (loaded on every page).
// Please do NOT edit without telling the team. Write your own code in js/<yourname>.js.

// Highlight the nav link of the page we are on.
var here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a").forEach(function (link) {
  if (link.getAttribute("href") === here) { link.classList.add("active"); }
});

// Put the current year in the footer.
var yr = document.getElementById("year");
if (yr) { yr.textContent = new Date().getFullYear(); }

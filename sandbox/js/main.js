// ==========================================================================
// main.js - SHARED EXTERNAL JAVASCRIPT FOR EVERY PAGE
// Team: Isabella, Nathan, Maria, Sophia
// Course: CIS 2368 Website Development I - Midterm Project
// Site: Cardinal Market (UIW Campus Student Marketplace)
// --------------------------------------------------------------------------
// MODIFIED FROM CLASS:
// - Automatic active nav link highlighting across all pages (including query strings)
// - Dynamic copyright year injection into footer via Date().getFullYear()
// - Global notification helper
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  // 1. Highlight active navigation link based on current page URL
  var currentFile = location.pathname.split("/").pop().split("?")[0].split("#")[0] || "index.html";

  var navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentFile) {
      link.classList.add("active");
    }
  });

  // 2. Put current year in footer copyright notice
  var yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

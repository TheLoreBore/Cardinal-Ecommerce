// ==========================================================================
// nathan.js - EXTERNAL JAVASCRIPT FOR BROWSE / LISTINGS PAGE
// Author: Nathan Ortiz
// Course: CIS 2368 Website Development I - Midterm Project
// Site: Cardinal Market (UIW Campus Student Marketplace)
// --------------------------------------------------------------------------
// MODIFIED FROM CLASS EXAMPLES:
// 1. Arrays & Objects (modified from hw7 & hw8): We represent campus items
//    as an array of objects containing id, title, price, category, condition,
//    image, and description.
// 2. Conditionals & Logical Operators (modified from hw8.html / script.js):
//    if/else checks and boolean expressions (===, &&, includes()) filter items
//    by search query, selected category, and sort criteria.
// 3. Dynamic DOM Generation (modified from hw7 & inputOutput.html):
//    Instead of hardcoding HTML cards, JavaScript dynamically creates
//    <article> elements with createElement, className, and innerHTML, then
//    appends them to the #grid section.
// 4. Event Listeners (modified from hw7 event handlers):
//    addEventListener listens to 'input' on the search box, 'change' on the
//    dropdowns, and click events for toggling favorites with localStorage.
// ==========================================================================

// Base inventory of items available on Cardinal Market
var catalogItems = [
  {
    id: "textbook",
    title: "Biology: Concepts & Connections",
    price: 40,
    category: "books",
    condition: "Like New",
    image: "images/textbook.svg",
    seller: "Maria Frausto",
    location: "UIW Mabee Library",
    desc: "Used for one semester in BIOL 1401. Clean pages with no highlighting or dog-ears."
  },
  {
    id: "lamp",
    title: "Adjustable LED Study Desk Lamp",
    price: 12,
    category: "furniture",
    condition: "Good",
    image: "images/lamp.svg",
    seller: "Nathan Ortiz",
    location: "Student Engagement Center",
    desc: "Bright multi-level LED desk lamp with flexible neck and built-in USB charging port."
  },
  {
    id: "bike",
    title: "Campus Commuter Bike (21-Speed)",
    price: 85,
    category: "other",
    condition: "Good",
    image: "images/bike.svg",
    seller: "Isabella Gomez",
    location: "Dubuis Lawn Bike Racks",
    desc: "Reliable road bike with tune-up done last month. Includes cable lock and helmet."
  },
  {
    id: "hoodie",
    title: "Official UIW Cardinals Red Hoodie",
    price: 28,
    category: "clothing",
    condition: "Like New",
    image: "images/hoodie.svg",
    seller: "Sophia Gomez",
    location: "Natatorium Breezeway",
    desc: "Size Medium red UIW athletic hoodie. Super soft fleece lining, barely worn."
  },
  {
    id: "mini-fridge",
    title: "Compact Dorm Mini-Fridge with Freezer",
    price: 65,
    category: "furniture",
    condition: "Excellent",
    image: "images/mini-fridge.svg",
    seller: "Carlos Mendoza",
    location: "Avila Hall Lobby",
    desc: "Energy Star certified 3.2 cu. ft. mini fridge. Clean and chills drinks fast."
  },
  {
    id: "desk-chair",
    title: "Ergonomic Mesh Study Chair",
    price: 45,
    category: "furniture",
    condition: "Good",
    image: "images/desk-chair.svg",
    seller: "Alex Rivera",
    location: "McCracken Hall",
    desc: "Breathable mesh back with adjustable lumbar support and pneumatic height control."
  },
  {
    id: "backpack",
    title: "Incarnate Word Cardinal Backpack",
    price: 35,
    category: "clothing",
    condition: "Like New",
    image: "images/UIW_Backpack.jpg",
    seller: "Maria Frausto",
    location: "Mabee Library",
    desc: "Durable UIW embroidered backpack with padded laptop sleeve and water bottle pockets."
  },
  {
    id: "sweatshirt",
    title: "Classic UIW Crewneck Sweatshirt",
    price: 32,
    category: "clothing",
    condition: "Good",
    image: "images/UIW_Sweatshirt.jpg",
    seller: "Sophia Gomez",
    location: "Student Engagement Center",
    desc: "Heavyweight cardinal red crewneck featuring vintage UIW lettering. Unisex Large."
  },
  {
    id: "tote",
    title: "UIW Cardinal Canvas Tote Bag",
    price: 15,
    category: "clothing",
    condition: "Brand New",
    image: "images/tote_bag.jfif",
    seller: "Isabella Gomez",
    location: "Kelso Art Center",
    desc: "Heavy-duty natural canvas tote with red Cardinal screen print. Great for campus books."
  }
];

// Check if any additional listings were published from sell.html into localStorage
function loadAllListings() {
  var stored = localStorage.getItem("cardinal_custom_listings");
  if (stored) {
    try {
      var customItems = JSON.parse(stored);
      if (Array.isArray(customItems)) {
        return customItems.concat(catalogItems);
      }
    } catch (e) {
      console.warn("Error parsing custom listings from localStorage:", e);
    }
  }
  return catalogItems.slice(); // Return a copy of default catalog
}

// Global active inventory
var allListings = loadAllListings();

// DOM references for Nathan's interactive filters
var searchInput   = document.getElementById("search");
var categorySelect = document.getElementById("category");
var sortSelect     = document.getElementById("sortBy");
var resetBtn       = document.getElementById("resetFilters");
var gridContainer  = document.getElementById("grid");
var countDisplay   = document.getElementById("resultsCount");

// Helper: Get user's saved favorites array from localStorage
function getSavedItemIds() {
  try {
    var raw = localStorage.getItem("cardinal_saved_items");
    return raw ? JSON.parse(raw) : ["textbook", "lamp"]; // Defaults matching account.html
  } catch (e) {
    return ["textbook", "lamp"];
  }
}

// Helper: Save updated favorites to localStorage
function saveItemIds(ids) {
  try {
    localStorage.setItem("cardinal_saved_items", JSON.stringify(ids));
  } catch (e) {
    console.warn("Could not save favorites to localStorage", e);
  }
}

// Show a small animated feedback toast
function showBrowseToast(msg) {
  var toast = document.getElementById("browseToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "browseToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = "<span>✓</span> " + msg;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

// --------------------------------------------------------------------------
// RENDER FUNCTION: Dynamically generates cards in the grid
// (Demonstrates DOM manipulation: createElement, className, innerHTML, appendChild)
// --------------------------------------------------------------------------
function renderListings(itemsToRender) {
  if (!gridContainer) return;

  // Clear existing items in grid
  gridContainer.innerHTML = "";

  // Update counter display
  if (countDisplay) {
    countDisplay.textContent = itemsToRender.length;
  }

  // Handle empty state if no listings match criteria
  if (itemsToRender.length === 0) {
    var emptyBox = document.createElement("div");
    emptyBox.className = "no-results-box card";
    emptyBox.innerHTML =
      "<h3>No items found</h3>" +
      "<p>We couldn't find any items matching your current search or category filter.</p>" +
      "<button class=\"btn-reset-filters\" onclick=\"resetAllFilters()\">Reset All Filters</button>";
    gridContainer.appendChild(emptyBox);
    return;
  }

  var savedIds = getSavedItemIds();

  // Loop over each item and build its card
  itemsToRender.forEach(function (item) {
    var isFavorited = savedIds.indexOf(item.id) !== -1;

    var card = document.createElement("article");
    card.className = "listing-card";
    card.setAttribute("data-category", item.category);

    card.innerHTML =
      '<div class="card-media">' +
        '<span class="badge-category">' + item.category + '</span>' +
        '<button class="btn-fav-card ' + (isFavorited ? 'active' : '') + '" title="Save to Favorites" data-id="' + item.id + '" aria-label="Favorite item">' +
          (isFavorited ? '♥' : '♡') +
        '</button>' +
        '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy">' +
      '</div>' +
      '<div class="card-info">' +
        '<h3 class="card-title">' + item.title + '</h3>' +
        '<div class="card-meta-line">' +
          '<span class="condition-tag">' + item.condition + '</span>' +
          '<span>•</span>' +
          '<span>' + item.location + '</span>' +
        '</div>' +
        '<p class="card-snippet">' + item.desc + '</p>' +
        '<div class="card-bottom">' +
          '<span class="item-price">$' + item.price + '</span>' +
          '<a class="btn-card-action" href="item.html?id=' + encodeURIComponent(item.id) + '">View Item</a>' +
        '</div>' +
      '</div>';

    // Hook up Favorite button click handler
    var favBtn = card.querySelector(".btn-fav-card");
    favBtn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleFavorite(item);
    });

    gridContainer.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// FAVORITE TOGGLE HANDLER: Updates localStorage & updates UI state
// --------------------------------------------------------------------------
function toggleFavorite(item) {
  var saved = getSavedItemIds();
  var idx = saved.indexOf(item.id);

  if (idx === -1) {
    saved.push(item.id);
    saveItemIds(saved);
    showBrowseToast("Saved <strong>" + item.title + "</strong> to your Account!");
  } else {
    saved.splice(idx, 1);
    saveItemIds(saved);
    showBrowseToast("Removed <strong>" + item.title + "</strong> from saved items.");
  }

  // Re-filter to reflect the updated heart state
  applyFilters();
}

// --------------------------------------------------------------------------
// FILTER & SEARCH LOGIC
// (Demonstrates Conditionals, String Methods, and Array.filter())
// --------------------------------------------------------------------------
function applyFilters() {
  var query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  var selectedCat = categorySelect ? categorySelect.value : "all";
  var selectedSort = sortSelect ? sortSelect.value : "featured";

  // Filter items matching search term and category
  var filtered = allListings.filter(function (item) {
    // Condition 1: Category match
    var matchesCategory = (selectedCat === "all") || (item.category === selectedCat);

    // Condition 2: Search term match in title, description, or seller
    var matchesSearch = true;
    if (query !== "") {
      var inTitle  = item.title.toLowerCase().indexOf(query) !== -1;
      var inDesc   = item.desc.toLowerCase().indexOf(query) !== -1;
      var inSeller = item.seller.toLowerCase().indexOf(query) !== -1;
      matchesSearch = inTitle || inDesc || inSeller;
    }

    return matchesCategory && matchesSearch;
  });

  // Sort filtered results based on user selection
  if (selectedSort === "price-low") {
    filtered.sort(function (a, b) { return a.price - b.price; });
  } else if (selectedSort === "price-high") {
    filtered.sort(function (a, b) { return b.price - a.price; });
  } else if (selectedSort === "title-az") {
    filtered.sort(function (a, b) { return a.title.localeCompare(b.title); });
  }

  renderListings(filtered);
}

// Reset filters back to defaults
function resetAllFilters() {
  if (searchInput) searchInput.value = "";
  if (categorySelect) categorySelect.value = "all";
  if (sortSelect) sortSelect.value = "featured";
  applyFilters();
}

// --------------------------------------------------------------------------
// INITIALIZATION ON DOM READY
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  console.log("Nathan's browse page script initialized successfully!");

  // Hook up event listeners for instant reactive filtering
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
  if (categorySelect) {
    categorySelect.addEventListener("change", applyFilters);
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", resetAllFilters);
  }

  // Initial render of all items
  applyFilters();
});

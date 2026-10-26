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
    image: "images/art-textbook.svg",
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
    image: "images/art-lamp.svg",
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
    image: "images/art-bike.svg",
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
    image: "images/art-hoodie.svg",
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
    image: "images/art-mini-fridge.svg",
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
    image: "images/art-desk-chair.svg",
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

// Wizard-themed names shown on each card's category sticker.
// (An object used as a lookup table, modified from the hw7/hw8 object examples.
//  The data-category VALUES stay books/furniture/clothing/other so filtering still works.)
var categoryLabels = {
  books: "Tome",
  furniture: "Dorm Magic",
  clothing: "Robes & Gear",
  other: "Mystery"
};

// The wizard's speech bubble text (the <p id="wizardSays"> in listings.html)
var wizardSays = document.getElementById("wizardSays");

// Changes what the wizard says depending on how many items matched
// (if / else if / else conditionals, modified from hw8.html)
function updateWizardSays(count, query) {
  if (!wizardSays) return;
  if (count === 0) {
    wizardSays.textContent = "Hmm... my crystal ball shows nothing. Try another spell!";
  } else if (query !== "") {
    wizardSays.textContent = "Ooh! I found " + count + (count === 1 ? " treasure" : " treasures") + " for \"" + query + "\"!";
  } else {
    wizardSays.textContent = "Welcome, traveler! " + count + " treasures are on the shelves today.";
  }
}

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
      "<h3>No items found!</h3>" +
      "<p>The spell fizzled. Nothing matches your current search or category filter.</p>" +
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
        '<span class="badge-category">' + (categoryLabels[item.category] || item.category) + '</span>' +
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
  updateWizardSays(filtered.length, query);
}

// Reset filters back to defaults
function resetAllFilters() {
  if (searchInput) searchInput.value = "";
  if (categorySelect) categorySelect.value = "all";
  if (sortSelect) sortSelect.value = "featured";
  applyFilters();
}

// --------------------------------------------------------------------------
// BACKGROUND MUSIC: a looping "wizard shop" melody made with the Web Audio API.
// No audio file is needed - JavaScript plays the notes itself, so there is no
// copyright issue. (New idea beyond class: AudioContext + oscillators, but the
// loop/array/function structure is modified from the hw7 array + loop examples.)
//
// BROWSER RULE: browsers block sound until the visitor clicks, taps, or presses
// a key on the page. So the music starts the moment you do any of those, and the
// button in the sidebar lets you turn it off (the choice is saved in localStorage).
// --------------------------------------------------------------------------
var musicCtx = null;        // the AudioContext (created once)
var musicOn = true;         // does the visitor want music?
var musicStep = 0;          // which note of the loop is next
var musicNextTime = 0;      // audio-clock time when the next note should play
var STEP_SECONDS = 0.28;    // length of one note (smaller = faster song)

// Four chords, 8 notes each (arpeggios in A minor: Am - F - C - G), in Hz
var arpeggios = [
  [220.00, 261.63, 329.63, 440.00, 329.63, 261.63, 329.63, 261.63],
  [174.61, 220.00, 261.63, 349.23, 261.63, 220.00, 261.63, 220.00],
  [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 392.00, 329.63],
  [196.00, 246.94, 293.66, 392.00, 293.66, 246.94, 293.66, 246.94]
];
var bassNotes = [110.00, 87.31, 130.81, 98.00]; // one low note per chord

// Play one note: an oscillator whose volume fades in and out so it sounds soft
function playNote(freq, startTime, length, wave, volume) {
  var osc = musicCtx.createOscillator();
  var gain = musicCtx.createGain();
  osc.type = wave;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + length);
  osc.connect(gain);
  gain.connect(musicCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + length + 0.05);
}

// Schedules notes slightly ahead of the audio clock so the beat stays steady
function scheduleMusic() {
  if (!musicCtx) return;
  while (musicNextTime < musicCtx.currentTime + 0.4) {
    var chord = Math.floor(musicStep / 8) % arpeggios.length;
    var beat = musicStep % 8;
    playNote(arpeggios[chord][beat], musicNextTime, 0.45, "triangle", 0.07);
    if (beat === 0 || beat === 4) {
      playNote(bassNotes[chord], musicNextTime, 0.9, "sine", 0.09);
    }
    if (beat === 7) { // a tiny "magic chime" at the end of each bar
      playNote(arpeggios[chord][3] * 2, musicNextTime, 0.5, "sine", 0.03);
    }
    musicNextTime += STEP_SECONDS;
    musicStep += 1;
  }
}

// Updates the button text so the visitor knows what will happen
function updateMusicButton() {
  var btn = document.getElementById("musicToggle");
  if (!btn) return;
  var playing = musicOn && musicCtx && musicCtx.state === "running";
  btn.setAttribute("aria-pressed", musicOn ? "true" : "false");
  if (!musicOn) {
    btn.textContent = "♪ Music: OFF";
  } else if (playing) {
    btn.textContent = "♪ Music: ON";
  } else {
    btn.textContent = "♪ Click anywhere to start music";
  }
}

// Start (or resume) the music. Safe to call many times.
function startMusic() {
  if (!musicOn) return;
  if (!musicCtx) {
    var AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return; // very old browser: just skip the music
    musicCtx = new AudioCtor();
    musicNextTime = musicCtx.currentTime + 0.1;
    setInterval(scheduleMusic, 100);
  }
  musicCtx.resume().then(updateMusicButton);
}

function stopMusic() {
  if (musicCtx) musicCtx.suspend().then(updateMusicButton);
}

function initMusic() {
  try {
    musicOn = localStorage.getItem("cardinal_music") !== "off";
  } catch (e) {
    musicOn = true;
  }

  var btn = document.getElementById("musicToggle");
  if (btn) {
    btn.addEventListener("click", function () {
      musicOn = !musicOn;
      try { localStorage.setItem("cardinal_music", musicOn ? "on" : "off"); } catch (e) {}
      if (musicOn) { startMusic(); } else { stopMusic(); }
      updateMusicButton();
    });
  }

  // First click / tap / key press anywhere on the page unlocks the audio
  ["pointerdown", "keydown", "touchstart"].forEach(function (evt) {
    document.addEventListener(evt, function () { startMusic(); }, { once: false, passive: true });
  });

  startMusic();        // try right away (works if the browser already allows sound)
  updateMusicButton(); // otherwise the button says "Click anywhere to start music"
}

// --------------------------------------------------------------------------
// INITIALIZATION ON DOM READY
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  console.log("Nathan's browse page script initialized successfully!");

  initMusic();

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

// ==========================================================================
// isabella.js - EXTERNAL JAVASCRIPT FOR HOME AND ACCOUNT PAGES
// Author: Isabella Gomez
// Course: CIS 2368 Website Development I - Midterm Project
// Site: Cardinal Market (UIW Campus Student Marketplace)
// --------------------------------------------------------------------------
// MODIFIED FROM CLASS EXAMPLES:
// 1. Dynamic Greeting & DOM Styling (modified from class JS/script.js):
//    In class, window.onload accessed document.getElementById("welcome-msg")
//    and modified style.color and innerHTML. Here, we expanded this with
//    time-of-day conditionals (morning, afternoon, evening) and responsive styling.
// 2. Interactive Alert Modal (modified from showMarketplaceInfo() in class):
//    Provides a multi-step user onboarding guide.
// 3. Dynamic Card Generation from Array of Objects (modified from hw7 & hw8):
//    featuredItems array is iterated with forEach to dynamically generate
//    product cards in index.html with links to item.html?id=...
// 4. Interactive Profile Editing & List Management (hw7 event delegation):
//    Enables name changes via prompt(), dynamic addition and removal of
//    listings with createElement, and synchronized persistence via localStorage.
// ==========================================================================

// ==========================================================================
// SECTION 1: HOME PAGE (index.html)
// ==========================================================================

// ---- 1. Dynamic Time-of-Day Greeting (modified from class script.js) ----
window.onload = function () {
  console.log("Cardinal Market home/account scripts loaded successfully!");

  var welcomeMsg = document.getElementById("welcome-msg");
  if (welcomeMsg) {
    var hour = new Date().getHours(); // Current hour (0-23)
    var greeting;

    if (hour < 12) {
      greeting = "Good morning, Cardinal!";
    } else if (hour < 18) {
      greeting = "Good afternoon, Cardinal!";
    } else {
      greeting = "Good evening, Cardinal!";
    }

    welcomeMsg.textContent = greeting + " Welcome to Cardinal Market.";
    welcomeMsg.style.color = "#ffd166"; // Gold accent on red hero
    welcomeMsg.style.fontWeight = "bold";
  }
};

// ---- 2. How It Works Modal (modified from showMarketplaceInfo in class) ----
function showMarketplaceInfo() {
  alert(
    "Welcome to Cardinal Market!\n\n" +
    "1. BROWSE: Explore verified textbook, dorm, and apparel listings from fellow UIW students.\n" +
    "2. SELL: Snap a photo and post an item in seconds on the Sell page with live preview.\n" +
    "3. MEET SAFELY: Coordinate meetups at the UIW Mabee Library or Student Center.\n" +
    "4. MANAGE: Track your listings and saved favorites in your Account dashboard."
  );
}

// ---- 3. Featured Items Built from Array of Objects ----
var featuredItems = [
  { id: "textbook", title: "Biology: Concepts & Connections", price: 40, image: "images/textbook.svg" },
  { id: "lamp",     title: "Adjustable LED Desk Lamp",       price: 12, image: "images/lamp.svg" },
  { id: "bike",     title: "Campus Commuter Bike",           price: 85, image: "images/bike.svg" },
  { id: "hoodie",   title: "UIW Cardinals Red Hoodie",       price: 28, image: "images/hoodie.svg" }
];

var featuredBox = document.getElementById("featuredItems");
if (featuredBox) {
  featuredBox.innerHTML = "";
  featuredItems.forEach(function (item) {
    var card = document.createElement("article");
    card.className = "card featured-card";
    card.innerHTML =
      '<img src="' + item.image + '" alt="' + item.title + '">' +
      '<h3>' + item.title + '</h3>' +
      '<p class="price">$' + item.price + '</p>' +
      '<a class="btn btn-small" href="item.html?id=' + encodeURIComponent(item.id) + '">View Item</a>';
    featuredBox.appendChild(card);
  });
}

// ==========================================================================
// SECTION 2: ACCOUNT PAGE (account.html)
// ==========================================================================

// ---- 4. Profile Name Editing with LocalStorage Persistence ----
var editNameBtn = document.getElementById("editNameBtn");
var profileName = document.getElementById("profileName");

if (profileName) {
  var savedName = localStorage.getItem("cardinal_user_name");
  if (savedName) {
    profileName.textContent = savedName;
  }
}

if (editNameBtn && profileName) {
  editNameBtn.addEventListener("click", function () {
    var newName = prompt("Enter your name for your Cardinal Market profile:", profileName.textContent);
    if (newName !== null && newName.trim() !== "") {
      profileName.textContent = newName.trim();
      localStorage.setItem("cardinal_user_name", newName.trim());
    }
  });
}

// ---- 5. My Listings Management (Add, Remove, LocalStorage Sync) ----
var myListings = document.getElementById("myListings");
var listingCount = document.getElementById("listingCount");
var listingsEmpty = document.getElementById("listingsEmpty");

function updateListingCount() {
  if (!myListings || !listingCount || !listingsEmpty) return;
  var count = myListings.querySelectorAll("li").length;
  listingCount.textContent = count;
  listingsEmpty.hidden = (count !== 0);
}

// Load custom published listings from Sell page into Account
function loadCustomListingsIntoAccount() {
  if (!myListings) return;
  try {
    var custom = JSON.parse(localStorage.getItem("cardinal_custom_listings") || "[]");
    custom.forEach(function (item) {
      var li = document.createElement("li");
      li.innerHTML =
        '<span><strong>' + item.title + '</strong> ($' + item.price + ') • <em style="color:#16a34a;">Published via Sell page</em></span>' +
        '<button class="btn btn-small remove-btn">Remove</button>';
      myListings.prepend(li);
    });
    updateListingCount();
  } catch (e) {
    console.warn("Could not load custom listings into account:", e);
  }
}

if (myListings) {
  loadCustomListingsIntoAccount();

  // Event Delegation: One listener handles clicks on all remove buttons
  myListings.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      var row = event.target.closest("li");
      if (confirm("Are you sure you want to remove this listing?")) {
        row.classList.add("fading");
        setTimeout(function () {
          row.remove();
          updateListingCount();
        }, 300);
      }
    }
  });
}

// ---- 5b. Add New Listing from Account Dashboard ----
var addBtn = document.getElementById("addListingBtn");
var newInput = document.getElementById("newListing");

function addListing() {
  if (!newInput || !myListings) return;
  var text = newInput.value.trim();
  if (text === "") {
    alert("Please type an item name first.");
    return;
  }

  var li = document.createElement("li");
  var label = document.createElement("span");
  label.textContent = text;
  var btn = document.createElement("button");
  btn.className = "btn btn-small remove-btn";
  btn.textContent = "Remove";

  li.appendChild(label);
  li.appendChild(btn);
  myListings.appendChild(li);
  newInput.value = "";
  updateListingCount();
}

if (addBtn && newInput) {
  addBtn.addEventListener("click", addListing);
  newInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addListing();
    }
  });
}

// ---- 6. Saved Favorites Management ----
var savedItemsList = document.getElementById("savedItems");

function renderSavedFavorites() {
  if (!savedItemsList) return;
  try {
    var savedIds = JSON.parse(localStorage.getItem("cardinal_saved_items") || '["textbook", "lamp"]');
    var itemNames = {
      textbook: "Biology: Concepts & Connections ($40)",
      lamp: "Adjustable LED Study Desk Lamp ($12)",
      bike: "Campus Commuter Bike ($85)",
      hoodie: "Official UIW Cardinals Red Hoodie ($28)",
      "mini-fridge": "Compact Dorm Mini-Fridge ($65)",
      "desk-chair": "Ergonomic Mesh Study Chair ($45)",
      backpack: "Incarnate Word Cardinal Backpack ($35)",
      sweatshirt: "Classic UIW Crewneck Sweatshirt ($32)",
      tote: "UIW Cardinal Canvas Tote Bag ($15)"
    };

    savedItemsList.innerHTML = "";
    if (savedIds.length === 0) {
      savedItemsList.innerHTML = "<li style=\"color:#64748b;\">No saved items yet. Browse items and click the heart icon to save!</li>";
      return;
    }

    savedIds.forEach(function (id) {
      var name = itemNames[id] || ("Listing #" + id);
      var li = document.createElement("li");
      li.innerHTML =
        '<a href="item.html?id=' + encodeURIComponent(id) + '" style="color:#1c1c1c; text-decoration:none; font-weight:600;">' + name + '</a>' +
        '<button class="btn btn-small save-btn" data-id="' + id + '">Unsave</button>';
      savedItemsList.appendChild(li);
    });
  } catch (e) {
    console.warn("Could not render saved items:", e);
  }
}

if (savedItemsList) {
  renderSavedFavorites();

  savedItemsList.addEventListener("click", function (event) {
    if (event.target.classList.contains("save-btn")) {
      var id = event.target.getAttribute("data-id");
      try {
        var savedIds = JSON.parse(localStorage.getItem("cardinal_saved_items") || "[]");
        var idx = savedIds.indexOf(id);
        if (idx !== -1) {
          savedIds.splice(idx, 1);
          localStorage.setItem("cardinal_saved_items", JSON.stringify(savedIds));
        }
      } catch (e) {}
      event.target.closest("li").remove();
      if (savedItemsList.children.length === 0) {
        savedItemsList.innerHTML = "<li style=\"color:#64748b;\">No saved items.</li>";
      }
    }
  });
}

// ---- 7. Messages Sync from Item Detail Page ----
var messagesContainer = document.getElementById("messagesList");
if (messagesContainer) {
  try {
    var storedMsgs = JSON.parse(localStorage.getItem("cardinal_messages") || "[]");
    storedMsgs.forEach(function (m) {
      var msgDiv = document.createElement("div");
      msgDiv.className = "message";
      msgDiv.style.background = "#eff6ff";
      msgDiv.style.borderLeft = "3px solid #2563eb";
      msgDiv.innerHTML =
        '<strong>You to ' + m.recipient + ' (' + m.itemTitle + '):</strong> ' +
        m.text + ' <span style="font-size:0.75rem; color:#64748b; margin-left:8px;">' + m.time + '</span>';
      messagesContainer.prepend(msgDiv);
    });
  } catch (e) {
    console.warn("Could not load sent messages:", e);
  }
}

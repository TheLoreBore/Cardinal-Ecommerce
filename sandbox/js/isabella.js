// isabella.js - EXTERNAL JavaScript owned by Isabella (used by index.html AND account.html).
// MODIFIED FROM CLASS: the greeting (window.onload + getElementById + style) is modified from the
// class example script.js (JS/script.js, "Cardinal Student Marketplace"), and showMarketplaceInfo()
// is modified from the same file. Everything else in this file is my own code.
// Because one file serves two pages, every section first checks that its
// elements exist ("if (element) { ... }") so nothing breaks on the other page.

// ===================== HOME PAGE (index.html) =====================

// ---- 1. Greeting (modified from the class example) ----
// Class example: window.onload + getElementById + changing style.
// My version: the message changes depending on the time of day.
window.onload = function () {
  console.log("Cardinal Market home/account loaded!");   // visible in the browser console (F12)

  var welcomeMsg = document.getElementById("welcome-msg"); // grab the <p id="welcome-msg">
  if (welcomeMsg) {
    var hour = new Date().getHours();                      // 0-23, from the visitor's clock
    var greeting;
    if (hour < 12) {
      greeting = "Good morning, Cardinal!";
    } else if (hour < 18) {
      greeting = "Good afternoon, Cardinal!";
    } else {
      greeting = "Good evening, Cardinal!";
    }
    welcomeMsg.textContent = greeting + " Welcome to Cardinal Market.";
    welcomeMsg.style.color = "#ffd166";                    // gold (readable on the red hero)
    welcomeMsg.style.fontWeight = "bold";
  }
};

// ---- 2. "How it works" button (modified from the class example showMarketplaceInfo) ----
// The button in index.html has onclick="showMarketplaceInfo()", which runs this function.
function showMarketplaceInfo() {
  alert("Welcome to Cardinal Market!\n\n1. Browse items from fellow UIW students.\n2. Sell your own on the Sell page.\n3. Manage everything from your Account page.");
}

// ---- 3. Featured items built from an array ----
// An array of objects: each object is one item (title, price, picture).
var featuredItems = [
  { title: "Biology Textbook", price: 40, image: "images/textbook.svg" },
  { title: "Desk Lamp",        price: 12, image: "images/lamp.svg" },
  { title: "Campus Bike",      price: 85, image: "images/bike.svg" }
  // To show more cards, add more lines like the ones above (put a comma after the previous line).
];

var featuredBox = document.getElementById("featuredItems"); // the empty <section> in index.html
if (featuredBox) {
  // forEach runs the function once for every item in the array
  featuredItems.forEach(function (item) {
    var card = document.createElement("article");  // make a new <article>
    card.className = "card featured-card";         // give it CSS classes
    // Fill the card with HTML using the item's data
    card.innerHTML =
      '<img src="' + item.image + '" alt="' + item.title + '">' +
      "<h3>" + item.title + "</h3>" +
      '<p class="price">$' + item.price + "</p>" +
      '<a class="btn btn-small" href="item.html">View</a>';
    featuredBox.appendChild(card);                 // add the card to the page
  });
}

// ===================== ACCOUNT PAGE (account.html) =====================

// ---- 4. Edit name button ----
var editNameBtn = document.getElementById("editNameBtn");
var profileName = document.getElementById("profileName");
if (editNameBtn && profileName) {
  // addEventListener: "when this button is clicked, run this function"
  editNameBtn.addEventListener("click", function () {
    var newName = prompt("Enter your name:", profileName.textContent); // pop-up with a text box
    // prompt returns null if Cancel is clicked, so only update when we got real text
    if (newName !== null && newName.trim() !== "") {
      profileName.textContent = newName.trim();
    }
  });
}

// ---- 5. Remove a listing ----
var myListings = document.getElementById("myListings");
var listingCount = document.getElementById("listingCount");
var listingsEmpty = document.getElementById("listingsEmpty");

// Recount the <li> rows and show/hide the "no listings" message
function updateListingCount() {
  var count = myListings.querySelectorAll("li").length;
  listingCount.textContent = count;
  listingsEmpty.hidden = (count !== 0);   // hidden = true while there are still listings
}

if (myListings) {
  // Event delegation: ONE listener on the <ul> handles clicks on every Remove button,
  // even buttons added later.
  myListings.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      var row = event.target.closest("li");            // the <li> that holds the clicked button
      if (confirm("Remove this listing?")) {           // OK / Cancel pop-up
        row.classList.add("fading");                   // CSS class fades it out
        setTimeout(function () {                       // wait 0.3s (same as the CSS transition)
          row.remove();
          updateListingCount();
        }, 300);
      }
    }
  });
}

// ---- 5b. Add a new listing (createElement + appendChild) ----
var addBtn = document.getElementById("addListingBtn");
var newInput = document.getElementById("newListing");

function addListing() {
  var text = newInput.value.trim();            // what the user typed, without extra spaces
  if (text === "") {                           // nothing typed -> ask for something
    alert("Please type an item name first.");
    return;
  }
  var li = document.createElement("li");       // make a new list row
  var label = document.createElement("span");  // the text part
  label.textContent = text;                    // textContent is safe (it never runs typed HTML)
  var btn = document.createElement("button");  // its own Remove button
  btn.className = "btn btn-small remove-btn";  // same classes, so the delegation above also removes it
  btn.textContent = "Remove";
  li.appendChild(label);                       // put the pieces together...
  li.appendChild(btn);
  myListings.appendChild(li);                  // ...and add the row to the page
  newInput.value = "";                         // clear the text box
  updateListingCount();                        // refresh the count / empty message
}

if (addBtn && newInput && myListings) {
  addBtn.addEventListener("click", addListing);
  newInput.addEventListener("keydown", function (event) {   // pressing Enter also adds
    if (event.key === "Enter") { addListing(); }
  });
}

// ---- 6. Unsave an item ----
var savedItems = document.getElementById("savedItems");
if (savedItems) {
  savedItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("save-btn")) {
      event.target.closest("li").remove();             // delete the row from the page
    }
  });
}

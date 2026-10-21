// ==========================================================================
// maria.js - EXTERNAL JAVASCRIPT FOR ITEM DETAIL PAGE
// Author: Maria Frausto
// Course: CIS 2368 Website Development I - Midterm Project
// Site: Cardinal Market (UIW Campus Student Marketplace)
// --------------------------------------------------------------------------
// MODIFIED FROM CLASS EXAMPLES:
// 1. Conditionals & Logic (modified from hw8.html / script.js):
//    Uses if/else branching to parse URL parameters (?id=...) and check whether
//    an item exists in catalog, falling back gracefully to a default item.
// 2. DOM Selection & Manipulation (modified from hw7 & inputOutput.html):
//    Selects elements using document.getElementById and querySelector.
//    Updates textContent, src, classList, and styles dynamically.
// 3. Event Handling (modified from hw7 event handlers):
//    Click listeners for thumbnail switcher, favorite heart toggle, offer
//    calculator buttons, and modal dialog open/close/send workflow.
// 4. Inter-Page Data Sharing (localStorage):
//    Saves messages sent to sellers into localStorage, allowing them to appear
//    in the Messages thread on Isabella's account.html page!
// ==========================================================================

// Complete dataset of items available for the Item Detail page
var itemCatalog = {
  textbook: {
    id: "textbook",
    title: "Biology: Concepts & Connections (10th Ed.)",
    price: 40,
    originalPrice: 135,
    category: "Textbooks",
    condition: "Like New",
    seller: "Maria Frausto",
    sellerRole: "Biology Major • Class of 2026",
    sellerRating: "4.9 ★ (14 reviews)",
    location: "UIW Mabee Library (1st Floor Lobby)",
    images: ["images/textbook.svg", "images/textbook.svg", "images/textbook.svg"],
    desc: "Used for one semester in BIOL 1401 with Dr. Smith. All pages are intact, pristine condition with zero highlighting, notes, or folded corners. Includes access code scratch-off still sealed on inside back cover. Can meet at the campus library or SEC during weekday afternoons.",
    department: "School of Mathematics, Science & Engineering"
  },
  lamp: {
    id: "lamp",
    title: "Adjustable LED Study Desk Lamp with USB Port",
    price: 12,
    originalPrice: 28,
    category: "Furniture",
    condition: "Good",
    seller: "Nathan Ortiz",
    sellerRole: "CIS Senior • Class of 2026",
    sellerRating: "5.0 ★ (8 reviews)",
    location: "Student Engagement Center (SEC)",
    images: ["images/lamp.svg", "images/lamp.svg", "images/lamp.svg"],
    desc: "Modern matte black study lamp with 3 color temperatures (warm, natural, cool white) and touch dimmer control. Flexible gooseneck allows aiming light wherever needed. Works perfectly and includes original AC wall adapter.",
    department: "Dorm Essentials"
  },
  bike: {
    id: "bike",
    title: "Campus Commuter Road Bike (21-Speed)",
    price: 85,
    originalPrice: 220,
    category: "Other",
    condition: "Good",
    seller: "Isabella Gomez",
    sellerRole: "Graphic Design • Class of 2027",
    sellerRating: "4.8 ★ (19 reviews)",
    location: "Dubuis Lawn Bike Racks",
    images: ["images/bike.svg", "images/bike.svg", "images/bike.svg"],
    desc: "Lightweight aluminum frame commuter bicycle. Gears shift smoothly and brakes have plenty of pad life. Fitted with front and rear safety reflectors. Selling because I am bringing a scooter this semester. Includes heavy-duty U-lock and key.",
    department: "Campus Transportation"
  },
  hoodie: {
    id: "hoodie",
    title: "Official UIW Cardinals Heavyweight Red Hoodie",
    price: 28,
    originalPrice: 55,
    category: "Clothing",
    condition: "Like New",
    seller: "Sophia Gomez",
    sellerRole: "Business Administration • Class of 2026",
    sellerRating: "5.0 ★ (11 reviews)",
    location: "Natatorium Breezeway",
    images: ["images/hoodie.svg", "images/hoodie.svg", "images/hoodie.svg"],
    desc: "Authentic Incarnate Word Cardinals hooded sweatshirt in signature Cardinal red. Premium fleece material with embroidered front chest logo. Worn twice during homecoming week. Smoke-free and pet-free home.",
    department: "Cardinal Spirit Gear"
  },
  "mini-fridge": {
    id: "mini-fridge",
    title: "Compact Dorm Mini-Fridge with Freezer Compartment",
    price: 65,
    originalPrice: 140,
    category: "Furniture",
    condition: "Excellent",
    seller: "Carlos Mendoza",
    sellerRole: "Nursing Major • Class of 2026",
    sellerRating: "4.9 ★ (7 reviews)",
    location: "Avila Hall Lobby",
    images: ["images/mini-fridge.svg", "images/mini-fridge.svg", "images/mini-fridge.svg"],
    desc: "Clean and quiet 3.2 cu. ft. double-door compact refrigerator. Runs whisper-quiet (perfect for dorm rooms) and keeps groceries ice cold. Fully defrosted and sanitized, ready for pickup.",
    department: "Dorm Appliances"
  },
  "desk-chair": {
    id: "desk-chair",
    title: "Ergonomic Mesh Study Chair with Lumbar Support",
    price: 45,
    originalPrice: 110,
    category: "Furniture",
    condition: "Good",
    seller: "Alex Rivera",
    sellerRole: "Psychology • Class of 2027",
    sellerRating: "4.7 ★ (12 reviews)",
    location: "McCracken Hall",
    images: ["images/desk-chair.svg", "images/desk-chair.svg", "images/desk-chair.svg"],
    desc: "High-comfort breathable mesh computer chair with height adjustment and tilt tension lock. Smooth-rolling dual-wheel casters suitable for dorm tile or rugs. Great condition with no tears.",
    department: "Dorm Furniture"
  },
  backpack: {
    id: "backpack",
    title: "Incarnate Word Cardinal Backpack",
    price: 35,
    originalPrice: 68,
    category: "Clothing",
    condition: "Like New",
    seller: "Maria Frausto",
    sellerRole: "Biology Major • Class of 2026",
    sellerRating: "4.9 ★ (14 reviews)",
    location: "UIW Mabee Library",
    images: ["images/UIW_Backpack.jpg", "images/UIW_Backpack.jpg", "images/UIW_Backpack.jpg"],
    desc: "Heavy-duty collegiate backpack with embroidered UIW Cardinals crest. Features dedicated padded laptop compartment (fits up to 15.6 inch laptops), dual mesh drink holders, and water-resistant base.",
    department: "Campus Gear"
  },
  sweatshirt: {
    id: "sweatshirt",
    title: "Classic UIW Crewneck Sweatshirt (Vintage)",
    price: 32,
    originalPrice: 50,
    category: "Clothing",
    condition: "Good",
    seller: "Sophia Gomez",
    sellerRole: "Business Administration • Class of 2026",
    sellerRating: "5.0 ★ (11 reviews)",
    location: "Student Engagement Center",
    images: ["images/UIW_Sweatshirt.jpg", "images/UIW_Sweatshirt.jpg", "images/UIW_Sweatshirt.jpg"],
    desc: "Classic cardinal red crewneck sweater with distressed college lettering. Very comfortable and warm for winter classes. Unisex Large.",
    department: "Cardinal Apparel"
  },
  tote: {
    id: "tote",
    title: "UIW Cardinal Heavyweight Canvas Tote Bag",
    price: 15,
    originalPrice: 24,
    category: "Clothing",
    condition: "Brand New",
    seller: "Isabella Gomez",
    sellerRole: "Graphic Design • Class of 2027",
    sellerRating: "4.8 ★ (19 reviews)",
    location: "Kelso Art Center",
    images: ["images/tote_bag.jfif", "images/tote_bag.jfif", "images/tote_bag.jfif"],
    desc: "100% natural cotton canvas tote with reinforced shoulder straps and bold red cardinal print. Brand new, never used.",
    department: "Campus Accessories"
  }
};

// Check for custom listings created by Sophia's Sell page
function findItemData(itemId) {
  if (itemCatalog[itemId]) {
    return itemCatalog[itemId];
  }

  // Check localStorage for newly created items
  try {
    var custom = localStorage.getItem("cardinal_custom_listings");
    if (custom) {
      var arr = JSON.parse(custom);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === itemId) {
          return {
            id: arr[i].id,
            title: arr[i].title,
            price: arr[i].price,
            originalPrice: arr[i].price * 1.3,
            category: arr[i].category,
            condition: arr[i].condition,
            seller: "Current Student (You)",
            sellerRole: "UIW Student • Class of 2026",
            sellerRating: "5.0 ★ (New Seller)",
            location: "UIW Campus Student Engagement Center",
            images: [arr[i].image, arr[i].image, arr[i].image],
            desc: arr[i].desc || "Student listed item on Cardinal Market.",
            department: "Student Marketplace"
          };
        }
      }
    }
  } catch (e) {
    console.warn("Could not check custom listings:", e);
  }

  // Default fallback if ID not found
  return itemCatalog["textbook"];
}

// --------------------------------------------------------------------------
// PAGE INITIALIZATION: Parses URL param and renders item details
// --------------------------------------------------------------------------
var currentItem = null;

document.addEventListener("DOMContentLoaded", function () {
  console.log("Maria's item detail script initialized successfully!");

  // Parse query parameter ?id=... from the page URL
  var params = new URLSearchParams(window.location.search);
  var requestedId = params.get("id") || "textbook";

  currentItem = findItemData(requestedId);
  populateItemPage(currentItem);
  setupThumbnailGallery(currentItem);
  setupFavoriteButton(currentItem);
  setupOfferCalculator(currentItem);
  setupMessageModal(currentItem);
  renderSimilarItems(currentItem);
});

// --------------------------------------------------------------------------
// 1. POPULATE PAGE ELEMENTS WITH ITEM DATA
// --------------------------------------------------------------------------
function populateItemPage(item) {
  document.title = "Cardinal Market | " + item.title;

  // Breadcrumbs & category tag
  var breadcrumbCategory = document.getElementById("breadcrumbCategory");
  var breadcrumbTitle    = document.getElementById("breadcrumbTitle");
  var categoryTag        = document.getElementById("categoryTag");
  var conditionBadge     = document.getElementById("conditionBadge");

  if (breadcrumbCategory) breadcrumbCategory.textContent = item.category;
  if (breadcrumbTitle)    breadcrumbTitle.textContent = item.title;
  if (categoryTag)        categoryTag.textContent = item.category;
  if (conditionBadge)     conditionBadge.textContent = item.condition;

  // Title, price, description
  var itemTitle = document.getElementById("itemTitle");
  var itemPrice = document.getElementById("itemPrice");
  var originalPrice = document.getElementById("originalPrice");
  var itemDesc = document.getElementById("itemDesc");

  if (itemTitle) itemTitle.textContent = item.title;
  if (itemPrice) itemPrice.textContent = "$" + item.price;
  if (originalPrice) originalPrice.textContent = "$" + Math.round(item.originalPrice);
  if (itemDesc) itemDesc.textContent = item.desc;

  // Seller card details
  var sellerName = document.getElementById("sellerName");
  var sellerRole = document.getElementById("sellerRole");
  var sellerRating = document.getElementById("sellerRating");
  var meetupLocation = document.getElementById("meetupLocation");

  if (sellerName) sellerName.textContent = item.seller;
  if (sellerRole) sellerRole.textContent = item.sellerRole;
  if (sellerRating) sellerRating.textContent = item.sellerRating;
  if (meetupLocation) meetupLocation.textContent = item.location;
}

// --------------------------------------------------------------------------
// 2. INTERACTIVE THUMBNAIL SWITCHER
// --------------------------------------------------------------------------
function setupThumbnailGallery(item) {
  var mainImg = document.getElementById("mainImg");
  var thumbsContainer = document.getElementById("thumbnailsRow");
  if (!mainImg || !thumbsContainer) return;

  mainImg.src = item.images[0];
  mainImg.alt = item.title;
  thumbsContainer.innerHTML = "";

  item.images.forEach(function (imgSrc, index) {
    var btn = document.createElement("button");
    btn.className = "thumb-btn" + (index === 0 ? " active" : "");
    btn.setAttribute("aria-label", "View photo " + (index + 1));

    var thumbImg = document.createElement("img");
    thumbImg.src = imgSrc;
    thumbImg.alt = "Thumbnail " + (index + 1);

    btn.appendChild(thumbImg);

    // Click handler to swap primary picture smoothly
    btn.addEventListener("click", function () {
      mainImg.style.opacity = "0.4";
      setTimeout(function () {
        mainImg.src = imgSrc;
        mainImg.style.opacity = "1";
      }, 150);

      // Update active border state
      document.querySelectorAll(".thumb-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
    });

    thumbsContainer.appendChild(btn);
  });
}

// --------------------------------------------------------------------------
// 3. FAVORITE BUTTON (Toggles heart & persists to localStorage)
// --------------------------------------------------------------------------
function setupFavoriteButton(item) {
  var favBtn = document.getElementById("saveItemBtn");
  if (!favBtn) return;

  function isSaved() {
    try {
      var saved = JSON.parse(localStorage.getItem("cardinal_saved_items") || "[]");
      return saved.indexOf(item.id) !== -1;
    } catch (e) {
      return false;
    }
  }

  function updateBtnUI() {
    if (isSaved()) {
      favBtn.classList.add("active");
      favBtn.innerHTML = "<span>♥</span> Saved to Account";
    } else {
      favBtn.classList.remove("active");
      favBtn.innerHTML = "<span>♡</span> Save Item";
    }
  }

  updateBtnUI();

  favBtn.addEventListener("click", function () {
    try {
      var saved = JSON.parse(localStorage.getItem("cardinal_saved_items") || "[]");
      var idx = saved.indexOf(item.id);
      if (idx === -1) {
        saved.push(item.id);
        localStorage.setItem("cardinal_saved_items", JSON.stringify(saved));
        showMariaToast("Added <strong>" + item.title + "</strong> to your saved items!");
      } else {
        saved.splice(idx, 1);
        localStorage.setItem("cardinal_saved_items", JSON.stringify(saved));
        showMariaToast("Removed <strong>" + item.title + "</strong> from saved items.");
      }
      updateBtnUI();
    } catch (e) {
      console.warn("Could not toggle favorite:", e);
    }
  });
}

// --------------------------------------------------------------------------
// 4. "MAKE AN OFFER" CALCULATOR (Demonstrates math & DOM updates)
// --------------------------------------------------------------------------
function setupOfferCalculator(item) {
  var offerButtons = document.querySelectorAll(".offer-btn");
  var offerResult = document.getElementById("offerResult");

  offerButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var discount = parseFloat(btn.getAttribute("data-discount"));
      var offerPrice = Math.round(item.price * (1 - discount));
      if (offerResult) {
        offerResult.innerHTML = "Suggested offer: <strong>$" + offerPrice + "</strong> (saves $" + (item.price - offerPrice) + ") • Open message to send this offer!";
        offerResult.style.color = "#15803d";
        offerResult.style.fontWeight = "bold";
      }

      // Automatically prefill message box with the offer
      var msgBox = document.getElementById("sellerMessageInput");
      if (msgBox) {
        msgBox.value = "Hi " + item.seller + ", would you consider $" + offerPrice + " for your " + item.title + "? I can pick it up at " + item.location + " today!";
      }
    });
  });
}

// --------------------------------------------------------------------------
// 5. "MESSAGE SELLER" INTERACTIVE MODAL DIALOG
// --------------------------------------------------------------------------
function setupMessageModal(item) {
  var openBtn = document.getElementById("openMessageModalBtn");
  var modalOverlay = document.getElementById("messageModalOverlay");
  var closeBtn = document.getElementById("closeModalBtn");
  var cancelBtn = document.getElementById("cancelModalBtn");
  var sendBtn = document.getElementById("sendMessageBtn");
  var msgInput = document.getElementById("sellerMessageInput");
  var charCount = document.getElementById("charCount");
  var modalRecipient = document.getElementById("modalRecipient");

  if (!openBtn || !modalOverlay) return;

  if (modalRecipient) {
    modalRecipient.textContent = item.seller;
  }

  // Pre-fill greeting if empty
  if (msgInput && msgInput.value.trim() === "") {
    msgInput.value = "Hi " + item.seller + "! Is your " + item.title + " still available? I can meet you at " + item.location + ".";
  }

  function openModal() {
    modalOverlay.classList.add("active");
    if (msgInput) {
      msgInput.focus();
      updateCharCount();
    }
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
  }

  function updateCharCount() {
    if (charCount && msgInput) {
      charCount.textContent = msgInput.value.length + " / 300 characters";
    }
  }

  openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  // Close when clicking outside the dialog window
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  // Live character counter
  if (msgInput) {
    msgInput.addEventListener("input", updateCharCount);
  }

  // Send message action
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      var text = msgInput ? msgInput.value.trim() : "";
      if (text === "") {
        alert("Please enter a message for the seller.");
        return;
      }

      // Save message to localStorage so it persists to Account page
      try {
        var existing = JSON.parse(localStorage.getItem("cardinal_messages") || "[]");
        existing.push({
          sender: "You",
          recipient: item.seller,
          itemTitle: item.title,
          text: text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        localStorage.setItem("cardinal_messages", JSON.stringify(existing));
      } catch (e) {
        console.warn("Could not save message:", e);
      }

      closeModal();
      showMariaToast("Message sent to <strong>" + item.seller + "</strong>! Saved to your Account messages.");
    });
  }
}

// --------------------------------------------------------------------------
// 6. SIMILAR ITEMS RECOMMENDATIONS
// --------------------------------------------------------------------------
function renderSimilarItems(item) {
  var container = document.getElementById("similarItemsGrid");
  if (!container) return;

  container.innerHTML = "";

  // Find 3 other items in catalog
  var keys = Object.keys(itemCatalog).filter(function (k) {
    return k !== item.id;
  }).slice(0, 3);

  keys.forEach(function (k) {
    var rec = itemCatalog[k];
    var card = document.createElement("article");
    card.className = "card";
    card.style.textAlign = "center";
    card.innerHTML =
      '<img src="' + rec.images[0] + '" alt="' + rec.title + '" style="height:110px; width:100%; object-fit:contain; margin-bottom:8px;">' +
      '<h4 style="margin:4px 0; font-size:0.95rem; line-height:1.2;">' + rec.title + '</h4>' +
      '<p class="price" style="margin:6px 0;">$' + rec.price + '</p>' +
      '<a class="btn" style="padding:6px 12px; font-size:0.82rem;" href="item.html?id=' + rec.id + '">View Details</a>';
    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 7. TOAST FEEDBACK NOTIFICATION
// --------------------------------------------------------------------------
function showMariaToast(msg) {
  var toast = document.getElementById("itemToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "itemToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = "<span>✓</span> " + msg;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2800);
}

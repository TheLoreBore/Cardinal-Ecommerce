// ==========================================================================
// maria.js - EXTERNAL JAVASCRIPT FOR ITEM DETAIL PAGE
// Author: Maria Frausto
// Course: CIS 2368 Website Development I - Midterm Project
// Site: Cardinal Market (UIW Campus Student Marketplace)
// --------------------------------------------------------------------------
// MODIFIED EXAMPLES OF CLASS CODE (MIDTERM REQUIREMENT):
// 1. sayHello.js (Homework / Class Lesson on Form & DOM Manipulation):
//    In sayHello.js, inputs are read and formatted text is inserted into
//    hellowMsg. Here in Maria's script, handleSendMessage() reads the seller
//    name and message input, calculates timestamps, and injects confirmation
//    feedback directly into document.getElementById("contactMsg") and
//    document.getElementById("offerResult").
// 2. DragAndDrop.js & hw7.html (Event Listeners & Media Switching):
//    In DragAndDrop.js, event listeners attach to image elements to handle
//    interactive changes. Here, addEventListener("click", ...) attaches to
//    each thumbnail button to swap document.getElementById("mainImg").src
//    with smooth transitions and visual active indicators.
// 3. Conditionals & Routing (hw8.html):
//    Uses if/else branching and URLSearchParams to dynamically look up
//    the item matching ?id=... in the catalog, with safe fallback defaults.
// ==========================================================================

// Catalog of UIW marketplace items for the detail page
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
    images: ["images/textbook.svg", "images/UIW_Backpack.jpg", "images/cardinals-logo.jpg"],
    desc: "Used for one semester in BIOL 1401 with Dr. Smith. All pages are intact, pristine condition with zero highlighting, notes, or folded corners. Includes access code scratch-off still sealed on inside back cover. Can meet at the campus library or SEC during weekday afternoons.",
    department: "School of Mathematics, Science & Engineering",
    datePosted: "October 21, 2026"
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
    images: ["images/lamp.svg", "images/desk-chair.svg", "images/mini-fridge.svg"],
    desc: "Modern matte black study lamp with 3 color temperatures (warm, natural, cool white) and touch dimmer control. Flexible gooseneck allows aiming light wherever needed. Works perfectly and includes original AC wall adapter.",
    department: "Dorm Essentials",
    datePosted: "October 20, 2026"
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
    images: ["images/bike.svg", "images/yourNextImage.jpg", "images/cardinals-logo.jpg"],
    desc: "Lightweight aluminum frame commuter bicycle. Gears shift smoothly and brakes have plenty of pad life. Fitted with front and rear safety reflectors. Selling because I am bringing a scooter this semester. Includes heavy-duty U-lock and key.",
    department: "Campus Transportation",
    datePosted: "October 19, 2026"
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
    images: ["images/hoodie.svg", "images/UIW_Sweatshirt.jpg", "images/tote_bag.jfif"],
    desc: "Authentic Incarnate Word Cardinals hooded sweatshirt in signature Cardinal red. Premium fleece material with embroidered front chest logo. Worn twice during homecoming week. Smoke-free and pet-free home.",
    department: "Cardinal Spirit Gear",
    datePosted: "October 22, 2026"
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
    images: ["images/mini-fridge.svg", "images/lamp.svg", "images/desk-chair.svg"],
    desc: "Clean and quiet 3.2 cu. ft. double-door compact refrigerator. Runs whisper-quiet (perfect for dorm rooms) and keeps groceries ice cold. Fully defrosted and sanitized, ready for pickup.",
    department: "Dorm Appliances",
    datePosted: "October 18, 2026"
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
    images: ["images/desk-chair.svg", "images/mini-fridge.svg", "images/lamp.svg"],
    desc: "High-comfort breathable mesh computer chair with height adjustment and tilt tension lock. Smooth-rolling dual-wheel casters suitable for dorm tile or rugs. Great condition with no tears.",
    department: "Dorm Furniture",
    datePosted: "October 20, 2026"
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
    images: ["images/UIW_Backpack.jpg", "images/tote_bag.jfif", "images/cardinals-logo.jpg"],
    desc: "Heavy-duty collegiate backpack with embroidered UIW Cardinals crest. Features dedicated padded laptop compartment (fits up to 15.6 inch laptops), dual mesh drink holders, and water-resistant base.",
    department: "Campus Gear",
    datePosted: "October 21, 2026"
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
    images: ["images/UIW_Sweatshirt.jpg", "images/hoodie.svg", "images/cardinals-logo.jpg"],
    desc: "Classic cardinal red crewneck sweater with distressed college lettering. Very comfortable and warm for winter classes. Unisex Large.",
    department: "Cardinal Apparel",
    datePosted: "October 17, 2026"
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
    images: ["images/tote_bag.jfif", "images/UIW_Backpack.jpg", "images/cardinals-logo.jpg"],
    desc: "100% natural cotton canvas tote with reinforced shoulder straps and bold red cardinal print. Brand new, never used.",
    department: "Campus Accessories",
    datePosted: "October 22, 2026"
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
            originalPrice: Math.round(arr[i].price * 1.3),
            category: arr[i].category,
            condition: arr[i].condition,
            seller: "Current Student (You)",
            sellerRole: "UIW Student • Class of 2026",
            sellerRating: "5.0 ★ (New Seller)",
            location: "UIW Campus Student Engagement Center",
            images: [arr[i].image || "images/cardinals-logo.jpg", "images/cardinals-logo.jpg", "images/cardinals-logo.jpg"],
            desc: arr[i].desc || "Student listed item on Cardinal Market.",
            department: "Student Marketplace",
            datePosted: "Recently Added"
          };
        }
      }
    }
  } catch (e) {
    console.warn("Could not check custom listings:", e);
  }

  // Fallback to textbook if itemId not recognized
  return itemCatalog["textbook"];
}

// --------------------------------------------------------------------------
// PAGE INITIALIZATION: Runs when the DOM is fully loaded
// --------------------------------------------------------------------------
var currentItem = null;

document.addEventListener("DOMContentLoaded", function () {
  console.log("Maria's item detail script initialized successfully!");

  // Parse query parameter ?id=... from the page URL
  var params = new URLSearchParams(window.location.search);
  var requestedId = params.get("id") || "textbook";

  currentItem = findItemData(requestedId);

  // Initialize all page features
  populateItemPage(currentItem);
  setupThumbnailGallery(currentItem);
  setupFavoriteButton(currentItem);
  setupOfferCalculator(currentItem);
  setupMessageModal(currentItem);
  setupImageZoom();
  renderSimilarItems(currentItem);
});

// --------------------------------------------------------------------------
// 1. POPULATE PAGE ELEMENTS WITH ITEM DATA
// --------------------------------------------------------------------------
function populateItemPage(item) {
  document.title = "Cardinal Market | " + item.title;

  // Breadcrumbs & category tags
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
  if (originalPrice) originalPrice.textContent = "$" + Math.round(item.originalPrice) + " retail";
  if (itemDesc) itemDesc.textContent = item.desc;

  // ITEM DETAILS LIST (Midterm Checklist: condition, category, pickup spot, date posted)
  var detailCondition = document.getElementById("detailCondition");
  var detailCategory = document.getElementById("detailCategory");
  var detailPickup = document.getElementById("detailPickup");
  var detailDatePosted = document.getElementById("detailDatePosted");

  if (detailCondition) detailCondition.innerHTML = '<span class="spec-badge">' + item.condition + '</span>';
  if (detailCategory) detailCategory.textContent = item.category;
  if (detailPickup) detailPickup.textContent = item.location;
  if (detailDatePosted) detailDatePosted.textContent = item.datePosted || "October 21, 2026";

  // Seller card details
  var sellerName = document.getElementById("sellerName");
  var sellerRole = document.getElementById("sellerRole");
  var sellerRating = document.getElementById("sellerRating");
  var meetupLocation = document.getElementById("meetupLocation");
  var sellerAvatar = document.getElementById("sellerAvatar");

  if (sellerName) sellerName.textContent = item.seller;
  if (sellerRole) sellerRole.textContent = item.sellerRole;
  if (sellerRating) sellerRating.textContent = item.sellerRating + " • Verified Student";
  if (meetupLocation) meetupLocation.textContent = item.location;
  if (sellerAvatar) {
    var initials = item.seller.split(" ").map(function(n) { return n[0]; }).join("").substring(0, 2);
    sellerAvatar.textContent = initials || "UIW";
  }
}

// --------------------------------------------------------------------------
// 2. THUMBNAIL GALLERY SWITCHER (Midterm Checklist Requirement)
//    Clicking a thumbnail swaps the main image: getElementById('mainImg').src = ...
// --------------------------------------------------------------------------
function setupThumbnailGallery(item) {
  var mainImg = document.getElementById("mainImg");
  var thumbsContainer = document.getElementById("thumbnailsRow");
  var caption = document.getElementById("mainImgCaption");

  if (!mainImg || !thumbsContainer) return;

  // Ensure default main image matches item's primary image
  mainImg.src = item.images[0];
  mainImg.alt = item.title;

  // Clear previous thumbnails and build dynamically from item's 3 images
  thumbsContainer.innerHTML = "";

  item.images.forEach(function (imgSrc, index) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thumb-btn" + (index === 0 ? " active" : "");
    btn.setAttribute("data-index", index);
    btn.setAttribute("aria-label", "View photo " + (index + 1));

    var thumbImg = document.createElement("img");
    thumbImg.src = imgSrc;
    thumbImg.alt = item.title + " view " + (index + 1);

    btn.appendChild(thumbImg);

    // CLICK EVENT: Swaps the main image (Required by Rubric)
    btn.addEventListener("click", function () {
      // Highlight selected thumbnail
      var allThumbs = thumbsContainer.querySelectorAll(".thumb-btn");
      allThumbs.forEach(function (t) { t.classList.remove("active"); });
      btn.classList.add("active");

      // Smooth fade transition
      mainImg.style.opacity = "0.3";
      setTimeout(function () {
        // Core rubric requirement: Swap the main image src
        document.getElementById("mainImg").src = imgSrc;
        mainImg.style.opacity = "1";
        if (caption) {
          caption.textContent = "Photo " + (index + 1) + " of " + item.images.length + " • " + item.title;
        }
      }, 140);
    });

    thumbsContainer.appendChild(btn);
  });
}

// --------------------------------------------------------------------------
// 3. SAVE ITEM BUTTON (Midterm Checklist Requirement)
//    Toggles between "Save item" and "Saved" (changes text + color)
// --------------------------------------------------------------------------
function setupFavoriteButton(item) {
  var saveBtn = document.getElementById("saveItemBtn");
  var saveBtnText = document.getElementById("saveBtnText");
  var saveHeartIcon = document.getElementById("saveHeartIcon");

  if (!saveBtn) return;

  // Helper to check saved status in localStorage
  function isSaved() {
    try {
      var saved = JSON.parse(localStorage.getItem("cardinal_saved_items") || "[]");
      return saved.indexOf(item.id) !== -1;
    } catch (e) {
      return false;
    }
  }

  // Updates the visual UI: text and color
  function updateSaveUI() {
    if (isSaved()) {
      // Toggle to SAVED state (change text + color)
      saveBtn.classList.add("saved");
      if (saveBtnText) saveBtnText.textContent = "Saved";
      if (saveHeartIcon) saveHeartIcon.innerHTML = "&#9829;"; // Filled heart
    } else {
      // Toggle to SAVE ITEM state (change text + color)
      saveBtn.classList.remove("saved");
      if (saveBtnText) saveBtnText.textContent = "Save item";
      if (saveHeartIcon) saveHeartIcon.innerHTML = "&#9825;"; // Outline heart
    }
  }

  // Initial UI state check
  updateSaveUI();

  // Click event to toggle saved status
  saveBtn.addEventListener("click", function () {
    try {
      var saved = JSON.parse(localStorage.getItem("cardinal_saved_items") || "[]");
      var idx = saved.indexOf(item.id);

      if (idx === -1) {
        saved.push(item.id);
        localStorage.setItem("cardinal_saved_items", JSON.stringify(saved));
        showToast("Saved <strong>" + item.title + "</strong> to your account!");
      } else {
        saved.splice(idx, 1);
        localStorage.setItem("cardinal_saved_items", JSON.stringify(saved));
        showToast("Removed <strong>" + item.title + "</strong> from saved items.");
      }
      // Re-render button text and color
      updateSaveUI();
    } catch (e) {
      console.warn("Could not toggle saved status:", e);
    }
  });
}

// --------------------------------------------------------------------------
// 4. "MESSAGE SELLER" & #contactMsg FEEDBACK (Midterm Checklist Requirement)
//    Modified from sayHello.js: Reads inputs, performs action, and writes
//    confirmation message directly into #contactMsg.
// --------------------------------------------------------------------------
function setupMessageModal(item) {
  var contactBtn = document.getElementById("contactBtn");
  var modalOverlay = document.getElementById("messageModalOverlay");
  var closeBtn = document.getElementById("closeModalBtn");
  var cancelBtn = document.getElementById("cancelModalBtn");
  var sendBtn = document.getElementById("sendMessageBtn");
  var msgInput = document.getElementById("sellerMessageInput");
  var charCount = document.getElementById("charCount");
  var modalRecipient = document.getElementById("modalRecipient");
  var contactMsg = document.getElementById("contactMsg");

  if (!contactBtn || !modalOverlay) return;

  if (modalRecipient) {
    modalRecipient.textContent = item.seller;
  }

  // Pre-fill friendly greeting message
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

  contactBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  // Close when clicking backdrop
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  // Character counter
  if (msgInput) {
    msgInput.addEventListener("input", updateCharCount);
  }

  // SEND MESSAGE HANDLER (Directly satisfies #contactMsg requirement)
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      var text = msgInput ? msgInput.value.trim() : "";
      if (text === "") {
        alert("Please enter a message for the seller.");
        return;
      }

      // Persist to localStorage for Isabella's account.html
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

      // REQUIRED CHECKLIST: Display confirmation text in #contactMsg
      if (contactMsg) {
        contactMsg.textContent = "Message sent to " + item.seller + "! (Saved to Account)";
        contactMsg.style.color = "#15803d";
      }

      showToast("Message sent to <strong>" + item.seller + "</strong>! Saved to your Account messages.");
    });
  }
}

// --------------------------------------------------------------------------
// 5. "MAKE AN OFFER" CALCULATOR (Stretch Goal: Offer input & feedback)
// --------------------------------------------------------------------------
function setupOfferCalculator(item) {
  var offerButtons = document.querySelectorAll(".offer-btn");
  var offerResult = document.getElementById("offerResult");
  var customOfferInput = document.getElementById("customOfferInput");
  var sendCustomOfferBtn = document.getElementById("sendCustomOfferBtn");
  var contactMsg = document.getElementById("contactMsg");

  // Quick percentage discount chips
  offerButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var discount = parseFloat(btn.getAttribute("data-discount"));
      var offerPrice = Math.round(item.price * (1 - discount));
      if (offerResult) {
        offerResult.innerHTML = "Suggested offer: <strong>$" + offerPrice + "</strong> (saves $" + (item.price - offerPrice) + ") • Click 'Submit Offer' or 'Message Seller'";
        offerResult.style.color = "#15803d";
      }
      if (customOfferInput) {
        customOfferInput.value = offerPrice;
      }
    });
  });

  // Custom offer submission
  if (sendCustomOfferBtn && customOfferInput) {
    sendCustomOfferBtn.addEventListener("click", function () {
      var val = parseFloat(customOfferInput.value);
      if (isNaN(val) || val <= 0) {
        alert("Please enter a valid offer dollar amount.");
        return;
      }

      // Stretch goal requirement: shows "Offer: $X sent"
      var offerText = "Offer: $" + Math.round(val) + " sent to " + item.seller + "!";
      if (contactMsg) {
        contactMsg.textContent = offerText;
        contactMsg.style.color = "#15803d";
      }
      if (offerResult) {
        offerResult.textContent = offerText;
        offerResult.style.color = "#15803d";
      }
      showToast(offerText);
    });
  }
}

// --------------------------------------------------------------------------
// 6. IMAGE ZOOM ON CLICK (Stretch Goal)
// --------------------------------------------------------------------------
function setupImageZoom() {
  var frame = document.getElementById("mainImageFrame");
  var mainImg = document.getElementById("mainImg");
  var zoomModal = document.getElementById("imageZoomModal");
  var zoomedImg = document.getElementById("zoomedImage");
  var closeZoomBtn = document.getElementById("closeZoomBtn");

  if (!frame || !mainImg || !zoomModal || !zoomedImg) return;

  frame.addEventListener("click", function () {
    zoomedImg.src = mainImg.src;
    zoomedImg.alt = mainImg.alt;
    zoomModal.classList.add("active");
  });

  if (closeZoomBtn) {
    closeZoomBtn.addEventListener("click", function () {
      zoomModal.classList.remove("active");
    });
  }

  zoomModal.addEventListener("click", function (e) {
    if (e.target === zoomModal) {
      zoomModal.classList.remove("active");
    }
  });
}

// --------------------------------------------------------------------------
// 7. TOAST NOTIFICATION POPUP
// --------------------------------------------------------------------------
function showToast(messageHtml) {
  var existing = document.getElementById("mariaToastNotification");
  if (existing) existing.remove();

  var toast = document.createElement("div");
  toast.id = "mariaToastNotification";
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.right = "24px";
  toast.style.backgroundColor = "#1e293b";
  toast.style.color = "#ffffff";
  toast.style.padding = "14px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
  toast.style.fontSize = "0.92rem";
  toast.style.zIndex = "99999";
  toast.style.transition = "all 0.3s ease";
  toast.style.borderLeft = "4px solid #c8102e";
  toast.innerHTML = messageHtml;

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(function () { toast.remove(); }, 350);
  }, 3200);
}

// --------------------------------------------------------------------------
// 8. SIMILAR ITEMS RECOMMENDATIONS
// --------------------------------------------------------------------------
function renderSimilarItems(item) {
  var container = document.getElementById("similarItemsGrid");
  if (!container) return;

  container.innerHTML = "";

  // Pick 3 other items in catalog
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

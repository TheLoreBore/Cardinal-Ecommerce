// ==========================================================================
// sophia.js - EXTERNAL JAVASCRIPT FOR SELL PAGE
// Author: Sophia Gomez
// Course: CIS 2368 Website Development I - Midterm Project
// Site: Cardinal Market (UIW Campus Student Marketplace)
// --------------------------------------------------------------------------
// MODIFIED FROM CLASS EXAMPLES:
// 1. Form Handling & Live Input (modified from hw4.html & inputOutput.html):
//    Reads user input across multiple input types (text, number, select,
//    textarea, and file upload) in real-time using 'input' and 'change' events.
// 2. Conditionals & Validation (modified from hw8.html / script.js):
//    Checks that required fields (title, price) are filled in and price is positive.
//    Validates that uploaded files are valid image MIME types before rendering.
// 3. Dynamic DOM Updates & Canvas/CSS Confetti (modified from hw7.html):
//    Creates 150 animated confetti elements with randomized CSS variables
//    (--start-x, --color, --speed, --spin) to celebrate listing publication.
// 4. Client-side Persistence (localStorage):
//    Saves published listings so they immediately appear in Nathan's
//    browse grid (listings.html) and Isabella's account page (account.html).
// ==========================================================================

const sellForm = document.getElementById("sellForm");

// Form input references
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("cat");
const conditionInput = document.getElementById("condition");
const descriptionInput = document.getElementById("desc");
const imageInput = document.getElementById("image");

// Photo preview elements
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const photoMessage = document.getElementById("photoMessage");

// Live listing preview elements
const previewTitle = document.getElementById("previewTitle");
const previewPrice = document.getElementById("previewPrice");
const previewCategory = document.getElementById("previewCategory");
const previewCondition = document.getElementById("previewCondition");
const previewDescription = document.getElementById("previewDescription");
const formMessage = document.getElementById("formMessage");

let currentImageURL = null;

// Update the live listing preview whenever user modifies form fields
function updateListingPreview() {
    if (previewTitle && titleInput) {
        previewTitle.textContent = titleInput.value.trim() || "Your item title";
    }

    if (previewPrice && priceInput) {
        const price = priceInput.value;
        if (price !== "" && Number(price) >= 0) {
            previewPrice.textContent = Number(price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });
        } else {
            previewPrice.textContent = "$0.00";
        }
    }

    if (previewCategory && categoryInput) {
        previewCategory.textContent = categoryInput.value || "Category";
    }

    if (previewCondition && conditionInput) {
        previewCondition.textContent = conditionInput.value || "Not selected";
    }

    if (previewDescription && descriptionInput) {
        previewDescription.textContent =
            descriptionInput.value.trim() || "Your item description will appear here.";
    }
}

// Attach real-time input event listeners for instant reactive preview
if (titleInput)       titleInput.addEventListener("input", updateListingPreview);
if (priceInput)       priceInput.addEventListener("input", updateListingPreview);
if (categoryInput)    categoryInput.addEventListener("change", updateListingPreview);
if (conditionInput)   conditionInput.addEventListener("change", updateListingPreview);
if (descriptionInput) descriptionInput.addEventListener("input", updateListingPreview);

// Show the chosen photo using HTML5 File API & Object URLs
if (imageInput) {
    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];

        // Revoke previously created blob URL to free system memory
        if (currentImageURL) {
            URL.revokeObjectURL(currentImageURL);
            currentImageURL = null;
        }

        if (!file) {
            if (imagePreview) { imagePreview.hidden = true; imagePreview.removeAttribute("src"); }
            if (previewImage) { previewImage.hidden = true; previewImage.removeAttribute("src"); }
            if (photoMessage) photoMessage.textContent = "Your selected photo will appear here.";
            return;
        }

        // Validate that uploaded file is an image
        if (!file.type.startsWith("image/")) {
            imageInput.value = "";
            if (imagePreview) { imagePreview.hidden = true; imagePreview.removeAttribute("src"); }
            if (previewImage) { previewImage.hidden = true; previewImage.removeAttribute("src"); }
            if (photoMessage) photoMessage.textContent = "Please choose a valid image file (.jpg, .png, .gif).";
            return;
        }

        // Create temporary URL for selected local image
        currentImageURL = URL.createObjectURL(file);

        if (imagePreview) {
            imagePreview.src = currentImageURL;
            imagePreview.hidden = false;
        }
        if (previewImage) {
            previewImage.src = currentImageURL;
            previewImage.hidden = false;
        }

        if (photoMessage) photoMessage.textContent = "Photo loaded: " + file.name;
    });
}

// --------------------------------------------------------------------------
// SOPHIA'S CARDINAL CONFETTI ANIMATION ENGINE
// --------------------------------------------------------------------------
const confettiColors = [
    "#b92621", // UIW Cardinal Red
    "#ffd700", // Gold Accent
    "#ffffff", // White
    "#e88b9a", // Light Coral
    "#1c1c1c"  // Charcoal Dark
];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function launchConfetti() {
    const area = document.getElementById("confetti-area");
    if (!area) return;

    // Respect user's operating system accessibility setting for motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Generate 150 randomized festive confetti particles
    for (let i = 0; i < 150; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";

        piece.style.setProperty("--start-x", random(0, 100) + "vw");
        piece.style.setProperty("--start-y", random(-150, -10) + "px");
        piece.style.setProperty("--size", random(5, 12) + "px");
        piece.style.setProperty("--height", random(7, 16) + "px");
        piece.style.setProperty("--color", confettiColors[Math.floor(random(0, confettiColors.length))]);
        piece.style.setProperty("--round", Math.random() < 0.25 ? "50%" : "2px");
        piece.style.setProperty("--sway", random(-180, 180) + "px");
        piece.style.setProperty("--spin", random(-720, 720) + "deg");
        piece.style.setProperty("--speed", random(1.5, 3) + "s");
        piece.style.setProperty("--delay", random(0, 1.5) + "s");

        area.appendChild(piece);

        // Remove DOM element after animation ends to prevent memory buildup
        piece.addEventListener("animationend", function () {
            piece.remove();
        }, { once: true });
    }
}

// --------------------------------------------------------------------------
// FORM SUBMIT HANDLER: Validates, Celebrates & Persists to LocalStorage
// --------------------------------------------------------------------------
if (sellForm) {
    sellForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const titleVal = titleInput ? titleInput.value.trim() : "";
        const priceVal = priceInput ? parseFloat(priceInput.value) : 0;
        const categoryVal = categoryInput ? categoryInput.value : "other";
        const conditionVal = conditionInput ? conditionInput.value : "Good";
        const descVal = descriptionInput ? descriptionInput.value.trim() : "";

        // Form validation
        if (titleVal === "") {
            alert("Please enter a title for your item.");
            if (titleInput) titleInput.focus();
            return;
        }

        if (isNaN(priceVal) || priceVal < 0) {
            alert("Please enter a valid price ($0 or greater).");
            if (priceInput) priceInput.focus();
            return;
        }

        updateListingPreview();

        // Build item object to persist
        const customId = "custom-" + Date.now();
        const fallbackImage = (categoryVal === "books") ? "images/textbook.svg" :
                              (categoryVal === "clothing") ? "images/hoodie.svg" :
                              (categoryVal === "furniture") ? "images/desk-chair.svg" : "images/cardinals-logo.jpg";

        const newListing = {
            id: customId,
            title: titleVal,
            price: priceVal,
            category: categoryVal,
            condition: conditionVal,
            desc: descVal || "Student listed item on Cardinal Market.",
            image: fallbackImage,
            seller: "Current Student (You)",
            location: "UIW Student Engagement Center"
        };

        // Save to localStorage so Browse and Account pages show it
        try {
            const existingListings = JSON.parse(localStorage.getItem("cardinal_custom_listings") || "[]");
            existingListings.unshift(newListing);
            localStorage.setItem("cardinal_custom_listings", JSON.stringify(existingListings));
        } catch (e) {
            console.warn("Could not persist custom listing to localStorage:", e);
        }

        if (formMessage) {
            formMessage.innerHTML =
                "🎉 <strong>Listing Published Successfully!</strong><br>" +
                "Your item is now live on the marketplace. " +
                "<a href=\"listings.html\" style=\"color:#c8102e; font-weight:bold; text-decoration:underline;\">View in Browse</a> or " +
                "<a href=\"account.html\" style=\"color:#c8102e; font-weight:bold; text-decoration:underline;\">View in My Account</a>.";
        }

        launchConfetti();

        // Smooth scroll preview into view
        const previewSection = document.getElementById("preview");
        if (previewSection) {
            previewSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

// Initial setup on page load
updateListingPreview();

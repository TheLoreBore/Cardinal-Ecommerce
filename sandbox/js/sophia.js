// sophia.js - EXTERNAL JavaScript owned by Sophia. Add your code here. Comment your code!


const sellForm = document.getElementById("sellForm");

// Form fields
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

// Listing preview elements
const previewTitle = document.getElementById("previewTitle");
const previewPrice = document.getElementById("previewPrice");
const previewCategory = document.getElementById("previewCategory");
const previewCondition = document.getElementById("previewCondition");
const previewDescription = document.getElementById("previewDescription");
const formMessage = document.getElementById("formMessage");

let currentImageURL = null;

// Update the listing preview whenever the form changes
function updateListingPreview() {
    previewTitle.textContent =
        titleInput.value.trim() || "Your item title";

    const price = priceInput.value;

    if (price !== "" && Number(price) >= 0) {
        previewPrice.textContent =
            Number(price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });
    } else {
        previewPrice.textContent = "$0.00";
    }

    previewCategory.textContent =
        categoryInput.value || "Category";

    previewCondition.textContent =
        conditionInput.value || "Not selected";

    previewDescription.textContent =
        descriptionInput.value.trim() ||
        "Your item description will appear here.";
}

// Listen for typing and selection changes
titleInput.addEventListener("input", updateListingPreview);
priceInput.addEventListener("input", updateListingPreview);
categoryInput.addEventListener("change", updateListingPreview);
conditionInput.addEventListener("change", updateListingPreview);
descriptionInput.addEventListener("input", updateListingPreview);

// Show the chosen photo
imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];

    // Remove the previous photo if the user changes or clears it
    if (currentImageURL) {
        URL.revokeObjectURL(currentImageURL);
        currentImageURL = null;
    }

    if (!file) {
        imagePreview.hidden = true;
        previewImage.hidden = true;
        imagePreview.removeAttribute("src");
        previewImage.removeAttribute("src");
        photoMessage.textContent =
            "Your selected photo will appear here.";
        return;
    }

    // Only accept image files
    if (!file.type.startsWith("image/")) {
        imageInput.value = "";
        imagePreview.hidden = true;
        previewImage.hidden = true;
        photoMessage.textContent =
            "Please choose an image file.";
        return;
    }

    // Create a temporary URL for the selected photo
    currentImageURL = URL.createObjectURL(file);

    imagePreview.src = currentImageURL;
    previewImage.src = currentImageURL;

    imagePreview.hidden = false;
    previewImage.hidden = false;

    photoMessage.textContent = "Photo selected!";
});

// Cardinal-themed confetti - SOPHIA'S CONFETTI
const confettiColors = [
    "#b92621",
    "#ffd700",
    "#ffffff",
    "#e88b9a",
    "#000000"
];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function launchConfetti() {
    const area = document.getElementById("confetti-area");

    if (!area) return;

    // Respect the user's reduced-motion setting
    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        return;
    }


//Pieces of confetti
    for (let i = 0; i < 150; i++) {
        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.setProperty(
            "--start-x",
            random(0, 100) + "vw"
        );

        piece.style.setProperty(
            "--start-y",
            random(-150, -10) + "px"
        );

        piece.style.setProperty(
            "--size",
            random(5, 12) + "px"
        );

        piece.style.setProperty(
            "--height",
            random(7, 16) + "px"
        );

        piece.style.setProperty(
            "--color",
            confettiColors[
                Math.floor(random(0, confettiColors.length))
            ]
        );

        piece.style.setProperty(
            "--round",
            Math.random() < 0.25 ? "50%" : "2px"
        );

        piece.style.setProperty(
            "--sway",
            random(-180, 180) + "px"
        );

        piece.style.setProperty(
            "--spin",
            random(-720, 720) + "deg"
        );

        piece.style.setProperty(
            "--speed",
            random(1.5, 3) + "s"
        );

        piece.style.setProperty(
            "--delay",
            random(0, 1.5) + "s"
        );

        area.appendChild(piece);

        piece.addEventListener("animationend", function () {
            piece.remove();
        }, { once: true });
    }
}

// Preview button behavior
sellForm.addEventListener("submit", function (event) {
    event.preventDefault();

    updateListingPreview();

    formMessage.innerHTML =
        "Your listing preview is ready! <br> It has not been published or saved.";

    launchConfetti();

    // Move the preview into view
    document.getElementById("preview").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Show the correct placeholder when the page first opens
updateListingPreview();

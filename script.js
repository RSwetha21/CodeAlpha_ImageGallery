
/* =========================================================
   LUMINA — MODERN TRAVEL IMAGE GALLERY
   CodeAlpha Frontend Development Internship
   ========================================================= */


/* =========================
   1. SELECT ELEMENTS
   ========================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxNumber = document.getElementById("lightboxNumber");

const lightboxClose = document.getElementById("lightboxClose");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const menuBtn = document.getElementById("menuBtn");

const navigation = document.querySelector(".navigation");


/* =========================
   2. IMAGE DATA
   ========================= */

const images = Array.from(galleryItems).map((item, index) => {

    const image = item.querySelector("img");

    const title = item.querySelector("h3");

    return {
        src: image.src,
        alt: image.alt,
        title: title.textContent,
        number: index + 1
    };

});


/* =========================
   3. CURRENT IMAGE
   ========================= */

let currentIndex = 0;


/* =========================
   4. OPEN LIGHTBOX
   ========================= */

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================
   5. UPDATE LIGHTBOX
   ========================= */

function updateLightbox() {

    const currentImage = images[currentIndex];

    lightboxImage.src = currentImage.src;

    lightboxImage.alt = currentImage.alt;

    lightboxTitle.textContent = currentImage.title;

    lightboxNumber.textContent =
        `${String(currentImage.number).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

}


/* =========================
   6. CLOSE LIGHTBOX
   ========================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================
   7. NEXT IMAGE
   ========================= */

function showNextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    updateLightbox();

}


/* =========================
   8. PREVIOUS IMAGE
   ========================= */

function showPreviousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    updateLightbox();

}


/* =========================
   9. IMAGE CLICK EVENTS
   ========================= */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", (event) => {

        /*
           If the user clicks the view button,
           the same lightbox should open.
        */

        event.preventDefault();

        openLightbox(index);

    });

});


/* =========================
   10. LIGHTBOX BUTTONS
   ========================= */

lightboxClose.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", showNextImage);

prevBtn.addEventListener("click", showPreviousImage);


/* =========================
   11. CLOSE WHEN CLICKING
       OUTSIDE IMAGE
   ========================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================
   12. KEYBOARD CONTROLS
   ========================= */

document.addEventListener("keydown", (event) => {

    /*
       Only respond to keyboard controls
       when lightbox is open.
    */

    if (!lightbox.classList.contains("active")) {
        return;
    }


    if (event.key === "ArrowRight") {

        showNextImage();

    }


    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }


    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================
   13. CATEGORY FILTER
   ========================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.filter;


        /* Remove active state */

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        /* Add active state */

        button.classList.add("active");


        /* Filter images */

        galleryItems.forEach((item) => {

            const itemCategory =
                item.dataset.category;


            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {

                item.classList.remove("hide");

                item.classList.add("show");

            } else {

                item.classList.remove("show");

                item.classList.add("hide");

            }

        });

    });

});


/* =========================
   14. MOBILE MENU
   ========================= */

if (menuBtn && navigation) {

    menuBtn.addEventListener("click", () => {

        navigation.classList.toggle("mobile-open");

    });


    /*
       Close mobile menu when
       clicking a navigation link.
    */

    const navigationLinks =
        navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("mobile-open");

        });

    });

}


/* =========================
   15. TOUCH SWIPE SUPPORT
   ========================= */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    /*
       Swipe left → next image
    */

    if (swipeDistance < -50) {

        showNextImage();

    }


    /*
       Swipe right → previous image
    */

    if (swipeDistance > 50) {

        showPreviousImage();

    }

}


/* =========================
   16. IMAGE PRELOADING
   ========================= */

images.forEach((image) => {

    const preloadImage = new Image();

    preloadImage.src = image.src;

});


/* =========================
   17. CONSOLE MESSAGE
   ========================= */

console.log(
    "LUMINA Image Gallery loaded successfully."
);


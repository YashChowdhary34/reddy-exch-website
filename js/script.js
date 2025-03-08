/* ----------age verification---------- */
function ageVerification() {
  const ageVerification = document.getElementById("age-verification");
  const verifyYes = document.getElementById("verify-yes");
  const verifyNo = document.getElementById("verify-no");

  // Show the overlay immediately when page loads
  ageVerification.classList.add("active");

  // If user confirms they are 18+
  verifyYes.addEventListener("click", function () {
    // Store confirmation in sessionStorage
    sessionStorage.setItem("ageVerified", "true");
    // Hide the overlay with animation
    ageVerification.classList.remove("active");
    ageVerification.classList.add("fade-out");

    // Remove from DOM after animation completes
    setTimeout(() => {
      ageVerification.style.display = "none";
    }, 600);
  });

  // If user is under 18
  verifyNo.addEventListener("click", function () {
    // Replace content with denial message
    document.querySelector(".age-verification-content").innerHTML = `
      <h2 class="verification-title error">Access Denied</h2>
      <p class="verification-message">
        We're sorry, but you must be 18 years or older to access this site.
      </p>
      <p class="verification-redirect">
        You will be redirected in <span id="countdown">5</span> seconds.
      </p>
    `;

    // Countdown for redirection
    let seconds = 5;
    const countdown = setInterval(() => {
      seconds--;
      document.getElementById("countdown").textContent = seconds;

      if (seconds <= 0) {
        clearInterval(countdown);
        // Redirect to an appropriate site (example: Google)
        window.location.href = "https://www.google.com";
      }
    }, 1000);
  });

  // Check if already verified in this session
  if (sessionStorage.getItem("ageVerified") === "true") {
    ageVerification.style.display = "none";
  }
}

// Set animation order for info groups
document.addEventListener("DOMContentLoaded", function () {
  // Set default to dark theme
  document.documentElement.classList.add("dark-theme");

  // Set animation order for form groups
  const infoGroups = document.querySelectorAll(".info-group");
  infoGroups.forEach((group, index) => {
    group.style.setProperty("--animation-order", index);
  });

  // Set animation order for form groups
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group, index) => {
    group.style.setProperty("--animation-order", index);
  });

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");

  themeToggle.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark-theme");

    // Update icons based on theme
    updateThemeIcons();
  });

  // Set initial icons based on theme
  updateThemeIcons();

  function updateThemeIcons() {
    const moonIcon = document.querySelector(".moon-icon");
    const sunIcon = document.querySelector(".sun-icon");

    if (document.documentElement.classList.contains("dark-theme")) {
      moonIcon.style.opacity = "0";
      sunIcon.style.opacity = "1";
    } else {
      moonIcon.style.opacity = "1";
      sunIcon.style.opacity = "0";
    }
  }

  // Update local time every second
  function updateLocalTime() {
    const localTimeElement = document.getElementById("localTime");
    if (localTimeElement) {
      localTimeElement.textContent = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }
  }

  updateLocalTime();
  setInterval(updateLocalTime, 1000);
});

/* hhh */
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.documentElement; // Use documentElement to apply theme to entire page

  // Check for saved theme preference or default to dark mode
  if (localStorage.getItem("theme") === "light") {
    body.classList.remove("dark-mode");
  } else {
    body.classList.add("dark-mode");
  }

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save theme preference
    const theme = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });

  // Interactive Booklet Navigation
  const pages = document.querySelectorAll(".booklet-page");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageEl = document.getElementById("current-page");
  const totalPagesEl = document.getElementById("total-pages");

  let currentPage = 1;
  const totalPages = pages.length;

  // Set total pages
  totalPagesEl.textContent = totalPages;

  function updatePage() {
    // Remove active class from all pages
    pages.forEach((page) => page.classList.remove("active"));

    // Add active class to current page
    const activePage = document.querySelector(
      `.booklet-page[data-page="${currentPage}"]`
    );
    activePage.classList.add("active");

    // Update page indicator
    currentPageEl.textContent = currentPage;

    // Disable/enable navigation buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  // Previous page button
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage();
    }
  });

  // Next page button
  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePage();
    }
  });

  // Initial page setup
  updatePage();
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");

  // Function to toggle theme
  function toggleTheme() {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode");

    // Update localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Update theme toggle button text
    updateThemeToggleButton(isDarkMode);
  }

  // Function to update theme toggle button
  function updateThemeToggleButton(isDarkMode) {
    themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");

  // Default to dark mode if no preference is saved
  if (savedTheme !== "light") {
    document.documentElement.classList.add("dark-mode");
    updateThemeToggleButton(true);
  }

  // Add click event listener to theme toggle
  themeToggle.addEventListener("click", toggleTheme);
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-navlink");
  const mobileThemeToggle = document.querySelector(".mobile-theme-toggle");
  const mobileAudioToggle = document.querySelector(".mobile-audio-toggle");

  // Theme and Audio toggles from main page
  const mainThemeToggle = document.querySelector(".theme-toggle");
  const mainAudioToggle = document.querySelector(".audio-toggle");

  // Hamburger Menu Toggle
  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");

    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileNavOverlay.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Close menu when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Mobile Theme Toggle
  mobileThemeToggle.addEventListener("click", () => {
    // Trigger main theme toggle functionality
    mainThemeToggle.click();
  });

  // Mobile Audio Toggle
  mobileAudioToggle.addEventListener("click", () => {
    // Trigger main audio toggle functionality
    mainAudioToggle.click();
  });

  // Close menu if clicked outside
  mobileNavOverlay.addEventListener("click", (event) => {
    if (event.target === mobileNavOverlay) {
      hamburgerMenu.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

function navbarActiveFeature() {
  document.querySelector(".navlink").addEventListener("click", () => {
    document.querySelector(".navlink").classList.add("navlink-active");
  });
}

/* calling functions after dom loading */

document.addEventListener("DOMContentLoaded", function () {
  ageVerification();
  navbarActiveFeature();
});

document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const bookletConfig = {
    totalPages: 12, // Total number of pages
    pagesPerSpread: 2, // Pages shown at once on desktop
    autoplay: false,
    autoplayInterval: 5000, // 5 seconds
    imageBasePath: "src/booklet/", // Path to your images folder
    imageExtension: "PNG", // Image file extension
    loop: true, // Whether to loop back to the beginning after reaching the end
    pageTransitionDelay: 800, // Delay between page transitions (ms)
    enablePageTurnEffect: true, // Enable page turn visual effect
  };

  // Elements
  const bookletPages = document.querySelector(".booklet-pages");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const currentPageEl = document.querySelector(".current-page");
  const totalPagesEl = document.querySelector(".total-pages");
  const progressBar = document.querySelector(".progress-bar");
  const pageTurnEffectLeft = document.querySelector(".page-turn-effect.left");
  const pageTurnEffectRight = document.querySelector(".page-turn-effect.right");
  const isMobile = window.innerWidth <= 768;

  // State
  let currentSpread = 0;
  let isAnimating = false;
  let autoplayTimer = null;
  let totalSpreads = Math.ceil(
    bookletConfig.totalPages / (isMobile ? 1 : bookletConfig.pagesPerSpread)
  );

  // Initialize the booklet
  function initBooklet() {
    // Calculate how many spreads we need based on screen size
    updateTotalSpreads();

    // Set total pages in the indicator
    totalPagesEl.textContent = bookletConfig.totalPages;
    currentPageEl.textContent = "1";

    // Create page spreads
    createPageSpreads();

    // Set active spread
    updateActiveSpread(true);

    // Start autoplay if enabled
    if (bookletConfig.autoplay) {
      startAutoplay();
    }

    // Event listeners
    setupEventListeners();

    // Add a slight delay to initialize animations properly
    setTimeout(() => {
      document.querySelectorAll(".booklet-page-spread").forEach((spread) => {
        spread.style.transition = `transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.7s ease`;
      });
    }, 100);
  }

  // Update the total number of spreads based on screen size
  function updateTotalSpreads() {
    const pagesPerSpread =
      window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;
    totalSpreads = Math.ceil(bookletConfig.totalPages / pagesPerSpread);
  }

  // Create page spreads based on configuration
  function createPageSpreads() {
    // Clear existing content
    bookletPages.innerHTML = "";

    const pagesPerSpread =
      window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;

    for (let i = 0; i < totalSpreads; i++) {
      const pageSpread = document.createElement("div");
      pageSpread.className = "booklet-page-spread";
      pageSpread.dataset.index = i;

      // For mobile: show 1 page per spread
      // For desktop: show 2 pages per spread
      for (let j = 0; j < pagesPerSpread; j++) {
        const pageNum = i * pagesPerSpread + j + 1;

        // Skip if we've reached more than the total available pages
        if (pageNum > bookletConfig.totalPages) {
          continue;
        }

        const pageClass = j === 0 ? "left" : "right";
        const page = document.createElement("div");
        page.className = `booklet-page ${pageClass}`;

        const img = document.createElement("img");
        img.src = `${bookletConfig.imageBasePath}page-${pageNum}.${bookletConfig.imageExtension}`;
        img.alt = `Page ${pageNum}`;
        img.loading = "lazy";
        img.dataset.pageNum = pageNum;

        page.appendChild(img);
        pageSpread.appendChild(page);
      }

      // Add spread to the booklet
      bookletPages.appendChild(pageSpread);
    }
  }

  // Update active spread
  function updateActiveSpread(skipAnimation = false) {
    const allSpreads = document.querySelectorAll(".booklet-page-spread");
    const pagesPerSpread =
      window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;

    allSpreads.forEach((spread, index) => {
      if (index === currentSpread) {
        spread.classList.add("active");
        spread.classList.remove("prev", "next");
      } else if (index < currentSpread) {
        spread.classList.add("prev");
        spread.classList.remove("active", "next");
      } else {
        spread.classList.add("next");
        spread.classList.remove("active", "prev");
      }
    });

    // Update the page indicator - show the actual page number, not spread number
    const currentPageNumber = currentSpread * pagesPerSpread + 1;
    currentPageEl.textContent = Math.min(
      currentPageNumber,
      bookletConfig.totalPages
    );

    // Update progress bar
    const progress = (currentSpread / (totalSpreads - 1)) * 100;
    progressBar.style.width = `${progress}%`;

    // Update button states
    updateButtonStates();
  }

  // Navigate to previous spread
  function goToPrevSpread() {
    if (isAnimating) return;

    isAnimating = true;

    if (currentSpread <= 0) {
      if (bookletConfig.loop) {
        currentSpread = totalSpreads - 1;
      } else {
        isAnimating = false;
        return;
      }
    } else {
      currentSpread--;
    }

    if (bookletConfig.enablePageTurnEffect) {
      animatePageTurn("left");
    }

    updateActiveSpread();

    setTimeout(() => {
      isAnimating = false;
    }, bookletConfig.pageTransitionDelay);
  }

  // Navigate to next spread
  function goToNextSpread() {
    if (isAnimating) return;

    isAnimating = true;

    if (currentSpread >= totalSpreads - 1) {
      if (bookletConfig.loop) {
        currentSpread = 0;
      } else {
        isAnimating = false;
        return;
      }
    } else {
      currentSpread++;
    }

    if (bookletConfig.enablePageTurnEffect) {
      animatePageTurn("right");
    }

    updateActiveSpread();

    setTimeout(() => {
      isAnimating = false;
    }, bookletConfig.pageTransitionDelay);
  }

  // Animate page turning effect
  function animatePageTurn(direction) {
    const effect =
      direction === "left" ? pageTurnEffectRight : pageTurnEffectLeft;
    effect.classList.add("active");

    setTimeout(() => {
      effect.classList.remove("active");
    }, 600);
  }

  // Update button states based on current position
  function updateButtonStates() {
    if (!bookletConfig.loop) {
      prevBtn.classList.toggle("disabled", currentSpread <= 0);
      nextBtn.classList.toggle("disabled", currentSpread >= totalSpreads - 1);
    } else {
      prevBtn.classList.remove("disabled");
      nextBtn.classList.remove("disabled");
    }
  }

  // Start autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToNextSpread();
    }, bookletConfig.autoplayInterval);
  }

  // Stop autoplay
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener("click", function () {
      stopAutoplay();
      goToPrevSpread();
    });

    nextBtn.addEventListener("click", function () {
      stopAutoplay();
      goToNextSpread();
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        stopAutoplay();
        goToPrevSpread();
      } else if (e.key === "ArrowRight") {
        stopAutoplay();
        goToNextSpread();
      }
    });

    // Touch navigation
    let touchStartX = 0;
    let touchEndX = 0;

    bookletPages.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    bookletPages.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      stopAutoplay();
      const swipeThreshold = 50;

      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next spread
        goToNextSpread();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous spread
        goToPrevSpread();
      }
    }

    // Pause autoplay on hover
    bookletPages.addEventListener("mouseenter", function () {
      if (bookletConfig.autoplay) {
        stopAutoplay();
      }
    });

    // Resume autoplay on mouse leave
    bookletPages.addEventListener("mouseleave", function () {
      if (bookletConfig.autoplay) {
        startAutoplay();
      }
    });

    // Handle window resize
    window.addEventListener(
      "resize",
      debounce(function () {
        const wasMobile =
          totalSpreads !==
          Math.ceil(
            bookletConfig.totalPages /
              (window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread)
          );

        // Only rebuild if we're switching between mobile and desktop modes
        if (wasMobile) {
          updateTotalSpreads();
          // Adjust currentSpread to maintain approximately the same page position
          const pagesPerSpread =
            window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;
          const oldPagesPerSpread =
            window.innerWidth <= 768 ? bookletConfig.pagesPerSpread : 1;
          const currentPage = currentSpread * oldPagesPerSpread + 1;
          currentSpread = Math.floor((currentPage - 1) / pagesPerSpread);

          createPageSpreads();
          updateActiveSpread(true);
        }
      }, 250)
    );

    // For demonstration purposes, provide a fallback for missing images
    document.querySelectorAll(".booklet-page img").forEach((img) => {
      img.onerror = function () {
        this.src =
          'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="713" viewBox="0 0 500 713"%3E%3Crect fill="%23f0f0f0" width="500" height="713"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage %23' +
          this.dataset.pageNum +
          "%3C/text%3E%3C/svg%3E";
      };
    });
  }

  // Debounce function to limit how often a function can be called
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize the booklet
  initBooklet();
});

document.addEventListener("DOMContentLoaded", function () {
  // Get carousel elements
  const track = document.querySelector(".carousel-track");
  const items = Array.from(document.querySelectorAll(".carousel-item"));
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  // Create dots based on the number of items
  items.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(document.querySelectorAll(".carousel-dot"));

  // Set up event listeners
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // Add touch support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + threshold) {
      prevSlide();
    }
  }

  // Navigation functions
  function updateCarousel() {
    // Update items
    items.forEach((item, index) => {
      item.classList.remove("active", "next", "prev");
      if (index === currentIndex) {
        item.classList.add("active");
      } else if (index === (currentIndex + 1) % items.length) {
        item.classList.add("next");
      } else if (index === (currentIndex - 1 + items.length) % items.length) {
        item.classList.add("prev");
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Automatic slideshow
  const slideInterval = setInterval(nextSlide, 5000);

  // Pause slideshow on hover
  track.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  // Set up modal for video playback
  const playButtons = document.querySelectorAll(".play-button");

  playButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // In a real implementation, this would open a modal with the YouTube embed
      // For this example, we'll just log which video would be played
      console.log(`Opening video ${index + 1}`);
      alert(`This would open YouTube video ${index + 1} in a modal`);
    });
  });

  // Initial setup
  updateCarousel();
});

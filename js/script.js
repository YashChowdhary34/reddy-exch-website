document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initThemeToggle();
  initMobileNavigation();
  initAgeVerification();
  initNavbarActiveState();
  initBooklet();
  initCarousel();
  initTimeUpdater();
});

// Age Verification
function initAgeVerification() {
  const ageVerification = document.getElementById("age-verification");
  const verifyYes = document.getElementById("verify-yes");
  const verifyNo = document.getElementById("verify-no");

  // Check if already verified in this session
  if (sessionStorage.getItem("ageVerified") === "true") {
    ageVerification.style.display = "none";
    return;
  }

  // Show the overlay when page loads
  ageVerification.classList.add("active");

  // User confirms they are 18+
  verifyYes.addEventListener("click", function () {
    sessionStorage.setItem("ageVerified", "true");
    ageVerification.classList.remove("active");
    ageVerification.classList.add("fade-out");

    setTimeout(() => {
      ageVerification.style.display = "none";
    }, 600);
  });

  // User is under 18
  verifyNo.addEventListener("click", function () {
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
        window.location.href = "https://www.google.com";
      }
    }, 1000);
  });
}

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const mobileThemeToggle = document.querySelector(".mobile-theme-toggle");

  // Check for saved theme preference or default to dark mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.documentElement.classList.remove("dark-mode");
  } else {
    document.documentElement.classList.add("dark-mode");
  }

  // Update theme toggle button text
  function updateThemeToggleButton() {
    const isDarkMode = document.documentElement.classList.contains("dark-mode");
    themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

    // Update icons if they exist
    const moonIcon = document.querySelector(".moon-icon");
    const sunIcon = document.querySelector(".sun-icon");

    if (moonIcon && sunIcon) {
      moonIcon.style.opacity = isDarkMode ? "0" : "1";
      sunIcon.style.opacity = isDarkMode ? "1" : "0";
    }
  }

  // Function to toggle theme
  function toggleTheme() {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateThemeToggleButton();
  }

  // Initialize theme button state
  updateThemeToggleButton();

  // Add click event listeners
  themeToggle.addEventListener("click", toggleTheme);
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme);
  }
}

// Mobile Navigation
function initMobileNavigation() {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-navlink");
  const mobileAudioToggle = document.querySelector(".mobile-audio-toggle");
  const mainAudioToggle = document.querySelector(".audio-toggle");

  // Skip if mobile navigation doesn't exist
  if (!hamburgerMenu || !mobileNavOverlay) return;

  // Hamburger Menu Toggle
  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
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

  // Mobile Audio Toggle
  if (mobileAudioToggle && mainAudioToggle) {
    mobileAudioToggle.addEventListener("click", () => {
      mainAudioToggle.click();
    });
  }

  // Close menu if clicked outside
  mobileNavOverlay.addEventListener("click", (event) => {
    if (event.target === mobileNavOverlay) {
      hamburgerMenu.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Navigation Active State
function initNavbarActiveState() {
  const navLinks = document.querySelectorAll(".navlink, .mobile-navlink");

  // Function to set active link based on the current hash
  function setActiveLink() {
    // Remove active class from all links
    navLinks.forEach((link) => {
      link.classList.remove("navlink-active");
    });

    // Get current hash (or default to #about if none)
    const currentHash = window.location.hash || "#about";

    // Add active class to links that match the current hash
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("navlink-active");
      }
    });
  }

  // Add click event listeners to all nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("navlink-active"));

      // Add active class to clicked link
      this.classList.add("navlink-active");

      // If it's a mobile link, close the mobile menu
      if (this.classList.contains("mobile-navlink")) {
        const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
        const hamburgerMenu = document.querySelector(".hamburger-menu");

        if (mobileNavOverlay && hamburgerMenu) {
          mobileNavOverlay.classList.remove("active");
          hamburgerMenu.classList.remove("active");
        }
      }
    });
  });

  // Highlight the correct link on page load
  setActiveLink();

  // Handle hash changes (when user navigates with browser back/forward buttons)
  window.addEventListener("hashchange", setActiveLink);

  // Scroll spy functionality
  window.addEventListener(
    "scroll",
    debounce(function () {
      const scrollPosition = window.scrollY;

      // Check each section to see which one is currently in view
      document.querySelectorAll("section[id]").forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Offset for header height
        const sectionHeight = section.offsetHeight;
        const sectionId = "#" + section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          // Remove active class from all links
          navLinks.forEach((link) => {
            link.classList.remove("navlink-active");
          });

          // Add active class to corresponding links
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === sectionId) {
              link.classList.add("navlink-active");
            }
          });
        }
      });
    }, 100)
  );
}

// Update local time every second
function initTimeUpdater() {
  const localTimeElement = document.getElementById("localTime");
  if (!localTimeElement) return;

  function updateLocalTime() {
    localTimeElement.textContent = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  updateLocalTime();
  setInterval(updateLocalTime, 1000);
}

// Interactive Booklet
function initBooklet() {
  // Get booklet elements
  const bookletPages = document.querySelector(".booklet-pages");
  if (!bookletPages) return;

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const currentPageEl = document.querySelector(".current-page");
  const totalPagesEl = document.querySelector(".total-pages");
  const progressBar = document.querySelector(".progress-bar");
  const pageTurnEffectLeft = document.querySelector(".page-turn-effect.left");
  const pageTurnEffectRight = document.querySelector(".page-turn-effect.right");

  // Configuration
  const bookletConfig = {
    totalPages: 12,
    pagesPerSpread: 2,
    autoplay: false,
    autoplayInterval: 5000,
    imageBasePath: "src/booklet/",
    imageExtension: "PNG",
    loop: true,
    pageTransitionDelay: 800,
    enablePageTurnEffect: true,
  };

  // State
  let currentSpread = 0;
  let isAnimating = false;
  let autoplayTimer = null;
  let totalSpreads = Math.ceil(
    bookletConfig.totalPages /
      (window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread)
  );

  // Initialize the booklet
  function init() {
    updateTotalSpreads();

    // Set total pages in the indicator
    if (totalPagesEl) totalPagesEl.textContent = bookletConfig.totalPages;
    if (currentPageEl) currentPageEl.textContent = "1";

    // Create page spreads
    createPageSpreads();

    // Set active spread
    updateActiveSpread(true);

    // Start autoplay if enabled
    if (bookletConfig.autoplay) {
      startAutoplay();
    }

    // Setup event listeners
    setupEventListeners();

    // Add transition after initial render
    setTimeout(() => {
      document.querySelectorAll(".booklet-page-spread").forEach((spread) => {
        spread.style.transition = `transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.7s ease`;
      });
    }, 100);
  }

  // Update total spreads based on screen size
  function updateTotalSpreads() {
    const pagesPerSpread =
      window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;
    totalSpreads = Math.ceil(bookletConfig.totalPages / pagesPerSpread);
  }

  // Create page spreads
  function createPageSpreads() {
    bookletPages.innerHTML = "";
    const pagesPerSpread =
      window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;

    for (let i = 0; i < totalSpreads; i++) {
      const pageSpread = document.createElement("div");
      pageSpread.className = "booklet-page-spread";
      pageSpread.dataset.index = i;

      for (let j = 0; j < pagesPerSpread; j++) {
        const pageNum = i * pagesPerSpread + j + 1;

        if (pageNum > bookletConfig.totalPages) continue;

        const pageClass = j === 0 ? "left" : "right";
        const page = document.createElement("div");
        page.className = `booklet-page ${pageClass}`;

        const img = document.createElement("img");
        img.src = `${bookletConfig.imageBasePath}page-${pageNum}.${bookletConfig.imageExtension}`;
        img.alt = `Page ${pageNum}`;
        img.loading = "lazy";
        img.dataset.pageNum = pageNum;

        // Fallback for missing images
        img.onerror = function () {
          this.src =
            'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="713" viewBox="0 0 500 713"%3E%3Crect fill="%23f0f0f0" width="500" height="713"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage %23' +
            this.dataset.pageNum +
            "%3C/text%3E%3C/svg%3E";
        };

        page.appendChild(img);
        pageSpread.appendChild(page);
      }

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

    // Update page indicator
    if (currentPageEl) {
      const currentPageNumber = currentSpread * pagesPerSpread + 1;
      currentPageEl.textContent = Math.min(
        currentPageNumber,
        bookletConfig.totalPages
      );
    }

    // Update progress bar
    if (progressBar) {
      const progress = (currentSpread / (totalSpreads - 1)) * 100;
      progressBar.style.width = `${progress}%`;
    }

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

    if (bookletConfig.enablePageTurnEffect && pageTurnEffectRight) {
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

    if (bookletConfig.enablePageTurnEffect && pageTurnEffectLeft) {
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

  // Update button states
  function updateButtonStates() {
    if (!prevBtn || !nextBtn) return;

    if (!bookletConfig.loop) {
      prevBtn.classList.toggle("disabled", currentSpread <= 0);
      nextBtn.classList.toggle("disabled", currentSpread >= totalSpreads - 1);
    } else {
      prevBtn.classList.remove("disabled");
      nextBtn.classList.remove("disabled");
    }
  }

  // Autoplay controls
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(goToNextSpread, bookletConfig.autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    // Navigation buttons
    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        stopAutoplay();
        goToPrevSpread();
      });

    if (nextBtn)
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

        stopAutoplay();
        const swipeThreshold = 50;

        if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe left, go to next spread
          goToNextSpread();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe right, go to previous spread
          goToPrevSpread();
        }
      },
      { passive: true }
    );

    // Pause/resume autoplay on hover
    if (bookletConfig.autoplay) {
      bookletPages.addEventListener("mouseenter", stopAutoplay);
      bookletPages.addEventListener("mouseleave", startAutoplay);
    }

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

        // Only rebuild if switching between mobile and desktop modes
        if (wasMobile) {
          updateTotalSpreads();

          // Adjust currentSpread to maintain page position
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
  }

  // Start initialization
  init();
}

// Carousel functionality
function initCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const items = Array.from(document.querySelectorAll(".carousel-item"));
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  let slideInterval;

  // Create dots based on number of items
  if (dotsContainer) {
    items.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      if (index === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = Array.from(document.querySelectorAll(".carousel-dot"));

  // Set up event listeners
  if (nextButton) nextButton.addEventListener("click", nextSlide);
  if (prevButton) prevButton.addEventListener("click", prevSlide);

  // Add touch support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;

      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide();
      }
    },
    { passive: true }
  );

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
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Pause slideshow on hover
  track.addEventListener("mouseenter", stopSlideshow);
  track.addEventListener("mouseleave", startSlideshow);

  // Set up video play buttons if they exist
  const playButtons = document.querySelectorAll(".play-button");
  playButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log(`Opening video ${index + 1}`);
      // Implementation for video modal would go here
    });
  });

  // Initial setup
  updateCarousel();
  startSlideshow();
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

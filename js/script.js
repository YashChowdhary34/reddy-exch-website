document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initMobileNavigation();
  initAgeVerification();
  initNavbarActiveState();
  initBooklet();
  initCarousel();
  initTimeUpdater();

  // Toggle "active" state for all theme/audio buttons
  document
    .querySelectorAll(
      ".theme-toggle, .audio-toggle, .mobile-theme-toggle, .mobile-audio-toggle"
    )
    .forEach((button) => {
      button.addEventListener("click", () =>
        button.classList.toggle("navbar-button-active")
      );
    });
});

function initAgeVerification() {
  const ageVerification = document.getElementById("age-verification");
  const verifyYes = document.getElementById("verify-yes");
  const verifyNo = document.getElementById("verify-no");

  if (sessionStorage.getItem("ageVerified") === "true") {
    ageVerification.style.display = "none";
    return;
  }

  ageVerification.classList.add("active");

  verifyYes.addEventListener("click", function () {
    sessionStorage.setItem("ageVerified", "true");
    ageVerification.classList.remove("active");
    ageVerification.classList.add("fade-out");
    setTimeout(() => (ageVerification.style.display = "none"), 600);
  });

  verifyNo.addEventListener("click", function () {
    document.querySelector(".age-verification-content").innerHTML = `
      <h2 class="verification-title error">Access Denied</h2>
      <p class="verification-message">We're sorry, but you must be 18 years or older to access this site.</p>
      <p class="verification-redirect">You will be redirected in <span id="countdown">5</span> seconds.</p>
    `;
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

function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const mobileThemeToggle = document.querySelector(".mobile-theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.documentElement.classList.remove("dark-mode");
  } else {
    document.documentElement.classList.add("dark-mode");
  }

  function updateThemeToggleButton() {
    const isDarkMode = document.documentElement.classList.contains("dark-mode");
    themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    const moonIcon = document.querySelector(".moon-icon");
    const sunIcon = document.querySelector(".sun-icon");
    if (moonIcon && sunIcon) {
      moonIcon.style.opacity = isDarkMode ? "0" : "1";
      sunIcon.style.opacity = isDarkMode ? "1" : "0";
    }
  }

  function toggleTheme() {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateThemeToggleButton();
  }

  updateThemeToggleButton();
  themeToggle.addEventListener("click", toggleTheme);
  if (mobileThemeToggle)
    mobileThemeToggle.addEventListener("click", toggleTheme);
}

function initMobileNavigation() {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-navlink");
  const mobileAudioToggle = document.querySelector(".mobile-audio-toggle");
  const mainAudioToggle = document.querySelector(".audio-toggle");

  if (!hamburgerMenu || !mobileNavOverlay) return;

  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
    document.body.style.overflow = mobileNavOverlay.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  if (mobileAudioToggle && mainAudioToggle) {
    mobileAudioToggle.addEventListener("click", () => mainAudioToggle.click());
  }

  mobileNavOverlay.addEventListener("click", (event) => {
    if (event.target === mobileNavOverlay) {
      hamburgerMenu.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

function initNavbarActiveState() {
  const navLinks = document.querySelectorAll(".navlink, .mobile-navlink");

  function setActiveLink() {
    navLinks.forEach((link) => link.classList.remove("navlink-active"));
    const currentHash = window.location.hash || "#about";
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("navlink-active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("navlink-active"));
      this.classList.add("navlink-active");
      if (this.classList.contains("mobile-navlink")) {
        document
          .querySelector(".mobile-nav-overlay")
          ?.classList.remove("active");
        document.querySelector(".hamburger-menu")?.classList.remove("active");
      }
    });
  });

  setActiveLink();
  window.addEventListener("hashchange", setActiveLink);
  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrollPosition = window.scrollY;
      document.querySelectorAll("section[id]").forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = "#" + section.getAttribute("id");
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          navLinks.forEach((link) => link.classList.remove("navlink-active"));
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

function initBooklet() {
  const bookletPages = document.querySelector(".booklet-pages");
  if (!bookletPages) return;
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const currentPageEl = document.querySelector(".current-page");
  const totalPagesEl = document.querySelector(".total-pages");
  const progressBar = document.querySelector(".progress-bar");
  const pageTurnEffectLeft = document.querySelector(".page-turn-effect.left");
  const pageTurnEffectRight = document.querySelector(".page-turn-effect.right");

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

  let currentSpread = 0;
  let isAnimating = false;
  let autoplayTimer = null;
  let totalSpreads = Math.ceil(
    bookletConfig.totalPages /
      (window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread)
  );

  function init() {
    updateTotalSpreads();
    if (totalPagesEl) totalPagesEl.textContent = bookletConfig.totalPages;
    if (currentPageEl) currentPageEl.textContent = "1";
    createPageSpreads();
    updateActiveSpread(true);
    if (bookletConfig.autoplay) startAutoplay();
    setupEventListeners();
    setTimeout(() => {
      document.querySelectorAll(".booklet-page-spread").forEach((spread) => {
        spread.style.transition = `transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.7s ease`;
      });
    }, 100);
  }

  function updateTotalSpreads() {
    const pagesPerSpread =
      window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;
    totalSpreads = Math.ceil(bookletConfig.totalPages / pagesPerSpread);
  }

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
        const page = document.createElement("div");
        page.className = `booklet-page ${j === 0 ? "left" : "right"}`;
        const img = document.createElement("img");
        img.src = `${bookletConfig.imageBasePath}page-${pageNum}.${bookletConfig.imageExtension}`;
        img.alt = `Page ${pageNum}`;
        img.loading = "lazy";
        img.dataset.pageNum = pageNum;
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
    if (currentPageEl) {
      const currentPageNumber = currentSpread * pagesPerSpread + 1;
      currentPageEl.textContent = Math.min(
        currentPageNumber,
        bookletConfig.totalPages
      );
    }
    if (progressBar) {
      const progress = (currentSpread / (totalSpreads - 1)) * 100;
      progressBar.style.width = `${progress}%`;
    }
    updateButtonStates();
  }

  function goToPrevSpread() {
    if (isAnimating) return;
    isAnimating = true;
    currentSpread =
      currentSpread <= 0
        ? bookletConfig.loop
          ? totalSpreads - 1
          : 0
        : currentSpread - 1;
    if (bookletConfig.enablePageTurnEffect && pageTurnEffectRight) {
      animatePageTurn("left");
    }
    updateActiveSpread();
    setTimeout(() => (isAnimating = false), bookletConfig.pageTransitionDelay);
  }

  function goToNextSpread() {
    if (isAnimating) return;
    isAnimating = true;
    currentSpread =
      currentSpread >= totalSpreads - 1
        ? bookletConfig.loop
          ? 0
          : totalSpreads - 1
        : currentSpread + 1;
    if (bookletConfig.enablePageTurnEffect && pageTurnEffectLeft) {
      animatePageTurn("right");
    }
    updateActiveSpread();
    setTimeout(() => (isAnimating = false), bookletConfig.pageTransitionDelay);
  }

  function animatePageTurn(direction) {
    const effect =
      direction === "left" ? pageTurnEffectRight : pageTurnEffectLeft;
    effect.classList.add("active");
    setTimeout(() => effect.classList.remove("active"), 600);
  }

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

  function setupEventListeners() {
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        stopAutoplay();
        goToPrevSpread();
      });
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        stopAutoplay();
        goToNextSpread();
      });
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        stopAutoplay();
        goToPrevSpread();
      } else if (e.key === "ArrowRight") {
        stopAutoplay();
        goToNextSpread();
      }
    });
    let touchStartX = 0,
      touchEndX = 0;
    bookletPages.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    bookletPages.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        stopAutoplay();
        if (touchEndX < touchStartX - swipeThreshold) goToNextSpread();
        else if (touchEndX > touchStartX + swipeThreshold) goToPrevSpread();
      },
      { passive: true }
    );
    if (bookletConfig.autoplay) {
      bookletPages.addEventListener("mouseenter", stopAutoplay);
      bookletPages.addEventListener("mouseleave", startAutoplay);
    }
    window.addEventListener(
      "resize",
      debounce(() => {
        const pagesPerSpread =
          window.innerWidth <= 768 ? 1 : bookletConfig.pagesPerSpread;
        const oldPagesPerSpread =
          window.innerWidth <= 768 ? bookletConfig.pagesPerSpread : 1;
        const currentPage = currentSpread * oldPagesPerSpread + 1;
        currentSpread = Math.floor((currentPage - 1) / pagesPerSpread);
        updateTotalSpreads();
        createPageSpreads();
        updateActiveSpread(true);
      }, 250)
    );
  }

  init();
}

function initCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;
  const items = Array.from(document.querySelectorAll(".carousel-item"));
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  const dotsContainer = document.querySelector(".carousel-dots");
  let currentIndex = 0,
    slideInterval;

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
  if (nextButton) nextButton.addEventListener("click", nextSlide);
  if (prevButton) prevButton.addEventListener("click", prevSlide);

  let touchStartX = 0,
    touchEndX = 0;
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
      if (touchEndX < touchStartX - threshold) nextSlide();
      else if (touchEndX > touchStartX + threshold) prevSlide();
    },
    { passive: true }
  );

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.remove("active", "next", "prev");
      if (index === currentIndex) item.classList.add("active");
      else if (index === (currentIndex + 1) % items.length)
        item.classList.add("next");
      else if (index === (currentIndex - 1 + items.length) % items.length)
        item.classList.add("prev");
    });
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

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  track.addEventListener("mouseenter", stopSlideshow);
  track.addEventListener("mouseleave", startSlideshow);

  document.querySelectorAll(".play-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Video modal functionality placeholder
    });
  });

  updateCarousel();
  startSlideshow();
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

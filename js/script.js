/* ----------age verification---------- */
document.addEventListener("DOMContentLoaded", function () {
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
});

/* ----------navlink active functionality---------- */
function acitveNavbarOnScroll() {
  const activeSection = document.querySelectorAll("");
  const navlinks = document.querySelectorAll(".");
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

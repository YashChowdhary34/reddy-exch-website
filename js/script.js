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

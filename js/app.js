// js/app.js
document.addEventListener("DOMContentLoaded", () => {
  const API_URL    = "http://127.0.0.1:8000/waitlist";
  const form       = document.getElementById("waitlist-form");
  const emailInput = document.getElementById("email");
  const feedback   = document.getElementById("feedback");
  const submitBtn  = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";

    const email = emailInput.value.trim();
    if (!email) {
      feedback.textContent = "Please enter your email.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = "That doesn’t look like a valid email.";
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = "Submitting…";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      feedback.textContent = "Thanks for signing up! 🎉";
      emailInput.value     = "";
    } catch (error) {
      console.error("Error submitting form:", error);
      feedback.textContent = "Oops! Something went wrong. Please try again.";
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = "Join the Waitlist";
    }
  });
});

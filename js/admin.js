// js/admin.js
document.addEventListener("DOMContentLoaded", () => {
    const API_URL   = "http://127.0.0.1:8000/waitlist";
    const tbody     = document.querySelector("#waitlist-table tbody");
    const feedback  = document.getElementById("admin-feedback");
  
    async function loadWaitlist() {
      feedback.textContent = "";
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (data.length === 0) {
          feedback.textContent = "No sign-ups yet.";
          return;
        }
        data.forEach(item => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.email}</td>
            <td>${new Date(item.created_at).toLocaleString()}</td>
          `;
          tbody.appendChild(tr);
        });
      } catch (err) {
        console.error("Error loading waitlist:", err);
        feedback.textContent = "Failed to load waitlist. Please try again.";
      }
    }
  
    loadWaitlist();
  });
  
const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");
const message = document.getElementById("newsletter-message");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "";
  message.className = "help";
  button.classList.add("is-loading");
  button.disabled = true;

  try {
    const res = await fetch(
      "https://us-central1-dipnotapp.cloudfunctions.net/subscribeNewsletter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Bir hata oluştu");
    }

    message.textContent = data.message;
    message.classList.add("is-success");
    emailInput.value = "";
  } catch (err) {
    message.textContent = err.message;
    message.classList.add("is-danger");
  } finally {
    button.classList.remove("is-loading");
    button.disabled = false;
  }
});

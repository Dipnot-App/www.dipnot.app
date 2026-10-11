// IIFE — see contact.js for the full reasoning. Plain <script> tags
// share one global scope, so top-level `const`s here would collide
// with any other script that declares the same names.
(() => {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const message = document.getElementById("newsletter-message");
  const button = form.querySelector("button");

  // Turkish copy for everything the browser would otherwise word itself:
  // the form is `novalidate`, so native (browser-language) tooltips never
  // show, and network failures never surface "Failed to fetch".
  const MSG = {
    empty: "Lütfen e-posta adresini yaz.",
    invalid: "Geçerli bir e-posta adresi yaz (ör. ad@ornek.com).",
    offline: "Şu an bağlantı kurulamadı. Lütfen biraz sonra tekrar dene.",
  };

  const show = (text, kind) => {
    message.textContent = text;
    message.className = kind ? `help is-${kind}` : "help";
  };

  const invalid = (text) => {
    emailInput.setAttribute("aria-invalid", "true");
    show(text, "danger");
    emailInput.focus();
  };

  emailInput.addEventListener("input", () => {
    if (emailInput.getAttribute("aria-invalid") === "true") {
      emailInput.removeAttribute("aria-invalid");
      show("");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!emailInput.value.trim()) return invalid(MSG.empty);
    if (!emailInput.checkValidity()) return invalid(MSG.invalid);

    show("");
    button.classList.add("is-loading");
    button.disabled = true;

    try {
      const res = await fetch(
        "https://europe-west1-dipnotapp.cloudfunctions.net/subscribeNewsletter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailInput.value.trim(),
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // Server messages are already Turkish; show them as-is
        const fail = new Error(data.error || MSG.offline);
        fail.fromServer = true;
        throw fail;
      }

      show(data.message, "success");
      emailInput.value = "";
    } catch (err) {
      show(err.fromServer ? err.message : MSG.offline, "danger");
    } finally {
      button.classList.remove("is-loading");
      button.disabled = false;
    }
  });
})();

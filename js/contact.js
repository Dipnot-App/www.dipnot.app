// IIFE — keeps local `const`s off the global scope so we don't
// collide with newsletter.js, which also declares `form` and `button`
// at top level. Plain <script> tags (not type="module") share one
// global scope, so a second top-level redeclaration would throw
// SyntaxError and stop the submit listener from attaching.
(() => {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");
  const button = form.querySelector("button[type=submit]");
  const OFFLINE = "Şu an bağlantı kurulamadı. Lütfen biraz sonra tekrar dene.";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    feedback.textContent = "";
    feedback.className = "help mt-3";
    button.classList.add("is-loading");
    button.disabled = true;

    try {
      const formData = new FormData(form);

      // Honeypot: if filled, pretend success and skip the network call.
      if (formData.get("website")) {
        feedback.textContent = "Mesajınız iletildi.";
        feedback.classList.add("is-success");
        form.reset();
        return;
      }

      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      const res = await fetch(
        "https://europe-west1-dipnotapp.cloudfunctions.net/submitContactForm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // Server messages are already Turkish; show them as-is
        const fail = new Error(data.error || OFFLINE);
        fail.fromServer = true;
        throw fail;
      }

      feedback.textContent = data.message || "Mesajınız iletildi.";
      feedback.classList.add("is-success");
      form.reset();
    } catch (err) {
      // Network/parse failures would otherwise surface "Failed to fetch"
      feedback.textContent = err.fromServer ? err.message : OFFLINE;
      feedback.classList.add("is-danger");
    } finally {
      button.classList.remove("is-loading");
      button.disabled = false;
    }
  });
})();

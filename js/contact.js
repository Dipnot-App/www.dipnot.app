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

  // The form is `novalidate`: these checks replace the browser's own
  // tooltips, which appear in the visitor's browser language. Checked in
  // page order; the first failure is shown and focused.
  const CHECKS = [
    ["contact-name", (el) => el.value.trim(), "Lütfen adını ve soyadını yaz."],
    ["contact-email", (el) => el.value.trim(), "Lütfen e-posta adresini yaz."],
    [
      "contact-email",
      (el) => el.checkValidity(),
      "Geçerli bir e-posta adresi yaz (ör. ad@ornek.com).",
    ],
    ["contact-message", (el) => el.value.trim(), "Lütfen mesajını yaz."],
    [
      "contact-terms",
      (el) => el.checked,
      "Göndermek için kullanım koşullarını ve gizlilik politikasını kabul etmelisin.",
    ],
  ];

  const clearInvalid = (el) => {
    if (el.getAttribute("aria-invalid") !== "true") return;
    el.removeAttribute("aria-invalid");
    if (!form.querySelector('[aria-invalid="true"]')) {
      feedback.textContent = "";
      feedback.className = "help mt-3";
    }
  };
  form.addEventListener("input", (e) => clearInvalid(e.target));
  form.addEventListener("change", (e) => clearInvalid(e.target));

  const validate = () => {
    for (const [id, ok, text] of CHECKS) {
      const el = document.getElementById(id);
      if (ok(el)) continue;
      el.setAttribute("aria-invalid", "true");
      feedback.textContent = text;
      feedback.className = "help mt-3 is-danger";
      el.focus();
      return false;
    }
    return true;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()) return;

    feedback.textContent = "";
    feedback.className = "help mt-3";
    button.classList.add("is-loading");
    button.disabled = true;

    try {
      const formData = new FormData(form);

      // Honeypot: if filled, pretend success and skip the network call.
      if (formData.get("website")) {
        feedback.textContent = "Mesajın iletildi.";
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

      feedback.textContent = data.message || "Mesajın iletildi.";
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

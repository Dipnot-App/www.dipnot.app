// /hesap-silme — account-deletion request form.
//
// Posts the account email (+ optional reason) to the public
// submitAccountDeletionRequest Cloud Function with an App Check token.
// This does NOT delete anything yet: the backend emails the owner a
// single-use confirm link (double opt-in). The success copy says so.
import { getAppCheckToken } from "./firebase-app-check.js";

const ENDPOINT =
  "https://europe-west1-dipnotapp.cloudfunctions.net/submitAccountDeletionRequest";

const form = document.getElementById("deletion-form");
const emailInput = document.getElementById("deletion-email");
const reasonInput = document.getElementById("deletion-reason");
const message = document.getElementById("deletion-message");
const button = form.querySelector("button[type=submit]");
const OFFLINE = "Şu an bağlantı kurulamadı. Lütfen biraz sonra tekrar deneyin.";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "";
  message.className = "help mt-3";
  button.classList.add("is-loading");
  button.disabled = true;

  try {
    const token = await getAppCheckToken();

    const payload = { email: emailInput.value };
    const reason = reasonInput.value.trim();
    if (reason) payload.reason = reason;

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // Server messages are already Turkish; show them as-is
      const fail = new Error(data.error || OFFLINE);
      fail.fromServer = true;
      throw fail;
    }

    message.textContent =
      data.message ||
      "Onay e-postası gönderildi. Hesabınızın silinmesi için e-postadaki bağlantıya tıklayın.";
    message.classList.add("is-success");
    form.reset();
  } catch (err) {
    // Network, parse and App Check failures would otherwise surface raw
    // (often English) error text
    message.textContent = err.fromServer ? err.message : OFFLINE;
    message.classList.add("is-danger");
  } finally {
    button.classList.remove("is-loading");
    button.disabled = false;
  }
});

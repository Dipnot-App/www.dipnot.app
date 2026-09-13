// /hesap-silme-onayi — confirm an account-deletion request.
//
// The email's confirm link carries `id` + `token` in the query string.
// This page POSTs them to confirmAccountDeletionRequest (with an App Check
// token) and shows the outcome in Turkish. On success the request flips
// from awaiting_confirmation to pending and the 30-day window starts.
import { getAppCheckToken } from "./firebase-app-check.js";

const ENDPOINT =
  "https://europe-west1-dipnotapp.cloudfunctions.net/confirmAccountDeletionRequest";

const statusBox = document.getElementById("confirm-status");
const spinner = document.getElementById("confirm-spinner");

function show(html, type) {
  spinner.classList.add("is-hidden");
  statusBox.className = `notification is-${type}`;
  statusBox.innerHTML = html;
  statusBox.classList.remove("is-hidden");
}

const INVALID_LINK =
  '<p class="title is-5">Bağlantı geçersiz</p>' +
  "<p>Bu onay bağlantısı eksik veya hatalı. Lütfen e-postanızdaki " +
  "bağlantıyı tam olarak kullanın ya da " +
  '<a href="/hesap-silme.html">silme talebini yeniden oluşturun</a>.</p>';

async function confirm() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const token = params.get("token");

  if (!id || !token) {
    show(INVALID_LINK, "warning");
    return;
  }

  try {
    const appCheckToken = await getAppCheckToken();

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckToken,
      },
      body: JSON.stringify({ id, token }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Expired / already-used / invalid token → actionable error.
      show(
        '<p class="title is-5">Onaylanamadı</p>' +
          "<p>" +
          (data.error || "Bu bağlantı geçersiz veya süresi dolmuş olabilir.") +
          " " +
          'Dilerseniz <a href="/hesap-silme.html">silme talebini yeniden ' +
          "oluşturabilirsiniz</a>.</p>",
        "warning",
      );
      return;
    }

    show(
      '<p class="title is-5">Talebiniz onaylandı</p>' +
        "<p>" +
        (data.message ||
          "Hesap silme talebiniz onaylandı. Hesabınız 30 gün içinde kalıcı " +
            "olarak silinecektir.") +
        "</p>",
      "success",
    );
  } catch (err) {
    show(
      '<p class="title is-5">Bir hata oluştu</p>' +
        "<p>" +
        (err.message || "Lütfen daha sonra tekrar deneyin.") +
        "</p>",
      "danger",
    );
  }
}

confirm();

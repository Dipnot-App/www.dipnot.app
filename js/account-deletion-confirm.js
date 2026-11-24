// /hesap-silme-onayi — confirm an account-deletion request.
//
// The email's confirm link carries `id` + `token` in the query string.
// This page POSTs them to confirmAccountDeletionRequest (with an App Check
// token) and shows the outcome in Turkish. On success the request flips
// from awaiting_confirmation to pending and the 30-day window starts.
//
// Messages are built from DOM nodes and every server string goes in via
// textContent, never innerHTML, so a reply that ever echoes input cannot
// run script on www (admin security sweep, 2026-11-23).
import { getAppCheckToken } from "./firebase-app-check.js";

const ENDPOINT =
  "https://europe-west1-dipnotapp.cloudfunctions.net/confirmAccountDeletionRequest";
const RESTART_URL = "/hesap-silme.html";

const statusBox = document.getElementById("confirm-status");
const spinner = document.getElementById("confirm-spinner");

// parts: strings (text) or { href, text } (links)
function para(...parts) {
  const p = document.createElement("p");
  for (const part of parts) {
    if (typeof part === "string") {
      p.append(part);
    } else {
      const a = document.createElement("a");
      a.href = part.href;
      a.textContent = part.text;
      p.append(a);
    }
  }
  return p;
}

function show(title, body, type) {
  spinner.classList.add("is-hidden");
  statusBox.className = `notification is-${type}`;
  const heading = document.createElement("p");
  heading.className = "title is-5";
  heading.textContent = title;
  statusBox.replaceChildren(heading, body);
  statusBox.classList.remove("is-hidden");
}

async function confirm() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const token = params.get("token");

  // Drop the secret from the address bar (history, copied links) once read.
  // GA never loads here (noAnalytics), this is defence in depth.
  if (params.has("id") || params.has("token")) {
    history.replaceState(null, "", window.location.pathname);
  }

  if (!id || !token) {
    show(
      "Bağlantı geçersiz",
      para(
        "Bu onay bağlantısı eksik veya hatalı. Lütfen e-postanızdaki " +
          "bağlantıyı tam olarak kullanın ya da ",
        { href: RESTART_URL, text: "silme talebini yeniden oluşturun" },
        ".",
      ),
      "warning",
    );
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
        "Onaylanamadı",
        para(
          (typeof data.error === "string" && data.error) ||
            "Bu bağlantı geçersiz veya süresi dolmuş olabilir.",
          " Dilerseniz ",
          {
            href: RESTART_URL,
            text: "silme talebini yeniden oluşturabilirsiniz",
          },
          ".",
        ),
        "warning",
      );
      return;
    }

    show(
      "Talebiniz onaylandı",
      para(
        (typeof data.message === "string" && data.message) ||
          // Privacy notice §5: closed at once, reopenable for 30 days
          "Hesabınız kapatıldı. 30 gün içinde uygulamaya giriş yaparak " +
            "hesabınızı geri açabilirsiniz; bu sürenin sonunda verileriniz " +
            "silinir veya anonim hale getirilir.",
      ),
      "success",
    );
  } catch {
    // Only network, parse and App Check failures land here (server errors
    // are handled above), and their raw text is often English, e.g.
    // "Failed to fetch"
    show(
      "Bir hata oluştu",
      para("Şu an bağlantı kurulamadı. Lütfen biraz sonra tekrar deneyin."),
      "danger",
    );
  }
}

confirm();

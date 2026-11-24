// /yarisma-aday-bilgilendirme — "copy the share text" button.
//
// The button ships `hidden` and only appears where the Clipboard API
// exists (secure context), so nobody gets a button that does nothing;
// the text itself stays selectable either way. Turkish-only page.
const button = document.querySelector("[data-copy]");
const status = document.querySelector("[data-copy-status]");
const source = button && document.getElementById(button.dataset.copy);

if (button && source && navigator.clipboard) {
  button.hidden = false;
  button.addEventListener("click", async () => {
    // The source <p> is wrapped by the template; collapse its whitespace
    const text = source.textContent.replace(/\s+/g, " ").trim();
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = "Metin kopyalandı.";
      status.className = "help is-success";
    } catch {
      status.textContent = "Kopyalanamadı. Metni seçip kendiniz kopyalayın.";
      status.className = "help is-danger";
    }
  });
}

// Brand book: click a color value to copy it. Module (pageModule), so
// its names stay local.
const flash = (btn) => {
  const original = btn.textContent;
  btn.textContent = btn.dataset.copied;
  btn.classList.add("is-copied");
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove("is-copied");
  }, 1200);
};

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn || !navigator.clipboard) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy);
    flash(btn);
  } catch {
    // Clipboard blocked (permissions/insecure context): the value is
    // still visible and selectable.
  }
});

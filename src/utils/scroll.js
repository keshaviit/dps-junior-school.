/**
 * Smoothly scrolls the window to an element by its HTML id.
 * @param {string} id - Element ID to scroll to (without '#').
 * @param {number} offset - Pixel offset from the top to account for floating headers (default 86px).
 */
export function scrollToElement(id, offset = 86) {
  if (!id) return;
  const cleanId = id.replace(/^#/, "");
  const el = document.getElementById(cleanId);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default scrollToElement;

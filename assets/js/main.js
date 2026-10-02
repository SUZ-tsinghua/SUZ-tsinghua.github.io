/* Theme: the stored choice wins, otherwise follow the OS preference */

const themeIcon = document.getElementById("theme-icon");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const setTheme = (dark) => {
  if (dark) {
    document.documentElement.dataset.theme = "dark";
  } else {
    delete document.documentElement.dataset.theme;
  }
  themeIcon.classList.toggle("fa-moon", dark);
  themeIcon.classList.toggle("fa-sun", !dark);
};

const storedTheme = localStorage.getItem("theme");
setTheme(storedTheme ? storedTheme === "dark" : prefersDark.matches);

prefersDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) setTheme(e.matches);
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  localStorage.setItem("theme", dark ? "dark" : "light");
  setTheme(dark);
});

/* Contact links: behind a button on narrow screens */

const contactButton = document.querySelector(".author__contact");
const contactLinks = document.querySelector(".author__urls");

contactButton.addEventListener("click", () => {
  const open = contactLinks.classList.toggle("is-open");
  contactButton.setAttribute("aria-expanded", open);
});

/* BibTeX: toggle the citation block and copy it to the clipboard */

document.addEventListener("click", async (e) => {
  const toggle = e.target.closest("[data-bibtex-toggle]");
  if (toggle) {
    const block = document.getElementById(toggle.dataset.bibtexToggle);
    block.hidden = !block.hidden;
    return;
  }

  const copy = e.target.closest("[data-bibtex-copy]");
  if (copy && !copy.classList.contains("is-copied")) {
    const block = document.getElementById(copy.dataset.bibtexCopy);
    await navigator.clipboard.writeText(block.querySelector(".bibtex-text").textContent);

    const label = copy.innerHTML;
    copy.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copy.classList.add("is-copied");
    setTimeout(() => {
      copy.innerHTML = label;
      copy.classList.remove("is-copied");
    }, 2000);
  }
});

// Width/height of an element's content box, i.e. without padding and border.
const contentSize = (el, axis) => {
  const style = getComputedStyle(el);
  const [start, end] = axis === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  return el.getBoundingClientRect()[axis]
    - parseFloat(style[`padding${start}`]) - parseFloat(style[`padding${end}`])
    - parseFloat(style[`border${start}Width`]) - parseFloat(style[`border${end}Width`]);
};

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

/* Greedy navigation: links that do not fit move into a dropdown */

const nav = document.getElementById("site-nav");
const navButton = nav.querySelector("button");
const visibleLinks = nav.querySelector(".visible-links");
const hiddenLinks = nav.querySelector(".hidden-links");
const themeToggle = visibleLinks.querySelector(".persist.tail");
const masthead = document.querySelector(".masthead");
const sidebar = document.querySelector(".sidebar");
const contactButton = document.querySelector(".author__urls-wrapper button");
const contactLinks = document.querySelector(".author__urls");
const footer = document.querySelector(".page__footer");

// Widths of the visible list at which each hidden link was moved out
const breaks = [];

const availableSpace = () => navButton.classList.contains("hidden")
  ? contentSize(nav, "width")
  : contentSize(nav, "width") - contentSize(navButton, "width") - 30;

const updateLayout = () => {
  let space = availableSpace();
  if (contentSize(visibleLinks, "width") > space) {
    let movable;
    while (contentSize(visibleLinks, "width") > space
        && (movable = visibleLinks.querySelectorAll(":scope > :not(.persist)")).length > 0) {
      breaks.push(contentSize(visibleLinks, "width"));
      hiddenLinks.prepend(movable[movable.length - 1]);
      space = availableSpace();
      navButton.classList.remove("hidden");
    }
  } else {
    while (breaks.length > 0 && space > breaks[breaks.length - 1]) {
      themeToggle.before(hiddenLinks.firstElementChild);
      breaks.pop();
    }
    if (breaks.length === 0) {
      navButton.classList.add("hidden");
      navButton.classList.remove("close");
      hiddenLinks.classList.add("hidden");
    }
  }

  // The masthead is fixed, so keep the content below it clear of it. The sidebar is
  // fixed too on wide screens, which is when the contact button is not displayed.
  const mastheadHeight = `${contentSize(masthead, "height")}px`;
  document.body.style.paddingTop = mastheadHeight;
  sidebar.style.paddingTop = contactButton.getClientRects().length > 0 ? "" : mastheadHeight;

  // The footer is absolutely positioned at the bottom of the page
  const footerStyle = getComputedStyle(footer);
  document.body.style.marginBottom = `${footer.getBoundingClientRect().height
    + parseFloat(footerStyle.marginTop) + parseFloat(footerStyle.marginBottom)}px`;
};

navButton.addEventListener("click", () => {
  hiddenLinks.classList.toggle("hidden");
  navButton.classList.toggle("close");
});

contactButton.addEventListener("click", () => contactLinks.classList.toggle("is-open"));

window.addEventListener("resize", updateLayout);
updateLayout();
// Web fonts arrive after the first layout and change the width of the links and the height of the masthead
document.fonts.ready.then(updateLayout);

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

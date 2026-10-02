# suz-tsinghua.github.io

Source of [suz-tsinghua.github.io](https://suz-tsinghua.github.io), Zhi Su's personal site. Built with
[Jekyll](https://jekyllrb.com) from a trimmed-down [Academic Pages](https://github.com/academicpages/academicpages.github.io)
/ [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme (MIT, see `LICENSE`).

## Editing

| What | Where |
|---|---|
| Home page text and news | `_pages/about.md` |
| Publications | one file per paper in `_publications/`, GIFs in `files/gifs/` |
| CV | `files/cv.pdf` (bump the `?v=` in `_data/navigation.yml` to bust caches) |
| Header links | `_data/navigation.yml` |
| Sidebar links, publication section headings | `_config.yml` |
| Styles | `_sass/`, entry point `assets/css/main.scss` |
| Behaviour (theme toggle, contact button, BibTeX buttons) | `assets/js/main.js` |
| Icons | `_sass/_icons.scss` (one glyph code per icon, from fontawesome.com / jpswalsh.github.io/academicons) |

## Running locally

Needs the Ruby version in `.ruby-version` (e.g. `rbenv install`).

```bash
bundle install
bundle exec jekyll serve -l   # http://localhost:4000, reloads on change
```

`_config.yml` is only read at startup, so restart the server after changing it.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which builds the site and deploys it to GitHub Pages.
This needs the repository's Pages source set to *GitHub Actions* (Settings → Pages → Build and deployment), not *Deploy from a branch*.

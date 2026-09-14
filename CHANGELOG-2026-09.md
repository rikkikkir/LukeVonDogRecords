# Changelog — 2026-09 design consistency

Branch `consistency-2026-09`. Styling only. No text, table, chart, value, link or element was edited, removed or reordered.

## Styling: shared `luke-theme.css`

### What was added
- **New file `luke-theme.css`.** It is a shared theme that brings the old cream/teal "paper" palette onto the reference design used by `luke-practitioner-packet.html`, `luke-at-a-glance.html` and `luke-our-time.html`.
- **One line in each of 8 pages.** `<link rel="stylesheet" href="luke-theme.css">` was added as the last element inside `<head>`:
  - luke-data-visualization-suite.html
  - luke-system-map.html
  - luke-diet-medication-matrix.html
  - luke-verbatim-timeline.html
  - luke-what-could-help.html
  - luke-nutrition-consult.html
  - luke-helping-thrive.html
  - luke-bozeman-travel-brief.html
- **Nothing else changed in the pages.** The link sits at the end of `<head>`, so each page's later in-body blocks still win. That includes the dyslexia-friendly typography blocks and the existing clean-white re-skins.

### Which pages the theme actually changes
Rules are scoped with `:has()` to a structural marker that only one page (or pair of pages) has:

| Marker | Page(s) |
|---|---|
| `.disclaim` | luke-nutrition-consult.html, luke-helping-thrive.html |
| `.card-badges` | luke-what-could-help.html |
| `.critical .clbl` | luke-bozeman-travel-brief.html |

Four pages already had an in-page clean-white re-skin: data-visualization-suite, system-map, diet-medication-matrix and verbatim-timeline. They already matched the reference, so the theme leaves them to that re-skin.

### Token mapping (paper → reference)
| Paper token | New value | Reference role |
|---|---|---|
| `--paper` | `#ffffff` | card/sheet surface (the page ground is now `--bg #ececef`) |
| `--paper-2` | `#f6f6f9` | `--shade` |
| `--paper-card` | `#ffffff` | `--card` |
| `--ink` | `#1c1c24` | `--ink` |
| `--ink-2` | `#3a3a44` | `--ink-2` |
| `--ink-mute` | `#6a6a78` | `--muted` |
| `--rule` / `--rule-soft` | `#d7d7e0` / `#e4e4ea` | `--line` / `--rule` |
| `--accent` | `#3f3d6e` | `--indigo` |
| `--accent-deep` | `#26243b` | indigo-dark (nav banner colour) |
| `--accent-soft` | `#5f7fb0` | `--blue` |
| `--burgundy`, `--danger`, `--cardiac` | `#a45a44` | `--clay` |
| `--ochre`, `--hepatic` | `#8a6a1e` | amber, darkened for text contrast |
| `--moss`, `--msk` | `#4d7549` | `--green`, darkened for white-on-chip contrast |
| `--plum`, `--diet` | `#856ba3` | `--purple` |
| `--renal` | `#4a6a9a` | `--blue`, darkened for text contrast |
| `--monitor` | `#5a6b7a` | `--slate` |

### Hard-coded colours overridden
- **Page ground.** The dark page grounds (`#2a2620`, `#13211f`) are now `--bg #ececef`, and the sheets are white cards with a thin `--line` border.
- **Dark teal blocks.** `.top`, `.cover` and `.doc-sidenav` (`#243b34`, `#1d343a`) are now `#26243b`. `.disclaim` and the inline `#192830` strip are now `#1e1c30`. The inline `#1e3038` tiles are now `#2f2d4a`. The light-teal text on those blocks is now light indigo-grey.
- **Callouts.** Paper callouts moved to reference tints:
  - `.goal-band` `#eef3e6` → `#eef3ee`
  - `.redlines` / `.avoidbox` `#f3e7e4` → `#f6ece9`
  - `.vetbox` `#eef4f2` → `#eef1f6`
  - `.keepbox` `#faf4e6` → `#f3efe0`
  - Bozeman checklist `#fdf5f3` → `#f6ece9`
- **Bozeman inline colours.** `#353029`, `#6b6457`, `#2a4a52`, `#6b2a2a`, `#d8cfba` and `#1a1916`, plus the teal `oklch(38% 0.06 185)` button, now use the reference tokens.

### Fonts
- **Body text.** It is now "Atkinson Hyperlegible" (it was system-ui, and Source Serif 4 on Bozeman). Newsreader stays for serif headings.
- **Bozeman.** "JetBrains Mono" is replaced by Atkinson Hyperlegible. Former mono labels became the reference's small uppercase tracked labels (11px, weight 700). Numbers that align keep `font-variant-numeric: tabular-nums`.

### Properties used
Only these properties: colour, background, border colour/width, box-shadow, font-family, font-size, font-weight, letter-spacing and `font-variant-numeric`. No display, visibility, opacity, content, position, transform, overflow or size limits. No `::before`/`::after` text. Two existing `::before` markers are restyled: the Nutrition Consult ♥ gets a new colour, and the Bozeman ✕ gets a new font-family. Neither has its `content` changed.

### Verification
- **Text.** Every page was printed to PDF before and after, and its text was compared.
  - **No re-theme (data-viz, system map, diet & meds, verbatim timeline):** the `pdftotext -layout` text is identical under `diff -w`.
  - **Re-themed (What Could Help, Nutrition Consult, Helping Thrive, Bozeman):** `diff -w` shows differences only because Atkinson Hyperlegible wraps lines at different points than the old fonts.
    - With all whitespace removed, the text in drawing order (`pdftotext -raw`) is identical for What Could Help, Nutrition Consult and Bozeman.
    - Helping Thrive has identical character counts. The printout went from 17 pages to 16, so two blocks ("✕ What to avoid…" and part of one sentence) now fall on a different page. No text was added or lost.
- **Print.** The page breaks in print, including the mostly blank first page on Helping Thrive and Bozeman, were already there before. Print still uses white paper.
- **Visuals.** Desktop (1280) and mobile (390) screenshots were captured before and after.
- **Visuals.** Desktop (1280) and mobile (390) screenshots were captured before and after.

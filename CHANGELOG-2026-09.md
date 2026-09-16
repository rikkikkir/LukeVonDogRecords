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

---

## 2026-09-14 — content updates (commit 4b44a57)

Every change is sourced; nothing was removed except the corrected sentences noted.

- **Hub (luke-practitioner-packet.html)**
  - Restored the goals-of-care card word for word from git history (`16d3b10^`): *"Goals of care (Rikki's directive): a peaceful, dignified death — DNR, no CPR, no hospitalization, comfort over resuscitation. Who Luke is: friendly, a brilliant athletic beast, a lover of food and learning."* (Rikki asked for this on 2026-09-14.)
  - Added a dated "Current medications — updated Sep 14, 2026" note:
    - furosemide 80 mg tablets, 2 at breakfast + 2 at dinner = 320 mg/day, since Aug 10, 2026 (per Rikki);
    - carprofen 75 mg chewables × 2 = 150 mg/day (Thornwood Rx May 8, 2026: "Give up to 150mg per day");
    - amantadine 100 mg once daily.
  - "Drug reactions: None known" → "Thornwood allergy field blank · reactions noted: Vectra (2016), Cytopoint (2023)". Source: Thornwood EMR 4/26/2016 and 9/1/2023.
- **At a Glance (luke-at-a-glance.html)**
  - The furosemide rows and lines now say 320 mg/day since Aug 10, 2026; the previous 300 mg/day is kept as "previously".
  - The carprofen lines now say 150 mg/day (they said 225 mg/day, which contradicted Thornwood's own Rx).
  - Corrected the false sentence "The Mar 9, 2026 panel reported BUN only." The EMR shows a full in-clinic chemistry: creatinine 1.6, phosphorus 2.9, ALT 98, BUN 35 H.
  - The "As of July 2026" stamp now adds "doses updated Sep 14, 2026".
- **Known, not yet fixed:** other pages still show the older doses (300 mg/day furosemide, 225 mg/day carprofen). The hub note says so.

## How to pull these changes back

The state of the site before today's work is tagged **`before-2026-09-14`** (commit 83b7ef3). In the repo `~/Downloads/LukeVonDogRecords`:

- **Undo everything from today (styling + content):**
  `git checkout main && git revert --no-edit 4b44a57 75894bd && git push origin main`
- **Undo only the new styling:** `git checkout main && git revert --no-edit 75894bd && git push origin main`
- **Undo only the content updates:** `git checkout main && git revert --no-edit 4b44a57 && git push origin main`
- **To see the old version** without changing anything: `git show before-2026-09-14:luke-practitioner-packet.html`

`git revert` adds new "undo" commits, so no history is lost and every step can itself be undone. GitHub Pages republishes within a minute or two of a push.

---

## 2026-09-15 — Sep 14 2026 Foothills bloodwork absorbed (commit 53b4936)

**Source:** two in-house result reports from the Sep 14 2026 establish-care visit at Foothills Veterinary Hospital, Bozeman — IDEXX Catalyst One (chemistry, SDMA) and ProCyte One (CBC). The PDFs are kept privately with Luke's other source records and are **not** published; they carry Rikki's name and the clinic's account numbers.

**Values added** (each with the flag its own analyzer assigned): creatinine 2.5 H · BUN 87 H · SDMA 19 H · ALT 251 H · monocytes 2.28 K/µL H · ALKP 63 · glucose 84 · total protein 5.8 · albumin 2.6 · globulin 3.2 · ALB/GLOB 0.8 · BUN/CREA 34 · sodium 148 · potassium 4.1 · chloride 111 · Na/K 36 · HCT 50.4 · HGB 16.8 · RBC 8.30 · MCV 60.8 · MCH 20.3 · MCHC 33.4 · RDW 19.0 · reticulocytes 15.9 · WBC 13.74 · neutrophils 10.41 K/µL · lymphocytes 0.77 K/µL · eosinophils 0.28 K/µL · basophils 0.00 K/µL · platelets 513. First-time markers: MPV 8.3 · PDW 11.0 · PCT 0.42 · %RETIC 0.2 · %NEU 75.8 · %LYM 5.6 · %MONO 16.6 · %EOS 2.0 · %BASO 0.0 · calculated osmolality 319.

**Not in these reports, so unchanged:** phosphorus, calcium, bilirubin, lipase, amylase, GGT, T4, and any urinalysis or UPC.

**Also corrected:** flags that the site was computing against the wrong lab's ranges; phosphorus shown as 5.1 (Sep '25) when the newest is 2.9 (Mar 9 2026); a BUN reference of 7–28 that appears in neither source; and prose contradicted by the new values.

### How to pull this update back

The site as it stood before this update is tagged **`before-2026-09-15`**. In `~/Downloads/LukeVonDogRecords`:

- **Undo the whole lab update:** `git checkout main && git revert --no-edit 53b4936 && git push origin main`
- **See the previous version without changing anything:** `git show before-2026-09-15:luke-at-a-glance.html`
- **Undo everything from Sep 14 as well:** revert `53b4936`, then `4b44a57` and `75894bd`.

`git revert` adds an undo commit, so nothing is lost and the undo can itself be undone.

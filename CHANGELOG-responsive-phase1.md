# Luke Packet — Responsive/Print Overhaul, Phase 1 — Change Log

**Branch:** `responsive-phase1` (baseline `b694a78` on `main`). Nothing here is live until this branch is merged to `main` and pushed.
**Date:** 2026-07-14/15
**Ground rule honored throughout:** no clinical fact, number, dose, date, or lab value was changed. Changes are layout/CSS, navigation wiring, and content *re-surfacing* (composing a triage card from existing at-a-glance content). Every re-surfaced value carries its original date.

Legend: 🎨 layout/CSS · 🖨 print/PDF · 🐛 defect fix · 🧭 navigation · ✍️ content re-surfaced (no new facts)

---

## luke-practitioner-packet.html  (the hub — largest change)

- 🎨 **Desktop width:** `.shell` `max-width: 820px → 1080px`. This is the main fix for the "squashed, dark-gutter" desktop look — the whole page was capped into a narrow column on wide monitors.
- ✍️🧭 **NEW "Start Here · 30-second triage" card** inserted at the top (after the patient band, before the document list). It activates the page's previously-styled-but-unused `.critical` red-alert component. **All content is composed from `luke-at-a-glance.html`** — the five keep-safe flags use the record's own framing ("do not stop Lasix," "renal tension," "conditions in conflict," "presumptive cardiac dx," GDV vigilance); a current-meds line; a dated "key numbers" grid (creatinine/phosphorus/BUN/ALT/SDMA/weight, **each with its date**); the record's own resting-resp-rate home gauge; and the top two "priority clinical questions" (UA+UPC, NT-proBNP+troponin) verbatim from the at-a-glance Open Items. No new clinical claims or treatment directives were introduced. It also carries a self-identifying header (name · signalment · microchip) so a separated printout still identifies Luke.
- 🧭 **NEW dated "Traveling now — Bozeman Jul–Aug 2026" band** below the triage card, linking the (previously orphaned) `luke-bozeman-travel-brief.html` + the Foothills contact. Marked in an HTML comment as time-boxed — **remove or demote after Aug 2026.**
- 🧭 **Linked the second orphan:** added `luke-what-could-help.html` as document #6, visually subordinate and explicitly labeled *"Owner's proposed interventions · for discussion with your vet — not a clinical directive"* so it can't be mistaken for the medical record.
- ✍️ **Hero deck text:** "Five documents covering…" → "Start with the 30-second triage below — then the full clinical brief, lab trends, system conflicts, diet and medications, and his complete verbatim record." (The old count was wrong once #6 + triage were added; no clinical content.)
- 🖨 **Print/PDF block added (page had none, and it was dark `#111c1a`):** forces a light document; hides the hero so the triage leads the printout; converts the dark patient band to light ink; keeps the semantic red critical strip / travel band in color on paper (`print-color-adjust: exact`); makes the **triage card its own page** (`page-break-after: always`) so it's the sheet handed over; hides the on-screen "go deeper" buttons in print (dead on paper); prevents cards/rows splitting across sheets.

## luke-at-a-glance.html

- 🐛 **Defect fixed:** removed a leaked HTML fragment `</div>ns.</div>` at the end of Open Item 02 (was `…without imaging.</div>ns.</div>` → `…without imaging.</div>`). No text content changed — only the stray broken markup removed.
- 🎨 **Desktop width:** `.pages` `max-width: 900px → 1140px` so the two-column brief breathes on wide monitors.
- 🐛🎨 **Sidebar overlap + 960px nav dead-zone fixed:** the fixed 160px left sidebar previously overlapped the centered content at 960–1220px, and at exactly 960px there was no nav at all (an off-by-one between the hide/show rules). Replaced the `@media (max-width:960px){.doc-sidenav{display:none}}` rule with `@media (min-width:960px){body{padding-left:160px}}` — now the content sits *beside* the sidebar on desktop, and on phones the existing mobile block demotes the sidebar to a top bar (so mobile keeps navigation instead of losing it).
- 🖨 **Print block upgraded** (was minimal): Letter page size + margins; forces light + black text; resets the new desktop body offset; hides the sidebar; keeps the red critical strip + dark page headers in color on paper; prevents identity rows / vitals / diagnoses / lab cells / med rows splitting across sheets.

## luke-verbatim-timeline.html  (already the most-responsive page — light touch)

- 🎨 **Desktop width:** `.shell` `max-width: 1340px → 1500px` (least-squashed page, but still capped).
- 🖨 **Print defect fixed:** the existing (otherwise excellent) print block never hid the 300px dark sidebar rail or collapsed the grid, so the dark rail would print on the page. Added `.side{display:none}` + `.shell{display:block; grid-template-columns:none; max-width:none}` to the print block → clean light document in print/PDF.

## index.html

- No change needed — still redirects to `luke-practitioner-packet.html` (the hub was not renamed, so any link already shared keeps working).

---

## (below: deep reference pages — CSS/layout only, verified no clinical content changed)

## luke-data-visualization-suite.html
- 🎨 **Desktop width:** `.shell` `max-width: 1300px → 1500px` (kept the 260px sidebar; only the content column widens).
- 🎨 **Wide lab tables on phones:** `.data-tbl` now scrolls horizontally inside its own box on phones (`display:block; width:max-content; max-width:100%; overflow-x:auto`) instead of overflowing the page.
- 🖨 **Print/PDF block added (page had none, and it was dark `#13211f`):** light document; hides the sidebar; collapses the grid; keeps the dark section headers + status pills in color; forces chart cards white with legible dark-on-light chart strokes; **plus a print-only table reset** so wide lab tables wrap-to-fit on paper instead of clipping columns (the phone breakpoint also matches at Letter print width). Note: charts turned out to be dark-on-light already, so chart text was left as-is (forcing it black would have erased the high/low/normal color coding).

## luke-system-map.html
- 🎨 **Desktop width:** `.wrap` `max-width: 1060px → 1280px`.
- 🐛🧭 **960px nav dead-zone fixed:** sidebar hide rule `max-width:960px → 959px`, aligning it with the mobile top-bar re-show so there's no empty-gutter/no-nav gap at exactly 960px.
- 🐛 **Dead code removed:** deleted the orphan `.topnav` CSS rules (no `.topnav` element exists in the markup).
- 🖨 **Print/PDF block added (page had none):** light document; sidebar hidden; grid collapsed; the six-organ interaction matrix keeps its color coding in print (`print-color-adjust: exact`). Verified every matrix cell also carries a **text label** (e.g. "NEPHROTOXIC," "LOW SODIUM") and the page ships a color legend — so even a plain B&W printout stays fully readable. Fragile header bleeds left untouched.

## luke-diet-medication-matrix.html
- 🎨 **Desktop width:** `.wrap` `max-width: 1040px → 1280px`.
- 🐛 **Primary mobile break fixed:** the 7-card "Stack Totals" grid (`.totals-grid`) never collapsed on phones (stayed 3-up) — added a `1fr 1fr` (2-up) rule to the mobile block.
- 🐛🧭 **960px nav dead-zone fixed** (same as system-map).
- 🎨 **Matrix mobile scroll:** added `table.matrix { min-width: 520px }` on mobile so the 6-column matrix scrolls cleanly inside its wrapper (matches the sibling page).
- 🖨 **Print/PDF block enhanced** (was minimal): Letter page; light document; matrix + colored section headers keep their coding on paper; cards/rows kept whole. Matrix cells verified to carry text labels (B&W-safe).

## luke-what-could-help.html   (newly linked from the hub as doc #6)
- 🎨 **Desktop width:** `.wrap` `max-width: 980px → 1240px`.
- 🐛🧭 **960px nav dead-zone fixed** (same pattern).
- 🐛 **Dead code removed:** deleted the unused `.summary-band` / `.sb-*` CSS (base + mobile override) — the rendered band uses inline flex and never referenced those classes.
- 🖨 **Print/PDF block enhanced:** light document; sidebar hidden; dark cover title / priority badges / summary tiles kept legible in print.

## luke-bozeman-travel-brief.html   (newly linked from the hub via the travel band)
- 🎨 **Desktop width:** `.sheet` (and its coupled footer) `max-width: 820px → 1000px` (kept moderate — it's a single-sheet document).
- 🐛 **Primary mobile break fixed:** the 6-column medications table had **no** responsive handling and overflowed phones — it now scrolls horizontally inside the sheet on phones.
- 🖨 **Print/PDF block enhanced:** light document; the red "do NOT stop furosemide" critical strip stays red on paper; **plus a print guard** forcing the meds table back to a full wrapping table so no column clips on the printed page. Serif body font left as-is.

---

## Known / deferred (Phase 2 candidates — not done here)
- The med regimen (esp. "furosemide 300 mg/day") is still hand-duplicated across 7 pages — update one, miss six is a live drift risk. Phase 2: single-source it.
- The left sidebar still varies in width (160 / 260 / 300px) page-to-page; a single shared top nav is a Phase-2 unification.
- No single "Full Packet (print/PDF)" assembly page yet (browsers can't print across separate files) — Phase 2.
- The travel band + Bozeman links are **time-boxed to Jul–Aug 2026** — remove/demote after the trip.
- This CHANGELOG file lives in the repo; delete it before/after merge if you don't want it on the live site (it isn't linked from anywhere).

---

# v2 — Evolved version (side-by-side; NEW files, v1 untouched)

Built after a multi-perspective critique (own passes + 4 independent critics: palliative vet, ER-scannability, information design, risk/provenance). New files so v1 and v2 can be compared:

## luke-practitioner-packet-v2.html  (evolved hub)
- **Two-tier triage:** one dominant red "DO NOT stop furosemide" banner **+ a crisis action** ("→ treat as CHF decompensation"), with the other four flags demoted to a calmer amber "Know this before you manage him" strip. (v1 had five equal-weight flags — no hierarchy.)
- **Typography fixed:** critical text now ≥17px (was 14–16px — *smaller* than nav labels and below the dyslexia floor); lead flag largest.
- **NEW "What Rikki wants for Luke" goals-of-care card** — surfaces the previously-buried End-of-Life content from `luke-system-map.html` (the May 14 2025 conversation: signals watched / what a crisis looks like / what Rikki needs) **+ an owner-only "Emergency escalation wishes" slot** (oxygen? hospitalize? CPR? financial ceiling? comfort-first? who consents while traveling?). Left blank — only Rikki can fill it.
- **Provenance + standalone-safety:** visible "owner-compiled orientation, not a directive" byline; **allergy line** ("none on record"); owner + primary-vet + Bozeman-ER phones and an "as of June 2026" date on the card itself (so a printed sheet stands alone). Hero changed from "Everything a new provider needs" → "An owner's orientation for your team."
- **Numbers:** global **staleness caption** ("not rechecked since Sep 2025; Mar '26 = BUN only"); colorblind-safe **HIGH chips** (not color-alone); consistent warn logic; emphasized trends; SDMA now dated.
- **Carrot barometer** added to the goals card with a baseline slot; imperatives softened to observations ("you may want fresh values…"); carprofen mg/kg tagged "owner calc"; travel band relabeled "Travel window" (won't read false in September).
- Verified desktop + mobile via headless screenshots.

## luke-helping-thrive.html  (NEW — answers "how can I help Luke thrive?")
- Evidence-graded (STRONG/MODERATE/WEAK/NONE/AVOID), safety-filtered options across nutrition, omega-3, nutraceuticals, frontier longevity, physical therapy/rehab, massage/bodywork, sensory/haptic (incl. an honest Woojer assessment), and environment/QoL — **every item filtered through his cardiac (Stage D) + renal red lines.**
- Framed throughout as **owner-compiled decision-support for his vet team, not a directive.** Sources cited. Responsive + print-ready.
- Linked from the v2 hub ("Helping Luke thrive →"). Grounded in a web-research pass (ACVIM 2019 consensus, IRIS, Tufts HeartSmart, Dog Aging Project, etc.).
- ⚠ **Not medical advice** — it explicitly routes to his vet + a cardiologist + a DACVN nutritionist + a CCRT rehab therapist. Highest-value moves it surfaces: close the omega-3 gap, a nutritionist-built cooked diet (the raw pork/shellfish diet is a poor renal/cardiac fit), breath-rate + Montana air/altitude plan, gentle therapist-guided rehab, and re-confirming the (empiric) diagnoses.

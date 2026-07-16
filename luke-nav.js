/* ═══════════════════════════════════════════════════════════════════════
   luke-nav.js — SINGLE SOURCE OF TRUTH for cross-document navigation.
   The DOCS array below is the ONLY place the document list lives. Every
   page's uniform sidebar (.lnav) gets its "All documents" switcher and its
   prev/next links built from this array, so they can never drift out of
   sync across the 11 self-contained HTML files.

   Each page carries: <nav class="lnav" data-page="<id>"> ...
     <div data-lnav-docs></div>       ← switcher injected here
     <div data-lnav-updown></div>     ← prev/next injected here
   Graceful degradation: if this file fails to load, the static "Packet home"
   link + the per-page "On this page" anchors still work; only the lateral
   switcher is empty (correct for a lone emailed/printed file).
═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  // reading order = prev/next order. n = doc number shown in the switcher.
  var DOCS = [
    { p: "practitioner-packet",      f: "luke-practitioner-packet.html",      label: "Packet home",              n: "",   c: "#2a4a52" },
    { p: "at-a-glance",              f: "luke-at-a-glance.html",              label: "Luke at a Glance",         n: "1",  c: "#3a6068" },
    { p: "data-visualization-suite", f: "luke-data-visualization-suite.html", label: "Data Visualization Suite", n: "2",  c: "#3f5224" },
    { p: "system-map",               f: "luke-system-map.html",               label: "System Map",               n: "3",  c: "#4a2f4e" },
    { p: "diet-medication-matrix",   f: "luke-diet-medication-matrix.html",   label: "Diet & Medication Matrix", n: "4",  c: "#7a5c18" },
    { p: "verbatim-timeline",        f: "luke-verbatim-timeline.html",        label: "Verbatim Timeline",        n: "5",  c: "#6b2a2a" },
    { p: "what-could-help",          f: "luke-what-could-help.html",          label: "What Could Help",          n: "6",  c: "#6e8e92" },
    { p: "nutrition-consult",        f: "luke-nutrition-consult.html",        label: "Nutrition Consult",        n: "7",  c: "#9c4f2a" },
    { p: "helping-thrive",           f: "luke-helping-thrive.html",           label: "Helping Luke Thrive",      n: "8",  c: "#2f5d4e" },
    { p: "bozeman-local-care",       f: "luke-bozeman-travel-brief.html",     label: "Bozeman Local-Care",       n: "9",  c: "#3f5a72" },
    { p: "pet-sitter-guide",         f: "luke-pet-sitter-guide.html",         label: "Pet-Sitter Guide",         n: "10", c: "#43457e" }
  ];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function init() {
    var nav = document.querySelector(".lnav");
    if (!nav) return;
    var here = nav.getAttribute("data-page");
    var i = -1;
    for (var k = 0; k < DOCS.length; k++) { if (DOCS[k].p === here) { i = k; break; } }

    // (b) document switcher — all docs, current one marked
    var box = nav.querySelector("[data-lnav-docs]");
    if (box) {
      box.innerHTML = DOCS.map(function (d, k) {
        var cur = k === i ? " current" : "";
        var aria = k === i ? ' aria-current="page"' : "";
        return '<a class="lnav-doc' + cur + '" href="' + d.f + '"' + aria +
          ' style="--doc-accent:' + d.c + '">' +
          '<span class="dot" aria-hidden="true"></span>' +
          '<span class="n" aria-hidden="true">' + d.n + '</span>' +
          '<span class="lbl">' + esc(d.label) + '</span></a>';
      }).join("");
    }

    // (d) prev / next through the collection
    var ud = nav.querySelector("[data-lnav-updown]");
    if (ud && i > -1) {
      var prev = DOCS[i - 1], next = DOCS[i + 1], html = "";
      if (prev) html += '<a class="lnav-prev" href="' + prev.f + '"><span aria-hidden="true">←</span> ' + esc(prev.label) + "</a>";
      if (next) html += '<a class="lnav-next" href="' + next.f + '">' + esc(next.label) + ' <span aria-hidden="true">→</span></a>';
      ud.innerHTML = html;
    }

    // mobile hamburger
    var toggle = nav.querySelector(".lnav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // active in-page anchor (scroll-spy)
    var secs = [].slice.call(nav.querySelectorAll('.lnav-sec[href^="#"]'));
    if (secs.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            secs.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
            });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      secs.forEach(function (a) {
        var t = document.getElementById(a.getAttribute("href").slice(1));
        if (t) io.observe(t);
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

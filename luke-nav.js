/* ============================================================
   Luke VonDog — shared cross-document navigation
   Self-injecting: include <script src="luke-nav.js"></script>
   near the end of <body> on any page and it renders one
   identical top nav banner (home + every document as a button,
   current highlighted) so the packet is consistently navigable.
   Single source of truth = the DOCS array below.
   ============================================================ */
(function () {
  var HOME = "luke-practitioner-packet.html";
  var DOCS = [
    { f: "luke-at-a-glance.html",              n: "1",  label: "At a Glance" },
    { f: "luke-data-visualization-suite.html", n: "2",  label: "Data Visualization" },
    { f: "luke-system-map.html",               n: "3",  label: "System Map" },
    { f: "luke-diet-medication-matrix.html",   n: "4",  label: "Diet & Meds" },
    { f: "luke-verbatim-timeline.html",        n: "5",  label: "Verbatim Timeline" },
    { f: "luke-what-could-help.html",          n: "6",  label: "What Could Help" },
    { f: "luke-nutrition-consult.html",        n: "7",  label: "Nutrition Consult" },
    { f: "luke-helping-thrive.html",           n: "8",  label: "Helping Thrive" },
    { f: "luke-bozeman-travel-brief.html",     n: "9",  label: "Bozeman Care" },
    { f: "luke-our-time.html",                 n: "10", label: "Our Time" }
  ];

  function run() {
    if (document.querySelector(".lukenav")) return;
    var here = (location.pathname.split("/").pop() || HOME);
    if (here === "" || here === "index.html") here = HOME;
    var atHome = (here === HOME);

    var css = ''
      + '.lukenav{position:sticky;top:0;z-index:99999;display:flex;align-items:stretch;gap:0;'
      + 'background:#26243b;color:#fff;padding:0;'
      + "font-family:'Atkinson Hyperlegible',system-ui,-apple-system,sans-serif;"
      + 'box-shadow:0 2px 10px rgba(20,18,40,.28);border-bottom:1px solid rgba(255,255,255,.08);}'
      + '.lukenav *{box-sizing:border-box;}'
      + '.lukenav a{text-decoration:none;}'
      + '.lukenav-home{display:flex;flex-direction:column;justify-content:center;line-height:1.06;'
      + 'color:#fff;flex:none;padding:9px 16px;border-right:1px solid rgba(255,255,255,.14);}'
      + '.lukenav-home:hover{background:rgba(255,255,255,.06);}'
      + '.lukenav-home b{font-size:15px;font-weight:700;letter-spacing:.01em;}'
      + '.lukenav-home span{font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#a6a1cf;margin-top:1px;}'
      + '.lukenav-home.is-current b{color:#cfe0ff;}'
      + '.lukenav-scroll{flex:1;min-width:0;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;'
      + 'scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.25) transparent;}'
      + '.lukenav-scroll::-webkit-scrollbar{height:6px;}'
      + '.lukenav-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.22);border-radius:3px;}'
      + '.lukenav-docs{display:flex;align-items:center;gap:6px;padding:8px 14px;width:max-content;height:100%;}'
      + '.lukenav-pill{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;'
      + 'font-size:12.5px;font-weight:700;color:#d9d6ef;background:rgba(255,255,255,.07);'
      + 'border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:6px 13px;transition:background .12s,color .12s;}'
      + '.lukenav-pill i{font-style:normal;font-size:10px;font-weight:800;opacity:.55;}'
      + '.lukenav-pill:hover{background:rgba(255,255,255,.16);color:#fff;}'
      + '.lukenav-pill.is-current{background:#fff;color:#26243b;border-color:#fff;}'
      + '.lukenav-pill.is-current i{opacity:.5;}'
      + '@media (max-width:640px){.lukenav-home span{display:none;}.lukenav-home b{font-size:14px;}}'
      + '@media print{.lukenav{display:none !important;}}';
    var style = document.createElement("style");
    style.setAttribute("data-lukenav", "1");
    style.textContent = css;
    document.head.appendChild(style);

    var html = '<a class="lukenav-home' + (atHome ? ' is-current' : '') + '" href="' + HOME
      + '"><b>Luke VonDog</b><span>Care Archive · Home</span></a>'
      + '<div class="lukenav-scroll"><div class="lukenav-docs">';
    for (var i = 0; i < DOCS.length; i++) {
      var d = DOCS[i], cur = (d.f === here) ? " is-current" : "";
      html += '<a class="lukenav-pill' + cur + '" href="' + d.f + '"'
        + (cur ? ' aria-current="page"' : '') + '><i>' + d.n + '</i>' + d.label + '</a>';
    }
    html += '</div></div>';

    var nav = document.createElement("nav");
    nav.className = "lukenav";
    nav.setAttribute("aria-label", "Care archive documents");
    nav.innerHTML = html;
    document.body.insertBefore(nav, document.body.firstChild);

    // scroll the current pill into view within the bar
    var curPill = nav.querySelector(".lukenav-pill.is-current");
    if (curPill) { try { curPill.scrollIntoView({ inline: "center", block: "nearest" }); } catch (e) {} }

    // De-duplicate: hide the page's own top "back to home" links (the banner replaces them)
    var links = document.querySelectorAll('a[href="' + HOME + '"]');
    for (var j = 0; j < links.length; j++) {
      var a = links[j];
      if (a.closest(".lukenav")) continue;
      var t = (a.textContent || "").trim().toLowerCase();
      if (t.charAt(0) === "←" || t.charAt(0) === "‹"   // arrow  or  ‹
        || t.indexOf("packet home") >= 0 || t.indexOf("care archive") >= 0) {
        a.style.display = "none";
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else { run(); }
})();

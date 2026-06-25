/* ============================================================
   Luke VonDog — complete laboratory & body-metric dataset
   Source: Thornwood Veterinary Clinic & Kennel patient history
   (Luke_Delaine_FULL transcript). Every recorded value is here.
   Two labs were used: IDEXX in-clinic (Catalyst) and IDEXX
   Reference Lab — their reference intervals differ slightly, so
   each data point carries the flag the lab itself assigned.
   ============================================================ */
window.LUKE_LABS = (function () {

  // Panel dates (chemistry / CBC). Weight has its own denser series.
  const PANEL = {
    "2018-11-16": "Nov 2018",
    "2020-10-13": "Oct 2020",
    "2023-09-06": "Sep 2023",
    "2024-02-21": "Feb 2024",
    "2024-09-20": "Sep 2024",
    "2025-03-27": "Mar 2025",
    "2025-09-11": "Sep 2025",
    "2026-03-09": "Mar 2026"
  };

  // Shorthand: p(date, value, flag) → data point
  const p = (d, v, f) => ({ d, v, f: f || "" });

  const tests = [

    /* ---------------------- BODY ---------------------- */
    {
      id: "weight", name: "Body weight", abbr: "WT", cat: "Body", unit: "lb",
      refLow: 78, refHigh: 82, refNote: "vet-endorsed ideal · BCS 5/9",
      about: "How much Luke weighs. Paired with a Body Condition Score (BCS, 1–9), it's the simplest, most repeated measure of whether he's carrying the right amount of fat and muscle.",
      impact: "Weight ties together almost everything else. Too high stresses his arthritic joints and heart; a fast unintentional drop can signal kidney disease, heart disease (cardiac cachexia), or cancer. His team watches the <em>trend</em> more than any single number.",
      watch: "He lost ~19 lb from the May 2025 peak down to a healthy 79.1 lb. Further unintentional loss should prompt a workup.",
      series: [
        p("2016-04-22",68.5), p("2016-05-25",58.0,"?"), p("2016-06-24",73.4), p("2016-09-01",77.2),
        p("2016-11-15",75.8), p("2017-01-26",82.6), p("2017-08-04",78.9), p("2017-08-29",77.8),
        p("2018-01-16",78.5), p("2018-05-15",72.5), p("2018-05-22",72.5), p("2018-06-22",73.0),
        p("2018-09-10",73.0), p("2018-11-16",75.0), p("2019-01-08",77.1), p("2020-02-05",79.4),
        p("2020-07-16",82.0), p("2020-08-17",80.0), p("2020-10-21",85.0), p("2022-04-11",73.3),
        p("2022-04-19",76.0), p("2023-03-20",79.5), p("2023-04-03",84.0), p("2023-05-23",80.4),
        p("2023-08-23",86.3), p("2023-09-06",88.5), p("2023-10-30",87.0), p("2023-12-18",83.0),
        p("2024-01-08",88.6), p("2024-02-21",90.1), p("2024-03-14",87.5), p("2024-05-07",87.5),
        p("2024-12-02",89.3), p("2025-05-14",98.0,"H"), p("2025-06-25",90.0), p("2025-08-01",89.0),
        p("2025-09-11",87.4), p("2026-03-04",79.1)
      ],
      pointNote: { "2016-05-25": "Sits ~15 lb below its neighbours — almost certainly a clinic typo.", "2025-05-14": "Abdomen distended at an acute crisis; part of this was fluid, not lean mass." }
    },

    /* ---------------------- KIDNEY ---------------------- */
    {
      id: "crea", name: "Creatinine", abbr: "CREA", cat: "Kidney", unit: "mg/dL",
      refLow: 0.5, refHigh: 1.5, refNote: "ref lab 0.5–1.5 · in-clinic 0.5–1.8",
      about: "A waste product of normal muscle metabolism that healthy kidneys filter out. Its blood level is one of the classic markers of kidney filtration.",
      impact: "Creatinine is the number that defined Luke's chronic kidney disease (CKD). It crept up over years and reached 1.8 in Sep 2025 — the reading that put him at IRIS Stage 2. Higher means less filtering reserve.",
      watch: "Muscle mass and hydration affect it; trended values matter more than one spot reading.",
      series: [ p("2018-11-16",0.9), p("2020-10-13",0.7), p("2023-09-06",0.8), p("2024-02-21",0.8),
        p("2024-09-20",1.0), p("2025-03-27",1.2), p("2025-09-11",1.8,"H"), p("2026-03-09",1.6) ]
    },
    {
      id: "sdma", name: "SDMA", abbr: "SDMA", cat: "Kidney", unit: "µg/dL",
      refLow: 0, refHigh: 14, refNote: "0–14",
      about: "Symmetric dimethylarginine — a newer, more sensitive kidney marker that rises earlier than creatinine and isn't thrown off by muscle loss.",
      impact: "Luke's SDMA has climbed steadily (5 → 8 → 11 → 13) and now sits right at the top of normal. Read alongside creatinine, it supports the IRIS Stage 2 CKD picture.",
      watch: "A value above 14, or a continued climb, would confirm declining kidney function.",
      series: [ p("2020-10-13",5), p("2023-09-06",8), p("2024-09-20",11), p("2025-09-11",13) ]
    },
    {
      id: "bun", name: "Blood urea nitrogen", abbr: "BUN", cat: "Kidney", unit: "mg/dL",
      refLow: 9, refHigh: 31, refNote: "ref lab 9–31 · in-clinic 7–27",
      about: "Urea is a nitrogen waste from protein breakdown that the kidneys clear. BUN measures it in blood.",
      impact: "BUN has trended up with Luke's kidney disease and has been flagged high several times (31, 43, 35). It also rises with a high-protein meal or mild dehydration, so it's read in context.",
      watch: "His high-protein home/cooked diet nudges BUN up independent of kidney function.",
      series: [ p("2018-11-16",17), p("2020-10-13",17), p("2023-09-06",11), p("2024-02-21",11),
        p("2024-09-20",19), p("2025-03-27",31,"H"), p("2025-09-11",43,"H"), p("2026-03-09",35,"H") ]
    },
    {
      id: "phos", name: "Phosphorus", abbr: "PHOS", cat: "Kidney", unit: "mg/dL",
      refLow: 2.5, refHigh: 6.1, refNote: "lab range 2.5–6.1 · IRIS Stage 2 target < 4.6",
      about: "A mineral balanced by the kidneys. As kidney function falls, phosphorus tends to rise.",
      impact: "Although Luke's phosphorus sits 'within range' on the lab sheet, his 5.1 (Sep 2025) is <strong>above the IRIS Stage 2 target of &lt; 4.6</strong> — which is why phosphorus restriction is relevant to his diet. The 2.9 in Mar 2026 was reassuringly lower.",
      watch: "Keeping phosphorus under ~4.6 helps slow CKD progression.",
      series: [ p("2018-11-16",4.1), p("2020-10-13",3.5), p("2023-09-06",4.4), p("2024-02-21",5.4),
        p("2024-09-20",4.3), p("2025-03-27",5.2), p("2025-09-11",5.1), p("2026-03-09",2.9) ]
    },
    {
      id: "bcratio", name: "BUN / Creatinine ratio", abbr: "B/C", cat: "Kidney", unit: "ratio",
      refLow: 13, refHigh: 26, refNote: "context-dependent",
      about: "The ratio of urea to creatinine. It helps separate kidney causes from non-kidney causes (diet, dehydration, GI bleeding) of a high BUN.",
      impact: "Luke's ratio has hovered in the teens–20s. A disproportionately high ratio points more to diet/dehydration than to kidney tissue itself.",
      series: [ p("2018-11-16",19), p("2020-10-13",24.3), p("2023-09-06",13.8), p("2024-02-21",14),
        p("2024-09-20",19.0), p("2025-03-27",26), p("2025-09-11",23.9), p("2026-03-09",21) ]
    },

    /* ---------------------- LIVER & PANCREAS ---------------------- */
    {
      id: "alt", name: "ALT (alanine aminotransferase)", abbr: "ALT", cat: "Liver", unit: "U/L",
      refLow: 10, refHigh: 125, refNote: "in-clinic 10–125 · ref lab 18–121",
      about: "An enzyme inside liver cells. When liver cells are stressed or injured, ALT leaks into the blood.",
      impact: "Luke's ALT is usually normal but rose to 121–128 in 2025 (mildly high on the reference range), fitting the early liver/gallbladder changes seen that spring.",
      watch: "Persistent elevation would prompt a closer liver workup or imaging.",
      series: [ p("2018-11-16",84), p("2020-10-13",40), p("2023-09-06",46), p("2024-02-21",72),
        p("2024-09-20",46), p("2025-03-27",121), p("2025-09-11",128,"H"), p("2026-03-09",98) ]
    },
    {
      id: "alkp", name: "Alkaline phosphatase", abbr: "ALKP", cat: "Liver", unit: "U/L",
      refLow: 23, refHigh: 212, refNote: "in-clinic 23–212 · ref lab 5–160",
      about: "An enzyme from liver/bile ducts and bone. Rises with bile-flow problems, certain medications (steroids), or bone activity.",
      impact: "Luke's ALKP has stayed within range, with a mild bump to 163 in Feb 2024. Steroid courses earlier in life can transiently raise it.",
      series: [ p("2018-11-16",36), p("2020-10-13",55), p("2023-09-06",116), p("2024-02-21",163),
        p("2024-09-20",63), p("2025-03-27",43), p("2025-09-11",69), p("2026-03-09",84) ]
    },
    {
      id: "ast", name: "AST (aspartate aminotransferase)", abbr: "AST", cat: "Liver", unit: "U/L",
      refLow: 16, refHigh: 55, refNote: "16–55 · reference lab only",
      about: "An enzyme found in liver and muscle. Read with ALT, it helps tell liver injury from muscle injury.",
      impact: "Luke's AST has stayed in range (high-26 to 43), consistent with no major liver-cell damage. Hemolyzed samples can falsely raise it.",
      series: [ p("2020-10-13",26), p("2023-09-06",32), p("2024-09-20",27), p("2025-09-11",43) ]
    },
    {
      id: "ggt", name: "GGT (gamma-glutamyl transferase)", abbr: "GGT", cat: "Liver", unit: "U/L",
      refLow: 0, refHigh: 13, refNote: "ref lab 0–13 · in-clinic 0–11",
      about: "A bile-duct enzyme. Sensitive to cholestasis (impaired bile flow).",
      impact: "Luke's GGT has been near zero throughout — reassuring against significant bile-duct disease, even when bilirubin briefly spiked.",
      series: [ p("2018-11-16",2), p("2020-10-13",0.5), p("2023-09-06",1), p("2024-02-21",0),
        p("2024-09-20",2), p("2025-03-27",0), p("2025-09-11",4), p("2026-03-09",0) ],
      pointNote: { "2020-10-13": "Reported as <1." }
    },
    {
      id: "tbil", name: "Total bilirubin", abbr: "TBIL", cat: "Liver", unit: "mg/dL",
      refLow: 0.0, refHigh: 0.3, refNote: "ref lab 0.0–0.3 · in-clinic 0.0–0.9",
      about: "A yellow pigment from recycled red blood cells, cleared by the liver into bile. High levels cause jaundice.",
      impact: "Mostly low/normal — except a notable spike to <strong>1.4 (Mar 2025)</strong> that flagged early gallbladder/bile changes. It settled back to 0.1–0.2 afterward.",
      watch: "A rising bilirubin with rising ALT would point at the liver/gallbladder.",
      series: [ p("2018-11-16",0.3), p("2020-10-13",0.1), p("2023-09-06",0.05), p("2024-02-21",0.5),
        p("2024-09-20",0.1), p("2025-03-27",1.4,"H"), p("2025-09-11",0.1), p("2026-03-09",0.2) ],
      pointNote: { "2023-09-06": "Reported as <0.1." }
    },
    {
      id: "lipase", name: "Lipase", abbr: "LIPA", cat: "Pancreas", unit: "U/L",
      refLow: 200, refHigh: 1800, refNote: "in-clinic Catalyst 200–1800",
      about: "A pancreatic enzyme that digests fat. A high value can indicate pancreatitis (pancreas inflammation).",
      impact: "Luke's in-clinic lipase jumped to <strong>3134 (Feb 2024)</strong> — well above range — raising concern for pancreatitis, then settled (1382 → 810). The reference-lab DGGR lipase (a different assay, range 0–250) read 210, 275, and 110 on its dates.",
      watch: "Lipase fits his bouts of GI upset and the fatty home-cooked diet; trend and symptoms guide action.",
      series: [ p("2018-11-16",1534), p("2024-02-21",3134,"H"), p("2025-03-27",1382), p("2026-03-09",810) ],
      extraRows: [
        { d:"2023-09-06", label:"DGGR lipase", v:"210 U/L", note:"ref-lab assay, 0–250" },
        { d:"2024-09-20", label:"DGGR lipase", v:"275 U/L (H)", note:"ref-lab assay, 0–250" },
        { d:"2025-09-11", label:"DGGR lipase", v:"110 U/L", note:"ref-lab assay, 0–250" }
      ]
    },
    {
      id: "amyl", name: "Amylase", abbr: "AMYL", cat: "Pancreas", unit: "U/L",
      refLow: 500, refHigh: 1500, refNote: "in-clinic 500–1500 · ref lab 337–1469",
      about: "Another enzyme from the pancreas (and salivary glands) that breaks down starch. Used alongside lipase.",
      impact: "Largely normal. The lone low reading (408, Nov 2018) has little significance on its own.",
      series: [ p("2018-11-16",408,"L"), p("2023-09-06",861), p("2024-02-21",954),
        p("2024-09-20",666), p("2025-03-27",655), p("2025-09-11",607), p("2026-03-09",843) ]
    },

    /* ---------------------- PROTEINS ---------------------- */
    {
      id: "tp", name: "Total protein", abbr: "TP", cat: "Proteins", unit: "g/dL",
      refLow: 5.5, refHigh: 7.5, refNote: "ref lab 5.5–7.5 · in-clinic 5.2–8.2",
      about: "All the protein in blood — mostly albumin plus globulins. Reflects hydration, nutrition, inflammation, and immune activity.",
      impact: "Luke runs at the upper end (7.0–8.2). Mild elevations track with his globulins and hydration status rather than disease.",
      series: [ p("2018-11-16",6.7), p("2020-10-13",6.8), p("2023-09-06",7.2), p("2024-02-21",7.8),
        p("2024-09-20",6.7), p("2025-03-27",8.2), p("2025-09-11",7.0), p("2026-03-09",7.3) ]
    },
    {
      id: "alb", name: "Albumin", abbr: "ALB", cat: "Proteins", unit: "g/dL",
      refLow: 2.7, refHigh: 3.9, refNote: "ref lab 2.7–3.9 · in-clinic 2.2–3.9",
      about: "The main blood protein, made by the liver. Holds fluid in vessels and carries hormones and drugs. Falls with liver, kidney, or gut protein loss; rises with dehydration.",
      impact: "Steady and healthy. A 4.2 (Mar 2025) was mildly high — consistent with dehydration/hemoconcentration at that draw — and normalized after.",
      series: [ p("2018-11-16",3.1), p("2020-10-13",3.1), p("2023-09-06",3.6), p("2024-02-21",3.7),
        p("2024-09-20",3.2), p("2025-03-27",4.2,"H"), p("2025-09-11",3.4), p("2026-03-09",3.1) ]
    },
    {
      id: "glob", name: "Globulin", abbr: "GLOB", cat: "Proteins", unit: "g/dL",
      refLow: 2.4, refHigh: 4.0, refNote: "ref lab 2.4–4.0 · in-clinic 2.5–4.5",
      about: "The family of immune and transport proteins (antibodies and more). Rises with chronic inflammation or immune stimulation.",
      impact: "Mostly normal, occasionally at the upper edge (4.1–4.3) — fitting a dog with a long history of allergic/inflammatory skin disease.",
      series: [ p("2018-11-16",3.6), p("2020-10-13",3.7), p("2023-09-06",3.6), p("2024-02-21",4.1),
        p("2024-09-20",3.5), p("2025-03-27",4.0), p("2025-09-11",3.6), p("2026-03-09",4.3) ]
    },
    {
      id: "agratio", name: "Albumin / Globulin ratio", abbr: "A/G", cat: "Proteins", unit: "ratio",
      refLow: 0.7, refHigh: 1.5, refNote: "0.7–1.5",
      about: "The balance between albumin and globulins. A low ratio suggests inflammation or albumin loss.",
      impact: "Luke sits in the low-normal band (0.7–1.1), nudged down by his upper-end globulins. The 0.7 in Mar 2026 is at the floor but still within range.",
      series: [ p("2018-11-16",0.9), p("2020-10-13",0.8), p("2023-09-06",1.0), p("2024-02-21",0.9),
        p("2024-09-20",0.9), p("2025-03-27",1.1), p("2025-09-11",0.9), p("2026-03-09",0.7) ]
    },

    /* ---------------------- ELECTROLYTES ---------------------- */
    {
      id: "potassium", name: "Potassium", abbr: "K", cat: "Electrolytes", unit: "mmol/L",
      refLow: 4.0, refHigh: 5.4, refNote: "ref lab 4.0–5.4 · in-clinic 3.5–5.8",
      about: "The main electrolyte inside cells. Critical for heart rhythm and muscle/nerve function; kidneys and diet regulate it.",
      impact: "Generally normal. A single 5.5 (Sep 2023) was mildly high and not repeated. Worth watching in CKD and with his diuretic (Lasix), which can lower potassium.",
      watch: "Both very high and very low potassium affect the heart — relevant given Luke's cardiac and kidney history.",
      series: [ p("2018-11-16",4.3), p("2020-10-13",4.7), p("2023-09-06",5.5,"H"),
        p("2024-09-20",4.8), p("2025-09-11",4.7) ]
    },
    {
      id: "sodium", name: "Sodium", abbr: "Na", cat: "Electrolytes", unit: "mmol/L",
      refLow: 142, refHigh: 152, refNote: "ref lab 142–152 · in-clinic 144–160",
      about: "The main electrolyte outside cells; governs fluid balance and blood volume.",
      impact: "Rock-steady (147–152) across every panel — no concerning shifts despite his diuretic and kidney disease.",
      series: [ p("2018-11-16",152), p("2020-10-13",148), p("2023-09-06",150),
        p("2024-09-20",148), p("2025-09-11",147) ]
    },
    {
      id: "chloride", name: "Chloride", abbr: "Cl", cat: "Electrolytes", unit: "mmol/L",
      refLow: 108, refHigh: 119, refNote: "ref lab 108–119 · in-clinic 109–122",
      about: "An electrolyte that moves with sodium and helps maintain acid-base balance.",
      impact: "Near-normal throughout; a mild 106 (Sep 2025) was flagged low but is not clinically alarming on its own.",
      series: [ p("2018-11-16",114), p("2020-10-13",111), p("2023-09-06",111),
        p("2024-09-20",109), p("2025-09-11",106,"L") ]
    },
    {
      id: "nakratio", name: "Sodium / Potassium ratio", abbr: "Na/K", cat: "Electrolytes", unit: "ratio",
      refLow: 28, refHigh: 37, refNote: "28–37",
      about: "A derived ratio; a low value can hint at certain hormonal (e.g. adrenal) or kidney issues.",
      impact: "Mostly normal; the single low 27 (Sep 2023) accompanied that visit's high potassium and wasn't repeated.",
      series: [ p("2018-11-16",35), p("2020-10-13",31), p("2023-09-06",27,"L"),
        p("2024-09-20",31), p("2025-09-11",31) ]
    },
    {
      id: "aniongap", name: "Anion gap", abbr: "AGAP", cat: "Electrolytes", unit: "mmol/L",
      refLow: 11, refHigh: 26, refNote: "11–26",
      about: "A calculated value screening for hidden acids in the blood (metabolic acidosis).",
      impact: "Normal on every reference-lab panel — no evidence of a metabolic acid disturbance.",
      series: [ p("2020-10-13",20), p("2023-09-06",19), p("2024-09-20",20), p("2025-09-11",22) ]
    },
    {
      id: "bicarb", name: "Bicarbonate", abbr: "HCO₃", cat: "Electrolytes", unit: "mmol/L",
      refLow: 13, refHigh: 27, refNote: "13–27",
      about: "The blood's main buffer against acid. Falls in metabolic acidosis (which advanced kidney disease can cause).",
      impact: "Comfortably normal (22–26), reassuring that his CKD hasn't produced acidosis.",
      series: [ p("2020-10-13",22), p("2023-09-06",26), p("2024-09-20",24), p("2025-09-11",24) ]
    },

    /* ---------------------- MINERALS & METABOLIC ---------------------- */
    {
      id: "calcium", name: "Calcium", abbr: "Ca", cat: "Metabolic", unit: "mg/dL",
      refLow: 8.4, refHigh: 11.8, refNote: "ref lab 8.4–11.8 · in-clinic 7.9–12.0",
      about: "A mineral essential for bones, nerves, muscles, and clotting; tightly controlled by hormones and the kidneys.",
      impact: "Steady and normal (10.0–11.1) across years — no sign of the calcium disturbances that can accompany some cancers or kidney disease.",
      series: [ p("2018-11-16",10.0), p("2020-10-13",10.1), p("2023-09-06",11.1), p("2024-02-21",10.2),
        p("2024-09-20",10.6), p("2025-03-27",10.4), p("2025-09-11",10.7), p("2026-03-09",10.2) ]
    },
    {
      id: "glucose", name: "Glucose", abbr: "GLU", cat: "Metabolic", unit: "mg/dL",
      refLow: 63, refHigh: 114, refNote: "ref lab 63–114 · in-clinic 70–143",
      about: "Blood sugar — the body's main fuel. Persistently high suggests diabetes; low can cause weakness or collapse.",
      impact: "Normal on every panel (91–109). No evidence of diabetes; his glucose handling looks healthy.",
      series: [ p("2018-11-16",91), p("2020-10-13",98), p("2023-09-06",104), p("2024-02-21",96),
        p("2024-09-20",102), p("2025-03-27",109), p("2025-09-11",97), p("2026-03-09",99) ]
    },
    {
      id: "chol", name: "Cholesterol", abbr: "CHOL", cat: "Metabolic", unit: "mg/dL",
      refLow: 131, refHigh: 345, refNote: "ref lab 131–345 · in-clinic 110–320",
      about: "A blood fat. In dogs, high cholesterol points less at heart disease than at diet, thyroid, or other metabolic causes.",
      impact: "Consistently mid-range (197–252). No hyperlipidemia flag, though his rich home-cooked diet keeps it in the upper-middle.",
      series: [ p("2018-11-16",228), p("2020-10-13",248), p("2023-09-06",228), p("2024-02-21",197),
        p("2024-09-20",224), p("2025-03-27",205), p("2025-09-11",252), p("2026-03-09",228) ]
    },
    {
      id: "ck", name: "Creatine kinase", abbr: "CK", cat: "Metabolic", unit: "U/L",
      refLow: 10, refHigh: 200, refNote: "10–200 · reference lab only",
      about: "An enzyme released by muscle. Rises with muscle injury, strenuous activity, or sometimes a difficult blood draw.",
      impact: "Normal range overall; the 174 (Sep 2023) likely reflects muscle/handling rather than disease.",
      series: [ p("2020-10-13",121), p("2023-09-06",174), p("2024-09-20",89), p("2025-09-11",153) ]
    },
    {
      id: "t4", name: "Thyroxine (T4)", abbr: "T4", cat: "Thyroid", unit: "µg/dL",
      refLow: 1.0, refHigh: 4.0, refNote: "1.0–4.0",
      about: "The main thyroid hormone, which sets metabolic rate. Low T4 (hypothyroidism) can cause weight gain, lethargy, and skin/coat problems.",
      impact: "Luke's T4 sits low-normal (1.5–1.7). Not diagnostic of hypothyroidism by itself, but worth keeping in mind given his skin history; a free-T4/TSH add-on would clarify if signs appear.",
      series: [ p("2023-09-06",1.5), p("2024-09-20",1.7), p("2025-09-11",1.7) ]
    },

    /* ---------------------- CBC: RED ---------------------- */
    {
      id: "hct", name: "Hematocrit", abbr: "HCT", cat: "Red cells", unit: "%",
      refLow: 38.3, refHigh: 56.5, refNote: "≈ 38–57 (varies by lab)",
      about: "The percentage of blood made up of red cells — a direct measure of anemia (low) or dehydration/excess (high).",
      impact: "Healthy on most panels (41–55). The 32 (Sep 2023) flagged 'low' but that sample was hemolyzed and lipemic, making it unreliable; follow-up values were normal.",
      series: [ p("2018-11-16",54.7), p("2020-10-13",41.0), p("2023-09-06",32.0,"L"),
        p("2024-09-20",53.2), p("2025-09-11",53.2) ],
      pointNote: { "2023-09-06": "Hemolyzed/lipemic sample — value unreliable." }
    },
    {
      id: "hgb", name: "Hemoglobin", abbr: "HGB", cat: "Red cells", unit: "g/dL",
      refLow: 13.4, refHigh: 20.7, refNote: "≈ 13.4–21.7 (varies by lab)",
      about: "The oxygen-carrying protein in red cells. Tracks closely with hematocrit.",
      impact: "Normal where measurable (17.5–19.9). Two panels couldn't report it because lipemia/hemolysis interfered with the analyzer.",
      series: [ p("2018-11-16",19.9), p("2024-09-20",17.5), p("2025-09-11",18.8) ],
      extraRows: [
        { d:"2020-10-13", label:"HGB", v:"see notes", note:"lipemia — not reportable" },
        { d:"2023-09-06", label:"HGB", v:"see notes", note:"lipemia/hemolysis — not reportable" }
      ]
    },
    {
      id: "rbc", name: "Red blood cell count", abbr: "RBC", cat: "Red cells", unit: "M/µL",
      refLow: 5.39, refHigh: 8.95, refNote: "≈ 5.4–8.95",
      about: "The number of red cells per volume of blood.",
      impact: "Within range throughout (6.4–8.31). No persistent anemia.",
      series: [ p("2018-11-16",8.31), p("2020-10-13",6.59), p("2023-09-06",6.41),
        p("2024-09-20",7.73), p("2025-09-11",8.23) ]
    },
    {
      id: "mcv", name: "Mean cell volume", abbr: "MCV", cat: "Red cells", unit: "fL",
      refLow: 59, refHigh: 76, refNote: "59–76",
      about: "Average red-cell size. Small cells (low MCV) can indicate iron issues; large cells point elsewhere.",
      impact: "Normal except a 50 (Sep 2023) flagged low — again from that hemolyzed sample, not a true finding.",
      series: [ p("2018-11-16",65.8), p("2020-10-13",62), p("2023-09-06",50,"L"),
        p("2024-09-20",69), p("2025-09-11",65) ],
      pointNote: { "2023-09-06": "Artifact of hemolysis." }
    },
    {
      id: "mch", name: "Mean cell hemoglobin", abbr: "MCH", cat: "Red cells", unit: "pg",
      refLow: 21.9, refHigh: 26.7, refNote: "≈ 21.9–26.7",
      about: "Average amount of hemoglobin per red cell.",
      impact: "Normal where reportable (22.6–23.9).",
      series: [ p("2018-11-16",23.9), p("2024-09-20",22.6), p("2025-09-11",22.8) ]
    },
    {
      id: "mchc", name: "Mean cell Hgb concentration", abbr: "MCHC", cat: "Red cells", unit: "g/dL",
      refLow: 32.0, refHigh: 38.0, refNote: "≈ 32–39",
      about: "Hemoglobin concentration within red cells.",
      impact: "Normal where reportable (32.9–36.4).",
      series: [ p("2018-11-16",36.4), p("2024-09-20",32.9), p("2025-09-11",35.3) ]
    },
    {
      id: "rdw", name: "Red cell distribution width", abbr: "RDW", cat: "Red cells", unit: "%",
      refLow: 13.6, refHigh: 21.7, refNote: "≈ 13.6–21.7 (10–19 newer)",
      about: "How variable red-cell size is. A rising RDW can be an early sign of a changing red-cell population.",
      impact: "Within range (17.3–19.7) on the two panels that reported it.",
      series: [ p("2018-11-16",19.7), p("2025-09-11",17.3) ]
    },
    {
      id: "retichgb", name: "Reticulocyte hemoglobin", abbr: "RETIC-HGB", cat: "Red cells", unit: "pg",
      refLow: 23.8, refHigh: 28.3, refNote: "≈ 23.8–28.3 (varies)",
      about: "Hemoglobin in the youngest red cells — an early read on iron availability for making new blood.",
      impact: "Drifting to the low side (23.3, 22.5) on recent panels and flagged low — a subtle hint of reduced iron supply that fits chronic disease; worth watching but not alarming.",
      watch: "A continued fall could signal iron-restricted blood production.",
      series: [ p("2018-11-16",25.1), p("2020-10-13",25.3), p("2023-09-06",25.3),
        p("2024-09-20",23.3,"L"), p("2025-09-11",22.5,"L") ]
    },
    {
      id: "retic", name: "Reticulocytes (absolute)", abbr: "RETIC", cat: "Red cells", unit: "K/µL",
      refLow: 10, refHigh: 110, refNote: "≈ 10–140",
      about: "The count of brand-new red cells — shows how actively the marrow is replacing them.",
      impact: "Normal (38–54), meaning Luke's marrow is producing red cells appropriately, with no regenerative anemia.",
      series: [ p("2018-11-16",54), p("2020-10-13",53), p("2023-09-06",38),
        p("2024-09-20",46), p("2025-09-11",41) ]
    },

    /* ---------------------- CBC: WHITE ---------------------- */
    {
      id: "wbc", name: "White blood cell count", abbr: "WBC", cat: "White cells", unit: "K/µL",
      refLow: 4.9, refHigh: 17.6, refNote: "≈ 4.9–17.6",
      about: "Total infection- and inflammation-fighting cells.",
      impact: "Normal on every panel (7.6–11.8) — no evidence of active infection or marrow problem.",
      series: [ p("2018-11-16",9.14), p("2020-10-13",7.6), p("2023-09-06",11.8),
        p("2024-09-20",8.4), p("2025-09-11",8.2) ]
    },
    {
      id: "neut", name: "Neutrophils (absolute)", abbr: "NEUT", cat: "White cells", unit: "/µL",
      refLow: 2940, refHigh: 12670, refNote: "≈ 2940–12670",
      about: "The front-line white cells against bacterial infection and inflammation.",
      impact: "Normal throughout (5270–8472). No 'stress' or infection leukogram of concern.",
      series: [ p("2018-11-16",5270), p("2020-10-13",5700), p("2023-09-06",8472),
        p("2024-09-20",5620), p("2025-09-11",5929) ]
    },
    {
      id: "lymph", name: "Lymphocytes (absolute)", abbr: "LYMPH", cat: "White cells", unit: "/µL",
      refLow: 1060, refHigh: 4950, refNote: "≈ 1000–4950",
      about: "White cells central to the immune response and antibody production.",
      impact: "Normal (1353–1856) across all panels.",
      series: [ p("2018-11-16",1840), p("2020-10-13",1596), p("2023-09-06",1770),
        p("2024-09-20",1856), p("2025-09-11",1353) ]
    },
    {
      id: "mono", name: "Monocytes (absolute)", abbr: "MONO", cat: "White cells", unit: "/µL",
      refLow: 130, refHigh: 1150, refNote: "≈ 130–1150",
      about: "White cells that clean up debris and support longer-term inflammation.",
      impact: "Within range (152–560) on every panel.",
      series: [ p("2018-11-16",560), p("2020-10-13",152), p("2023-09-06",260),
        p("2024-09-20",361), p("2025-09-11",500) ]
    },
    {
      id: "eos", name: "Eosinophils (absolute)", abbr: "EOS", cat: "White cells", unit: "/µL",
      refLow: 70, refHigh: 1490, refNote: "≈ 70–1490 (2018: 60–1230)",
      about: "White cells tied to allergies and parasites.",
      impact: "Elevated in 2018 (1450, flagged high) and high-normal in 2023 (1286) — a fingerprint of Luke's long-standing allergic skin disease. Recent panels are mid-range.",
      series: [ p("2018-11-16",1450,"H"), p("2020-10-13",152), p("2023-09-06",1286),
        p("2024-09-20",554), p("2025-09-11",410) ]
    },
    {
      id: "baso", name: "Basophils (absolute)", abbr: "BASO", cat: "White cells", unit: "/µL",
      refLow: 0, refHigh: 100, refNote: "0–100",
      about: "The rarest white cells, involved in allergic and inflammatory responses.",
      impact: "Normal (0–20) throughout.",
      series: [ p("2018-11-16",20), p("2020-10-13",0), p("2023-09-06",12),
        p("2024-09-20",8), p("2025-09-11",8) ]
    },

    /* ---------------------- CBC: PLATELETS ---------------------- */
    {
      id: "plt", name: "Platelets", abbr: "PLT", cat: "Platelets", unit: "K/µL",
      refLow: 143, refHigh: 448, refNote: "ref lab 143–448 · newer 120–412",
      about: "Tiny cell fragments that form clots and stop bleeding.",
      impact: "Healthy clotting numbers throughout. The 481 (Sep 2025) flagged mildly high — often a benign reaction, and platelets clump on smear, which can skew the count.",
      series: [ p("2018-11-16",220), p("2020-10-13",240), p("2023-09-06",381),
        p("2024-09-20",348), p("2025-09-11",481,"H") ],
      pointNote: { "2020-10-13": "Manual method gave 222 (clumping)." }
    },

    /* ---------------------- COAGULATION ---------------------- */
    {
      id: "pt", name: "Prothrombin time (PT)", abbr: "PT", cat: "Clotting", unit: "sec",
      refLow: 6.3, refHigh: 13.3, refNote: "6.3–13.3",
      about: "How quickly blood clots via one of the clotting pathways. Prolonged times can mean clotting-factor or liver problems, or rodenticide exposure.",
      impact: "Measured once (Oct 2020) at 8.0 — normal, confirming healthy clotting before a procedure.",
      series: [ p("2020-10-13",8.0) ]
    },
    {
      id: "ptt", name: "Partial thromboplastin time (PTT)", abbr: "PTT", cat: "Clotting", unit: "sec",
      refLow: 10.6, refHigh: 16.8, refNote: "10.6–16.8",
      about: "Tests the other main clotting pathway. Read with PT to assess bleeding risk.",
      impact: "Measured once (Oct 2020) at 12.4 — normal.",
      series: [ p("2020-10-13",12.4) ]
    }
  ];

  /* ---------------------- URINALYSIS (qualitative) ---------------------- */
  const urine = {
    id: "ua", name: "Urinalysis", cat: "Urine",
    about: "Examines the urine's concentration, chemistry, and sediment. It's the partner test to a kidney blood panel — it shows how well the kidneys concentrate urine, whether protein is leaking, and whether there's infection, crystals, or blood.",
    impact: "For Luke, urine concentration (specific gravity) and protein matter most: in CKD the kidneys lose concentrating ability and may leak protein. His 2023 sample showed dilute-ish, slightly protein-positive urine with struvite crystals and a few red cells; the 2018 (cystocentesis) sample showed concentrated urine with blood and bacteria, treated as a lower urinary issue at the time. A urine protein:creatinine ratio is the recommended next step.",
    columns: ["Nov 2018 · cystocentesis", "Sep 2023 · free catch"],
    rows: [
      ["Specific gravity", ">1.050  (H)", "1.033", "concentrating ability"],
      ["pH", "9.0", "7.5", "—"],
      ["Protein", "trace", "1+", "proteinuria → recheck with UPC"],
      ["Glucose", "negative", "negative", "screens for diabetes/tubular loss"],
      ["Ketones", "negative", "trace", "trace is non-specific here"],
      ["Blood", "250 Ery/µL", "negative", "—"],
      ["Bilirubin", "negative", "negative", "—"],
      ["Color / clarity", "pale yellow / clear", "dark yellow / cloudy", "—"],
      ["RBC (sediment)", ">50 /HPF", "0–2 /HPF", "—"],
      ["WBC (sediment)", "1 /HPF", "0–2 /HPF", "ref 0–5"],
      ["Crystals", "crystalline debris", "2+ struvite", "—"],
      ["Bacteria", "cocci present", "none seen", "—"]
    ],
    note: "Two urinalyses are on file. Both pre-date the formal CKD diagnosis; no urine was obtained at the 2024 or 2025 senior panels (samples weren't collected)."
  };

  return { PANEL, tests, urine };
})();

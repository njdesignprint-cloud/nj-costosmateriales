document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // ====== Logo loader ======
  function loadLogo(imgEl) {
    if (!imgEl) return;
    const v = Date.now();
    const candidates = [
      "./images/logo.png",
      "images/logo.png",
      "/images/logo.png",
      `./images/logo.png?v=${v}`,
      `images/logo.png?v=${v}`,
      `/images/logo.png?v=${v}`,
    ];
    let i = 0;
    const tryNext = () => {
      if (i >= candidates.length) return;
      imgEl.src = candidates[i++];
    };
    imgEl.onerror = tryNext;
    tryNext();
  }


  const LANG_KEY = "nj_estimator_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "es";
  const I18N = {
  "es": {
    "meta": {
      "title": "NJ Design & Print — Costos de Producción"
    },
    "brand": {
      "title": "NJ Design & Print — Costos de Producción",
      "contact": "346-213-5545 · njdesignprintllc.com",
      "modeHtml": "Modo: <b>costo de producción</b> (no precio al cliente)"
    },
    "main": {
      "question": "¿Qué vas a calcular?",
      "optionLabel": "Opción",
      "selectOption": "— Selecciona —",
      "noteLabel": "Nota (opcional)",
      "notePlaceholder": "Ej: Trabajo #23 / Cliente X",
      "resetBtn": "Limpiar"
    },
    "common": {
      "modePrefix": "Modo: ",
      "modeEmpty": "Modo: —",
      "home": "Casa",
      "buy": "Comprar",
      "inches": "Pulgadas (in)",
      "feet": "Pies (ft)",
      "width": "Ancho",
      "height": "Alto",
      "qty": "Cantidad (qty)",
      "qtyPieces": "Cantidad (piezas)",
      "selectedPrice": "Precio seleccionado (USD / ft²)",
      "rollSize": "Tamaño del rollo",
      "rollPrice": "Precio del rollo (USD)",
      "source": "Fuente",
      "totalArea": "Área total",
      "materialCost": "Costo material",
      "costPerFt2": "Costo/ft²",
      "materialCostUse": "Costo material (uso)",
      "totalPlusShipping": "Total + shipping"
    },
    "modes": {
      "tint": "Commercial Windows Tint",
      "printing": "Printing Cost",
      "decals": "Decals"
    },
    "modeTitles": {
      "tint": "Commercial Windows Tint — Costo de material",
      "printing": "Printing Cost — Costo por ft²",
      "decals": "Decals"
    },
    "status": {
      "checkRoll": "⚠️ Revisa el ancho y el precio del rollo.",
      "selectPrintType": "⚠️ Selecciona un tipo de impresión.",
      "setVinylPrice": "⚠️ Pon el precio del rollo del vinil para calcular.",
      "setTapePrice": "⚠️ Pon el precio del rollo del transfer para calcular."
    },
    "tint": {
      "baseTitle": "Base (largo fijo)",
      "baseInfoHtml": "<div><b>Largo base:</b> 100 ft (fijo)</div><div><b>Fórmula:</b> costo/ft² = precio rollo ÷ ((ancho_in/12) × 100)</div>",
      "baseSummaryArea": "Área base",
      "baseSummaryCpp": "Costo/ft²",
      "rollDataTitle": "1) Datos del rollo",
      "rollWidthLabel": "Ancho del rollo (in)",
      "rollPriceLabel": "Precio del rollo (USD)",
      "calcMethodTitle": "2) ¿Cómo quieres calcular?",
      "methodLabel": "Método",
      "methodEmpty": "— Selecciona —",
      "methodUse": "Calcular material usado (corte)",
      "methodWins": "Calcular por ventanas",
      "methodHint": "Solo se mostrará la opción que elijas.",
      "useTitle": "Material que vas a usar (del rollo)",
      "useWidthLabel": "Ancho usado (in)",
      "useLengthLabel": "Largo usado",
      "useLengthUnitLabel": "Unidad del largo usado",
      "useQtyLabel": "Cantidad (piezas)",
      "calcUseBtn": "Calcular costo del material usado",
      "useAreaLabel": "Área total",
      "useCostLabel": "Costo material",
      "useCppLabel": "Costo/ft²",
      "winsTitle": "Ventanas (calcula pulgadas de material + ft²)",
      "winsInfoHtml": "<div><b>Cómo se calcula:</b> asume que cada ventana consume el largo según su <b>alto</b>.</div><div>Si una ventana es más ancha que el rollo ⇒ se paneliza y consume <b>alto × paneles</b>.</div>",
      "winHeadDesc": "Descripción",
      "winHeadWidth": "Ancho (in)",
      "winHeadHeight": "Alto (in)",
      "winHeadQty": "Qty",
      "addWinBtn": "+ Agregar ventana",
      "calcWinsBtn": "Calcular material (pulgadas + ft²)",
      "winLenInLabel": "Largo total (in)",
      "winLenFtLabel": "Largo total (ft)",
      "winCostLabel": "Costo material",
      "winMatFt2Label": "Área material (ft²)",
      "winWinFt2Label": "Área ventanas (ft²)",
      "winCppLabel": "Costo/ft²",
      "winDescPlaceholder": "Ej: Door / Small window",
      "deleteWindow": "Eliminar",
      "defaultWindowDesc": "Ventana",
      "windowNumber": "Ventana {n}",
      "winLine": "• {desc}: {w}\"×{h}\" · Qty {qty} · Paneles {panels} ⇒ Largo {len} in",
      "useNotesHtml": "Rollo: ancho <b>{rollW}\"</b> · largo fijo <b>{baseFt}ft</b> · precio <b>{rollPrice}</b><br>Costo/ft²: <b>{cpp}/ft²</b><br><br>Uso: ancho <b>{useW}\"</b> · largo <b>{shownLen}</b> · qty <b>{qty}</b><br>Costo material: <b>{cost}</b>",
      "winsNotesHtml": "Rollo: ancho <b>{rollW}\"</b> · largo fijo <b>{baseFt}ft</b> · precio <b>{rollPrice}</b><br>Costo/ft²: <b>{cpp}/ft²</b><br><br><div style=\"white-space:pre-wrap\">{lines}</div><br>Largo total: <b>{totalIn} in</b> ({totalFt} ft)<br>Área material: <b>{matFt2} ft²</b><br>Costo material: <b>{cost}</b>"
    },
    "printing": {
      "title": "Printing Cost (precio por ft²)",
      "infoHtml": "<div><b>Instrucción:</b> selecciona el material y escribe ancho/largo.</div><div>Si escribes en <b>pulgadas</b>, se convierte automáticamente a <b>pies cuadrados (ft²)</b>.</div>",
      "typeLabel": "Tipo de impresión",
      "typeBasic": "Vinil Adhesivo Básico — $2.50 / ft²",
      "typeLam": "Vinil Adhesivo Básico Laminado — $3.50 / ft²",
      "typeMicroperf": "Vinil Microperforado — $3.80 / ft²",
      "typeBanner": "Lona — $3.80 / ft²",
      "typeWrap": "Wrap de Autos — $7.00 / ft²",
      "rateLabel": "Precio seleccionado (USD / ft²)",
      "widthLabel": "Ancho",
      "lengthLabel": "Largo",
      "unitLabel": "Unidad (ancho/largo)",
      "qtyLabel": "Cantidad (qty)",
      "calcBtn": "Calcular Printing Cost",
      "areaOneLabel": "Área (1 pieza)",
      "areaTotalLabel": "Área total",
      "costLabel": "Costo impresión",
      "notesHtml": "Tipo: <b>{type}</b><br>Medidas: <b>{w}</b> × <b>{l}</b> ({unit}) · Qty <b>{qty}</b><br>Tarifa: <b>{rate}/ft²</b><br>Costo total: <b>{cost}</b>"
    },
    "decals": {
      "title": "Decals",
      "introHtml": "<div><b>Nota:</b> tú pones el precio del rollo y la app lo guarda para ese tamaño.</div><div>Si compras, puedes agregar shipping (opcional).</div>",
      "materialsTitle": "0) Materiales",
      "vinylTypeLabel": "Tipo de vinil",
      "tapeTypeLabel": "Papel transfer",
      "jobTitle": "1) Datos del trabajo",
      "decalWLabel": "Ancho del decal",
      "decalHLabel": "Alto del decal",
      "decalUnitLabel": "Unidad (ancho/alto)",
      "decalQtyLabel": "Cantidad (qty)",
      "areaBoxFt2": "Área total (ft²)",
      "areaBoxIn2": "Área total (in²)",
      "oraTitle": "2) Vinil (ORAFOL 651)",
      "tapeTitle": "3) Transfer (RTape 4075RLA)",
      "sourceLabel": "Fuente",
      "home": "Tengo en casa",
      "buy": "Comprar",
      "rollSizeLabel": "Tamaño del rollo",
      "oraPriceLabel": "Precio del rollo (USD)",
      "oraCppLabel": "Costo vinil (USD/ft²)",
      "tapePriceLabel": "Precio del rollo (USD)",
      "tapeCppLabel": "Costo transfer (USD/ft²)",
      "shippingTitle": "4) Shipping (si compras)",
      "shipCostLabel": "Shipping total del pedido (USD)",
      "shippingHint": "Se suma solo si seleccionas “Comprar” en vinil o transfer.",
      "calcBtn": "Calcular Decals",
      "areaLabel": "Área total",
      "matCostLabel": "Costo material (uso)",
      "totalLabel": "Total + shipping",
      "materialsLine": "<b>Materiales:</b> {vinyl} + {tape}<br><br>",
      "jobLine": "<b>Trabajo:</b> {w} × {h} ({unit}) · Qty {qty}<br><b>Área total:</b> {area} ft²<br><br>",
      "vinylLine": "<b>Vinil</b> ({src}): {roll} · Precio rollo {price} · CPP {cpp}/ft²<br>",
      "tapeLine": "<b>Transfer</b> ({src}): {roll} · Precio rollo {price} · CPP {cpp}/ft²<br><br>",
      "shipIncluded": "Shipping incluido: <b>{ship}</b>",
      "shipHome": "Shipping: <b>$0.00</b> (usando material en casa)",
      "totalEstimated": "<b>Total estimado:</b> {total}"
    }
  },
  "en": {
    "meta": {
      "title": "NJ Design & Print — Production Costs"
    },
    "brand": {
      "title": "NJ Design & Print — Production Costs",
      "contact": "346-213-5545 · njdesignprintllc.com",
      "modeHtml": "Mode: <b>production cost</b> (not customer price)"
    },
    "main": {
      "question": "What do you want to calculate?",
      "optionLabel": "Option",
      "selectOption": "— Select —",
      "noteLabel": "Note (optional)",
      "notePlaceholder": "Ex: Job #23 / Client X",
      "resetBtn": "Clear"
    },
    "common": {
      "modePrefix": "Mode: ",
      "modeEmpty": "Mode: —",
      "home": "Home",
      "buy": "Buy",
      "inches": "Inches (in)",
      "feet": "Feet (ft)",
      "width": "Width",
      "height": "Height",
      "qty": "Quantity (qty)",
      "qtyPieces": "Quantity (pieces)",
      "selectedPrice": "Selected price (USD / ft²)",
      "rollSize": "Roll size",
      "rollPrice": "Roll price (USD)",
      "source": "Source",
      "totalArea": "Total area",
      "materialCost": "Material cost",
      "costPerFt2": "Cost/ft²",
      "materialCostUse": "Material cost (usage)",
      "totalPlusShipping": "Total + shipping"
    },
    "modes": {
      "tint": "Commercial Windows Tint",
      "printing": "Printing Cost",
      "decals": "Decals"
    },
    "modeTitles": {
      "tint": "Commercial Windows Tint — Material Cost",
      "printing": "Printing Cost — Cost per ft²",
      "decals": "Decals"
    },
    "status": {
      "checkRoll": "⚠️ Check the roll width and roll price.",
      "selectPrintType": "⚠️ Select a print type.",
      "setVinylPrice": "⚠️ Enter the vinyl roll price to calculate.",
      "setTapePrice": "⚠️ Enter the transfer tape roll price to calculate."
    },
    "tint": {
      "baseTitle": "Base (fixed length)",
      "baseInfoHtml": "<div><b>Base length:</b> 100 ft (fixed)</div><div><b>Formula:</b> cost/ft² = roll price ÷ ((width_in/12) × 100)</div>",
      "baseSummaryArea": "Base area",
      "baseSummaryCpp": "Cost/ft²",
      "rollDataTitle": "1) Roll data",
      "rollWidthLabel": "Roll width (in)",
      "rollPriceLabel": "Roll price (USD)",
      "calcMethodTitle": "2) How do you want to calculate?",
      "methodLabel": "Method",
      "methodEmpty": "— Select —",
      "methodUse": "Calculate material used (cut)",
      "methodWins": "Calculate by windows",
      "methodHint": "Only the method you choose will be shown.",
      "useTitle": "Material you will use (from the roll)",
      "useWidthLabel": "Used width (in)",
      "useLengthLabel": "Used length",
      "useLengthUnitLabel": "Used length unit",
      "useQtyLabel": "Quantity (pieces)",
      "calcUseBtn": "Calculate used material cost",
      "useAreaLabel": "Total area",
      "useCostLabel": "Material cost",
      "useCppLabel": "Cost/ft²",
      "winsTitle": "Windows (calculates material inches + ft²)",
      "winsInfoHtml": "<div><b>How it works:</b> assumes each window consumes length based on its <b>height</b>.</div><div>If a window is wider than the roll ⇒ it is paneled and consumes <b>height × panels</b>.</div>",
      "winHeadDesc": "Description",
      "winHeadWidth": "Width (in)",
      "winHeadHeight": "Height (in)",
      "winHeadQty": "Qty",
      "addWinBtn": "+ Add window",
      "calcWinsBtn": "Calculate material (inches + ft²)",
      "winLenInLabel": "Total length (in)",
      "winLenFtLabel": "Total length (ft)",
      "winCostLabel": "Material cost",
      "winMatFt2Label": "Material area (ft²)",
      "winWinFt2Label": "Window area (ft²)",
      "winCppLabel": "Cost/ft²",
      "winDescPlaceholder": "Ex: Door / Small window",
      "deleteWindow": "Delete",
      "defaultWindowDesc": "Window",
      "windowNumber": "Window {n}",
      "winLine": "• {desc}: {w}\"×{h}\" · Qty {qty} · Panels {panels} ⇒ Length {len} in",
      "useNotesHtml": "Roll: width <b>{rollW}\"</b> · fixed length <b>{baseFt}ft</b> · price <b>{rollPrice}</b><br>Cost/ft²: <b>{cpp}/ft²</b><br><br>Usage: width <b>{useW}\"</b> · length <b>{shownLen}</b> · qty <b>{qty}</b><br>Material cost: <b>{cost}</b>",
      "winsNotesHtml": "Roll: width <b>{rollW}\"</b> · fixed length <b>{baseFt}ft</b> · price <b>{rollPrice}</b><br>Cost/ft²: <b>{cpp}/ft²</b><br><br><div style=\"white-space:pre-wrap\">{lines}</div><br>Total length: <b>{totalIn} in</b> ({totalFt} ft)<br>Material area: <b>{matFt2} ft²</b><br>Material cost: <b>{cost}</b>"
    },
    "printing": {
      "title": "Printing Cost (cost per ft²)",
      "infoHtml": "<div><b>Instruction:</b> select the material and enter width/length.</div><div>If you enter <b>inches</b>, it automatically converts to <b>square feet (ft²)</b>.</div>",
      "typeLabel": "Print type",
      "typeBasic": "Basic adhesive vinyl — $2.50 / ft²",
      "typeLam": "Basic adhesive vinyl laminated — $3.50 / ft²",
      "typeMicroperf": "Micro-perforated vinyl — $3.80 / ft²",
      "typeBanner": "Banner — $3.80 / ft²",
      "typeWrap": "Vehicle wrap — $7.00 / ft²",
      "rateLabel": "Selected price (USD / ft²)",
      "widthLabel": "Width",
      "lengthLabel": "Length",
      "unitLabel": "Unit (width/length)",
      "qtyLabel": "Quantity (qty)",
      "calcBtn": "Calculate Printing Cost",
      "areaOneLabel": "Area (1 piece)",
      "areaTotalLabel": "Total area",
      "costLabel": "Printing cost",
      "notesHtml": "Type: <b>{type}</b><br>Size: <b>{w}</b> × <b>{l}</b> ({unit}) · Qty <b>{qty}</b><br>Rate: <b>{rate}/ft²</b><br>Total cost: <b>{cost}</b>"
    },
    "decals": {
      "title": "Decals",
      "introHtml": "<div><b>Note:</b> you enter the roll price and the app saves it for that size.</div><div>If you buy material, you can add shipping (optional).</div>",
      "materialsTitle": "0) Materials",
      "vinylTypeLabel": "Vinyl type",
      "tapeTypeLabel": "Transfer tape",
      "jobTitle": "1) Job data",
      "decalWLabel": "Decal width",
      "decalHLabel": "Decal height",
      "decalUnitLabel": "Unit (width/height)",
      "decalQtyLabel": "Quantity (qty)",
      "areaBoxFt2": "Total area (ft²)",
      "areaBoxIn2": "Total area (in²)",
      "oraTitle": "2) Vinyl (ORAFOL 651)",
      "tapeTitle": "3) Transfer tape (RTape 4075RLA)",
      "sourceLabel": "Source",
      "home": "Have it in shop",
      "buy": "Buy",
      "rollSizeLabel": "Roll size",
      "oraPriceLabel": "Roll price (USD)",
      "oraCppLabel": "Vinyl cost (USD/ft²)",
      "tapePriceLabel": "Roll price (USD)",
      "tapeCppLabel": "Transfer tape cost (USD/ft²)",
      "shippingTitle": "4) Shipping (if buying)",
      "shipCostLabel": "Total order shipping (USD)",
      "shippingHint": "Added only if you select “Buy” for vinyl or transfer tape.",
      "calcBtn": "Calculate Decals",
      "areaLabel": "Total area",
      "matCostLabel": "Material cost (usage)",
      "totalLabel": "Total + shipping",
      "materialsLine": "<b>Materials:</b> {vinyl} + {tape}<br><br>",
      "jobLine": "<b>Job:</b> {w} × {h} ({unit}) · Qty {qty}<br><b>Total area:</b> {area} ft²<br><br>",
      "vinylLine": "<b>Vinyl</b> ({src}): {roll} · Roll price {price} · CPP {cpp}/ft²<br>",
      "tapeLine": "<b>Transfer tape</b> ({src}): {roll} · Roll price {price} · CPP {cpp}/ft²<br><br>",
      "shipIncluded": "Shipping included: <b>{ship}</b>",
      "shipHome": "Shipping: <b>$0.00</b> (using material already in shop)",
      "totalEstimated": "<b>Estimated total:</b> {total}"
    }
  }
};

  function t(path, vars = {}) {
    const source = I18N[currentLang] || I18N.es;
    const value = path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), source);
    const text = value == null ? path : value;
    return String(text).replace(/\{(\w+)\}/g, (_, key) => vars[key] != null ? vars[key] : "");
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function setHtml(id, html) {
    const el = $(id);
    if (el) el.innerHTML = html;
  }

  function setPlaceholder(id, text) {
    const el = $(id);
    if (el) el.placeholder = text;
  }

  function setOptionText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function setActiveLangButton() {
    $("langEs")?.classList.toggle("active", currentLang === "es");
    $("langEn")?.classList.toggle("active", currentLang === "en");
  }

  // ====== Helpers ======
  const statusBar = $("statusBar");
  function setStatus(msg, key = "") {
    if (!statusBar) return;
    statusBar.hidden = !msg;
    statusBar.textContent = msg || "";
    if (key) statusBar.dataset.i18nKey = key;
    else delete statusBar.dataset.i18nKey;
  }

  function setStatusKey(key) {
    setStatus(t(key), key);
  }

  function safeNum(el, fallback = 0) {
    const v = Number(el?.value);
    return Number.isFinite(v) ? v : fallback;
  }

  function money(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return "$0.00";
    const locale = currentLang === "es" ? "es-US" : "en-US";
    return x.toLocaleString(locale, { style: "currency", currency: "USD" });
  }

  function clampMin(n, minVal) {
    return Math.max(minVal, n);
  }

  function lengthToFeet(len, unit) {
    return unit === "in" ? (len / 12) : len;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (s) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[s]));
  }

  function rollAreaFt2(widthIn, lengthYd) {
    // width in inches, length in yards (1yd = 3ft)
    return (widthIn / 12) * (lengthYd * 3);
  }

  // ===== INIT LOGO =====
  loadLogo($("brandLogo"));

  // ====== Common UI ======
  const quoteSelect = $("quoteSelect");
  const viewBox = $("viewBox");
  const viewTitle = $("viewTitle");
  const currentMode = $("currentMode");
  const resetBtn = $("resetBtn");

  function getModeLabel(mode) {
    return t(`modes.${mode}`) || mode;
  }

  function renderViewTitle(mode) {
    if (!viewTitle) return;
    viewTitle.innerHTML = `<b>${t(`modeTitles.${mode}`) || mode}</b>`;
  }

  function updateCurrentModePill(mode = "") {
    if (!currentMode) return;
    currentMode.textContent = mode ? `${t("common.modePrefix")}${getModeLabel(mode)}` : t("common.modeEmpty");
  }

  function updateWinRowsUi() {
    [...($("winList")?.children || [])].forEach((row) => {
      const desc = row.querySelector(".winDesc");
      const del = row.querySelector("button");
      if (desc) desc.placeholder = t("tint.winDescPlaceholder");
      if (del) del.title = t("tint.deleteWindow");
    });
  }

  function refreshVisibleResults() {
    if (!$("viewBox") || $("viewBox").hidden) return;
    if (!$("view-tint")?.hidden) {
      if (!$("useResult")?.hidden) $("calcUse")?.click();
      if (!$("winResult")?.hidden) $("calcWins")?.click();
    }
    if (!$("view-printing")?.hidden && !$("printResult")?.hidden) {
      $("calcPrint")?.click();
    }
    if (!$("view-decals")?.hidden && !$("decalsResult")?.hidden) {
      $("calcDecals")?.click();
    }
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.title = t("meta.title");
    setActiveLangButton();

    setText("brandTitle", t("brand.title"));
    setText("brandContact", t("brand.contact"));
    setHtml("brandModeText", t("brand.modeHtml"));

    setText("mainQuestionTitle", t("main.question"));
    setText("quoteSelectLabel", t("main.optionLabel"));
    setOptionText("quoteOptionEmpty", t("main.selectOption"));
    setOptionText("quoteOptionTint", t("modeTitles.tint"));
    setOptionText("quoteOptionPrinting", t("modeTitles.printing"));
    setOptionText("quoteOptionDecals", t("modeTitles.decals"));
    setText("noteLabel", t("main.noteLabel"));
    setPlaceholder("note", t("main.notePlaceholder"));
    setText("resetBtn", t("main.resetBtn"));

    setText("tintBaseTitle", t("tint.baseTitle"));
    setHtml("tintBaseInfo", t("tint.baseInfoHtml"));
    setText("tintRollDataTitle", t("tint.rollDataTitle"));
    setText("rollWidthInLabel", t("tint.rollWidthLabel"));
    setText("rollPriceLabel", t("tint.rollPriceLabel"));
    setText("tintCalcMethodTitle", t("tint.calcMethodTitle"));
    setText("tintMethodLabel", t("tint.methodLabel"));
    setOptionText("tintMethodEmpty", t("tint.methodEmpty"));
    setOptionText("tintMethodUse", t("tint.methodUse"));
    setOptionText("tintMethodWins", t("tint.methodWins"));
    setText("tintMethodHint", t("tint.methodHint"));
    setText("tintUseTitle", t("tint.useTitle"));
    setText("useWidthInLabel", t("tint.useWidthLabel"));
    setText("useLengthLabel", t("tint.useLengthLabel"));
    setText("useLengthUnitLabel", t("tint.useLengthUnitLabel"));
    setOptionText("useLengthUnitIn", t("common.inches"));
    setOptionText("useLengthUnitFt", t("common.feet"));
    setText("useQtyLabel", t("tint.useQtyLabel"));
    setText("calcUse", t("tint.calcUseBtn"));
    setText("useAreaLabel", t("tint.useAreaLabel"));
    setText("useCostLabel", t("tint.useCostLabel"));
    setText("useCppLabel", t("tint.useCppLabel"));
    setText("tintWinsTitle", t("tint.winsTitle"));
    setHtml("tintWinsInfo", t("tint.winsInfoHtml"));
    setText("winHeadDesc", t("tint.winHeadDesc"));
    setText("winHeadWidth", t("tint.winHeadWidth"));
    setText("winHeadHeight", t("tint.winHeadHeight"));
    setText("winHeadQty", t("tint.winHeadQty"));
    setText("addWin", t("tint.addWinBtn"));
    setText("calcWins", t("tint.calcWinsBtn"));
    setText("winLenInLabel", t("tint.winLenInLabel"));
    setText("winLenFtLabel", t("tint.winLenFtLabel"));
    setText("winCostLabel", t("tint.winCostLabel"));
    setText("winMatFt2Label", t("tint.winMatFt2Label"));
    setText("winWinFt2Label", t("tint.winWinFt2Label"));
    setText("winCppLabel", t("tint.winCppLabel"));

    setText("printingTitle", t("printing.title"));
    setHtml("printingInfo", t("printing.infoHtml"));
    setText("printTypeLabel", t("printing.typeLabel"));
    setOptionText("printTypeBasic", t("printing.typeBasic"));
    setOptionText("printTypeLam", t("printing.typeLam"));
    setOptionText("printTypeMicroperf", t("printing.typeMicroperf"));
    setOptionText("printTypeBanner", t("printing.typeBanner"));
    setOptionText("printTypeWrap", t("printing.typeWrap"));
    setText("printRateLabel", t("printing.rateLabel"));
    setText("printWLabel", t("printing.widthLabel"));
    setText("printLLabel", t("printing.lengthLabel"));
    setPlaceholder("printW", currentLang === "es" ? "Ej: 48" : "Ex: 48");
    setPlaceholder("printL", currentLang === "es" ? "Ej: 72" : "Ex: 72");
    setText("printUnitLabel", t("printing.unitLabel"));
    setOptionText("printUnitIn", t("common.inches"));
    setOptionText("printUnitFt", t("common.feet"));
    setText("printQtyLabel", t("printing.qtyLabel"));
    setText("calcPrint", t("printing.calcBtn"));
    setText("printAreaOneLabel", t("printing.areaOneLabel"));
    setText("printAreaTotalLabel", t("printing.areaTotalLabel"));
    setText("printCostLabel", t("printing.costLabel"));

    setText("decalsTitle", t("decals.title"));
    setHtml("decalsIntro", t("decals.introHtml"));
    setText("decalsMaterialsTitle", t("decals.materialsTitle"));
    setText("vinylTypeLabel", t("decals.vinylTypeLabel"));
    setText("tapeTypeLabel", t("decals.tapeTypeLabel"));
    setText("decalsJobTitle", t("decals.jobTitle"));
    setText("decalWLabel", t("decals.decalWLabel"));
    setText("decalHLabel", t("decals.decalHLabel"));
    setText("decalUnitLabel", t("decals.decalUnitLabel"));
    setOptionText("decalUnitIn", t("common.inches"));
    setOptionText("decalUnitFt", t("common.feet"));
    setText("decalQtyLabel", t("decals.decalQtyLabel"));
    setText("oraTitle", t("decals.oraTitle"));
    setText("oraSourceLabel", t("decals.sourceLabel"));
    setOptionText("oraSourceHome", t("decals.home"));
    setOptionText("oraSourceBuy", t("decals.buy"));
    setText("oraRollLabel", t("decals.rollSizeLabel"));
    setText("oraPriceLabel", t("decals.oraPriceLabel"));
    setPlaceholder("oraPrice", currentLang === "es" ? "Ej: 112.95" : "Ex: 112.95");
    setText("oraCppLabel", t("decals.oraCppLabel"));
    setText("tapeTitle", t("decals.tapeTitle"));
    setText("tapeSourceLabel", t("decals.sourceLabel"));
    setOptionText("tapeSourceHome", t("decals.home"));
    setOptionText("tapeSourceBuy", t("decals.buy"));
    setText("tapeRollLabel", t("decals.rollSizeLabel"));
    setText("tapePriceLabel", t("decals.tapePriceLabel"));
    setPlaceholder("tapePrice", currentLang === "es" ? "Ej: 141.07" : "Ex: 141.07");
    setText("tapeCppLabel", t("decals.tapeCppLabel"));
    setText("shippingTitle", t("decals.shippingTitle"));
    setText("shipCostLabel", t("decals.shipCostLabel"));
    setText("shippingHint", t("decals.shippingHint"));
    setText("calcDecals", t("decals.calcBtn"));
    setText("decAreaFt2Label", t("decals.areaLabel"));
    setText("decMatCostLabel", t("decals.matCostLabel"));
    setText("decTotalLabel", t("decals.totalLabel"));

    updateCurrentModePill(quoteSelect?.value || "");
    updateWinRowsUi();
    renderTintBaseSummary();
    updatePrintRateUI();
    updateDecalAreasUI();
    updateDecalsCPPUI();
    if (quoteSelect?.value) renderViewTitle(quoteSelect.value);
    if (statusBar && !statusBar.hidden && statusBar.dataset.i18nKey) {
      setStatusKey(statusBar.dataset.i18nKey);
    }
    refreshVisibleResults();
  }

  function hideAllViews() {
    document.querySelectorAll(".view").forEach(v => v.hidden = true);

    // Tint
    $("method-use") && ($("method-use").hidden = true);
    $("method-wins") && ($("method-wins").hidden = true);
    $("useResult") && ($("useResult").hidden = true);
    $("winResult") && ($("winResult").hidden = true);

    // Printing
    $("printResult") && ($("printResult").hidden = true);

    // Decals
    $("decalsResult") && ($("decalsResult").hidden = true);

    setStatus("");
  }

  function resetAll() {
    if (quoteSelect) quoteSelect.value = "";
    if (viewBox) viewBox.hidden = true;
    updateCurrentModePill("");
    hideAllViews();
  }

  function showView(mode) {
    hideAllViews();
    if (viewBox) viewBox.hidden = false;
    updateCurrentModePill(mode);

    const view = $("view-" + mode);
    if (view) view.hidden = false;

    renderViewTitle(mode);

    if (mode === "tint") {
      $("tintMethod") && ($("tintMethod").value = "");
      $("method-use") && ($("method-use").hidden = true);
      $("method-wins") && ($("method-wins").hidden = true);
      renderTintBaseSummary();
      ensureDefaultWin();
    }

    if (mode === "printing") {
      if (printType && !printType.value) printType.value = "vinyl_basic";
      updatePrintRateUI();
      $("printResult") && ($("printResult").hidden = true);
    }

    if (mode === "decals") {
      initDecalsUI();
      updateDecalAreasUI();
      updateDecalsCPPUI();
      $("decalsResult") && ($("decalsResult").hidden = true);
    }
  }

  quoteSelect?.addEventListener("change", () => {
    const v = quoteSelect.value;
    if (!v) resetAll();
    else showView(v);
  });

  resetBtn?.addEventListener("click", resetAll);
  $("langEs")?.addEventListener("click", () => {
    currentLang = "es";
    localStorage.setItem(LANG_KEY, currentLang);
    applyTranslations();
  });
  $("langEn")?.addEventListener("click", () => {
    currentLang = "en";
    localStorage.setItem(LANG_KEY, currentLang);
    applyTranslations();
  });

  // =========================
  // TINT MODULE
  // =========================
  const BASE_TINT_LENGTH_FT = 100;

  function tintBaseAreaFt2() {
    const wIn = clampMin(safeNum($("rollWidthIn"), 60), 0.01);
    return (wIn / 12) * BASE_TINT_LENGTH_FT;
  }

  function tintCostPerFt2() {
    const price = clampMin(safeNum($("rollPrice"), 350), 0);
    const area = tintBaseAreaFt2();
    return area > 0 ? (price / area) : 0;
  }

  function renderTintBaseSummary() {
    const baseSummary = $("baseSummary");
    if (!baseSummary) return;
    const area = tintBaseAreaFt2();
    const cpp = tintCostPerFt2();
    const areaNote = currentLang === "es" ? "(ancho × 100ft)" : "(width × 100ft)";
    baseSummary.innerHTML =
      `<div><b>${t("tint.baseSummaryArea")}:</b> ${area.toFixed(2)} ft² ${areaNote}</div>` +
      `<div><b>${t("tint.baseSummaryCpp")}:</b> <span class="lime">${money(cpp)}/ft²</span></div>`;
  }

  $("rollWidthIn")?.addEventListener("input", renderTintBaseSummary);
  $("rollWidthIn")?.addEventListener("change", renderTintBaseSummary);
  $("rollPrice")?.addEventListener("input", renderTintBaseSummary);
  $("rollPrice")?.addEventListener("change", renderTintBaseSummary);

  $("tintMethod")?.addEventListener("change", () => {
    const v = $("tintMethod").value;
    $("method-use").hidden = (v !== "use");
    $("method-wins").hidden = (v !== "wins");
    $("useResult") && ($("useResult").hidden = true);
    $("winResult") && ($("winResult").hidden = true);
  });

  $("calcUse")?.addEventListener("click", () => {
    const cpp = tintCostPerFt2();
    if (cpp <= 0) return setStatusKey("status.checkRoll");
    setStatus("");

    const wIn = clampMin(safeNum($("useWidthIn"), 60), 0.01);
    const lenRaw = clampMin(safeNum($("useLength"), 48), 0.01);
    const unit = $("useLengthUnit")?.value || "in";
    const lenFt = lengthToFeet(lenRaw, unit);

    const qty = clampMin(Math.floor(safeNum($("useQty"), 1)), 1);

    const area = ((wIn / 12) * lenFt) * qty;
    const cost = area * cpp;

    $("useResult").hidden = false;
    $("useArea").textContent = `${area.toFixed(2)} ft²`;
    $("useCost").textContent = money(cost);
    $("useCPP").textContent = `${money(cpp)}/ft²`;

    const shownLen = unit === "in" ? `${lenRaw}" = ${lenFt.toFixed(2)} ft` : `${lenRaw} ft`;

    $("useNotes").innerHTML = t("tint.useNotesHtml", {
      rollW: safeNum($("rollWidthIn"), 60),
      baseFt: BASE_TINT_LENGTH_FT,
      rollPrice: money(safeNum($("rollPrice"), 350)),
      cpp: money(cpp),
      useW: wIn,
      shownLen,
      qty,
      cost: money(cost)
    });
  });

  // Ventanas (tint)
  const winList = $("winList");

  function makeWinRow(data) {
    const row = document.createElement("div");
    row.className = "winRow";
    row.innerHTML = `
      <input class="winDesc" type="text" placeholder="${escapeHtml(t("tint.winDescPlaceholder"))}" value="${escapeHtml(data.desc || "")}">
      <input class="winW" type="number" step="0.01" value="${data.wIn ?? 60}">
      <input class="winH" type="number" step="0.01" value="${data.hIn ?? 48}">
      <input class="winQty" type="number" step="1" value="${data.qty ?? 1}">
      <button class="iconBtn" title="${escapeHtml(t("tint.deleteWindow"))}">✕</button>
    `;
    row.querySelector("button")?.addEventListener("click", () => row.remove());
    return row;
  }

  function ensureDefaultWin() {
    if (!winList) return;
    if (winList.children.length === 0) {
      winList.appendChild(makeWinRow({ desc: t("tint.defaultWindowDesc"), wIn: 60, hIn: 48, qty: 1 }));
    }
    updateWinRowsUi();
  }

  $("addWin")?.addEventListener("click", () => {
    winList.appendChild(makeWinRow({ desc: "", wIn: 24, hIn: 36, qty: 1 }));
    updateWinRowsUi();
  });

  $("calcWins")?.addEventListener("click", () => {
    const cpp = tintCostPerFt2();
    if (cpp <= 0) return setStatusKey("status.checkRoll");
    setStatus("");
    ensureDefaultWin();

    const rollW = clampMin(safeNum($("rollWidthIn"), 60), 0.01);

    let totalLinearIn = 0;
    let totalWinAreaFt2 = 0;
    const lines = [];

    [...winList.children].forEach((row, idx) => {
      const desc = row.querySelector(".winDesc")?.value?.trim() || t("tint.windowNumber", { n: idx + 1 });
      const wIn = clampMin(Number(row.querySelector(".winW")?.value || 0), 0.01);
      const hIn = clampMin(Number(row.querySelector(".winH")?.value || 0), 0.01);
      const qty = clampMin(Math.floor(Number(row.querySelector(".winQty")?.value || 1)), 1);

      totalWinAreaFt2 += ((wIn * hIn) / 144) * qty;

      const panels = Math.ceil(wIn / rollW);
      const linearForThisIn = (hIn * panels) * qty;
      totalLinearIn += linearForThisIn;

      lines.push(t("tint.winLine", {
        desc,
        w: wIn,
        h: hIn,
        qty,
        panels,
        len: linearForThisIn.toFixed(2)
      }));
    });

    const totalLinearFt = totalLinearIn / 12;
    const materialAreaFt2 = (rollW * totalLinearIn) / 144;
    const cost = materialAreaFt2 * cpp;

    $("winResult").hidden = false;
    $("winLenIn").textContent = `${totalLinearIn.toFixed(2)} in`;
    $("winLenFt").textContent = `${totalLinearFt.toFixed(2)} ft`;
    $("winMatFt2").textContent = `${materialAreaFt2.toFixed(2)} ft²`;
    $("winWinFt2").textContent = `${totalWinAreaFt2.toFixed(2)} ft²`;
    $("winCPP").textContent = `${money(cpp)}/ft²`;
    $("winCost").textContent = money(cost);

    $("winNotes").innerHTML = t("tint.winsNotesHtml", {
      rollW,
      baseFt: BASE_TINT_LENGTH_FT,
      rollPrice: money(safeNum($("rollPrice"), 350)),
      cpp: money(cpp),
      lines: escapeHtml(lines.join("\n")),
      totalIn: totalLinearIn.toFixed(2),
      totalFt: totalLinearFt.toFixed(2),
      matFt2: materialAreaFt2.toFixed(2),
      cost: money(cost)
    });
  });

  // =========================
  // PRINTING COST MODULE
  // =========================
  const PRINT_RATES = {
    vinyl_basic: 2.50,
    vinyl_basic_lam: 3.50,
    microperf: 3.80,
    lona: 3.80,
    wrap: 7.00,
  };

  const printType = $("printType");
  const printRate = $("printRate");

  function updatePrintRateUI() {
    const key = printType?.value || "vinyl_basic";
    const rate = PRINT_RATES[key];
    if (!printRate) return;
    printRate.value = (rate != null) ? `${money(rate)} / ft²` : "—";
  }

  printType?.addEventListener("change", () => {
    updatePrintRateUI();
    $("printResult") && ($("printResult").hidden = true);
  });

  $("calcPrint")?.addEventListener("click", () => {
    const key = printType?.value || "vinyl_basic";
    const rate = PRINT_RATES[key];
    if (rate == null) return setStatusKey("status.selectPrintType");
    setStatus("");

    const w = clampMin(safeNum($("printW"), 0), 0.01);
    const l = clampMin(safeNum($("printL"), 0), 0.01);
    const unit = $("printUnit")?.value || "in";
    const qty = clampMin(Math.floor(safeNum($("printQty"), 1)), 1);

    const wFt = lengthToFeet(w, unit);
    const lFt = lengthToFeet(l, unit);

    const areaOne = wFt * lFt;
    const areaTotal = areaOne * qty;
    const cost = areaTotal * rate;

    $("printResult").hidden = false;
    $("printAreaOne").textContent = `${areaOne.toFixed(2)} ft²`;
    $("printAreaTotal").textContent = `${areaTotal.toFixed(2)} ft²`;
    $("printCost").textContent = money(cost);

    const typeLabel = printType.options[printType.selectedIndex]?.textContent || "—";
    $("printNotes").innerHTML = t("printing.notesHtml", {
      type: escapeHtml(typeLabel),
      w,
      l,
      unit,
      qty,
      rate: money(rate),
      cost: money(cost)
    });
  });

  // =========================
  // DECALS MODULE
  // =========================
  const VINYL_ROLLS = [
    { id: "v_12_10", label: '12" × 10 yd', widthIn: 12, lengthYd: 10 },
    { id: "v_15_10", label: '15" × 10 yd', widthIn: 15, lengthYd: 10 },
    { id: "v_24_10", label: '24" × 10 yd', widthIn: 24, lengthYd: 10 },
    { id: "v_30_10", label: '30" × 10 yd', widthIn: 30, lengthYd: 10 },
    { id: "v_48_10", label: '48" × 10 yd', widthIn: 48, lengthYd: 10 },
    { id: "v_60_10", label: '60" × 10 yd', widthIn: 60, lengthYd: 10 },

    { id: "v_12_50", label: '12" × 50 yd', widthIn: 12, lengthYd: 50 },
    { id: "v_15_50", label: '15" × 50 yd', widthIn: 15, lengthYd: 50 },
    { id: "v_24_50", label: '24" × 50 yd', widthIn: 24, lengthYd: 50 },
    { id: "v_30_50", label: '30" × 50 yd', widthIn: 30, lengthYd: 50 },
    { id: "v_48_50", label: '48" × 50 yd', widthIn: 48, lengthYd: 50 },
    { id: "v_60_50", label: '60" × 50 yd', widthIn: 60, lengthYd: 50 },
  ];

  const TAPE_ROLLS = [
    { id: "t_12_100", label: '12" × 100 yd', widthIn: 12, lengthYd: 100 },
    { id: "t_15_100", label: '15" × 100 yd', widthIn: 15, lengthYd: 100 },
    { id: "t_18_100", label: '18" × 100 yd', widthIn: 18, lengthYd: 100 },
    { id: "t_24_100", label: '24" × 100 yd', widthIn: 24, lengthYd: 100 },
    { id: "t_30_100", label: '30" × 100 yd', widthIn: 30, lengthYd: 100 },
    { id: "t_48_100", label: '48" × 100 yd', widthIn: 48, lengthYd: 100 },
    { id: "t_54_100", label: '54" × 100 yd', widthIn: 54, lengthYd: 100 },
    { id: "t_60_100", label: '60" × 100 yd', widthIn: 60, lengthYd: 100 },
  ];

  function lsKey(prefix, source, rollId) {
    return `nj_${prefix}_${source}_${rollId}`;
  }

  function fillSelect(selectEl, items, defaultId) {
    if (!selectEl) return;
    selectEl.innerHTML = "";
    items.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = it.label;
      selectEl.appendChild(opt);
    });
    selectEl.value = defaultId || (items[0]?.id || "");
  }

  function getDecalArea() {
    const w = clampMin(safeNum($("decalW"), 0), 0.01);
    const h = clampMin(safeNum($("decalH"), 0), 0.01);
    const unit = $("decalUnit")?.value || "in";
    const qty = clampMin(Math.floor(safeNum($("decalQty"), 1)), 1);

    const wFt = lengthToFeet(w, unit);
    const hFt = lengthToFeet(h, unit);

    const areaOneFt2 = wFt * hFt;
    const areaTotalFt2 = areaOneFt2 * qty;

    const wIn = unit === "ft" ? (w * 12) : w;
    const hIn = unit === "ft" ? (h * 12) : h;
    const areaTotalIn2 = (wIn * hIn) * qty;

    return { w, h, unit, qty, areaOneFt2, areaTotalFt2, areaTotalIn2 };
  }

  function updateDecalAreasUI() {
    const box = $("decalAreaBox");
    if (!box) return;
    const a = getDecalArea();
    box.innerHTML =
      `<div><b>${t("decals.areaBoxFt2")}:</b> ${a.areaTotalFt2.toFixed(4)} ft²</div>` +
      `<div><b>${t("decals.areaBoxIn2")}:</b> ${a.areaTotalIn2.toFixed(2)} in²</div>`;
  }

  function getRollById(list, id) {
    return list.find(x => x.id === id) || list[0];
  }

  function computeCPP(price, widthIn, lengthYd) {
    const area = rollAreaFt2(widthIn, lengthYd);
    if (area <= 0) return 0;
    const p = clampMin(Number(price || 0), 0);
    return p / area;
  }

  function updateDecalsCPPUI() {
    const vinylSrc = $("oraSource")?.value || "home";
    const vinylId = $("oraRoll")?.value || VINYL_ROLLS[0].id;
    const vinylRoll = getRollById(VINYL_ROLLS, vinylId);

    const tapeSrc = $("tapeSource")?.value || "home";
    const tapeId = $("tapeRoll")?.value || TAPE_ROLLS[0].id;
    const tapeRoll = getRollById(TAPE_ROLLS, tapeId);

    const vinylPriceEl = $("oraPrice");
    const tapePriceEl = $("tapePrice");

    if (vinylPriceEl && (vinylPriceEl.value === "" || vinylPriceEl.value == null)) {
      const saved = localStorage.getItem(lsKey("vinylPrice", vinylSrc, vinylId));
      if (saved != null) vinylPriceEl.value = saved;
    }
    if (tapePriceEl && (tapePriceEl.value === "" || tapePriceEl.value == null)) {
      const saved = localStorage.getItem(lsKey("tapePrice", tapeSrc, tapeId));
      if (saved != null) tapePriceEl.value = saved;
    }

    const vinylCPP = computeCPP(vinylPriceEl?.value, vinylRoll.widthIn, vinylRoll.lengthYd);
    const tapeCPP = computeCPP(tapePriceEl?.value, tapeRoll.widthIn, tapeRoll.lengthYd);

    $("oraCPP") && ($("oraCPP").value = vinylCPP > 0 ? `${money(vinylCPP)} / ft²` : "—");
    $("tapeCPP") && ($("tapeCPP").value = tapeCPP > 0 ? `${money(tapeCPP)} / ft²` : "—");
  }

  function initDecalsUI() {
    fillSelect($("oraRoll"), VINYL_ROLLS, $("oraRoll")?.value || "v_24_50");
    fillSelect($("tapeRoll"), TAPE_ROLLS, $("tapeRoll")?.value || "t_24_100");

    // Defaults “material types” (por ahora solo 1)
    if ($("vinylType") && !$("vinylType").value) $("vinylType").value = "orafol651";
    if ($("tapeType") && !$("tapeType").value) $("tapeType").value = "rtape4075rla";
  }

  // Events decals
  ["decalW","decalH","decalQty"].forEach(id => {
    $(id)?.addEventListener("input", () => {
      updateDecalAreasUI();
      $("decalsResult") && ($("decalsResult").hidden = true);
    });
  });
  $("decalUnit")?.addEventListener("change", () => {
    updateDecalAreasUI();
    $("decalsResult") && ($("decalsResult").hidden = true);
  });

  ["oraSource","oraRoll","tapeSource","tapeRoll"].forEach(id => {
    $(id)?.addEventListener("change", () => {
      if (id === "oraSource" || id === "oraRoll") $("oraPrice") && ($("oraPrice").value = "");
      if (id === "tapeSource" || id === "tapeRoll") $("tapePrice") && ($("tapePrice").value = "");
      updateDecalsCPPUI();
      $("decalsResult") && ($("decalsResult").hidden = true);
    });
  });

  $("oraPrice")?.addEventListener("input", () => {
    const src = $("oraSource")?.value || "home";
    const rid = $("oraRoll")?.value || VINYL_ROLLS[0].id;
    localStorage.setItem(lsKey("vinylPrice", src, rid), $("oraPrice").value || "");
    updateDecalsCPPUI();
  });

  $("tapePrice")?.addEventListener("input", () => {
    const src = $("tapeSource")?.value || "home";
    const rid = $("tapeRoll")?.value || TAPE_ROLLS[0].id;
    localStorage.setItem(lsKey("tapePrice", src, rid), $("tapePrice").value || "");
    updateDecalsCPPUI();
  });

  $("shipCost")?.addEventListener("input", () => {
    localStorage.setItem("nj_shipCost", $("shipCost").value || "0");
    $("decalsResult") && ($("decalsResult").hidden = true);
  });

  $("calcDecals")?.addEventListener("click", () => {
    setStatus("");

    const a = getDecalArea();
    updateDecalAreasUI();

    const vinylTypeLabel = $("vinylType")?.options[$("vinylType").selectedIndex]?.textContent || "ORAFOL 651";
    const tapeTypeLabel = $("tapeType")?.options[$("tapeType").selectedIndex]?.textContent || "RTape 4075RLA";

    const vinylSrc = $("oraSource")?.value || "home";
    const vinylId = $("oraRoll")?.value || VINYL_ROLLS[0].id;
    const vinylRoll = getRollById(VINYL_ROLLS, vinylId);
    const vinylPrice = clampMin(safeNum($("oraPrice"), 0), 0);

    const tapeSrc = $("tapeSource")?.value || "home";
    const tapeId = $("tapeRoll")?.value || TAPE_ROLLS[0].id;
    const tapeRoll = getRollById(TAPE_ROLLS, tapeId);
    const tapePrice = clampMin(safeNum($("tapePrice"), 0), 0);

    const vinylCPP = computeCPP(vinylPrice, vinylRoll.widthIn, vinylRoll.lengthYd);
    const tapeCPP = computeCPP(tapePrice, tapeRoll.widthIn, tapeRoll.lengthYd);

    if (vinylCPP <= 0) return setStatusKey("status.setVinylPrice");
    if (tapeCPP <= 0) return setStatusKey("status.setTapePrice");

    const matCost = a.areaTotalFt2 * (vinylCPP + tapeCPP);

    const anyBuying = (vinylSrc === "buy") || (tapeSrc === "buy");
    const ship = anyBuying ? clampMin(safeNum($("shipCost"), 0), 0) : 0;
    const total = matCost + ship;

    $("decalsResult").hidden = false;
    $("decAreaFt2").textContent = `${a.areaTotalFt2.toFixed(4)} ft²`;
    $("decMatCost").textContent = money(matCost);
    $("decTotal").textContent = money(total);

    const noteShip = anyBuying
      ? t("decals.shipIncluded", { ship: money(ship) })
      : t("decals.shipHome");

    $("decalsNotes").innerHTML =
      t("decals.materialsLine", { vinyl: escapeHtml(vinylTypeLabel), tape: escapeHtml(tapeTypeLabel) }) +
      t("decals.jobLine", { w: a.w, h: a.h, unit: a.unit, qty: a.qty, area: a.areaTotalFt2.toFixed(4) }) +
      t("decals.vinylLine", {
        src: vinylSrc === "buy" ? t("decals.buy") : t("common.home"),
        roll: escapeHtml(vinylRoll.label),
        price: money(vinylPrice),
        cpp: money(vinylCPP)
      }) +
      t("decals.tapeLine", {
        src: tapeSrc === "buy" ? t("decals.buy") : t("common.home"),
        roll: escapeHtml(tapeRoll.label),
        price: money(tapePrice),
        cpp: money(tapeCPP)
      }) +
      `${noteShip}<br>` +
      t("decals.totalEstimated", { total: money(total) });
  });

  // ===== INIT =====
  resetAll();
  renderTintBaseSummary();
  ensureDefaultWin();
  updatePrintRateUI();

  const savedShip = localStorage.getItem("nj_shipCost");
  if ($("shipCost") && savedShip != null) $("shipCost").value = savedShip;

  initDecalsUI();
  updateDecalAreasUI();
  updateDecalsCPPUI();
  applyTranslations();
});

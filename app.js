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

  // ====== Helpers ======
  const statusBar = $("statusBar");
  function setStatus(msg) {
    if (!statusBar) return;
    statusBar.hidden = !msg;
    statusBar.textContent = msg || "";
  }

  function safeNum(el, fallback = 0) {
    const v = Number(el?.value);
    return Number.isFinite(v) ? v : fallback;
  }

  function money(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return "$0.00";
    return x.toLocaleString("en-US", { style: "currency", currency: "USD" });
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
    if (currentMode) currentMode.textContent = "Modo: —";
    hideAllViews();
  }

  function showView(mode) {
    hideAllViews();
    if (viewBox) viewBox.hidden = false;
    if (currentMode) currentMode.textContent = "Modo: " + mode;

    const view = $("view-" + mode);
    if (view) view.hidden = false;

    if (viewTitle) {
      const titleMap = {
        tint: "Commercial Windows Tint — Costo de material",
        printing: "Printing Cost — Costo por ft²",
        decals: "Decals",
      };
      viewTitle.innerHTML = `<b>${titleMap[mode] || mode}</b>`;
    }

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
    baseSummary.innerHTML =
      `<div><b>Área base:</b> ${area.toFixed(2)} ft² (ancho × 100ft)</div>` +
      `<div><b>Costo/ft²:</b> <span class="lime">${money(cpp)}/ft²</span></div>`;
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
    if (cpp <= 0) return setStatus("⚠️ Revisa el ancho y el precio del rollo.");

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

    $("useNotes").innerHTML =
      `Rollo: ancho <b>${safeNum($("rollWidthIn"),60)}"</b> · largo fijo <b>${BASE_TINT_LENGTH_FT}ft</b> · precio <b>${money(safeNum($("rollPrice"),350))}</b><br>` +
      `Costo/ft²: <b>${money(cpp)}/ft²</b><br><br>` +
      `Uso: ancho <b>${wIn}"</b> · largo <b>${shownLen}</b> · qty <b>${qty}</b><br>` +
      `Costo material: <b>${money(cost)}</b>`;
  });

  // Ventanas (tint)
  const winList = $("winList");

  function makeWinRow(data) {
    const row = document.createElement("div");
    row.className = "winRow";
    row.innerHTML = `
      <input class="winDesc" type="text" placeholder="Ej: Door / Small window" value="${escapeHtml(data.desc || "")}">
      <input class="winW" type="number" step="0.01" value="${data.wIn ?? 60}">
      <input class="winH" type="number" step="0.01" value="${data.hIn ?? 48}">
      <input class="winQty" type="number" step="1" value="${data.qty ?? 1}">
      <button class="iconBtn" title="Eliminar">✕</button>
    `;
    row.querySelector("button")?.addEventListener("click", () => row.remove());
    return row;
  }

  function ensureDefaultWin() {
    if (!winList) return;
    if (winList.children.length === 0) {
      winList.appendChild(makeWinRow({ desc: "Ventana", wIn: 60, hIn: 48, qty: 1 }));
    }
  }

  $("addWin")?.addEventListener("click", () => {
    winList.appendChild(makeWinRow({ desc: "", wIn: 24, hIn: 36, qty: 1 }));
  });

  $("calcWins")?.addEventListener("click", () => {
    const cpp = tintCostPerFt2();
    if (cpp <= 0) return setStatus("⚠️ Revisa el ancho y el precio del rollo.");
    ensureDefaultWin();

    const rollW = clampMin(safeNum($("rollWidthIn"), 60), 0.01);

    let totalLinearIn = 0;
    let totalWinAreaFt2 = 0;
    const lines = [];

    [...winList.children].forEach((row, idx) => {
      const desc = row.querySelector(".winDesc")?.value?.trim() || `Ventana ${idx + 1}`;
      const wIn = clampMin(Number(row.querySelector(".winW")?.value || 0), 0.01);
      const hIn = clampMin(Number(row.querySelector(".winH")?.value || 0), 0.01);
      const qty = clampMin(Math.floor(Number(row.querySelector(".winQty")?.value || 1)), 1);

      totalWinAreaFt2 += ((wIn * hIn) / 144) * qty;

      const panels = Math.ceil(wIn / rollW);
      const linearForThisIn = (hIn * panels) * qty;
      totalLinearIn += linearForThisIn;

      lines.push(`• ${desc}: ${wIn}"×${hIn}" · Qty ${qty} · Paneles ${panels} ⇒ Largo ${linearForThisIn.toFixed(2)} in`);
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

    $("winNotes").innerHTML =
      `Rollo: ancho <b>${rollW}"</b> · largo fijo <b>${BASE_TINT_LENGTH_FT}ft</b> · precio <b>${money(safeNum($("rollPrice"),350))}</b><br>` +
      `Costo/ft²: <b>${money(cpp)}/ft²</b><br><br>` +
      `<div style="white-space:pre-wrap">${escapeHtml(lines.join("\n"))}</div><br>` +
      `Largo total: <b>${totalLinearIn.toFixed(2)} in</b> (${totalLinearFt.toFixed(2)} ft)<br>` +
      `Área material: <b>${materialAreaFt2.toFixed(2)} ft²</b><br>` +
      `Costo material: <b>${money(cost)}</b>`;
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
    if (rate == null) return setStatus("⚠️ Selecciona un tipo de impresión.");
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
    $("printNotes").innerHTML =
      `Tipo: <b>${escapeHtml(typeLabel)}</b><br>` +
      `Medidas: <b>${w}</b> × <b>${l}</b> (${unit}) · Qty <b>${qty}</b><br>` +
      `Tarifa: <b>${money(rate)}/ft²</b><br>` +
      `Costo total: <b>${money(cost)}</b>`;
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
      `<div><b>Área total (ft²):</b> ${a.areaTotalFt2.toFixed(4)} ft²</div>` +
      `<div><b>Área total (in²):</b> ${a.areaTotalIn2.toFixed(2)} in²</div>`;
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

    if (vinylCPP <= 0) return setStatus("⚠️ Pon el precio del rollo del vinil para calcular.");
    if (tapeCPP <= 0) return setStatus("⚠️ Pon el precio del rollo del transfer para calcular.");

    const matCost = a.areaTotalFt2 * (vinylCPP + tapeCPP);

    const anyBuying = (vinylSrc === "buy") || (tapeSrc === "buy");
    const ship = anyBuying ? clampMin(safeNum($("shipCost"), 0), 0) : 0;
    const total = matCost + ship;

    $("decalsResult").hidden = false;
    $("decAreaFt2").textContent = `${a.areaTotalFt2.toFixed(4)} ft²`;
    $("decMatCost").textContent = money(matCost);
    $("decTotal").textContent = money(total);

    const noteShip = anyBuying
      ? `Shipping incluido: <b>${money(ship)}</b>`
      : `Shipping: <b>$0.00</b> (usando material en casa)`;

    $("decalsNotes").innerHTML =
      `<b>Materiales:</b> ${escapeHtml(vinylTypeLabel)} + ${escapeHtml(tapeTypeLabel)}<br><br>` +
      `<b>Trabajo:</b> ${a.w} × ${a.h} (${a.unit}) · Qty ${a.qty}<br>` +
      `<b>Área total:</b> ${a.areaTotalFt2.toFixed(4)} ft²<br><br>` +

      `<b>Vinil</b> (${vinylSrc === "buy" ? "Comprar" : "Casa"}): ${escapeHtml(vinylRoll.label)} · Precio rollo ${money(vinylPrice)} · CPP ${money(vinylCPP)}/ft²<br>` +
      `<b>Transfer</b> (${tapeSrc === "buy" ? "Comprar" : "Casa"}): ${escapeHtml(tapeRoll.label)} · Precio rollo ${money(tapePrice)} · CPP ${money(tapeCPP)}/ft²<br><br>` +

      `${noteShip}<br>` +
      `<b>Total estimado:</b> ${money(total)}`;
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
});

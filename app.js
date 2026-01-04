document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // ====== Logo loader (prueba rutas + evita cache viejo) ======
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

  // ====== HELPERS ======
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

  function areaFt2FromInches(wIn, hIn) {
    return (wIn * hIn) / 144;
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

  // ===== INIT LOGO =====
  loadLogo($("brandLogo"));

  // ====== COMMON UI ======
  const quoteSelect = $("quoteSelect");
  const viewBox = $("viewBox");
  const viewTitle = $("viewTitle");
  const currentMode = $("currentMode");
  const resetBtn = $("resetBtn");

  function hideAllViews() {
    document.querySelectorAll(".view").forEach(v => v.hidden = true);

    // Tint
    const methodUse = $("method-use");
    const methodWins = $("method-wins");
    if (methodUse) methodUse.hidden = true;
    if (methodWins) methodWins.hidden = true;
    if ($("useResult")) $("useResult").hidden = true;
    if ($("winResult")) $("winResult").hidden = true;

    // Printing
    if ($("printResult")) $("printResult").hidden = true;

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
        decals: "Decals — Próximamente",
      };
      viewTitle.innerHTML = `<b>${titleMap[mode] || mode}</b>`;
    }

    if (mode === "tint") {
      if ($("tintMethod")) $("tintMethod").value = "";
      if ($("method-use")) $("method-use").hidden = true;
      if ($("method-wins")) $("method-wins").hidden = true;
      renderTintBaseSummary();
      ensureDefaultWin();
    }

    if (mode === "printing") {
      // reset printing UI
      if ($("printType")) $("printType").value = "";
      if ($("printRate")) $("printRate").value = "—";
      if ($("printW")) $("printW").value = "";
      if ($("printL")) $("printL").value = "";
      if ($("printUnit")) $("printUnit").value = "in";
      if ($("printQty")) $("printQty").value = "1";
      if ($("printResult")) $("printResult").hidden = true;
    }
  }

  quoteSelect?.addEventListener("change", () => {
    const v = quoteSelect.value;
    if (!v) resetAll();
    else showView(v);
  });

  resetBtn?.addEventListener("click", resetAll);

  // =========================
  // TINT MODULE (igual que antes)
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
    if ($("useResult")) $("useResult").hidden = true;
    if ($("winResult")) $("winResult").hidden = true;
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

      totalWinAreaFt2 += areaFt2FromInches(wIn, hIn) * qty;

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
    const key = printType?.value || "";
    const rate = PRINT_RATES[key];
    if (!printRate) return;
    printRate.value = (rate != null) ? `${rate.toFixed(2)}` : "—";
  }

  printType?.addEventListener("change", () => {
    updatePrintRateUI();
    if ($("printResult")) $("printResult").hidden = true;
  });

  $("calcPrint")?.addEventListener("click", () => {
    const key = printType?.value || "";
    const rate = PRINT_RATES[key];

    if (rate == null) return setStatus("⚠️ Selecciona un tipo de impresión.");
    setStatus("");

    const w = clampMin(safeNum($("printW"), 0), 0.01);
    const l = clampMin(safeNum($("printL"), 0), 0.01);
    const unit = $("printUnit")?.value || "in";
    const qty = clampMin(Math.floor(safeNum($("printQty"), 1)), 1);

    // Convert to feet
    const wFt = (unit === "in") ? (w / 12) : w;
    const lFt = (unit === "in") ? (l / 12) : l;

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
      `Convertido: <b>${wFt.toFixed(2)} ft</b> × <b>${lFt.toFixed(2)} ft</b><br>` +
      `Tarifa: <b>${money(rate)}/ft²</b><br>` +
      `Costo total: <b>${money(cost)}</b>`;
  });

  // ===== INIT =====
  resetAll();
  renderTintBaseSummary();
  ensureDefaultWin();
  updatePrintRateUI();
});

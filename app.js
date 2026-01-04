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
  function setStatus(msg) {
    const statusBar = $("statusBar");
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

  function toInches(val, unit) {
    return unit === "ft" ? (val * 12) : val;
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

  // ====== INIT LOGO ======
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
    $("method-use")?.setAttribute("hidden", "true");
    $("method-wins")?.setAttribute("hidden", "true");
    $("useResult") && ($("useResult").hidden = true);
    $("winResult") && ($("winResult").hidden = true);

    // Canvas
    $("canvas-single")?.setAttribute("hidden", "true");
    $("canvas-list")?.setAttribute("hidden", "true");
    $("canvasSingleResult") && ($("canvasSingleResult").hidden = true);
    $("canvasListResult") && ($("canvasListResult").hidden = true);
  }

  function resetAll() {
    if (quoteSelect) quoteSelect.value = "";
    if (viewBox) viewBox.hidden = true;
    if (currentMode) currentMode.textContent = "Modo: —";
    hideAllViews();
    setStatus("");
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
        canvas: "Canvas Banner — Costo de material",
        perfs: "Windows Perfs — Próximamente",
        decals: "Decals — Próximamente",
      };
      viewTitle.innerHTML = `<b>${titleMap[mode] || mode}</b>`;
    }

    if (mode === "tint") {
      const tintMethod = $("tintMethod");
      if (tintMethod) tintMethod.value = "";
      $("method-use").hidden = true;
      $("method-wins").hidden = true;
      renderTintBaseSummary();
      ensureDefaultWin();
    }

    if (mode === "canvas") {
      const canvasMethod = $("canvasMethod");
      if (canvasMethod) canvasMethod.value = "";
      $("canvas-single").hidden = true;
      $("canvas-list").hidden = true;
      renderCanvasBaseSummary();
      ensureDefaultCanvasRow();
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
  // CANVAS BANNER MODULE
  // =========================
  function canvasBaseAreaFt2() {
    const wIn = clampMin(safeNum($("canvasRollWidthIn"), 54), 0.01);
    const lFt = clampMin(safeNum($("canvasRollLengthFt"), 150), 0.01);
    return (wIn / 12) * lFt;
  }

  function canvasCostPerFt2() {
    const price = clampMin(safeNum($("canvasRollPrice"), 0), 0);
    const area = canvasBaseAreaFt2();
    return area > 0 ? (price / area) : 0;
  }

  function renderCanvasBaseSummary() {
    const box = $("canvasBaseSummary");
    if (!box) return;
    const area = canvasBaseAreaFt2();
    const cpp = canvasCostPerFt2();
    box.innerHTML =
      `<div><b>Área base:</b> ${area.toFixed(2)} ft²</div>` +
      `<div><b>Costo/ft²:</b> <span class="lime">${money(cpp)}/ft²</span></div>`;
  }

  $("canvasRollWidthIn")?.addEventListener("input", renderCanvasBaseSummary);
  $("canvasRollWidthIn")?.addEventListener("change", renderCanvasBaseSummary);
  $("canvasRollLengthFt")?.addEventListener("input", renderCanvasBaseSummary);
  $("canvasRollLengthFt")?.addEventListener("change", renderCanvasBaseSummary);
  $("canvasRollPrice")?.addEventListener("input", renderCanvasBaseSummary);
  $("canvasRollPrice")?.addEventListener("change", renderCanvasBaseSummary);

  $("canvasOrientation")?.addEventListener("change", () => {
    // solo recalcula base (no hace falta recalcular resultados si no quieres)
    renderCanvasBaseSummary();
  });

  $("canvasMethod")?.addEventListener("change", () => {
    const v = $("canvasMethod").value;
    $("canvas-single").hidden = (v !== "single");
    $("canvas-list").hidden = (v !== "list");
    $("canvasSingleResult") && ($("canvasSingleResult").hidden = true);
    $("canvasListResult") && ($("canvasListResult").hidden = true);
  });

  // Decide el material usado en pulgadas lineales, paneles, y área banner según orientación
  function computeCanvasUsageForOne(bannerWIn, bannerHIn, rollWIn, orientation) {
    // option A: bannerW uses roll width direction, bannerH uses roll length direction
    // panelsA: if bannerW > rollW => panelize
    const panelsA = Math.ceil(bannerWIn / rollWIn);
    const linearA = bannerHIn * panelsA; // inches along roll

    // option B: rotate banner
    const panelsB = Math.ceil(bannerHIn / rollWIn);
    const linearB = bannerWIn * panelsB;

    let chosen = { panels: panelsA, linearIn: linearA, rotated: false };

    if (orientation === "wAlongRoll") {
      // width goes along roll length => treat bannerW as linear, bannerH must fit roll width
      chosen = { panels: panelsB, linearIn: linearB, rotated: true };
    } else if (orientation === "hAlongRoll") {
      chosen = { panels: panelsA, linearIn: linearA, rotated: false };
    } else {
      // auto: choose min linear
      if (linearB < linearA) chosen = { panels: panelsB, linearIn: linearB, rotated: true };
    }

    const bannerAreaFt2 = areaFt2FromInches(bannerWIn, bannerHIn);
    return { ...chosen, bannerAreaFt2 };
  }

  // SINGLE canvas
  $("calcCanvasSingle")?.addEventListener("click", () => {
    const cpp = canvasCostPerFt2();
    const rollW = clampMin(safeNum($("canvasRollWidthIn"), 54), 0.01);
    const rollL = clampMin(safeNum($("canvasRollLengthFt"), 150), 0.01);
    const price = clampMin(safeNum($("canvasRollPrice"), 0), 0);

    if (rollW <= 0 || rollL <= 0) return setStatus("⚠️ Revisa ancho/largo del rollo.");
    if (price <= 0) return setStatus("⚠️ Pon el precio del rollo para calcular costos.");

    const unit = $("canvasUnit")?.value || "in";
    const w = clampMin(safeNum($("canvasW"), 48), 0.01);
    const h = clampMin(safeNum($("canvasH"), 72), 0.01);
    const qty = clampMin(Math.floor(safeNum($("canvasQty"), 1)), 1);

    const wIn = toInches(w, unit);
    const hIn = toInches(h, unit);

    const orientation = $("canvasOrientation")?.value || "auto";

    const one = computeCanvasUsageForOne(wIn, hIn, rollW, orientation);

    const totalLinearIn = one.linearIn * qty;
    const totalLinearFt = totalLinearIn / 12;

    const materialAreaFt2 = (rollW * totalLinearIn) / 144;
    const bannerAreaFt2 = one.bannerAreaFt2 * qty;
    const cost = materialAreaFt2 * cpp;

    $("canvasSingleResult").hidden = false;
    $("canvasLenIn").textContent = `${totalLinearIn.toFixed(2)} in`;
    $("canvasLenFt").textContent = `${totalLinearFt.toFixed(2)} ft`;
    $("canvasMatFt2").textContent = `${materialAreaFt2.toFixed(2)} ft²`;
    $("canvasBannerFt2").textContent = `${bannerAreaFt2.toFixed(2)} ft²`;
    $("canvasCPP").textContent = `${money(cpp)}/ft²`;
    $("canvasCost").textContent = money(cost);

    const orientTxt =
      orientation === "auto" ? "Auto" :
      orientation === "hAlongRoll" ? "Alto en el largo del rollo" :
      "Ancho en el largo del rollo";

    $("canvasSingleNotes").innerHTML =
      `Rollo: <b>${rollW}"</b> × <b>${rollL}ft</b> · precio <b>${money(price)}</b><br>` +
      `Costo/ft²: <b>${money(cpp)}/ft²</b><br><br>` +
      `Banner: <b>${wIn.toFixed(2)}"</b> × <b>${hIn.toFixed(2)}"</b> · Qty <b>${qty}</b><br>` +
      `Orientación: <b>${orientTxt}</b> · Paneles: <b>${one.panels}</b> · Rotado: <b>${one.rotated ? "Sí" : "No"}</b><br>` +
      `Largo total usado: <b>${totalLinearIn.toFixed(2)} in</b> (${totalLinearFt.toFixed(2)} ft)<br>` +
      `Costo material: <b>${money(cost)}</b>`;
  });

  // LIST canvas
  const canvasList = $("canvasList");

  function makeCanvasRow(data) {
    const row = document.createElement("div");
    row.className = "winRow"; // reutiliza estilos
    row.innerHTML = `
      <input class="cDesc" type="text" placeholder="Ej: Banner 4x6" value="${escapeHtml(data.desc || "")}">
      <input class="cW" type="number" step="0.01" value="${data.w ?? 48}">
      <input class="cH" type="number" step="0.01" value="${data.h ?? 72}">
      <input class="cQty" type="number" step="1" value="${data.qty ?? 1}">
      <button class="iconBtn" title="Eliminar">✕</button>
    `;
    row.querySelector("button")?.addEventListener("click", () => row.remove());
    return row;
  }

  function ensureDefaultCanvasRow() {
    if (!canvasList) return;
    if (canvasList.children.length === 0) {
      canvasList.appendChild(makeCanvasRow({ desc: "Banner", w: 48, h: 72, qty: 1 }));
    }
  }

  $("addCanvasRow")?.addEventListener("click", () => {
    canvasList.appendChild(makeCanvasRow({ desc: "", w: 24, h: 36, qty: 1 }));
  });

  $("calcCanvasList")?.addEventListener("click", () => {
    const cpp = canvasCostPerFt2();
    const rollW = clampMin(safeNum($("canvasRollWidthIn"), 54), 0.01);
    const rollL = clampMin(safeNum($("canvasRollLengthFt"), 150), 0.01);
    const price = clampMin(safeNum($("canvasRollPrice"), 0), 0);

    if (rollW <= 0 || rollL <= 0) return setStatus("⚠️ Revisa ancho/largo del rollo.");
    if (price <= 0) return setStatus("⚠️ Pon el precio del rollo para calcular costos.");
    ensureDefaultCanvasRow();

    const unit = $("canvasListUnit")?.value || "in";
    const orientation = $("canvasOrientation")?.value || "auto";

    let totalLinearIn = 0;
    let totalBannerAreaFt2 = 0;
    const lines = [];

    [...canvasList.children].forEach((row, idx) => {
      const desc = row.querySelector(".cDesc")?.value?.trim() || `Banner ${idx + 1}`;
      const w = clampMin(Number(row.querySelector(".cW")?.value || 0), 0.01);
      const h = clampMin(Number(row.querySelector(".cH")?.value || 0), 0.01);
      const qty = clampMin(Math.floor(Number(row.querySelector(".cQty")?.value || 1)), 1);

      const wIn = toInches(w, unit);
      const hIn = toInches(h, unit);

      const one = computeCanvasUsageForOne(wIn, hIn, rollW, orientation);

      totalLinearIn += one.linearIn * qty;
      totalBannerAreaFt2 += one.bannerAreaFt2 * qty;

      lines.push(
        `• ${desc}: ${wIn.toFixed(2)}"×${hIn.toFixed(2)}" · Qty ${qty} · Paneles ${one.panels} · Rotado ${one.rotated ? "Sí" : "No"} ⇒ Largo ${(one.linearIn * qty).toFixed(2)} in`
      );
    });

    const totalLinearFt = totalLinearIn / 12;
    const materialAreaFt2 = (rollW * totalLinearIn) / 144;
    const cost = materialAreaFt2 * cpp;

    $("canvasListResult").hidden = false;
    $("canvasListLenIn").textContent = `${totalLinearIn.toFixed(2)} in`;
    $("canvasListLenFt").textContent = `${totalLinearFt.toFixed(2)} ft`;
    $("canvasListMatFt2").textContent = `${materialAreaFt2.toFixed(2)} ft²`;
    $("canvasListBannerFt2").textContent = `${totalBannerAreaFt2.toFixed(2)} ft²`;
    $("canvasListCPP").textContent = `${money(cpp)}/ft²`;
    $("canvasListCost").textContent = money(cost);

    $("canvasListNotes").innerHTML =
      `Rollo: <b>${rollW}"</b> × <b>${rollL}ft</b> · precio <b>${money(price)}</b><br>` +
      `Costo/ft²: <b>${money(cpp)}/ft²</b><br><br>` +
      `<div style="white-space:pre-wrap">${escapeHtml(lines.join("\n"))}</div><br>` +
      `Largo total usado: <b>${totalLinearIn.toFixed(2)} in</b> (${totalLinearFt.toFixed(2)} ft)<br>` +
      `Área material: <b>${materialAreaFt2.toFixed(2)} ft²</b><br>` +
      `Costo material: <b>${money(cost)}</b>`;
  });

  // ===== INIT =====
  resetAll();
  renderTintBaseSummary();
  renderCanvasBaseSummary();
  ensureDefaultWin();
  ensureDefaultCanvasRow();
});

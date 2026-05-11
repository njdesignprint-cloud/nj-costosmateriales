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

I18N.es.modes.coroplast = "Coroplast Printing";
I18N.es.modeTitles.coroplast = "Coroplast Printing — Costo interno";
I18N.es.status.coroplastSize = "⚠️ Revisa las medidas del coroplast.";
I18N.es.status.coroplastRate = "⚠️ Revisa la tarifa por ft².";
I18N.es.status.coroplastCustomSize = "⚠️ Escribe nombre, ancho y largo válidos para guardar el tamaño.";
I18N.es.coroplast = {
  title: "Coroplast Printing",
  introHtml: "<div><b>Nota:</b> costo interno de coroplast + impresión.</div><div>El área cobrable se redondea <b>por pieza</b> hacia arriba al siguiente ft².</div>",
  sizeTitle: "1) Tamaño",
  sizeModeLabel: "Modo de tamaño",
  sizeModeStandard: "Tamaño estándar",
  sizeModeManual: "Tamaño manual",
  stdSizeLabel: "Tamaño estándar",
  widthLabel: "Ancho (in)",
  heightLabel: "Largo (in)",
  sizePreviewHtml: "<div><b>Tamaño actual:</b> {label}</div><div><b>Medidas:</b> {w}&quot; × {h}&quot;</div><div><b>Área real (1 pieza):</b> {area} ft²</div>",
  customTitle: "2) Agregar tamaño estándar",
  customNameLabel: "Nombre del tamaño",
  customWidthLabel: "Ancho (in)",
  customHeightLabel: "Largo (in)",
  customNamePlaceholder: "Ej: 24 x 24",
  customWidthPlaceholder: "Ej: 24",
  customHeightPlaceholder: "Ej: 24",
  customHint: "Se guarda en este navegador como tamaño estándar adicional.",
  addSizeBtn: "+ Agregar tamaño",
  printTitle: "3) Impresión",
  sidesLabel: "Lados",
  oneSide: "1 side",
  twoSides: "2 sides",
  resolutionLabel: "Resolución",
  rateLabel: "Tarifa editable (USD / ft²)",
  qtyLabel: "Cantidad (piezas)",
  rateInfoHtml: "<div><b>Tarifa base sugerida:</b> {rate}/ft²</div><div>Puedes cambiarla manualmente si necesitas otro costo interno.</div>",
  calcBtn: "Calcular Coroplast Printing",
  actualAreaLabel: "Área real (1 pieza)",
  billableAreaLabel: "Área cobrable (1 pieza)",
  rateResultLabel: "Tarifa",
  pieceCostLabel: "Costo por pieza",
  qtyResultLabel: "Cantidad",
  totalCostLabel: "Costo total",
  notesHtml: "<b>Tamaño:</b> {label} ({w}&quot; × {h}&quot;)<br><b>Impresión:</b> {sides} · {resolution} DPI<br><b>Área real:</b> {actual} ft² por pieza<br><b>Área cobrable:</b> {billable} ft² por pieza<br><b>Regla:</b> se redondea hacia arriba al siguiente pie cuadrado por pieza.<br><b>Tarifa:</b> {rate}/ft²<br><b>Costo por pieza:</b> {pieceCost}<br><b>Cantidad:</b> {qty}<br><b>Costo total:</b> {total}",
  customAdded: "Tamaño guardado: {label}",
  manualLabel: "Manual"
};

I18N.en.modes.coroplast = "Coroplast Printing";
I18N.en.modeTitles.coroplast = "Coroplast Printing — Internal Cost";
I18N.en.status.coroplastSize = "⚠️ Check the coroplast dimensions.";
I18N.en.status.coroplastRate = "⚠️ Check the cost per ft².";
I18N.en.status.coroplastCustomSize = "⚠️ Enter a valid name, width, and height to save the size.";
I18N.en.coroplast = {
  title: "Coroplast Printing",
  introHtml: "<div><b>Note:</b> internal cost for coroplast + printing.</div><div>Billable area is rounded <b>per piece</b> up to the next ft².</div>",
  sizeTitle: "1) Size",
  sizeModeLabel: "Size mode",
  sizeModeStandard: "Standard size",
  sizeModeManual: "Manual size",
  stdSizeLabel: "Standard size",
  widthLabel: "Width (in)",
  heightLabel: "Length (in)",
  sizePreviewHtml: "<div><b>Current size:</b> {label}</div><div><b>Dimensions:</b> {w}&quot; × {h}&quot;</div><div><b>Actual area (1 piece):</b> {area} ft²</div>",
  customTitle: "2) Add standard size",
  customNameLabel: "Size name",
  customWidthLabel: "Width (in)",
  customHeightLabel: "Length (in)",
  customNamePlaceholder: "Ex: 24 x 24",
  customWidthPlaceholder: "Ex: 24",
  customHeightPlaceholder: "Ex: 24",
  customHint: "Saved in this browser as an extra standard size.",
  addSizeBtn: "+ Add size",
  printTitle: "3) Printing",
  sidesLabel: "Sides",
  oneSide: "1 side",
  twoSides: "2 sides",
  resolutionLabel: "Resolution",
  rateLabel: "Editable rate (USD / ft²)",
  qtyLabel: "Quantity (pieces)",
  rateInfoHtml: "<div><b>Suggested base rate:</b> {rate}/ft²</div><div>You can manually change it if you need a different internal cost.</div>",
  calcBtn: "Calculate Coroplast Printing",
  actualAreaLabel: "Actual area (1 piece)",
  billableAreaLabel: "Billable area (1 piece)",
  rateResultLabel: "Rate",
  pieceCostLabel: "Cost per piece",
  qtyResultLabel: "Quantity",
  totalCostLabel: "Total cost",
  notesHtml: "<b>Size:</b> {label} ({w}&quot; × {h}&quot;)<br><b>Printing:</b> {sides} · {resolution} DPI<br><b>Actual area:</b> {actual} ft² per piece<br><b>Billable area:</b> {billable} ft² per piece<br><b>Rule:</b> rounded up to the next square foot per piece.<br><b>Rate:</b> {rate}/ft²<br><b>Cost per piece:</b> {pieceCost}<br><b>Quantity:</b> {qty}<br><b>Total cost:</b> {total}",
  customAdded: "Saved size: {label}",
  manualLabel: "Manual"
};

  I18N.es.modes.coroplast = "Coroplast Printing";
  I18N.en.modes.coroplast = "Coroplast Printing";
  I18N.es.modeTitles.coroplast = "Coroplast Printing";
  I18N.en.modeTitles.coroplast = "Coroplast Printing";

  I18N.es.suppliers = {
    cardTitle: "Proveedores",
    selectLabel: "Proveedor activo",
    nameLabel: "Nombre del proveedor",
    namePlaceholder: "Ej: Grimco",
    addBtn: "+ Agregar proveedor",
    saveNameBtn: "Guardar nombre",
    manageBtn: "Administrar proveedor",
    manageBtnClose: "Ocultar administración",
    deleteBtn: "Eliminar proveedor",
    summaryBase: "Base editable · no se puede borrar.",
    summaryCustom: "Este proveedor usa la misma estructura del estimador base, pero con precios propios.",
    summaryHtml: "<div><b>Proveedor activo:</b> {name}</div><div>{hint}</div>",
    helpTitle: "Cómo guardar precios",
    helpText: "Los precios que cambies se guardan para el proveedor activo. <b>Tint</b>, <b>Decals</b> y <b>Coroplast</b> guardan desde sus propios módulos. En <b>Printing</b>, la tarifa seleccionada ahora es editable y también se guarda por proveedor.",
    addPrompt: "Escribe el nombre del nuevo proveedor:",
    addDefaultName: "Proveedor nuevo",
    addStatus: "Proveedor creado: {name}",
    saveStatus: "Proveedor actualizado: {name}",
    deleteStatus: "Proveedor eliminado.",
    deleteBlocked: "El proveedor base no se puede borrar.",
    deleteConfirm: "¿Seguro que quieres eliminar este proveedor?",
    duplicateName: "Ya existe un proveedor con ese nombre.",
    nameRequired: "Escribe un nombre válido para el proveedor.",
    servicesTitle: "Servicios extra del proveedor",
    serviceListTitle: "Lista de servicios extra",
    serviceNameLabel: "Nombre del servicio",
    serviceNamePlaceholder: "Ej: PVC Printing",
    serviceTypeLabel: "Tipo de mini estimador",
    serviceRateLabel: "Tarifa base (USD)",
    serviceRatePlaceholder: "Ej: 3.50",
    serviceNoteLabel: "Nota",
    serviceNotePlaceholder: "Opcional",
    addServiceBtn: "+ Agregar servicio",
    noServices: "Este proveedor todavía no tiene servicios extra.",
    serviceAdded: "Servicio agregado: {name}",
    serviceDeleted: "Servicio eliminado.",
    serviceNameRequired: "Escribe el nombre del servicio.",
    typeArea: "Por ft²",
    typePiece: "Por pieza",
    typeLinear: "Por pie lineal",
    typeFixed: "Precio fijo",
    deleteService: "Eliminar servicio",
    printRateInlineLabel: "Tarifa del proveedor (USD / ft²)",
    printRateMissing: "⚠️ Pon la tarifa de este proveedor para este tipo de impresión.",
    coroplastRateMissing: "⚠️ Pon la tarifa de este proveedor para esta configuración de coroplast."
  };

  I18N.en.suppliers = {
    cardTitle: "Suppliers",
    selectLabel: "Active supplier",
    nameLabel: "Supplier name",
    namePlaceholder: "Ex: Grimco",
    addBtn: "+ Add supplier",
    saveNameBtn: "Save name",
    manageBtn: "Manage supplier",
    manageBtnClose: "Hide management",
    deleteBtn: "Delete supplier",
    summaryBase: "Editable base supplier · cannot be deleted.",
    summaryCustom: "This supplier uses the same estimator structure as Base, but with its own prices.",
    summaryHtml: "<div><b>Active supplier:</b> {name}</div><div>{hint}</div>",
    helpTitle: "How to save prices",
    helpText: "Prices you change are saved for the active supplier. <b>Tint</b>, <b>Decals</b> and <b>Coroplast</b> save from their own modules. In <b>Printing</b>, the selected rate is now editable and is also saved per supplier.",
    addPrompt: "Enter the new supplier name:",
    addDefaultName: "New supplier",
    addStatus: "Supplier created: {name}",
    saveStatus: "Supplier updated: {name}",
    deleteStatus: "Supplier deleted.",
    deleteBlocked: "The base supplier cannot be deleted.",
    deleteConfirm: "Are you sure you want to delete this supplier?",
    duplicateName: "A supplier with that name already exists.",
    nameRequired: "Enter a valid supplier name.",
    servicesTitle: "Supplier extra services",
    serviceListTitle: "Extra service list",
    serviceNameLabel: "Service name",
    serviceNamePlaceholder: "Ex: PVC Printing",
    serviceTypeLabel: "Mini estimator type",
    serviceRateLabel: "Base rate (USD)",
    serviceRatePlaceholder: "Ex: 3.50",
    serviceNoteLabel: "Note",
    serviceNotePlaceholder: "Optional",
    addServiceBtn: "+ Add service",
    noServices: "This supplier does not have extra services yet.",
    serviceAdded: "Service added: {name}",
    serviceDeleted: "Service deleted.",
    serviceNameRequired: "Enter the service name.",
    typeArea: "By ft²",
    typePiece: "By piece",
    typeLinear: "By linear foot",
    typeFixed: "Fixed price",
    deleteService: "Delete service",
    printRateInlineLabel: "Supplier rate (USD / ft²)",
    printRateMissing: "⚠️ Enter this supplier rate for this print type.",
    coroplastRateMissing: "⚠️ Enter this supplier rate for this coroplast setup."
  };

  I18N.es.customService = {
    titleFallback: "Servicio extra",
    introHtml: "<div><b>Servicio:</b> {name}</div><div><b>Tipo:</b> {type}</div><div><b>Nota:</b> {note}</div>",
    rateLabel: "Tarifa (USD)",
    qtyLabel: "Cantidad",
    widthLabel: "Ancho",
    heightLabel: "Largo",
    areaUnitLabel: "Unidad",
    lengthLabel: "Largo",
    unitLabel: "Unidad",
    calcBtn: "Calcular servicio",
    typeHintArea: "Este servicio calcula área por pieza y luego multiplica por cantidad.",
    typeHintPiece: "Este servicio usa una tarifa fija por pieza.",
    typeHintLinear: "Este servicio calcula el largo y luego multiplica por cantidad.",
    typeHintFixed: "Este servicio usa una tarifa fija por trabajo y cantidad.",
    measureLabel: "Medida calculada",
    rateResultLabel: "Tarifa",
    qtyResultLabel: "Cantidad",
    unitCostLabel: "Costo unitario",
    totalCostLabel: "Costo total",
    typeResultLabel: "Tipo",
    areaNotes: "<b>Medidas:</b> {w} × {h} ({unit})<br><b>Área por pieza:</b> {measure}<br><b>Tarifa:</b> {rate}<br><b>Costo por pieza:</b> {unitCost}<br><b>Cantidad:</b> {qty}<br><b>Total:</b> {total}",
    linearNotes: "<b>Largo:</b> {length} ({unit})<br><b>Largo calculado:</b> {measure}<br><b>Tarifa:</b> {rate}<br><b>Costo por unidad:</b> {unitCost}<br><b>Cantidad:</b> {qty}<br><b>Total:</b> {total}",
    pieceNotes: "<b>Tarifa por pieza:</b> {rate}<br><b>Cantidad:</b> {qty}<br><b>Total:</b> {total}",
    fixedNotes: "<b>Tarifa fija:</b> {rate}<br><b>Cantidad:</b> {qty}<br><b>Total:</b> {total}",
    areaMeasureSuffix: "ft²",
    linearMeasureSuffix: "ft",
    pieceMeasure: "1 pieza",
    fixedMeasure: "1 trabajo",
    missingRate: "⚠️ Pon la tarifa de este servicio.",
    missingMeasure: "⚠️ Completa las medidas de este servicio."
  };

  I18N.en.customService = {
    titleFallback: "Extra service",
    introHtml: "<div><b>Service:</b> {name}</div><div><b>Type:</b> {type}</div><div><b>Note:</b> {note}</div>",
    rateLabel: "Rate (USD)",
    qtyLabel: "Quantity",
    widthLabel: "Width",
    heightLabel: "Height",
    areaUnitLabel: "Unit",
    lengthLabel: "Length",
    unitLabel: "Unit",
    calcBtn: "Calculate service",
    typeHintArea: "This service calculates area per piece and then multiplies by quantity.",
    typeHintPiece: "This service uses a fixed rate per piece.",
    typeHintLinear: "This service calculates length and then multiplies by quantity.",
    typeHintFixed: "This service uses a fixed rate per job and quantity.",
    measureLabel: "Calculated measure",
    rateResultLabel: "Rate",
    qtyResultLabel: "Quantity",
    unitCostLabel: "Unit cost",
    totalCostLabel: "Total cost",
    typeResultLabel: "Type",
    areaNotes: "<b>Size:</b> {w} × {h} ({unit})<br><b>Area per piece:</b> {measure}<br><b>Rate:</b> {rate}<br><b>Cost per piece:</b> {unitCost}<br><b>Quantity:</b> {qty}<br><b>Total:</b> {total}",
    linearNotes: "<b>Length:</b> {length} ({unit})<br><b>Calculated length:</b> {measure}<br><b>Rate:</b> {rate}<br><b>Cost per unit:</b> {unitCost}<br><b>Quantity:</b> {qty}<br><b>Total:</b> {total}",
    pieceNotes: "<b>Rate per piece:</b> {rate}<br><b>Quantity:</b> {qty}<br><b>Total:</b> {total}",
    fixedNotes: "<b>Fixed rate:</b> {rate}<br><b>Quantity:</b> {qty}<br><b>Total:</b> {total}",
    areaMeasureSuffix: "ft²",
    linearMeasureSuffix: "ft",
    pieceMeasure: "1 piece",
    fixedMeasure: "1 job",
    missingRate: "⚠️ Enter the rate for this service.",
    missingMeasure: "⚠️ Complete the measurements for this service."
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

  const SUPPLIERS_LS_KEY = "nj_suppliers_v1";
  const CURRENT_SUPPLIER_KEY = "nj_current_supplier_v1";
  const BASE_MODES = ["tint", "printing", "decals", "coroplast"];

  function normalizeService(item) {
    return {
      id: item?.id || `svc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: item?.name || "",
      calcType: ["area","piece","linear","fixed"].includes(item?.calcType) ? item.calcType : "area",
      rate: item?.rate != null ? String(item.rate) : "",
      note: item?.note || ""
    };
  }

  function normalizeSupplier(item) {
    return {
      id: item?.id || `sup_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: item?.name || t("suppliers.addDefaultName"),
      customServices: Array.isArray(item?.customServices) ? item.customServices.map(normalizeService) : []
    };
  }

  function loadSuppliers() {
    let parsed = [];
    try {
      parsed = JSON.parse(localStorage.getItem(SUPPLIERS_LS_KEY) || "[]");
      if (!Array.isArray(parsed)) parsed = [];
    } catch {
      parsed = [];
    }
    const normalized = parsed.map(normalizeSupplier);
    if (!normalized.some((s) => s.id === "base")) {
      normalized.unshift({ id: "base", name: "Base", customServices: [] });
    }
    return normalized;
  }

  let suppliers = loadSuppliers();
  let currentSupplierId = localStorage.getItem(CURRENT_SUPPLIER_KEY) || "base";
  if (!suppliers.some((s) => s.id === currentSupplierId)) currentSupplierId = "base";

  function saveSuppliers() {
    localStorage.setItem(SUPPLIERS_LS_KEY, JSON.stringify(suppliers));
  }

  function getCurrentSupplier() {
    return suppliers.find((s) => s.id === currentSupplierId) || suppliers[0];
  }

  function isBaseSupplier() {
    return currentSupplierId === "base";
  }

  function supplierStorageKey(path) {
    return `nj_supplier_${currentSupplierId}_${path}`;
  }

  function getCurrentStored(path) {
    return localStorage.getItem(supplierStorageKey(path));
  }

  function setCurrentStored(path, value) {
    const key = supplierStorageKey(path);
    if (value == null || value === "") localStorage.removeItem(key);
    else localStorage.setItem(key, String(value));
  }

  function getCurrentCustomServices() {
    return getCurrentSupplier()?.customServices || [];
  }

  function isCustomMode(mode) {
    return String(mode || "").startsWith("service:");
  }

  function getCustomServiceByMode(mode) {
    if (!isCustomMode(mode)) return null;
    const serviceId = String(mode).slice(8);
    return getCurrentCustomServices().find((s) => s.id === serviceId) || null;
  }

  function getServiceTypeLabel(type) {
    if (type === "piece") return t("suppliers.typePiece");
    if (type === "linear") return t("suppliers.typeLinear");
    if (type === "fixed") return t("suppliers.typeFixed");
    return t("suppliers.typeArea");
  }

  function buildQuoteOptions(selectedValue = "") {
    if (!quoteSelect) return;
    const options = [{ value: "", label: t("main.selectOption") }];
    BASE_MODES.forEach((mode) => options.push({ value: mode, label: t(`modeTitles.${mode}`) }));
    getCurrentCustomServices().forEach((service) => {
      options.push({ value: `service:${service.id}`, label: service.name });
    });
    quoteSelect.innerHTML = "";
    options.forEach((item, idx) => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = item.label;
      if (idx === 0) opt.id = "quoteOptionEmpty";
      quoteSelect.appendChild(opt);
    });
    const allowed = new Set(options.map((o) => o.value));
    quoteSelect.value = allowed.has(selectedValue) ? selectedValue : "";
  }

  function renderSupplierSelect() {
    const sel = $("supplierSelect");
    if (!sel) return;
    sel.innerHTML = "";
    suppliers.forEach((supplier) => {
      const opt = document.createElement("option");
      opt.value = supplier.id;
      opt.textContent = supplier.name;
      sel.appendChild(opt);
    });
    sel.value = currentSupplierId;
  }

  function renderSupplierSummary() {
    const box = $("supplierSummaryBox");
    if (!box) return;
    const supplier = getCurrentSupplier();
    const hint = isBaseSupplier() ? t("suppliers.summaryBase") : t("suppliers.summaryCustom");
    box.innerHTML = t("suppliers.summaryHtml", { name: escapeHtml(supplier?.name || "Base"), hint });
    if ($("supplierNameInput")) $("supplierNameInput").value = supplier?.name || "";
    if ($("deleteSupplierBtn")) $("deleteSupplierBtn").disabled = isBaseSupplier();
  }

  function renderSupplierServiceList() {
    const host = $("supplierServiceList");
    if (!host) return;
    const services = getCurrentCustomServices();
    host.innerHTML = "";
    if (!services.length) {
      host.innerHTML = `<div class="serviceEmpty">${escapeHtml(t("suppliers.noServices"))}</div>`;
      return;
    }
    services.forEach((service) => {
      const row = document.createElement("div");
      row.className = "serviceRow";
      row.innerHTML = `
        <div class="serviceMeta">
          <div class="serviceName">${escapeHtml(service.name)}</div>
          <div class="serviceMini">${escapeHtml(getServiceTypeLabel(service.calcType))}</div>
          <div class="serviceMini">${service.rate ? escapeHtml(money(service.rate)) : "—"}</div>
          <div class="serviceMini">${escapeHtml(service.note || "")}</div>
        </div>
        <button class="iconBtn" type="button" title="${escapeHtml(t("suppliers.deleteService"))}">✕</button>
      `;
      row.querySelector("button")?.addEventListener("click", () => {
        const supplier = getCurrentSupplier();
        supplier.customServices = supplier.customServices.filter((s) => s.id !== service.id);
        saveSuppliers();
        if (quoteSelect?.value === `service:${service.id}`) resetAll();
        renderSupplierServiceList();
        buildQuoteOptions(quoteSelect?.value || "");
        setStatus(t("suppliers.serviceDeleted"));
      });
      host.appendChild(row);
    });
  }

  function loadCurrentSupplierInputs() {
    if ($("rollWidthIn")) $("rollWidthIn").value = getCurrentStored("tint_rollWidth") ?? "60";
    if ($("rollPrice")) $("rollPrice").value = getCurrentStored("tint_rollPrice") ?? (isBaseSupplier() ? "350" : "");
    if ($("oraPrice")) $("oraPrice").value = "";
    if ($("tapePrice")) $("tapePrice").value = "";
    if ($("shipCost")) $("shipCost").value = getCurrentStored("ship_cost") ?? "0";
    updatePrintRateUI(true);
    updateDecalsCPPUI();
    updateCoroplastRateUI(true);
    renderTintBaseSummary();
    updateCoroplastSizePreview();
    renderSupplierSummary();
    renderSupplierServiceList();
  }

  function changeSupplier(nextId) {
    currentSupplierId = nextId;
    localStorage.setItem(CURRENT_SUPPLIER_KEY, currentSupplierId);
    resetAll();
    renderSupplierSelect();
    buildQuoteOptions("");
    loadCurrentSupplierInputs();
  }

  function getModeLabel(mode) {
    if (isCustomMode(mode)) return getCustomServiceByMode(mode)?.name || t("customService.titleFallback");
    return t(`modes.${mode}`) || mode;
  }

  function renderViewTitle(mode) {
    if (!viewTitle) return;
    if (isCustomMode(mode)) {
      const service = getCustomServiceByMode(mode);
      viewTitle.innerHTML = `<b>${escapeHtml(service?.name || t("customService.titleFallback"))}</b>`;
      return;
    }
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
    if (!$("view-coroplast")?.hidden && !$("coroplastResult")?.hidden) {
      $("calcCoroplast")?.click();
    }
    if (!$("view-custom-service")?.hidden && !$("customServiceResult")?.hidden) {
      $("calcCustomService")?.click();
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

    setText("suppliersCardTitle", t("suppliers.cardTitle"));
    setText("supplierSelectLabel", t("suppliers.selectLabel"));
    setText("supplierNameLabel", t("suppliers.nameLabel"));
    setPlaceholder("supplierNameInput", t("suppliers.namePlaceholder"));
    setText("addSupplierBtn", t("suppliers.addBtn"));
    setText("saveSupplierNameBtn", t("suppliers.saveNameBtn"));
    setText("toggleSupplierPanelBtn", $("supplierPanel")?.hidden ? t("suppliers.manageBtn") : t("suppliers.manageBtnClose"));
    setText("deleteSupplierBtn", t("suppliers.deleteBtn"));
    setText("supplierServicesTitle", t("suppliers.servicesTitle"));
    setText("supplierServiceListTitle", t("suppliers.serviceListTitle"));
    setText("serviceNameLabel", t("suppliers.serviceNameLabel"));
    setPlaceholder("serviceNameInput", t("suppliers.serviceNamePlaceholder"));
    setText("serviceTypeLabel", t("suppliers.serviceTypeLabel"));
    setOptionText("serviceTypeArea", t("suppliers.typeArea"));
    setOptionText("serviceTypePiece", t("suppliers.typePiece"));
    setOptionText("serviceTypeLinear", t("suppliers.typeLinear"));
    setOptionText("serviceTypeFixed", t("suppliers.typeFixed"));
    setText("serviceRateLabel", t("suppliers.serviceRateLabel"));
    setPlaceholder("serviceRateInput", t("suppliers.serviceRatePlaceholder"));
    setText("serviceNoteLabel", t("suppliers.serviceNoteLabel"));
    setPlaceholder("serviceNoteInput", t("suppliers.serviceNotePlaceholder"));
    setText("addServiceBtn", t("suppliers.addServiceBtn"));
    setText("supplierRatesHelpTitle", t("suppliers.helpTitle"));
    setHtml("supplierRatesHelpText", t("suppliers.helpText"));

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
    setText("printRateLabel", t("suppliers.printRateInlineLabel"));
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


    setOptionText("quoteOptionCoroplast", t("modeTitles.coroplast"));

    setText("coroplastTitle", t("coroplast.title"));
    setHtml("coroplastIntro", t("coroplast.introHtml"));
    setText("coroplastSizeTitle", t("coroplast.sizeTitle"));
    setText("coroplastSizeModeLabel", t("coroplast.sizeModeLabel"));
    setOptionText("coroplastSizeModeStandard", t("coroplast.sizeModeStandard"));
    setOptionText("coroplastSizeModeManual", t("coroplast.sizeModeManual"));
    setText("coroplastStdSizeLabel", t("coroplast.stdSizeLabel"));
    setText("coroplastWidthLabel", t("coroplast.widthLabel"));
    setText("coroplastHeightLabel", t("coroplast.heightLabel"));
    setText("coroplastCustomTitle", t("coroplast.customTitle"));
    setText("coroplastCustomNameLabel", t("coroplast.customNameLabel"));
    setText("coroplastCustomWidthLabel", t("coroplast.customWidthLabel"));
    setText("coroplastCustomHeightLabel", t("coroplast.customHeightLabel"));
    setPlaceholder("coroplastCustomName", t("coroplast.customNamePlaceholder"));
    setPlaceholder("coroplastCustomW", t("coroplast.customWidthPlaceholder"));
    setPlaceholder("coroplastCustomH", t("coroplast.customHeightPlaceholder"));
    setText("coroplastCustomHint", t("coroplast.customHint"));
    setText("addCoroplastSize", t("coroplast.addSizeBtn"));
    setText("coroplastPrintTitle", t("coroplast.printTitle"));
    setText("coroplastSidesLabel", t("coroplast.sidesLabel"));
    setOptionText("coroplastSidesOne", t("coroplast.oneSide"));
    setOptionText("coroplastSidesTwo", t("coroplast.twoSides"));
    setText("coroplastResolutionLabel", t("coroplast.resolutionLabel"));
    setText("coroplastRateLabel", t("coroplast.rateLabel"));
    setText("coroplastQtyLabel", t("coroplast.qtyLabel"));
    setText("calcCoroplast", t("coroplast.calcBtn"));
    setText("coroplastActualAreaLabel", t("coroplast.actualAreaLabel"));
    setText("coroplastBillableAreaLabel", t("coroplast.billableAreaLabel"));
    setText("coroplastRateResultLabel", t("coroplast.rateResultLabel"));
    setText("coroplastPieceCostLabel", t("coroplast.pieceCostLabel"));
    setText("coroplastQtyResultLabel", t("coroplast.qtyResultLabel"));
    setText("coroplastTotalCostLabel", t("coroplast.totalCostLabel"));

    setText("customRateLabel", t("customService.rateLabel"));
    setText("customQtyLabel", t("customService.qtyLabel"));
    setText("customWidthLabel", t("customService.widthLabel"));
    setText("customHeightLabel", t("customService.heightLabel"));
    setText("customAreaUnitLabel", t("customService.areaUnitLabel"));
    setOptionText("customAreaUnitIn", t("common.inches"));
    setOptionText("customAreaUnitFt", t("common.feet"));
    setText("customLengthLabel", t("customService.lengthLabel"));
    setText("customUnitLabel", t("customService.unitLabel"));
    setOptionText("customUnitIn", t("common.inches"));
    setOptionText("customUnitFt", t("common.feet"));
    setText("calcCustomService", t("customService.calcBtn"));
    setText("customMeasureLabel", t("customService.measureLabel"));
    setText("customRateResultLabel", t("customService.rateResultLabel"));
    setText("customQtyResultLabel", t("customService.qtyResultLabel"));
    setText("customUnitCostLabel", t("customService.unitCostLabel"));
    setText("customTotalCostLabel", t("customService.totalCostLabel"));
    setText("customTypeResultLabel", t("customService.typeResultLabel"));
    updateCoroplastStandardSizesUI();
    updateCoroplastSizePreview();
    updateCoroplastRateUI();

    renderSupplierSelect();
    renderSupplierSummary();
    renderSupplierServiceList();
    buildQuoteOptions(quoteSelect?.value || "");
    if (isCustomMode(quoteSelect?.value || "")) initCustomServiceView(quoteSelect.value);

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

    // Coroplast
    $("coroplastResult") && ($("coroplastResult").hidden = true);

    // Custom service
    $("customServiceResult") && ($("customServiceResult").hidden = true);

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

    const view = isCustomMode(mode) ? $("view-custom-service") : $("view-" + mode);
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

    if (mode === "coroplast") {
      initCoroplastUI();
      updateCoroplastSizeModeUI();
      updateCoroplastStandardSizesUI();
      updateCoroplastSizePreview();
      updateCoroplastRateUI();
      $("coroplastResult") && ($("coroplastResult").hidden = true);
    }

    if (isCustomMode(mode)) {
      initCustomServiceView(mode);
      $("customServiceResult") && ($("customServiceResult").hidden = true);
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

  $("supplierSelect")?.addEventListener("change", () => {
    const nextId = $("supplierSelect")?.value || "base";
    changeSupplier(nextId);
  });

  $("addSupplierBtn")?.addEventListener("click", () => {
    const raw = prompt(t("suppliers.addPrompt"), t("suppliers.addDefaultName"));
    const name = (raw || "").trim();
    if (!name) return;
    if (suppliers.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      return setStatus(t("suppliers.duplicateName"));
    }
    const newSupplier = { id: `sup_${Date.now()}`, name, customServices: [] };
    suppliers.push(newSupplier);
    saveSuppliers();
    currentSupplierId = newSupplier.id;
    localStorage.setItem(CURRENT_SUPPLIER_KEY, currentSupplierId);
    renderSupplierSelect();
    loadCurrentSupplierInputs();
    buildQuoteOptions("");
    resetAll();
    setStatus(t("suppliers.addStatus", { name }));
  });

  $("saveSupplierNameBtn")?.addEventListener("click", () => {
    const input = $("supplierNameInput");
    const name = (input?.value || "").trim();
    if (!name) return setStatus(t("suppliers.nameRequired"));
    if (suppliers.some((s) => s.id !== currentSupplierId && s.name.toLowerCase() === name.toLowerCase())) {
      return setStatus(t("suppliers.duplicateName"));
    }
    const supplier = getCurrentSupplier();
    supplier.name = name;
    saveSuppliers();
    renderSupplierSelect();
    renderSupplierSummary();
    setStatus(t("suppliers.saveStatus", { name }));
  });

  $("deleteSupplierBtn")?.addEventListener("click", () => {
    if (isBaseSupplier()) return setStatus(t("suppliers.deleteBlocked"));
    if (!confirm(t("suppliers.deleteConfirm"))) return;
    suppliers = suppliers.filter((s) => s.id !== currentSupplierId);
    saveSuppliers();
    currentSupplierId = "base";
    localStorage.setItem(CURRENT_SUPPLIER_KEY, currentSupplierId);
    renderSupplierSelect();
    loadCurrentSupplierInputs();
    buildQuoteOptions("");
    resetAll();
    setStatus(t("suppliers.deleteStatus"));
  });

  $("toggleSupplierPanelBtn")?.addEventListener("click", () => {
    const panel = $("supplierPanel");
    if (!panel) return;
    panel.hidden = !panel.hidden;
    setText("toggleSupplierPanelBtn", panel.hidden ? t("suppliers.manageBtn") : t("suppliers.manageBtnClose"));
  });

  $("addServiceBtn")?.addEventListener("click", () => {
    const name = ($("serviceNameInput")?.value || "").trim();
    if (!name) return setStatus(t("suppliers.serviceNameRequired"));
    const service = {
      id: `svc_${Date.now()}`,
      name,
      calcType: $("serviceTypeSelect")?.value || "area",
      rate: $("serviceRateInput")?.value || "",
      note: $("serviceNoteInput")?.value || ""
    };
    getCurrentSupplier().customServices.push(service);
    saveSuppliers();
    $("serviceNameInput") && ($("serviceNameInput").value = "");
    $("serviceRateInput") && ($("serviceRateInput").value = "");
    $("serviceNoteInput") && ($("serviceNoteInput").value = "");
    $("serviceTypeSelect") && ($("serviceTypeSelect").value = "area");
    renderSupplierServiceList();
    buildQuoteOptions(quoteSelect?.value || "");
    setStatus(t("suppliers.serviceAdded", { name }));
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
    const price = clampMin(safeNum($("rollPrice"), 0), 0);
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
  $("rollWidthIn")?.addEventListener("input", () => setCurrentStored("tint_rollWidth", $("rollWidthIn")?.value || "60"));
  $("rollPrice")?.addEventListener("input", () => setCurrentStored("tint_rollPrice", $("rollPrice")?.value || ""));

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
      rollPrice: money(safeNum($("rollPrice"), 0)),
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
      rollPrice: money(safeNum($("rollPrice"), 0)),
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

  function getSupplierPrintRate(key) {
    const saved = getCurrentStored(`print_rate_${key}`);
    if (saved != null && saved !== "") return Number(saved);
    return isBaseSupplier() ? PRINT_RATES[key] : null;
  }

  function updatePrintRateUI(force = false) {
    const key = printType?.value || "vinyl_basic";
    const rate = getSupplierPrintRate(key);
    if (!printRate) return;
    if (force || document.activeElement !== printRate) {
      printRate.value = rate != null && Number.isFinite(Number(rate)) ? Number(rate).toFixed(2) : "";
    }
  }

  function saveCurrentPrintRate() {
    const key = printType?.value || "vinyl_basic";
    const raw = printRate?.value || "";
    setCurrentStored(`print_rate_${key}`, raw);
  }

  printType?.addEventListener("change", () => {
    updatePrintRateUI(true);
    $("printResult") && ($("printResult").hidden = true);
  });

  printRate?.addEventListener("input", () => {
    saveCurrentPrintRate();
    $("printResult") && ($("printResult").hidden = true);
  });

  $("calcPrint")?.addEventListener("click", () => {
    const key = printType?.value || "vinyl_basic";
    const rate = clampMin(Number(printRate?.value || 0), 0);
    if (rate <= 0) return setStatus(t("suppliers.printRateMissing"));
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

    const typeLabel = printType.options[printType.selectedIndex]?.textContent || key;
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
    return supplierStorageKey(`${prefix}_${source}_${rollId}`);
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

    if ($("vinylType") && !$("vinylType").value) $("vinylType").value = "orafol651";
    if ($("tapeType") && !$("tapeType").value) $("tapeType").value = "rtape4075rla";
  }

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
    setCurrentStored("ship_cost", $("shipCost").value || "0");
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

  // =========================
  // COROPLAST PRINTING MODULE
  // =========================
  const COROPLAST_DEFAULT_SIZES = [
    { id: "12x18", label: '12" × 18"', w: 12, h: 18 },
    { id: "18x24", label: '18" × 24"', w: 18, h: 24 },
    { id: "24x18", label: '24" × 18"', w: 24, h: 18 },
    { id: "24x36", label: '24" × 36"', w: 24, h: 36 },
    { id: "36x24", label: '36" × 24"', w: 36, h: 24 },
    { id: "48x96", label: '48" × 96"', w: 48, h: 96 },
  ];
  const COROPLAST_SIZES_LS_KEY = "nj_coroplast_custom_sizes_v1";
  const COROPLAST_RATE_MAP = {
    360: { 1: 1.5, 2: 2.0 },
    720: { 1: 3.0, 2: 5.0 },
    1440: { 1: 4.0, 2: 5.0 },
  };

  function getStoredCoroplastSizes() {
    try {
      const raw = localStorage.getItem(COROPLAST_SIZES_LS_KEY);
      const parsed = JSON.parse(raw || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(x => x && Number(x.w) > 0 && Number(x.h) > 0 && x.label);
    } catch {
      return [];
    }
  }

  function saveCoroplastSizes(list) {
    localStorage.setItem(COROPLAST_SIZES_LS_KEY, JSON.stringify(list));
  }

  function getAllCoroplastSizes() {
    return [...COROPLAST_DEFAULT_SIZES, ...getStoredCoroplastSizes()];
  }

  function updateCoroplastStandardSizesUI() {
    const sel = $("coroplastStdSize");
    if (!sel) return;
    const prev = sel.value;
    const items = getAllCoroplastSizes();
    sel.innerHTML = "";
    items.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = it.label;
      sel.appendChild(opt);
    });
    sel.value = items.some(x => x.id === prev) ? prev : (items[0]?.id || "");
  }

  function getCoroplastDims() {
    const mode = $("coroplastSizeMode")?.value || "standard";
    if (mode === "manual") {
      const w = clampMin(safeNum($("coroplastW"), 0), 0.01);
      const h = clampMin(safeNum($("coroplastH"), 0), 0.01);
      return { mode, label: t("coroplast.manualLabel"), w, h };
    }
    const id = $("coroplastStdSize")?.value || "";
    const item = getAllCoroplastSizes().find(x => x.id === id) || COROPLAST_DEFAULT_SIZES[0];
    return { mode, label: item.label, w: Number(item.w), h: Number(item.h) };
  }

  function updateCoroplastSizeModeUI() {
    const manual = $("coroplastSizeMode")?.value === "manual";
    if ($("coroplastManualRow")) $("coroplastManualRow").hidden = !manual;
    if ($("coroplastStdSize")) $("coroplastStdSize").disabled = manual;
  }

  function updateCoroplastSizePreview() {
    const box = $("coroplastSizePreview");
    if (!box) return;
    const { label, w, h } = getCoroplastDims();
    const area = (w * h) / 144;
    box.innerHTML = t("coroplast.sizePreviewHtml", {
      label: escapeHtml(label),
      w: Number(w).toFixed(2).replace(/\.00$/, ""),
      h: Number(h).toFixed(2).replace(/\.00$/, ""),
      area: area.toFixed(4)
    });
  }

  function getCoroplastBaseRate() {
    const sides = Number($("coroplastSides")?.value || 1);
    const resolution = Number($("coroplastResolution")?.value || 360);
    return COROPLAST_RATE_MAP[resolution]?.[sides] ?? 0;
  }

  function getSupplierCoroplastRate() {
    const sides = $("coroplastSides")?.value || "1";
    const resolution = $("coroplastResolution")?.value || "360";
    const saved = getCurrentStored(`coroplast_rate_${resolution}_${sides}`);
    if (saved != null && saved !== "") return Number(saved);
    return isBaseSupplier() ? getCoroplastBaseRate() : null;
  }

  function updateCoroplastRateUI(resetValue = false) {
    const baseRate = getCoroplastBaseRate();
    const currentRate = getSupplierCoroplastRate();
    const input = $("coroplastRate");
    const info = $("coroplastRateInfo");
    if (input && (resetValue || document.activeElement !== input)) {
      input.value = currentRate != null && Number.isFinite(Number(currentRate)) ? Number(currentRate).toFixed(2) : "";
    }
    if (info) {
      info.innerHTML = t("coroplast.rateInfoHtml", { rate: money(baseRate) });
    }
  }

  function initCoroplastUI() {
    updateCoroplastStandardSizesUI();
    updateCoroplastSizeModeUI();
    updateCoroplastSizePreview();
    updateCoroplastRateUI(false);
  }

  $("coroplastSizeMode")?.addEventListener("change", () => {
    updateCoroplastSizeModeUI();
    updateCoroplastSizePreview();
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });
  $("coroplastStdSize")?.addEventListener("change", () => {
    updateCoroplastSizePreview();
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });
  $("coroplastW")?.addEventListener("input", () => {
    updateCoroplastSizePreview();
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });
  $("coroplastH")?.addEventListener("input", () => {
    updateCoroplastSizePreview();
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });
  $("coroplastSides")?.addEventListener("change", () => {
    updateCoroplastRateUI(true);
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });
  $("coroplastResolution")?.addEventListener("change", () => {
    updateCoroplastRateUI(true);
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });
  $("coroplastRate")?.addEventListener("input", () => {
    const sides = $("coroplastSides")?.value || "1";
    const resolution = $("coroplastResolution")?.value || "360";
    setCurrentStored(`coroplast_rate_${resolution}_${sides}`, $("coroplastRate")?.value || "");
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });
  $("coroplastQty")?.addEventListener("input", () => {
    $("coroplastResult") && ($("coroplastResult").hidden = true);
  });

  $("addCoroplastSize")?.addEventListener("click", () => {
    const name = $("coroplastCustomName")?.value?.trim() || "";
    const w = clampMin(safeNum($("coroplastCustomW"), 0), 0);
    const h = clampMin(safeNum($("coroplastCustomH"), 0), 0);
    if (!name || w <= 0 || h <= 0) return setStatusKey("status.coroplastCustomSize");

    const stored = getStoredCoroplastSizes();
    const id = `c_${Date.now()}`;
    const label = `${name} (${w}" × ${h}")`;
    stored.push({ id, label, w, h });
    saveCoroplastSizes(stored);

    $("coroplastCustomName").value = "";
    $("coroplastCustomW").value = "";
    $("coroplastCustomH").value = "";
    updateCoroplastStandardSizesUI();
    $("coroplastStdSize").value = id;
    $("coroplastSizeMode").value = "standard";
    updateCoroplastSizeModeUI();
    updateCoroplastSizePreview();
    setStatus(t("coroplast.customAdded", { label }));
  });

  $("calcCoroplast")?.addEventListener("click", () => {
    const { label, w, h } = getCoroplastDims();
    if (w <= 0 || h <= 0) return setStatusKey("status.coroplastSize");

    const rate = clampMin(safeNum($("coroplastRate"), 0), 0);
    if (rate <= 0) return setStatus(t("suppliers.coroplastRateMissing"));

    setStatus("");

    const qty = clampMin(Math.floor(safeNum($("coroplastQty"), 1)), 1);
    const sidesLabel = $("coroplastSides")?.value === "2" ? t("coroplast.twoSides") : t("coroplast.oneSide");
    const resolution = $("coroplastResolution")?.value || "360";

    const actualArea = (w * h) / 144;
    const billableArea = Math.ceil(actualArea);
    const pieceCost = billableArea * rate;
    const totalCost = pieceCost * qty;

    $("coroplastResult").hidden = false;
    $("coroplastActualArea").textContent = `${actualArea.toFixed(4)} ft²`;
    $("coroplastBillableArea").textContent = `${billableArea.toFixed(0)} ft²`;
    $("coroplastRateResult").textContent = `${money(rate)}/ft²`;
    $("coroplastPieceCost").textContent = money(pieceCost);
    $("coroplastQtyResult").textContent = String(qty);
    $("coroplastTotalCost").textContent = money(totalCost);

    $("coroplastNotes").innerHTML = t("coroplast.notesHtml", {
      label: escapeHtml(label),
      w: Number(w).toFixed(2).replace(/\.00$/, ""),
      h: Number(h).toFixed(2).replace(/\.00$/, ""),
      sides: sidesLabel,
      resolution,
      actual: actualArea.toFixed(4),
      billable: billableArea.toFixed(0),
      rate: money(rate),
      pieceCost: money(pieceCost),
      qty,
      total: money(totalCost)
    });
  });

  // =========================
  // CUSTOM SERVICE MODULE
  // =========================
  function getActiveCustomService() {
    return getCustomServiceByMode(quoteSelect?.value || "");
  }

  function updateCustomServiceUi(service) {
    const type = service?.calcType || "area";
    if ($("customAreaRow")) $("customAreaRow").hidden = !(type === "area");
    if ($("customAreaUnitRow")) $("customAreaUnitRow").hidden = !(type === "area");
    if ($("customLinearRow")) $("customLinearRow").hidden = !(type === "linear");
    const hintMap = {
      area: t("customService.typeHintArea"),
      piece: t("customService.typeHintPiece"),
      linear: t("customService.typeHintLinear"),
      fixed: t("customService.typeHintFixed")
    };
    setText("customTypeHint", hintMap[type] || hintMap.area);
  }

  function initCustomServiceView(mode) {
    const service = getCustomServiceByMode(mode);
    if (!service) return;
    setText("customServiceTitle", service.name || t("customService.titleFallback"));
    setHtml("customServiceIntro", t("customService.introHtml", {
      name: escapeHtml(service.name || t("customService.titleFallback")),
      type: escapeHtml(getServiceTypeLabel(service.calcType)),
      note: escapeHtml(service.note || "—")
    }));
    if ($("customRate")) $("customRate").value = service.rate || "";
    updateCustomServiceUi(service);
  }

  function saveActiveCustomServiceRate() {
    const service = getActiveCustomService();
    if (!service) return;
    service.rate = $("customRate")?.value || "";
    saveSuppliers();
    renderSupplierServiceList();
  }

  $("customRate")?.addEventListener("input", () => {
    saveActiveCustomServiceRate();
    $("customServiceResult") && ($("customServiceResult").hidden = true);
  });
  ["customQty","customW","customH","customLength"].forEach((id) => {
    $(id)?.addEventListener("input", () => {
      $("customServiceResult") && ($("customServiceResult").hidden = true);
    });
  });
  ["customAreaUnit","customUnit"].forEach((id) => {
    $(id)?.addEventListener("change", () => {
      $("customServiceResult") && ($("customServiceResult").hidden = true);
    });
  });

  $("calcCustomService")?.addEventListener("click", () => {
    const service = getActiveCustomService();
    if (!service) return;

    const rate = clampMin(safeNum($("customRate"), 0), 0);
    if (rate <= 0) return setStatus(t("customService.missingRate"));

    const qty = clampMin(Math.floor(safeNum($("customQty"), 1)), 1);
    const type = service.calcType || "area";
    let measureText = "—";
    let unitCost = 0;
    let total = 0;
    let notes = "";

    if (type === "area") {
      const w = clampMin(safeNum($("customW"), 0), 0.01);
      const h = clampMin(safeNum($("customH"), 0), 0.01);
      const unit = $("customAreaUnit")?.value || "in";
      if (w <= 0 || h <= 0) return setStatus(t("customService.missingMeasure"));
      const measure = lengthToFeet(w, unit) * lengthToFeet(h, unit);
      measureText = `${measure.toFixed(4)} ${t("customService.areaMeasureSuffix")}`;
      unitCost = measure * rate;
      total = unitCost * qty;
      notes = t("customService.areaNotes", { w, h, unit, measure: measureText, rate: money(rate), unitCost: money(unitCost), qty, total: money(total) });
    } else if (type === "linear") {
      const length = clampMin(safeNum($("customLength"), 0), 0.01);
      const unit = $("customUnit")?.value || "ft";
      if (length <= 0) return setStatus(t("customService.missingMeasure"));
      const measure = lengthToFeet(length, unit);
      measureText = `${measure.toFixed(2)} ${t("customService.linearMeasureSuffix")}`;
      unitCost = measure * rate;
      total = unitCost * qty;
      notes = t("customService.linearNotes", { length, unit, measure: measureText, rate: money(rate), unitCost: money(unitCost), qty, total: money(total) });
    } else if (type === "piece") {
      measureText = t("customService.pieceMeasure");
      unitCost = rate;
      total = unitCost * qty;
      notes = t("customService.pieceNotes", { rate: money(rate), qty, total: money(total) });
    } else {
      measureText = t("customService.fixedMeasure");
      unitCost = rate;
      total = unitCost * qty;
      notes = t("customService.fixedNotes", { rate: money(rate), qty, total: money(total) });
    }

    setStatus("");
    $("customServiceResult").hidden = false;
    $("customMeasureValue").textContent = measureText;
    $("customRateValue").textContent = money(rate);
    $("customQtyValue").textContent = String(qty);
    $("customUnitCostValue").textContent = money(unitCost);
    $("customTotalCostValue").textContent = money(total);
    $("customTypeValue").textContent = getServiceTypeLabel(type);
    $("customServiceNotes").innerHTML = notes;
  });

  // ===== INIT =====
  resetAll();
  ensureDefaultWin();
  initDecalsUI();
  initCoroplastUI();
  loadCurrentSupplierInputs();
  applyTranslations();
});

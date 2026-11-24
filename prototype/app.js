(() => {
  const labels = {radar:"Radar de oportunidades",history:"Histórico de señales",assets:"Universo de activos",news:"Noticias y alertas","asset-detail":"Ficha de activo"};
  const pages = [...document.querySelectorAll(".page")];
  const sidebar = document.getElementById("sidebar");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }

  function navigate(name) {
    pages.forEach(page => page.classList.toggle("active", page.id === "page-" + name));
    document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.page === name));
    document.getElementById("breadcrumbCurrent").textContent = labels[name] || "Ficha de activo";
    sidebar.classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  const assets = {
    NVDA:{name:"NVIDIA",sub:"NVDA · NASDAQ · USD · Tecnología",price:"182,40 $",score:"91",signal:"Compra moderada",explanation:"Retroceso controlado hacia zona de soporte con recuperación del impulso relativo. La señal permanece dentro del rango de entrada simulado."},
    MSFT:{name:"Microsoft",sub:"MSFT · NASDAQ · USD · Software y cloud",price:"528,16 $",score:"83",signal:"Compra moderada",explanation:"Continuidad de tendencia y mejora de amplitud. Pendiente de confirmación de volumen en la siguiente sesión."},
    META:{name:"Meta Platforms",sub:"META · NASDAQ · USD · Plataformas",price:"672,30 $",score:"68",signal:"Neutral",explanation:"Movimiento lateral con señales mixtas. No existe una ventaja suficientemente clara en este ejemplo."},
    AMZN:{name:"Amazon",sub:"AMZN · NASDAQ · USD · Comercio y cloud",price:"238,70 $",score:"77",signal:"Vigilancia",explanation:"Mejora gradual del impulso, todavía pendiente de superar una zona de resistencia ficticia."},
    JNJ:{name:"Johnson & Johnson",sub:"JNJ · NYSE · USD · Salud",price:"168,92 $",score:"75",signal:"Vigilancia",explanation:"Comportamiento defensivo y volatilidad moderada. Se mantiene en observación sin señal de entrada."},
    ASML:{name:"ASML",sub:"ASML · Euronext Amsterdam · EUR · Semiconductores",price:"684,20 €",score:"86",signal:"Vigilancia",explanation:"Fortaleza relativa positiva, pero el precio se aproxima al límite superior de entrada. Evitar perseguir el movimiento."},
    SAP:{name:"SAP",sub:"SAP · XETRA · EUR · Software empresarial",price:"224,80 €",score:"71",signal:"Neutral",explanation:"Tendencia constructiva, aunque sin confirmación suficiente para activar una señal."},
    SAN:{name:"Banco Santander",sub:"SAN · BME Madrid · EUR · Banca",price:"8,42 €",score:"79",signal:"Compra moderada",explanation:"Mejora de momentum y fortaleza relativa en el ejemplo. La señal requiere confirmación del entorno sectorial."},
    SPY:{name:"SPDR S&P 500 ETF",sub:"SPY · NYSE Arca · USD · ETF",price:"662,10 $",score:"80",signal:"Neutral",explanation:"Activo de referencia con tendencia positiva. Se utiliza como comparación del mercado, no como oportunidad prioritaria."},
    VWCE:{name:"Vanguard FTSE All-World",sub:"VWCE · XETRA · EUR · ETF UCITS",price:"142,60 €",score:"78",signal:"Neutral",explanation:"Exposición global diversificada. Seguimiento de tendencia y contexto general del mercado."},
    BTC:{name:"Bitcoin",sub:"BTC/USD · CRYPTO · USD · Cripto",price:"94.280 $",score:"74",signal:"Posible rebote",explanation:"Recuperación rápida tras una caída, con volatilidad elevada. La confirmación de estructura todavía es débil."},
    ETH:{name:"Ethereum",sub:"ETH/USD · CRYPTO · USD · Cripto",price:"3.180 $",score:"69",signal:"Vigilancia",explanation:"Volatilidad alta y recuperación incompleta. Se mantiene en observación a la espera de una estructura más clara."}
  };

  function openAsset(symbol) {
    const asset = assets[symbol];
    if (!asset) return;
    document.getElementById("detailName").textContent = asset.name;
    document.getElementById("detailSub").textContent = asset.sub;
    document.getElementById("detailPrice").textContent = asset.price;
    document.getElementById("detailScore").textContent = asset.score;
    document.getElementById("detailSignal").textContent = asset.signal;
    document.getElementById("detailExplanation").textContent = asset.explanation;
    const signal = document.getElementById("detailSignal");
    signal.className = "signal-tag " + (asset.signal.toLowerCase().includes("compra") ? "buy" : asset.signal.toLowerCase().includes("vig") ? "watch" : "neutral");
    navigate("asset-detail");
  }

  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) { navigate(pageButton.dataset.page); return; }
    const assetButton = event.target.closest("[data-asset]");
    if (assetButton) { openAsset(assetButton.dataset.asset); return; }
    const period = event.target.closest(".period");
    if (period) {
      document.querySelectorAll(".period").forEach(button => button.classList.remove("active"));
      period.classList.add("active");
      showToast("Rango temporal ilustrativo: " + period.textContent);
      return;
    }
    const filter = event.target.closest(".filter");
    if (filter) {
      filter.parentElement.querySelectorAll(".filter").forEach(button => button.classList.remove("active"));
      filter.classList.add("active");
      showToast("Filtro visual seleccionado: " + filter.textContent.trim());
    }
  });

  document.getElementById("menuToggle").addEventListener("click", () => sidebar.classList.toggle("open"));
  const refreshDemo = document.getElementById("refreshDemo");
  if (refreshDemo) refreshDemo.addEventListener("click", () => showToast("Vista de demostración: no hay datos nuevos."));
  document.getElementById("assetSearch").addEventListener("input", event => {
    const query = event.target.value.trim().toLocaleLowerCase("es");
    document.querySelectorAll("#assetTable tbody tr").forEach(row => {
      row.hidden = !row.textContent.toLocaleLowerCase("es").includes(query);
    });
  });
  document.querySelectorAll(".toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("on");
      showToast("Preferencia visual modificada (no se guarda).");
    });
  });
})();
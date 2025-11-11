// ==================== DATOS DE NOTICIAS ====================
const articles = [
  {
    id: 1,
    title: "Frente frío número 14 provoca descenso de temperatura",
    summary: "El Servicio Meteorológico Nacional informó la llegada de un nuevo frente frío, causando bajas temperaturas en el norte del país.",
    thumb: "https://images.unsplash.com/photo-1542327897-37fa1ff59b9b?auto=format&fit=crop&w=800&q=60",
    tags: ["alert", "frío"],
    city: "Chihuahua"
  },
  {
    id: 2,
    title: "Lluvias intensas en Tamaulipas generan inundaciones",
    summary: "Protección Civil activó albergues debido a encharcamientos y desbordamientos en zonas bajas.",
    thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    tags: ["alert", "lluvia"],
    city: "Tamaulipas"
  },
  {
    id: 3,
    title: "Ola de calor afecta el centro del país",
    summary: "Temperaturas superiores a 38°C se registran en varias entidades. Autoridades recomiendan hidratarse.",
    thumb: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
    tags: ["forecast", "calor"],
    city: "CDMX"
  },
  {
    id: 4,
    title: "Tormenta eléctrica sorprende a Monterrey",
    summary: "Rayos y truenos iluminan la ciudad mientras las lluvias continúan durante la madrugada.",
    thumb: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=60",
    tags: ["alert", "tormenta"],
    city: "Monterrey"
  },
  {
    id: 5,
    title: "Nevada temprana cubre Durango",
    summary: "Las primeras nevadas del año llegaron a la sierra, atrayendo turistas y cerrando carreteras.",
    thumb: "https://images.unsplash.com/photo-1608889175123-3c4d9c1a40db?auto=format&fit=crop&w=800&q=60",
    tags: ["report", "nieve"],
    city: "Durango"
  },
  {
    id: 6,
    title: "Viento fuerte derriba árboles en Querétaro",
    summary: "Rachas superiores a 70 km/h causaron daños menores en la zona metropolitana.",
    thumb: "https://images.unsplash.com/photo-1558981403-c5f9891e3588?auto=format&fit=crop&w=800&q=60",
    tags: ["alert", "viento"],
    city: "Querétaro"
  },
  {
    id: 7,
    title: "Nube de polvo sahariano llega al Caribe",
    summary: "Se espera reducción en calidad del aire en las próximas horas.",
    thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    tags: ["report", "polvo"],
    city: "Cancún"
  },
  {
    id: 8,
    title: "Humedad elevada genera niebla en Toluca",
    summary: "Visibilidad reducida por las mañanas afecta tránsito vehicular.",
    thumb: "https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&w=800&q=60",
    tags: ["forecast", "niebla"],
    city: "Toluca"
  },
  {
    id: 9,
    title: "Corrientes en el Pacífico podrían influir en ciclones",
    summary: "Meteorólogos observan actividad irregular que podría intensificar tormentas en la región.",
    thumb: "https://images.unsplash.com/photo-1483794354334-6c81ad8947d1?auto=format&fit=crop&w=800&q=60",
    tags: ["forecast", "ciclones"],
    city: "Pacífico Mexicano"
  },
  {
    id: 10,
    title: "Baja presión podría traer lluvias a Veracruz",
    summary: "Se recomienda evitar zonas cercanas a cuerpos de agua y mantenerse informado.",
    thumb: "https://images.unsplash.com/photo-1526726584893-70e6acb8b41b?auto=format&fit=crop&w=800&q=60",
    tags: ["alert", "lluvia"],
    city: "Veracruz"
  }
];

// ==================== RENDER DE NOTICIAS ====================
function renderArticles(list) {
  const container = document.getElementById("articles");
  container.innerHTML = "";

  list.forEach(a => {
    const el = document.createElement("div");
    el.className = "article";

    el.innerHTML = `
      <img src="${a.thumb}" alt="">
      <div>
        <h3>${a.title}</h3>
        <p>${a.summary}</p>
        <div class="tag">${a.city}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

renderArticles(articles);

// ==================== FILTROS Y BÚSQUEDA ====================
document.getElementById("btnSearch").onclick = () => {
  const text = document.getElementById("q").value.toLowerCase();
  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(text) ||
    a.summary.toLowerCase().includes(text) ||
    a.city.toLowerCase().includes(text)
  );
  renderArticles(filtered);
};

document.getElementById("filter").onchange = (e) => {
  const val = e.target.value;
  if (val === "all") return renderArticles(articles);

  const filtered = articles.filter(a => a.tags.includes(val));
  renderArticles(filtered);
};

document.getElementById("refresh").onclick = () => renderArticles(articles);

// ==================== CLIMA LOCAL (SIN API) ====================
function setWeather(city, temp, cond) {
  document.getElementById("city").textContent = city;
  document.getElementById("temp").textContent = temp + "°C";
  document.getElementById("cond").textContent = cond;
}

setWeather("Chihuahua, MX", 23, "Parcialmente nublado");

document.getElementById("btnLocation").onclick = () => {
  navigator.geolocation.getCurrentPosition(() => {
    alert("Ubicación detectada (simulada). Aquí se conectaría API real.");
  });
};

// ==================== ALERTAS ====================
const alertList = [
  "Aviso por bajas temperaturas en zona norte.",
  "Precaución por vientos fuertes en Querétaro.",
  "Posible tormenta eléctrica en Monterrey.",
];

const alertContainer = document.getElementById("alerts");
alertList.forEach(a => {
  const li = document.createElement("li");
  li.textContent = "⚠️ " + a;
  alertContainer.appendChild(li);
});

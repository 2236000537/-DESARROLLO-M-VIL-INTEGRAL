
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openMenu(){
  document.getElementById("sidebar").style.transform = "translateX(0)";
  document.getElementById("overlay").style.display = "block";
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function closeMenu(){
  document.getElementById("sidebar").style.transform = "translateX(-100%)";
  document.getElementById("overlay").style.display = "none";
}

const sampleForecast = [
  {day:'Lun', date:'10/11', icon:'☀️', min:18, max:28, pop:5, desc:'Soleado'},
  {day:'Mar', date:'11/11', icon:'⛅', min:17, max:26, pop:10, desc:'Parcialmente nublado'},
  {day:'Mié', date:'12/11', icon:'🌧️', min:16, max:22, pop:65, desc:'Lluvias dispersas'},
  {day:'Jue', date:'13/11', icon:'⛈️', min:15, max:20, pop:80, desc:'Tormentas eléctricas'},
  {day:'Vie', date:'14/11', icon:'🌦️', min:16, max:23, pop:40, desc:'Chubascos'},
  {day:'Sáb', date:'15/11', icon:'🌤️', min:17, max:25, pop:15, desc:'Nubes y sol'},
  {day:'Dom', date:'16/11', icon:'☀️', min:18, max:27, pop:5, desc:'Soleado'}
];

function renderForecast(data){
  const container = document.getElementById('forecast');
  container.innerHTML = '';
  data.forEach(d => {
    const div = document.createElement('div');
    div.className = 'day-card';
    div.innerHTML = `
      <div style="font-weight:700">${d.day}</div>
      <div style="font-size:20px;margin:6px 0;">${d.icon}</div>
      <div style="font-weight:600">${d.max}° / <span style="opacity:0.8">${d.min}°</span></div>
      <div style="font-size:13px;margin-top:6px;opacity:0.9">${d.desc}</div>
      <div style="margin-top:8px;font-size:12px">Prob. lluvia: ${d.pop}%</div>
    `;
    container.appendChild(div);
  });
}

function updateCurrentRandom(){
  const today = sampleForecast[0];
  document.getElementById('current-icon').textContent = today.icon;
  document.getElementById('temp').textContent = today.max + '°C';
  document.getElementById('desc').textContent = today.desc;
  document.getElementById('humidity').textContent = 'Humedad: ' + (40 + Math.floor(Math.random()*40)) + '%';
  document.getElementById('wind').textContent = 'Viento: ' + (5 + Math.floor(Math.random()*20)) + ' km/h';
  document.getElementById('feels').textContent = 'Sensación: ' + (today.max + 1) + '°C';
  const highPop = sampleForecast.slice(0,2).some(d => d.pop >= 60);
  document.getElementById('alert-box').style.display = highPop ? 'block' : 'none';
  document.getElementById('extended').textContent =
    `Última actualización: ${new Date().toLocaleString()}. Probabilidad de lluvia: ${today.pop}%.`;
}

renderForecast(sampleForecast);
updateCurrentRandom();

document.getElementById('update-btn').addEventListener('click', () => {
  sampleForecast.push(sampleForecast.shift());
  renderForecast(sampleForecast);
  updateCurrentRandom();
});


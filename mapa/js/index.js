
      // Utils
      function escapeHtml(str) {
        return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]));
      }

      const STORAGE_KEY = 'foro_reseñas_v1';

      function loadComments() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch(e){
          console.error(e);
          return [];
        }
      }

      function saveComments(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }

      function highlightMentions(text) {
        // Reemplaza @usuario por span con clase mention
        return escapeHtml(text).replace(/@([a-zA-Z0-9_]+)/g, '<span class="mention">@$1</span>');
      }

      function renderComments() {
        const container = document.getElementById('comments');
        const list = loadComments();
        container.innerHTML = '';
        document.getElementById('empty').style.display = list.length ? 'none' : 'block';

        // Mostrar más recientes primero
        list.slice().reverse().forEach((c, ) => {
          const div = document.createElement('div');
          div.className = 'comment';
          const time = new Date(c.time).toLocaleString();
          div.innerHTML = `
            <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;">
              <div>
                <div style="font-weight:700;">${escapeHtml(c.name || 'Anónimo')}</div>
                <div class="meta">${time} · <span class="small">Votos: <strong id="votes-${c.id}">${c.votes||0}</strong></span></div>
              </div>
              <div style="text-align:right;">
                <button data-id="${c.id}" class="btn-like" aria-label="Me gusta">👍</button>
                <button data-id-del="${c.id}" style="background:#fff;border:1px solid #ffd6d6;padding:6px 8px;border-radius:8px;cursor:pointer;">Eliminar</button>
              </div>
            </div>
            <div style="margin-top:8px;">${highlightMentions(c.text)}</div>
          `;
          container.appendChild(div);
        });
      }

      // Eventos
      document.getElementById('post-btn').addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const text = document.getElementById('content').value.trim();
        if (!text) {
          alert('Escribe una reseña antes de publicar.');
          return;
        }
        const list = loadComments();
        const newItem = {
          id: Date.now().toString(),
          name: name || 'Anónimo',
          text,
          time: Date.now(),
          votes: 0
        };
        list.push(newItem);
        saveComments(list);
        renderComments();
        document.getElementById('content').value = '';
      });

      document.getElementById('clear-btn').addEventListener('click', () => {
        document.getElementById('name').value = '';
        document.getElementById('content').value = '';
      });

      // Delegación para likes y borrar
      document.getElementById('comments').addEventListener('click', (e) => {
        const target = e.target;
        const idLike = target.getAttribute('data-id');
        const idDel = target.getAttribute('data-id-del');
        if (idLike) {
          const list = loadComments();
          const idx = list.findIndex(x => x.id === idLike);
          if (idx >= 0) {
            list[idx].votes = (list[idx].votes || 0) + 1;
            saveComments(list);
            document.getElementById('votes-' + idLike).textContent = list[idx].votes;
          }
        } else if (idDel) {
          if (!confirm('¿Eliminar esta reseña?')) return;
          let list = loadComments();
          list = list.filter(x => x.id !== idDel);
          saveComments(list);
          renderComments();
        }
      });

      // Inicializar
      renderComments();

    // Datos de ejemplo

    const sampleArticles = [
      {id:1,title:"Frente frío provoca lluvias intensas en el norte",summary:"Se esperan chubascos y descensos de temperatura esta noche.",thumb:'https://images.unsplash.com/photo-1502209524168-acea936a9a4b?auto=format&fit=crop&w=800&q=60',tags:['alert','lluvias'],city:'Chihuahua'},
      {id:2,title:"Ola de calor se intensifica en el centro del país",summary:"Recomendaciones: hidratarse y evitar exposición al sol entre 12:00 y 16:00.",thumb:'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=800&q=60',tags:['forecast','calor'],city:'CDMX'},
      {id:3,title:"Nave espacial detecta polvo sahariano sobre el Caribe",summary:"Afectación mínima en temperaturas, pero reducción de la calidad del aire.",thumb:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',tags:['report','polvo'],city:'Cancún'}
    ];

    const sampleAlerts = [
      {id:1,msg:'Alerta amarilla por vientos en Hidalgo'},
      {id:2,msg:'Aviso de inundaciones en zonas bajas de Sinaloa'}
    ];

    function renderArticles(list){
      const container = document.getElementById('articles');
      container.innerHTML = '';
      list.forEach(a=>{
        const el = document.createElement('div'); el.className='article card';
        el.innerHTML = `
          <div class="thumb" style="background-image:url('${a.thumb}')"></div>
          <div class="meta">
            <h3>${a.title}</h3>
            <p>${a.summary}</p>
            <div class="tags">${a.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
          </div>
        `;
        container.appendChild(el);
      })
    }

    function renderAlerts(){
      const el = document.getElementById('alerts'); el.innerHTML='';
      sampleAlerts.forEach(a=>{
        const li = document.createElement('li'); li.style.padding='8px'; li.style.borderRadius='8px'; li.style.background='rgba(255,255,255,0.02)'; li.textContent = a.msg; el.appendChild(li);
      })
    }

    function renderForecastMock(){
      const f = document.getElementById('forecast'); f.innerHTML='';
      const days = ['Hoy','Mañana','Mié','Jue','Vie'];
      days.forEach((d,i)=>{
        const div = document.createElement('div'); div.className='day'; div.innerHTML = `<div style='font-weight:700'>${Math.floor(20+i)}°</div><div style='font-size:12px;color:var(--muted)'>${d}</div>`;
        f.appendChild(div);
      })
    }

    // Inicializar contenido de ejemplo
    renderArticles(sampleArticles);
    renderAlerts();
    renderForecastMock();

    // Buscador / filtro
    document.getElementById('btnSearch').addEventListener('click', ()=>{
      const q = document.getElementById('q').value.toLowerCase();
      const f = document.getElementById('filter').value;
      let res = sampleArticles.filter(a=> (a.title+a.summary+a.city).toLowerCase().includes(q));
      if(f!=='all') res = res.filter(a=> a.tags.includes(f));
      renderArticles(res);
    });

    document.getElementById('refresh').addEventListener('click', ()=>{
      // en app real -> volver a pedir API
      renderArticles(sampleArticles);
      renderAlerts();
      renderForecastMock();
      alert('Contenido actualizado (datos de ejemplo).');
    });

    // Localización (placeholder)
    document.getElementById('btnLocation').addEventListener('click', ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
          const {latitude, longitude} = pos.coords;
          document.getElementById('city').textContent = `Lat ${latitude.toFixed(2)}, Lon ${longitude.toFixed(2)}`;
          // aquí podrías llamar a fetchWeather(latitude, longitude)
        }, ()=>{ alert('No fue posible obtener la ubicación.') })
      } else alert('Geolocalización no soportada.');
    });

    // Ejemplo de función para traer datos reales (OpenWeatherMap)
    /*
    async function fetchWeather(lat, lon){
      const apiKey = 'TU_API_KEY_AQUI';
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      document.getElementById('temp').textContent = Math.round(data.current.temp) + '°C';
      document.getElementById('cond').textContent = data.current.weather[0].description;
      // render forecast
      const f = document.getElementById('forecast'); f.innerHTML='';
      data.daily.slice(0,5).forEach(d=>{
        const div = document.createElement('div'); div.className='day';
        const date = new Date(d.dt*1000);
        div.innerHTML = `<div style='font-weight:700'>${Math.round(d.temp.day)}°</div><div style='font-size:12px;color:var(--muted)'>${date.toLocaleDateString('es-MX',{weekday:'short'})}</div>`;
        f.appendChild(div);
      })
    }
    */

    // Botón detalles
    document.getElementById('btnDetails').addEventListener('click', ()=>{
      alert('Detalles del pronóstico (ejemplo). Integra una API para datos reales.');
    });


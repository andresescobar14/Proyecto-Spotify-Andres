/**
 * Spotify Clone - Main UI & SPA Application Logic
 * Coordinates views, reactive DOM updates, modals, and user interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const player = window.spotifyPlayer;
  const data = window.SPOTIFY_DATA;

  // App State
  let currentView = 'home';
  let viewHistory = [{ view: 'home', param: null }];
  let historyIndex = 0;
  let activeLibraryFilter = 'all';
  let isLyricsOpen = false;
  let isQueueOpen = false;

  // DOM Elements cache
  const mainScrollContainer = document.getElementById('main-scroll-container');
  const viewContainer = document.getElementById('view-container');
  const searchInput = document.getElementById('global-search-input');
  const libraryListContainer = document.getElementById('library-list-container');
  const toastContainer = document.getElementById('toast-container');

  // Bottom Player DOM Elements
  const playerCover = document.getElementById('player-track-cover');
  const playerTitle = document.getElementById('player-track-title');
  const playerArtist = document.getElementById('player-track-artist');
  const playerLikeBtn = document.getElementById('player-like-btn');
  const playerLikeIcon = document.getElementById('player-like-icon');
  const playerPlayBtn = document.getElementById('player-play-btn');
  const playerPlayIcon = document.getElementById('player-play-icon');
  const playerPrevBtn = document.getElementById('player-prev-btn');
  const playerNextBtn = document.getElementById('player-next-btn');
  const playerShuffleBtn = document.getElementById('player-shuffle-btn');
  const playerRepeatBtn = document.getElementById('player-repeat-btn');
  const playerRepeatIcon = document.getElementById('player-repeat-icon');
  const playerCurrentTime = document.getElementById('player-current-time');
  const playerDuration = document.getElementById('player-duration');
  const playerProgressBar = document.getElementById('player-progress-bar');
  const playerProgressSlider = document.getElementById('player-progress-slider');
  const playerVolumeSlider = document.getElementById('player-volume-slider');
  const playerVolumeBar = document.getElementById('player-volume-bar');
  const playerVolumeBtn = document.getElementById('player-volume-btn');
  const playerVolumeIcon = document.getElementById('player-volume-icon');
  const lyricsToggleBtn = document.getElementById('btn-toggle-lyrics');
  const queueToggleBtn = document.getElementById('btn-toggle-queue');
  const lyricsModal = document.getElementById('lyrics-modal');
  const lyricsContent = document.getElementById('lyrics-content');
  const closeLyricsBtn = document.getElementById('close-lyrics-btn');

  // =========================================================================
  // Helper Functions
  // =========================================================================
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function showToast(message, icon = 'fa-check') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-notification flex items-center gap-3 bg-[#282828] text-white px-4 py-3 rounded-lg shadow-2xl border border-white/10 text-xs font-semibold z-50';
    toast.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-[#1ed760] text-black flex items-center justify-center text-xs shrink-0">
        <i class="fa-solid ${icon}"></i>
      </div>
      <span>${escapeHTML(message)}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 19) return "Buenas tardes";
    return "Buenas noches";
  }

  // =========================================================================
  // Navigation / History Controller
  // =========================================================================
  function navigateTo(viewName, param = null) {
    const previous = viewHistory[historyIndex];
    if (previous.view === viewName && previous.param === param) return;
    if (historyIndex < viewHistory.length - 1) {
      viewHistory = viewHistory.slice(0, historyIndex + 1);
    }
    viewHistory.push({ view: viewName, param });
    historyIndex = viewHistory.length - 1;
    renderCurrentView();
    updateNavButtons();
  }

  function goBack() {
    if (historyIndex > 0) {
      historyIndex--;
      renderCurrentView();
      updateNavButtons();
    }
  }

  function goForward() {
    if (historyIndex < viewHistory.length - 1) {
      historyIndex++;
      renderCurrentView();
      updateNavButtons();
    }
  }

  function updateNavButtons() {
    const btnBack = document.getElementById('nav-btn-back');
    const btnForward = document.getElementById('nav-btn-forward');
    if (btnBack) btnBack.disabled = historyIndex === 0;
    if (btnForward) btnForward.disabled = historyIndex >= viewHistory.length - 1;
    if (btnBack) btnBack.classList.toggle('opacity-50', historyIndex === 0);
    if (btnForward) btnForward.classList.toggle('opacity-50', historyIndex >= viewHistory.length - 1);
  }

  function renderCurrentView() {
    const current = viewHistory[historyIndex] || { view: 'home' };
    currentView = typeof current === 'string' ? current : current.view;
    const param = current.param;
    if (searchInput) searchInput.value = currentView === 'search' ? (param || '') : '';
    document.getElementById('clear-search-btn')?.classList.toggle('hidden', !searchInput?.value);
    document.querySelectorAll('#mobile-nav-bar button').forEach(button => {
      const active = button.id === `mobile-nav-${currentView}`;
      button.classList.toggle('text-white', active);
      button.classList.toggle('text-[#b3b3b3]', !active);
      button.setAttribute('aria-current', active ? 'page' : 'false');
    });

    if (mainScrollContainer) {
      mainScrollContainer.scrollTop = 0;
    }

    // Toggle active state in Home icon
    const homeBtn = document.getElementById('nav-home-btn');
    if (homeBtn) {
      homeBtn.classList.toggle('text-white', currentView === 'home');
      homeBtn.classList.toggle('text-[#b3b3b3]', currentView !== 'home');
    }

    if (currentView === 'home') {
      if (searchInput) searchInput.value = '';
      renderHome();
    } else if (currentView === 'search') {
      renderSearch(param || '');
    } else if (currentView === 'playlist') {
      renderPlaylist(param);
    } else if (currentView === 'artist') {
      renderArtist(param);
    } else if (currentView === 'album') {
      renderAlbum(param);
    } else if (currentView === 'collection') {
      renderCollection(param);
    }
  }

  // =========================================================================
  // VIEW: HOME
  // =========================================================================
  function renderHome() {
    const quickTracks = data.songs.slice(0, 6);
    const greeting = getGreeting();

    viewContainer.innerHTML = `
      <div class="px-6 py-4">
        <!-- Top Greeting -->
        <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">${greeting}</h1>

        <div class="audio-toolbar">
          <p><strong>Música real</strong><span>Vistas previas de Spotify. Importa tus audios para escuchar archivos completos.</span></p>
          <div><button data-action="listen-spotify" class="audio-pill">Escuchar en Spotify ↗</button><button data-action="import-audio" class="audio-pill audio-pill-green">+ Importar audio</button></div>
        </div>
        ${data.songs.some(song => song.isLocal) ? `<section class="mb-8"><h2 class="text-xl font-bold mb-4">Tus archivos de audio</h2><div class="card-grid">${data.songs.filter(song => song.isLocal).map(renderSongCard).join('')}</div></section>` : ''}
        <!-- Top 6 Quick Cards -->
        <div class="quick-grid mb-8">
          ${quickTracks.map(song => `
            <div class="group flex items-center bg-[#282828]/60 hover:bg-[#383838] rounded-md overflow-hidden cursor-pointer transition-all duration-200 relative shadow-md"
                 data-action="play-song" data-id="${song.id}">
              <img src="${song.cover}" alt="${escapeHTML(song.title)}" class="w-14 h-14 object-cover shrink-0" onerror="this.onerror=null;this.src='images.jpg'"/>
              <span class="font-bold text-xs sm:text-sm px-3 truncate flex-1">${escapeHTML(song.title)}</span>
              <button class="w-10 h-10 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 mr-3 hover:scale-105 shrink-0"
                      title="Reproducir">
                <i class="fa-solid ${player.currentTrack?.id === song.id && player.isPlaying ? 'fa-pause' : 'fa-play'} text-black text-sm ml-0.5"></i>
              </button>
            </div>
          `).join('')}
        </div>

        <section class="mb-8" aria-labelledby="mixes-title">
          <div class="section-heading"><div><p class="eyebrow">TU PRÓXIMO FAVORITO</p><h2 id="mixes-title" class="text-xl md:text-2xl font-bold">Descubre tus mixes</h2></div></div>
          <div class="card-grid">
            ${data.playlists.slice(0, 6).map(playlist => renderPlaylistCard(playlist)).join('')}
          </div>
        </section>
        <!-- Section: Canciones en tendencia -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl md:text-2xl font-bold hover:underline cursor-pointer">Canciones en tendencia</h2>
            <button class="text-xs font-bold text-[#b3b3b3] hover:text-white hover:underline transition-colors" data-action="explore-all" data-kind="songs">Mostrar todos</button>
          </div>
          <div class="card-grid">
            ${data.songs.slice(0, 8).map(song => renderSongCard(song)).join('')}
          </div>
        </div>

        <!-- Section: Artistas populares -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl md:text-2xl font-bold hover:underline cursor-pointer">Artistas populares</h2>
            <button class="text-xs font-bold text-[#b3b3b3] hover:text-white hover:underline transition-colors" data-action="explore-all" data-kind="artists">Mostrar todos</button>
          </div>
          <div class="card-grid">
            ${data.artists.slice(0, 8).map(artist => renderArtistCard(artist)).join('')}
          </div>
        </div>

        <!-- Section: Álbumes y sencillos populares -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl md:text-2xl font-bold hover:underline cursor-pointer">Álbumes y sencillos populares</h2>
            <button class="text-xs font-bold text-[#b3b3b3] hover:text-white hover:underline transition-colors" data-action="explore-all" data-kind="albums">Mostrar todos</button>
          </div>
          <div class="card-grid">
            ${data.albums.map(album => renderAlbumCard(album)).join('')}
          </div>
        </div>

        <!-- Section: Emisoras populares -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl md:text-2xl font-bold hover:underline cursor-pointer">Emisoras populares</h2>
            <button class="text-xs font-bold text-[#b3b3b3] hover:text-white hover:underline transition-colors" data-action="explore-all" data-kind="radios">Mostrar todos</button>
          </div>
          <div class="card-grid">
            ${data.radios.map(radio => renderRadioCard(radio)).join('')}
          </div>
        </div>

        <!-- Section: Listas de éxitos -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl md:text-2xl font-bold hover:underline cursor-pointer">Listas de éxitos</h2>
            <button class="text-xs font-bold text-[#b3b3b3] hover:text-white hover:underline transition-colors" data-action="explore-all" data-kind="playlists">Mostrar todos</button>
          </div>
          <div class="card-grid">
            ${data.playlists.slice(0, 5).map(playlist => renderPlaylistCard(playlist)).join('')}
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;

    bindInteractiveEvents();
  }

  // Card Renderers
  function renderSongCard(song) {
    const isThisPlaying = player.currentTrack?.id === song.id && player.isPlaying;
    return `
      <div class="spotify-card group bg-[#181818] p-3.5 rounded-lg hover:bg-[#282828] transition-all duration-200 cursor-pointer flex flex-col relative"
           data-action="play-song" data-id="${song.id}">
        <div class="relative w-full aspect-square mb-3.5 rounded-md overflow-hidden bg-[#282828] shadow-md">
          <img src="${song.cover}" alt="${escapeHTML(song.title)}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null;this.src='images.jpg'"/>
          <button class="play-button-overlay absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 z-10"
                  title="Reproducir">
            <i class="fa-solid ${isThisPlaying ? 'fa-pause' : 'fa-play'} text-black text-sm ml-0.5"></i>
          </button>
          ${isThisPlaying ? `
            <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
              <div class="equalizer-bar-container">
                <div class="equalizer-bar"></div>
                <div class="equalizer-bar"></div>
                <div class="equalizer-bar"></div>
                <div class="equalizer-bar"></div>
              </div>
            </div>
          ` : ''}
        </div>
        <h3 class="font-bold text-sm text-white truncate mb-1 ${isThisPlaying ? 'text-[#1ed760]' : ''}">${escapeHTML(song.title)}</h3>
        <p class="text-xs text-[#b3b3b3] truncate">${escapeHTML(song.artist)}</p><span class="audio-badge">${song.isLocal ? 'Archivo completo' : 'Vista previa · Spotify'}</span>
      </div>
    `;
  }

  function renderArtistCard(artist) {
    return `
      <div class="spotify-card group bg-[#181818] p-3.5 rounded-lg hover:bg-[#282828] transition-all duration-200 cursor-pointer flex flex-col relative"
           data-action="view-artist" data-id="${artist.id}">
        <div class="relative w-full aspect-square mb-3.5 rounded-full overflow-hidden bg-[#282828] shadow-md">
          <img src="${artist.cover}" alt="${escapeHTML(artist.name)}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null;this.src='images (4).jpg'"/>
          <button class="play-button-overlay absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 z-10"
                  title="Reproducir">
            <i class="fa-solid fa-play text-black text-sm ml-0.5"></i>
          </button>
        </div>
        <h3 class="font-bold text-sm text-white truncate mb-1">${escapeHTML(artist.name)}</h3>
        <p class="text-xs text-[#b3b3b3]">Artista</p>
      </div>
    `;
  }

  function renderAlbumCard(album) {
    return `
      <div class="spotify-card group bg-[#181818] p-3.5 rounded-lg hover:bg-[#282828] transition-all duration-200 cursor-pointer flex flex-col relative"
           data-action="view-album" data-id="${album.id}">
        <div class="relative w-full aspect-square mb-3.5 rounded-md overflow-hidden bg-[#282828] shadow-md">
          <img src="${album.cover}" alt="${escapeHTML(album.title)}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null;this.src='img9.jpg'"/>
          <button class="play-button-overlay absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 z-10"
                  title="Reproducir">
            <i class="fa-solid fa-play text-black text-sm ml-0.5"></i>
          </button>
        </div>
        <h3 class="font-bold text-sm text-white truncate mb-1">${escapeHTML(album.title)}</h3>
        <p class="text-xs text-[#b3b3b3] truncate">${escapeHTML(album.artist)} • ${album.year}</p>
      </div>
    `;
  }

  function renderRadioCard(radio) {
    return `
      <div class="spotify-card group bg-[#181818] p-3.5 rounded-lg hover:bg-[#282828] transition-all duration-200 cursor-pointer flex flex-col relative"
           data-action="play-radio" data-id="${radio.id}">
        <div class="relative w-full aspect-square mb-3.5 rounded-md overflow-hidden bg-[#282828] shadow-md">
          <img src="${radio.cover}" alt="${radio.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null;this.src='ar.jpg'"/>
          <button class="play-button-overlay absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 z-10"
                  title="Reproducir">
            <i class="fa-solid fa-play text-black text-sm ml-0.5"></i>
          </button>
        </div>
        <h3 class="font-bold text-sm text-white truncate mb-1">${radio.title}</h3>
        <p class="text-xs text-[#b3b3b3] line-clamp-2">${radio.description}</p>
      </div>
    `;
  }

  function renderPlaylistCard(playlist) {
    return `
      <div class="spotify-card group bg-[#181818] p-3.5 rounded-lg hover:bg-[#282828] transition-all duration-200 cursor-pointer flex flex-col relative"
           data-action="view-playlist" data-id="${playlist.id}">
        <div class="relative w-full aspect-square mb-3.5 rounded-md overflow-hidden bg-[#282828] shadow-md">
          <img src="${playlist.cover}" alt="${escapeHTML(playlist.title)}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null;this.src='images (1).jpg'"/>
          <button class="play-button-overlay absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 z-10"
                  title="Reproducir">
            <i class="fa-solid fa-play text-black text-sm ml-0.5"></i>
          </button>
        </div>
        <h3 class="font-bold text-sm text-white truncate mb-1">${escapeHTML(playlist.title)}</h3>
        <p class="text-xs text-[#b3b3b3] line-clamp-2">${escapeHTML(playlist.description)}</p>
      </div>
    `;
  }

  // =========================================================================
  // VIEW: SEARCH & BROWSE
  // =========================================================================
  function renderSearch(query = '') {
    if (!query || query.trim() === '') {
      // Browse All Categories
      viewContainer.innerHTML = `
        <div class="px-6 py-4">
          <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Explorar todo</h1>
          <div class="card-grid mb-12">
            ${data.categories.map(cat => `
              <div class="group relative ${cat.color} rounded-lg h-36 md:h-44 p-4 overflow-hidden cursor-pointer shadow-lg hover:scale-[1.02] transition-transform duration-200"
                   data-action="filter-category" data-category="${cat.title}">
                <h3 class="text-lg md:text-xl font-bold text-white break-words w-2/3 leading-tight">${cat.title}</h3>
                <img src="${cat.cover}" alt="${cat.title}"
                     class="absolute -bottom-2 -right-4 w-20 md:w-24 h-20 md:h-24 object-cover shadow-2xl rounded-md rotate-[25deg] group-hover:rotate-[20deg] group-hover:scale-105 transition-all duration-300"
                     onerror="this.onerror=null;this.src='images.jpg'"/>
              </div>
            `).join('')}
          </div>
          ${renderFooter()}
        </div>
      `;
    } else {
      // Filtered Search Results
      const q = query.toLowerCase().trim();
      const filteredSongs = data.songs.filter(s => [s.title, s.artist, s.album, s.genre].some(value => value.toLowerCase().includes(q)));
      const filteredArtists = data.artists.filter(a => a.name.toLowerCase().includes(q));
      const filteredAlbums = data.albums.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q));

      viewContainer.innerHTML = `
        <div class="px-6 py-4">
          <div class="flex items-center gap-3 mb-6">
            <h1 class="text-2xl font-bold">Resultados para "<span class="text-[#1ed760]">${escapeHTML(query)}</span>"</h1>
          </div>

          ${filteredSongs.length === 0 && filteredArtists.length === 0 && filteredAlbums.length === 0 ? `
            <div class="flex flex-col items-center justify-center py-20 text-center">
              <i class="fa-solid fa-magnifying-glass text-5xl text-[#535353] mb-4"></i>
              <h2 class="text-xl font-bold mb-2">No se encontraron resultados para "${escapeHTML(query)}"</h2>
              <p class="text-sm text-[#b3b3b3] max-w-md">Comprueba que las palabras estén bien escritas o intenta con otras palabras clave.</p>
            </div>
          ` : `
            <!-- Top Result & Tracks Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 mb-10">
              ${filteredSongs.length > 0 ? `
                <!-- Top Result Card -->
                <div>
                  <h2 class="text-xl font-bold mb-3">Resultado principal</h2>
                  <div class="group bg-[#181818] hover:bg-[#282828] p-5 rounded-lg transition-all duration-200 cursor-pointer relative shadow-lg"
                       data-action="play-song" data-id="${filteredSongs[0].id}">
                    <img src="${filteredSongs[0].cover}" alt="${filteredSongs[0].title}" class="w-24 h-24 rounded-md object-cover shadow-xl mb-4" onerror="this.onerror=null;this.src='images.jpg'"/>
                    <h3 class="text-2xl font-bold text-white mb-1 truncate">${filteredSongs[0].title}</h3>
                    <p class="text-xs text-[#b3b3b3] mb-3">Canción • <span class="text-white hover:underline">${filteredSongs[0].artist}</span></p>
                    <span class="inline-block bg-[#121212] text-xs font-semibold px-3 py-1 rounded-full text-white">Canción</span>
                    <button class="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                            title="Reproducir">
                      <i class="fa-solid fa-play text-black text-base ml-0.5"></i>
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- Songs List (Top 4) -->
              <div>
                <h2 class="text-xl font-bold mb-3">Canciones</h2>
                <div class="flex flex-col gap-1">
                  ${filteredSongs.slice(0, 4).map(song => `
                    <div class="group flex items-center justify-between p-2 rounded-md hover:bg-[#282828] transition-colors cursor-pointer"
                         data-action="play-song" data-id="${song.id}">
                      <div class="flex items-center gap-3 min-w-0">
                        <div class="relative w-10 h-10 shrink-0">
                          <img src="${song.cover}" alt="${escapeHTML(song.title)}" class="w-10 h-10 rounded object-cover" onerror="this.onerror=null;this.src='images.jpg'"/>
                          <button class="absolute inset-0 bg-black/50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i class="fa-solid fa-play text-white text-xs"></i>
                          </button>
                        </div>
                        <div class="min-w-0">
                          <h4 class="font-semibold text-sm text-white truncate">${escapeHTML(song.title)}</h4>
                          <p class="text-xs text-[#b3b3b3] truncate">${escapeHTML(song.artist)}</p><span class="audio-badge">${song.isLocal ? 'Archivo completo' : 'Vista previa · Spotify'}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-4 text-xs text-[#b3b3b3]">
                        <button class="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity ${song.isLiked ? 'text-[#1ed760] opacity-100' : ''}"
                                data-action="toggle-like" data-id="${song.id}">
                          <i class="fa-${song.isLiked ? 'solid' : 'regular'} fa-heart"></i>
                        </button>
                        <span>${song.durationFormatted}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Artists in Search -->
            ${filteredArtists.length > 0 ? `
              <div class="mb-10">
                <h2 class="text-xl font-bold mb-4">Artistas</h2>
                <div class="card-grid">
                  ${filteredArtists.map(artist => renderArtistCard(artist)).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Albums in Search -->
            ${filteredAlbums.length > 0 ? `
              <div class="mb-10">
                <h2 class="text-xl font-bold mb-4">Álbumes</h2>
                <div class="card-grid">
                  ${filteredAlbums.map(album => renderAlbumCard(album)).join('')}
                </div>
              </div>
            ` : ''}
          `}
          ${renderFooter()}
        </div>
      `;
    }

    bindInteractiveEvents();
  }

  // =========================================================================
  // VIEW: PLAYLIST DETAIL
  // =========================================================================
  function renderPlaylist(playlistId) {
    const playlist = data.playlists.find(p => p.id === playlistId) || data.playlists[0];
    const playlistSongs = playlist.trackIds.map(id => data.songs.find(s => s.id === id)).filter(Boolean);
    const totalDurationSeconds = playlistSongs.reduce((acc, s) => acc + s.duration, 0);
    const totalMinutes = Math.floor(totalDurationSeconds / 60);

    const isThisPlaylistPlaying = player.isPlaying && playlist.trackIds.includes(player.currentTrack?.id);

    viewContainer.innerHTML = `
      <div>
        <!-- Hero Header -->
        <div class="flex flex-col md:flex-row items-end gap-6 p-6 pb-6 bg-gradient-to-b ${playlist.gradient || 'from-[#503750] to-[#121212]'} pt-12 md:pt-16 shadow-2xl">
          <img src="${playlist.cover}" alt="${escapeHTML(playlist.title)}"
               class="w-48 h-48 md:w-56 md:h-56 object-cover rounded-md shadow-2xl shrink-0"
               onerror="this.onerror=null;this.src='images (1).jpg'"/>
          <div class="flex flex-col gap-2 min-w-0">
            <span class="text-xs uppercase font-extrabold tracking-wider">Playlist pública</span>
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">${escapeHTML(playlist.title)}</h1>
            <p class="text-xs md:text-sm text-gray-300 line-clamp-2">${escapeHTML(playlist.description)}</p>
            <div class="flex items-center gap-2 text-xs font-semibold text-white mt-2 flex-wrap">
              <span class="font-bold hover:underline cursor-pointer">${escapeHTML(playlist.owner)}</span>
              <span>•</span>
              <span>${playlistSongs.length} canciones</span>
              <span>•</span>
              <span class="text-gray-300">aproximadamente ${totalMinutes} min</span>
            </div>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="flex items-center gap-6 px-6 py-5 bg-[#121212]/90 sticky top-0 z-20 backdrop-blur-md">
          <button class="w-14 h-14 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200"
                  data-action="play-playlist" data-id="${playlist.id}" title="Reproducir">
            <i class="fa-solid ${isThisPlaylistPlaying ? 'fa-pause' : 'fa-play'} text-black text-xl ml-0.5"></i>
          </button>
          <button class="text-3xl text-[#1ed760] hover:scale-105 transition-transform" title="Guardar en tu biblioteca">
            <i class="fa-solid fa-heart"></i>
          </button>
          <button class="text-2xl text-[#b3b3b3] hover:text-white transition-colors" title="Descargar">
            <i class="fa-regular fa-circle-down"></i>
          </button>
          <button class="text-2xl text-[#b3b3b3] hover:text-white transition-colors" title="Más opciones">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
        </div>

        <!-- Songs Table -->
        <div class="px-4 md:px-6 pb-12">
          <!-- Table Header -->
          <div class="grid grid-cols-[20px_1fr_auto] md:grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-3 md:gap-4 px-2 md:px-4 py-2 border-b border-white/10 text-xs font-semibold text-[#b3b3b3] uppercase tracking-wider mb-2">
            <div class="text-center">#</div>
            <div>Título</div>
            <div class="hidden md:block">Álbum</div>
            <div class="text-right pr-2 md:pr-4"><i class="fa-regular fa-clock"></i></div>
          </div>

          <!-- Table Rows -->
          ${playlistSongs.length ? '' : '<p class="py-8 text-center text-sm text-[#b3b3b3]">Tu lista está vacía. Explora canciones desde Inicio o Buscar.</p>'}
          <div class="flex flex-col">
            ${playlistSongs.map((song, index) => {
              const isPlaying = player.currentTrack?.id === song.id && player.isPlaying;
              return `
                <div class="group grid grid-cols-[20px_1fr_auto] md:grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-3 md:gap-4 items-center px-2 md:px-4 py-2.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-sm text-[#b3b3b3]"
                     data-action="play-song" data-id="${song.id}">
                  <!-- Number or Play Button -->
                  <div class="text-center text-xs font-medium relative">
                    <span class="group-hover:hidden ${isPlaying ? 'text-[#1ed760]' : ''}">${isPlaying ? '<i class="fa-solid fa-volume-high text-[#1ed760]"></i>' : index + 1}</span>
                    <button class="hidden group-hover:inline-block text-white hover:scale-110">
                      <i class="fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                    </button>
                  </div>
                  <!-- Title & Cover -->
                  <div class="flex items-center gap-3 min-w-0">
                    <img src="${song.cover}" alt="${escapeHTML(song.title)}" class="w-10 h-10 object-cover rounded shrink-0 shadow" onerror="this.onerror=null;this.src='images.jpg'"/>
                    <div class="min-w-0">
                      <div class="font-semibold text-white truncate hover:underline ${isPlaying ? 'text-[#1ed760]' : ''}">${escapeHTML(song.title)}</div>
                      <div class="text-xs text-[#b3b3b3] truncate hover:text-white">${escapeHTML(song.artist)}</div>
                    </div>
                  </div>
                  <!-- Album -->
                  <div class="hidden md:block truncate text-xs hover:text-white">${escapeHTML(song.album)}</div>
                  <!-- Duration & Like -->
                  <div class="flex items-center justify-end gap-3 md:gap-4 text-xs pr-2 md:pr-4">
                    <button class="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity ${song.isLiked ? 'text-[#1ed760] opacity-100' : ''}"
                            data-action="toggle-like" data-id="${song.id}" title="Me gusta">
                      <i class="fa-${song.isLiked ? 'solid' : 'regular'} fa-heart text-sm"></i>
                    </button>
                    <span>${song.durationFormatted}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;

    bindInteractiveEvents();
  }

  // =========================================================================
  // VIEW: ARTIST DETAIL
  // =========================================================================
  function renderArtist(artistId) {
    const artist = data.artists.find(a => a.id === artistId) || data.artists[0];
    const artistSongs = data.songs.filter(s => s.artistId === artist.id || s.artist.toLowerCase().includes(artist.name.toLowerCase()));
    const displaySongs = artistSongs.length > 0 ? artistSongs : data.songs.slice(0, 5);

    viewContainer.innerHTML = `
      <div>
        <!-- Hero Header -->
        <div class="relative h-72 md:h-80 bg-cover bg-center flex items-end p-8" style="background-image: linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.3) 100%), url('${artist.cover}');">
          <div class="relative z-10">
            <div class="flex items-center gap-2 text-xs font-bold text-white mb-2">
              <i class="fa-solid fa-circle-check text-[#3d91f4]"></i>
              <span>Artista verificado</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-3">${escapeHTML(artist.name)}</h1>
            <p class="text-sm font-semibold text-gray-200">${artist.monthlyListeners}</p>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="flex items-center gap-6 px-8 py-5 bg-[#121212]">
          <button class="w-14 h-14 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200"
                  data-action="play-song" data-id="${displaySongs[0]?.id}" title="Reproducir">
            <i class="fa-solid fa-play text-black text-xl ml-0.5"></i>
          </button>
          <button class="border border-white/40 hover:border-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full hover:scale-105 transition-all">
            Siguiendo
          </button>
          <button class="text-2xl text-[#b3b3b3] hover:text-white transition-colors">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
        </div>

        <!-- Popular Tracks -->
        <div class="px-8 mb-10">
          <h2 class="text-2xl font-bold mb-4">Populares</h2>
          <div class="flex flex-col">
            ${displaySongs.slice(0, 5).map((song, idx) => `
              <div class="group flex items-center justify-between p-2.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-sm text-[#b3b3b3]"
                   data-action="play-song" data-id="${song.id}">
                <div class="flex items-center gap-4 min-w-0">
                  <span class="w-4 text-center font-bold text-xs">${idx + 1}</span>
                  <img src="${song.cover}" alt="${escapeHTML(song.title)}" class="w-10 h-10 object-cover rounded shrink-0 shadow" onerror="this.onerror=null;this.src='images.jpg'"/>
                  <span class="font-bold text-white truncate hover:underline">${escapeHTML(song.title)}</span>
                </div>
                <div class="text-xs text-[#b3b3b3] hidden sm:block">${song.plays}</div>
                <div class="flex items-center gap-4 text-xs">
                  <button class="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity ${song.isLiked ? 'text-[#1ed760] opacity-100' : ''}"
                          data-action="toggle-like" data-id="${song.id}">
                    <i class="fa-${song.isLiked ? 'solid' : 'regular'} fa-heart"></i>
                  </button>
                  <span>${song.durationFormatted}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Artist Bio Card -->
        <div class="px-8 mb-12">
          <h2 class="text-2xl font-bold mb-4">Información</h2>
          <div class="bg-[#282828] p-6 rounded-xl max-w-2xl border border-white/5">
            <h3 class="text-lg font-bold mb-2">${artist.monthlyListeners}</h3>
            <p class="text-sm text-[#b3b3b3] leading-relaxed mb-4">${escapeHTML(artist.bio)}</p>
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;

    bindInteractiveEvents();
  }

  // =========================================================================
  // VIEW: ALBUM DETAIL
  // =========================================================================
  function renderAlbum(albumId) {
    const album = data.albums.find(a => a.id === albumId) || data.albums[0];
    const albumSongs = album.trackIds.map(id => data.songs.find(s => s.id === id)).filter(Boolean);

    viewContainer.innerHTML = `
      <div>
        <!-- Hero Header -->
        <div class="flex flex-col md:flex-row items-end gap-6 p-6 pb-6 bg-gradient-to-b from-[#405060] to-[#121212] pt-12 md:pt-16 shadow-2xl">
          <img src="${album.cover}" alt="${escapeHTML(album.title)}" class="w-48 h-48 md:w-56 md:h-56 object-cover rounded-md shadow-2xl shrink-0" onerror="this.onerror=null;this.src='img9.jpg'"/>
          <div class="flex flex-col gap-2 min-w-0">
            <span class="text-xs uppercase font-extrabold tracking-wider">Álbum</span>
            <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">${escapeHTML(album.title)}</h1>
            <div class="flex items-center gap-2 text-xs font-semibold text-white mt-2">
              <span class="font-bold hover:underline cursor-pointer">${escapeHTML(album.artist)}</span>
              <span>•</span>
              <span>${album.year}</span>
              <span>•</span>
              <span>${albumSongs.length} canciones</span>
            </div>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="flex items-center gap-6 px-6 py-5 bg-[#121212]/90 sticky top-0 z-20 backdrop-blur-md">
          <button class="w-14 h-14 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200"
                  data-action="play-album" data-id="${album.id}" title="Reproducir">
            <i class="fa-solid fa-play text-black text-xl ml-0.5"></i>
          </button>
          <button class="text-3xl text-[#1ed760] hover:scale-105 transition-transform">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>

        <!-- Songs List -->
        <div class="px-6 pb-12">
          ${albumSongs.map((song, idx) => `
            <div class="group flex items-center justify-between p-3 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-sm text-[#b3b3b3]"
                 data-action="play-song" data-id="${song.id}">
              <div class="flex items-center gap-4 min-w-0">
                <span class="w-4 text-center font-bold text-xs">${idx + 1}</span>
                <span class="font-bold text-white truncate hover:underline">${escapeHTML(song.title)}</span>
              </div>
              <div class="flex items-center gap-4 text-xs">
                <button class="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity ${song.isLiked ? 'text-[#1ed760] opacity-100' : ''}"
                        data-action="toggle-like" data-id="${song.id}">
                  <i class="fa-${song.isLiked ? 'solid' : 'regular'} fa-heart"></i>
                </button>
                <span>${song.durationFormatted}</span>
              </div>
            </div>
          `).join('')}
        </div>

        ${renderFooter()}
      </div>
    `;

    bindInteractiveEvents();
  }

  // =========================================================================
  // SPOTIFY FOOTER
  // =========================================================================
  function renderFooter() {
    return `
      <div class="w-full h-[1px] bg-white/10 mt-12 mb-8"></div>
      <footer class="mt-4 mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-8 mb-10">
          <div class="flex flex-col gap-2.5">
            <p class="text-sm font-bold text-white mb-1">Compañía</p>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Acerca de</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Empleo</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">For the Record</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <p class="text-sm font-bold text-white mb-1">Comunidades</p>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Para artistas</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Desarrolladores</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Publicidad</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Inversionistas</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Proveedores</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <p class="text-sm font-bold text-white mb-1">Enlaces útiles</p>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Asistencia</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">App móvil gratis</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Popular por país</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Top música</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <p class="text-sm font-bold text-white mb-1">Planes de Spotify</p>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Premium Individual</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Premium Duo</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Premium Familiar</a>
            <a class="text-xs text-[#b3b3b3] hover:text-white hover:underline transition-colors" href="#">Spotify Free</a>
          </div>
          <div class="flex gap-3 items-start col-span-2 md:col-span-4 lg:col-span-1 justify-start lg:justify-end mt-4 lg:mt-0">
            <a href="https://instagram.com" target="_blank" class="w-10 h-10 rounded-full bg-[#282828] hover:bg-[#383838] flex items-center justify-center transition-colors">
              <i class="fa-brands fa-instagram text-base text-white"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="w-10 h-10 rounded-full bg-[#282828] hover:bg-[#383838] flex items-center justify-center transition-colors">
              <i class="fa-brands fa-x-twitter text-base text-white"></i>
            </a>
            <a href="https://facebook.com" target="_blank" class="w-10 h-10 rounded-full bg-[#282828] hover:bg-[#383838] flex items-center justify-center transition-colors">
              <i class="fa-brands fa-facebook-f text-base text-white"></i>
            </a>
          </div>
        </div>

        <div class="w-full h-[1px] bg-white/10 mb-6"></div>

        <div class="flex items-center justify-between flex-wrap gap-4 text-xs text-[#b3b3b3]">
          <div class="flex items-center gap-4 flex-wrap">
            <a class="hover:text-white transition-colors" href="#">Legal</a>
            <a class="hover:text-white transition-colors" href="#">Centro de Seguridad</a>
            <a class="hover:text-white transition-colors" href="#">Privacidad</a>
            <a class="hover:text-white transition-colors" href="#">Cookies</a>
            <a class="hover:text-white transition-colors" href="#">Anuncios</a>
            <a class="hover:text-white transition-colors" href="#">Accesibilidad</a>
          </div>
          <button class="flex items-center gap-2 border border-white/30 rounded-full px-3 py-1.5 hover:border-white text-white font-semibold transition-colors">
            <i class="fa-solid fa-globe text-sm"></i>
            <span>Español de Latinoamérica</span>
          </button>
        </div>

        <div class="flex items-center gap-2 mt-6 text-xs text-[#b3b3b3]">
          <i class="fa-brands fa-spotify text-base text-[#1ed760]"></i>
          <span>© 2026 Spotify AB • Andrés Escobar</span>
        </div>
      </footer>
    `;
  }

  // =========================================================================
  // LEFT SIDEBAR ("TU BIBLIOTECA")
  // =========================================================================
  function renderLibrary() {
    if (!libraryListContainer) return;

    let items = [];

    if (activeLibraryFilter === 'all' || activeLibraryFilter === 'playlists') {
      items.push(...data.playlists.map(p => ({
        id: p.id,
        type: 'playlist',
        title: p.title,
        subtitle: `Lista • ${p.owner}`,
        cover: p.cover,
        pinned: p.pinned
      })));
    }

    if (activeLibraryFilter === 'all' || activeLibraryFilter === 'artists') {
      items.push(...data.artists.slice(0, 4).map(a => ({
        id: a.id,
        type: 'artist',
        title: a.name,
        subtitle: 'Artista',
        cover: a.cover,
        pinned: false,
        isRound: true
      })));
    }

    if (activeLibraryFilter === 'all' || activeLibraryFilter === 'albums') {
      items.push(...data.albums.slice(0, 3).map(al => ({
        id: al.id,
        type: 'album',
        title: al.title,
        subtitle: `Álbum • ${al.artist}`,
        cover: al.cover,
        pinned: false
      })));
    }

    libraryListContainer.innerHTML = items.map(item => `
      <div class="flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors cursor-pointer group"
           data-action="view-${item.type}" data-id="${item.id}">
        <img src="${item.cover}" alt="${escapeHTML(item.title)}"
             class="w-12 h-12 object-cover shrink-0 ${item.isRound ? 'rounded-full' : 'rounded-md'} shadow"
             onerror="this.onerror=null;this.src='images (1).jpg'"/>
        <div class="flex flex-col min-w-0 flex-1">
          <h3 class="text-sm font-semibold text-white truncate group-hover:text-[#1ed760] transition-colors">${escapeHTML(item.title)}</h3>
          <div class="flex items-center gap-1.5 text-xs text-[#b3b3b3] truncate">
            ${item.pinned ? '<i class="fa-solid fa-thumbtack text-[#1ed760] text-[10px] rotate-45"></i>' : ''}
            <span>${escapeHTML(item.subtitle)}</span>
          </div>
        </div>
      </div>
    `).join('');

    bindLibraryEvents();
  }

  function createNewPlaylist() {
    const newId = `playlist-custom-${Date.now()}`;
    const playlistNumber = data.playlists.length + 1;
    const newPlaylist = {
      id: newId,
      title: `Mi lista n.º ${playlistNumber}`,
      owner: data.currentUser.name,
      cover: 'images.jpg',
      gradient: 'from-[#1e3264] to-[#121212]',
      description: 'Lista creada por el usuario.',
      pinned: false,
      trackIds: []
    };

    data.playlists.unshift(newPlaylist);
    window.spotifyStorage.write('spotify_playlists', data.playlists.filter(list => list.id.startsWith('playlist-custom-')));
    renderLibrary();
    navigateTo('playlist', newId);
    showToast(`Se ha creado "${newPlaylist.title}"`, 'fa-circle-plus');
  }

  // =========================================================================
  // EVENT BINDINGS
  // =========================================================================
  function renderCollection(kind) {
    const collections = {
      songs: ['Todas las canciones', data.songs, renderSongCard],
      artists: ['Todos los artistas', data.artists, renderArtistCard],
      albums: ['Todos los álbumes', data.albums, renderAlbumCard],
      radios: ['Todas las emisoras', data.radios, renderRadioCard],
      playlists: ['Todas las listas', data.playlists, renderPlaylistCard]
    };
    const [title, items, render] = collections[kind] || collections.songs;
    viewContainer.innerHTML = `<div class="px-6 py-4"><h1 class="text-2xl font-bold mb-6">${title}</h1><div class="card-grid">${items.map(render).join('')}</div>${renderFooter()}</div>`;
    bindInteractiveEvents();
  }

  function makeAccessible(container) {
    container.querySelectorAll('[data-action]').forEach(element => {
      if (element.tagName !== 'BUTTON') {
        element.setAttribute('role', 'button');
        element.tabIndex = 0;
      }
      element.querySelectorAll('button').forEach(button => {
        if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', button.title || 'Reproducir');
      });
    });
  }
  function bindInteractiveEvents() { makeAccessible(viewContainer); }
  function bindLibraryEvents() { makeAccessible(libraryListContainer); }

  function handleAction(event) {
    const element = event.target.closest('[data-action]');
    if (!element || !event.currentTarget.contains(element)) return;
    const action = element.dataset.action;
    const id = element.dataset.id;
    if (action === 'listen-spotify') {
      openSpotifyPanel(player.currentTrack);
    } else if (action === 'import-audio') {
      document.getElementById('local-audio-input').click();
    } else if (action.startsWith('view-')) {
      closeMobileLibrary();
      navigateTo(action.slice(5), id);
    } else if (action === 'play-song') {
      const song = data.songs.find(song => song.id === id);
      if (song) player.currentTrack?.id === id ? player.togglePlay() : player.playTrack(song);
    } else if (['play-playlist', 'play-album', 'play-radio'].includes(action)) {
      const collection = data[action === 'play-playlist' ? 'playlists' : action === 'play-album' ? 'albums' : 'radios'].find(item => item.id === id);
      const queue = collection?.trackIds.map(trackId => data.songs.find(song => song.id === trackId)).filter(Boolean) || [];
      if (!queue.length) return showToast('Esta lista todavía no tiene canciones.', 'fa-music');
      if (player.isPlaying && player.currentTrack?.id === queue[0].id && player.queue.map(track => track.id).join(',') === queue.map(track => track.id).join(',')) player.pause();
      else player.playTrack(queue[0], queue);
    } else if (action === 'toggle-like') {
      const liked = player.toggleLike(id);
      syncPlayerUI(player.currentTrack);
      const scroll = mainScrollContainer.scrollTop;
      renderCurrentView(); mainScrollContainer.scrollTop = scroll;
      renderLibrary();
      showToast(liked ? 'Añadido a tus canciones que te gustan' : 'Eliminado de tus canciones que te gustan');
    } else if (action === 'filter-category') {
      navigateTo('search', element.dataset.category);
    } else if (action === 'explore-all') {
      navigateTo('collection', element.dataset.kind);
    }
  }
  [viewContainer, libraryListContainer].forEach(container => {
    container.addEventListener('click', handleAction);
    container.addEventListener('keydown', event => {
      if (event.target.matches('[role="button"]') && ['Enter', ' '].includes(event.key)) {
        event.preventDefault(); event.target.click();
      }
    });
  });

  // =========================================================================
  // BOTTOM PLAYER REACTIVE SYNC
  // =========================================================================
  function syncPlayerUI(track) {
    if (!track) return;
    if (playerCover) playerCover.src = track.cover;
    if (playerTitle) playerTitle.textContent = track.title;
    if (playerArtist) playerArtist.textContent = track.artist;

    const notice = document.getElementById('demo-notice');
    if (notice) notice.textContent = track.isLocal ? 'Audio local · Archivo completo' : 'Spotify · Vista previa';
    playerCover?.setAttribute('alt', `Portada de ${track.title}`);
    // Like button
    if (playerLikeIcon) {
      playerLikeIcon.className = `fa-${track.isLiked ? 'solid' : 'regular'} fa-heart`;
      playerLikeBtn?.classList.toggle('text-[#1ed760]', track.isLiked);
    }

    if (playerDuration) playerDuration.textContent = formatTime(track.isLocal ? track.duration : track.previewDuration || 30);

    // Update synced lyrics modal if open
    updateLyricsDisplay(track);
  }

  function updateLyricsDisplay(track) {
    if (!lyricsContent || !track) return;
    lyricsContent.innerHTML = `<p class="text-gray-300 text-lg">${track.isLocal ? 'Este archivo no incluye letras.' : 'Las letras de esta canción se consultan en Spotify.'}</p>`;
    if (track.spotifyUrl) {
      const link = document.createElement('a');
      link.href = track.spotifyUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.className = 'audio-pill audio-pill-green'; link.textContent = 'Abrir canción en Spotify ↗';
      lyricsContent.appendChild(link);
    }
  }

  // Hook into SpotifyPlayer events
  player.on('onTrackChange', (track) => {
    closeSpotifyPanel();
    syncPlayerUI(track);
    const scroll = mainScrollContainer.scrollTop;
    renderCurrentView();
    mainScrollContainer.scrollTop = scroll;
    renderQueue();
  });

  player.on('onPlayStateChange', ({ isPlaying }) => {
    if (playerPlayIcon) {
      playerPlayIcon.className = `fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-black text-sm ml-0.5`;
    }
    playerPlayBtn?.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproducir');
    // Update play button icons in view
    document.querySelectorAll('[data-action="play-song"]').forEach(card => {
      const id = card.getAttribute('data-id');
      const icon = card.querySelector('.play-button-overlay i, button i');
      const active = id === player.currentTrack?.id && isPlaying;
      card.classList.toggle('is-playing', active);
      card.setAttribute('aria-pressed', String(active));
      if (icon) {
        icon.className = `fa-solid ${active ? 'fa-pause' : 'fa-play'} text-black text-sm ml-0.5`;
      }
    });
  });

  player.on('onTimeUpdate', ({ currentTime, duration, progress }) => {
    if (playerCurrentTime) playerCurrentTime.textContent = formatTime(currentTime);
    if (playerDuration && Number.isFinite(duration)) playerDuration.textContent = formatTime(duration);
    if (playerProgressBar) playerProgressBar.style.width = `${progress}%`;
    if (playerProgressSlider) playerProgressSlider.value = progress;

    // Advance active lyric line based on track progress
    if (isLyricsOpen && player.currentTrack?.lyrics) {
      const lyricLines = document.querySelectorAll('.lyric-line');
      if (lyricLines.length > 0) {
        const totalLines = lyricLines.length;
        const activeIdx = Math.min(totalLines - 1, Math.floor((currentTime / duration) * totalLines));
        lyricLines.forEach((l, idx) => {
          l.classList.toggle('active', idx === activeIdx);
        });
      }
    }
  });

  player.on('onVolumeChange', ({ volume, isMuted }) => {
    if (playerVolumeBar) playerVolumeBar.style.width = `${volume * 100}%`;
    if (playerVolumeSlider) playerVolumeSlider.value = volume * 100;
    if (playerVolumeIcon) {
      if (isMuted || volume === 0) {
        playerVolumeIcon.className = 'fa-solid fa-volume-xmark';
      } else if (volume < 0.5) {
        playerVolumeIcon.className = 'fa-solid fa-volume-low';
      } else {
        playerVolumeIcon.className = 'fa-solid fa-volume-high';
      }
    }
  });

  player.on('onModeChange', ({ isShuffle, repeatMode }) => {
    if (playerShuffleBtn) {
      playerShuffleBtn.classList.toggle('text-[#1ed760]', isShuffle);
      playerShuffleBtn.classList.toggle('text-[#b3b3b3]', !isShuffle);
    }
    if (playerRepeatBtn) {
      const isActive = repeatMode !== 'off';
      playerRepeatBtn.classList.toggle('text-[#1ed760]', isActive);
      playerRepeatBtn.classList.toggle('text-[#b3b3b3]', !isActive);
      if (playerRepeatIcon) {
        playerRepeatIcon.className = `fa-solid ${repeatMode === 'one' ? 'fa-repeat text-xs' : 'fa-repeat text-sm'}`;
      }
    }
  });

  // Bottom Player Buttons Listeners
  if (playerPlayBtn) playerPlayBtn.addEventListener('click', () => { closeSpotifyPanel(); player.togglePlay(); });
  if (playerNextBtn) playerNextBtn.addEventListener('click', () => player.next());
  if (playerPrevBtn) playerPrevBtn.addEventListener('click', () => player.prev());
  if (playerShuffleBtn) playerShuffleBtn.addEventListener('click', () => player.toggleShuffle());
  if (playerRepeatBtn) playerRepeatBtn.addEventListener('click', () => player.toggleRepeat());
  if (playerVolumeBtn) playerVolumeBtn.addEventListener('click', () => player.toggleMute());

  if (playerLikeBtn) {
    playerLikeBtn.addEventListener('click', () => {
      if (!player.currentTrack) return;
      const isLiked = player.toggleLike(player.currentTrack.id);
      playerLikeIcon.className = `fa-${isLiked ? 'solid' : 'regular'} fa-heart`;
      playerLikeBtn.classList.toggle('text-[#1ed760]', isLiked);
      renderLibrary();
      showToast(isLiked ? "Añadido a tus canciones que te gustan" : "Eliminado de tus canciones que te gustan", isLiked ? 'fa-heart' : 'fa-xmark');
    });
  }

  // Progress Bar scrubbing
  if (playerProgressSlider) {
    playerProgressSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      player.seekPercent(val);
    });
  }

  // Volume Slider
  if (playerVolumeSlider) {
    playerVolumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) / 100;
      player.setVolume(val);
    });
  }

  // Global Header Search Input
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', !query.trim());
      }
      if (currentView !== 'search') {
        navigateTo('search', query);
      } else {
        viewHistory[historyIndex].param = query;
        renderSearch(query);
      }
    });

    searchInput.addEventListener('focus', () => {
      if (currentView !== 'search') {
        navigateTo('search', searchInput.value || '');
      }
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');
        navigateTo('search', '');
      }
    });
  }

  // Top Navigation Buttons
  const navBack = document.getElementById('nav-btn-back');
  const navForward = document.getElementById('nav-btn-forward');
  const navHome = document.getElementById('nav-home-btn');
  const navLogo = document.getElementById('nav-logo-btn');

  if (navBack) navBack.addEventListener('click', goBack);
  if (navForward) navForward.addEventListener('click', goForward);
  if (navHome) navHome.addEventListener('click', () => navigateTo('home'));
  if (navLogo) navLogo.addEventListener('click', () => navigateTo('home'));

  // Tu biblioteca Filter Chips
  document.querySelectorAll('[data-library-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-library-filter]').forEach(c => {
        c.classList.remove('bg-white', 'text-black');
        c.classList.add('bg-[#282828]', 'text-white');
      });
      chip.classList.remove('bg-[#282828]', 'text-white');
      chip.classList.add('bg-white', 'text-black');

      activeLibraryFilter = chip.getAttribute('data-library-filter');
      renderLibrary();
    });
  });

  // Create Playlist Button (+)
  const btnCreatePlaylist = document.getElementById('btn-create-playlist');
  if (btnCreatePlaylist) {
    btnCreatePlaylist.addEventListener('click', createNewPlaylist);
  }

  // Lyrics Overlay Toggle
  if (lyricsToggleBtn && lyricsModal) {
    lyricsToggleBtn.addEventListener('click', () => {
      isLyricsOpen = !isLyricsOpen;
      lyricsModal.classList.toggle('hidden', !isLyricsOpen);
      lyricsToggleBtn.classList.toggle('text-[#1ed760]', isLyricsOpen);
      if (isLyricsOpen) updateLyricsDisplay(player.currentTrack);
    });
  }

  if (closeLyricsBtn && lyricsModal) {
    closeLyricsBtn.addEventListener('click', () => {
      isLyricsOpen = false;
      lyricsModal.classList.add('hidden');
      lyricsToggleBtn?.classList.remove('text-[#1ed760]');
    });
  }

  // Premium Modal Handlers
  const btnPremium = document.getElementById('btn-discover-premium');
  const premiumModal = document.getElementById('premium-modal');
  const closePremiumBtn = document.getElementById('close-premium-btn');

  if (btnPremium && premiumModal) {
    btnPremium.addEventListener('click', () => premiumModal.classList.remove('hidden'));
  }
  if (closePremiumBtn && premiumModal) {
    closePremiumBtn.addEventListener('click', () => premiumModal.classList.add('hidden'));
  }

  // Install App Promo
  const btnInstallApp = document.getElementById('btn-install-app');
  if (btnInstallApp) {
    btnInstallApp.addEventListener('click', () => {
      window.open('https://www.spotify.com/download/', '_blank', 'noopener,noreferrer');
    });
  }

  // User Profile Dropdown
  const userMenuBtn = document.getElementById('user-menu-btn');
  const userDropdown = document.getElementById('user-dropdown');
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      userDropdown.classList.add('hidden');
    });
  }

  // Mobile Library Drawer and Backdrop
  const mobileLibToggle = document.getElementById('mobile-library-toggle');
  const closeMobileLib = document.getElementById('close-mobile-library');
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const sidebarLeft = document.getElementById('sidebar-left');

  function openMobileLibrary() {
    if (sidebarLeft && drawerOverlay) {
      sidebarLeft.classList.remove('hidden');
      sidebarLeft.classList.add('drawer-open');
      mobileLibToggle?.setAttribute('aria-expanded', 'true');
      sidebarLeft.classList.add('fixed', 'inset-y-0', 'left-0', 'z-50', 'w-80', 'max-w-[85vw]', 'rounded-none', 'shadow-2xl');
      drawerOverlay.classList.remove('hidden');
      closeMobileLib?.focus();
    }
  }

  function closeMobileLibrary() {
    if (sidebarLeft && drawerOverlay) {
      const wasOpen = sidebarLeft.classList.contains('drawer-open');
      sidebarLeft.classList.remove('drawer-open');
      sidebarLeft.classList.add('hidden');
      mobileLibToggle?.setAttribute('aria-expanded', 'false');
      if (wasOpen) mobileLibToggle?.focus();
      sidebarLeft.classList.remove('fixed', 'inset-y-0', 'left-0', 'z-50', 'w-80', 'max-w-[85vw]', 'rounded-none', 'shadow-2xl');
      drawerOverlay.classList.add('hidden');
    }
  }

  if (mobileLibToggle) mobileLibToggle.addEventListener('click', openMobileLibrary);
  if (closeMobileLib) closeMobileLib.addEventListener('click', closeMobileLibrary);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileLibrary);

  // Mobile Bottom Navigation Bar Tabs
  const mNavHome = document.getElementById('mobile-nav-home');
  const mNavSearch = document.getElementById('mobile-nav-search');
  const mNavLibrary = document.getElementById('mobile-nav-library');
  const mNavPremium = document.getElementById('mobile-nav-premium');

  if (mNavHome) mNavHome.addEventListener('click', () => {
    closeMobileLibrary();
    navigateTo('home');
  });

  if (mNavSearch) mNavSearch.addEventListener('click', () => {
    closeMobileLibrary();
    navigateTo('search', '');
    if (searchInput) searchInput.focus();
  });

  if (mNavLibrary) mNavLibrary.addEventListener('click', () => {
    openMobileLibrary();
  });

  if (mNavPremium && premiumModal) mNavPremium.addEventListener('click', () => {
    closeMobileLibrary();
    premiumModal.classList.remove('hidden');
  });

  const queuePanel = document.getElementById('queue-panel');
  function renderQueue() {
    if (!queuePanel || !isQueueOpen) return;
    queuePanel.innerHTML = `<div class="section-heading"><h2 class="text-xl font-bold">Cola de reproducción</h2><button id="close-queue" aria-label="Cerrar cola">✕</button></div>`;
    player.queue.forEach((track, index) => {
      const button = document.createElement('button');
      button.className = 'queue-track';
      button.textContent = `${index === player.currentIndex ? '▶ ' : ''}${track.title} · ${track.artist}`;
      button.addEventListener('click', () => player.playTrack(track));
      queuePanel.appendChild(button);
    });
    queuePanel.querySelector('#close-queue').onclick = () => {
      isQueueOpen = false; queuePanel.hidden = true; queueToggleBtn.setAttribute('aria-expanded', 'false'); queueToggleBtn.focus();
    };
  }
  queueToggleBtn?.addEventListener('click', () => {
    isQueueOpen = !isQueueOpen; queuePanel.hidden = !isQueueOpen;
    queueToggleBtn.setAttribute('aria-expanded', String(isQueueOpen)); renderQueue();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMobileLibrary(); closeSpotifyPanel(); premiumModal?.classList.add('hidden');
      lyricsModal?.classList.add('hidden'); isLyricsOpen = false;
      userDropdown?.classList.add('hidden');
      isQueueOpen = false; queuePanel.hidden = true;
      queueToggleBtn?.setAttribute('aria-expanded', 'false');
    }
    if (event.key === 'Tab' && sidebarLeft?.classList.contains('drawer-open')) {
      const items = [...sidebarLeft.querySelectorAll('button, [tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', closeMobileLibrary);
  player.on('onPlaybackError', track => showToast(track?.isLocal ? 'No se puede reproducir este formato de audio. Prueba MP3 o WAV.' : 'La vista previa no está disponible. Usa Escuchar en Spotify.', 'fa-circle-exclamation'));
  const spotifyPanel = document.getElementById('spotify-listen-panel');
  const embedContainer = document.getElementById('spotify-embed-container');
  let spotifyOpener = null;
  function closeSpotifyPanel() {
    if (!spotifyPanel) return;
    spotifyPanel.hidden = true;
    embedContainer.replaceChildren(); // Stops the provider before native playback can resume.
  }
  function openSpotifyPanel(track) {
    if (!track?.spotifyId) return showToast('Este archivo es local. Usa el reproductor de la página.', 'fa-music');
    player.pause();
    spotifyOpener = document.activeElement;
    embedContainer.replaceChildren();
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`;
    iframe.title = `Spotify: ${track.title} — ${track.artist}`;
    iframe.width = '100%'; iframe.height = '152';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    embedContainer.appendChild(iframe);
    document.getElementById('spotify-external-link').href = track.spotifyUrl;
    spotifyPanel.hidden = false;
    document.getElementById('close-spotify-panel').focus();
  }
  document.getElementById('close-spotify-panel').addEventListener('click', () => {
    closeSpotifyPanel(); if (spotifyOpener?.isConnected) spotifyOpener.focus();
  });
  player.on('onBeforePlay', closeSpotifyPanel);
  document.getElementById('btn-toggle-info')?.addEventListener('click', () => openSpotifyPanel(player.currentTrack));
  const localAudioUrls = new Set();
  const localAudioInput = document.getElementById('local-audio-input');
  localAudioInput.addEventListener('change', () => {
    const tracks = [];
    for (const file of localAudioInput.files) {
      if (!file.type.startsWith('audio/') && !/\.(mp3|wav|ogg|m4a|flac)$/i.test(file.name)) continue;
      const url = URL.createObjectURL(file); localAudioUrls.add(url);
      const song = { id: `local-${crypto.randomUUID()}`, title: file.name.replace(/\.[^.]+$/, ''),
        artist: 'Tu archivo de audio', album: 'Archivos locales', artistId: '', albumId: '',
        duration: 0, durationFormatted: '—', cover: 'assets/covers/placeholder.svg', audioUrl: url,
        isLiked: false, isLocal: true, genre: 'Audio local', plays: '—', lyrics: [] };
      data.songs.push(song); tracks.push(song);
    }
    localAudioInput.value = '';
    if (!tracks.length) return showToast('Selecciona archivos de audio, como MP3 o WAV.', 'fa-music');
    navigateTo('home'); renderHome();
    player.playTrack(tracks[0], tracks);
    showToast(`${tracks.length} archivo(s) añadidos. Permanecen disponibles mientras esta página esté abierta.`, 'fa-music');
  });
  window.addEventListener('pagehide', event => {
    if (!event.persisted) localAudioUrls.forEach(url => URL.revokeObjectURL(url));
  });
  // Initial Boot
  syncPlayerUI(player.currentTrack);
  player.setVolume(player.volume);
  player.emit('onModeChange', { isShuffle: player.isShuffle, repeatMode: player.repeatMode });
  renderLibrary();
  renderCurrentView();
  updateNavButtons();
});

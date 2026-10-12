# 🎵 Spotify Web Player Clone – Proyecto Andres

[![GitHub Pages](https://img.shields.io/badge/Demo%20Online-GitHub%20Pages-1ed760?style=for-the-badge&logo=spotify&logoColor=black)](https://andresescobar14.github.io/Proyecto-Spotify-Andres/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> Una réplica moderna, 100% interactiva, responsiva y de alta fidelidad del **Spotify Web Player**, desarrollada con tecnologías web modernas, arquitectura SPA (Single Page Application) y un motor de audio funcional en tiempo real con respaldo procedural Web Audio API.

🔗 **Link de despliegue en vivo:** [https://andresescobar14.github.io/Proyecto-Spotify-Andres/](https://andresescobar14.github.io/Proyecto-Spotify-Andres/)

---

## 📱 100% Responsive Design (Móvil, Tablet y Escritorio)

El proyecto cuenta con una adaptación visual y funcional completa según el dispositivo:

### 📱 Dispositivos Móviles (320px – 767px)
- **Barra de navegación inferior nativa (Mobile Tab Bar):** Acceso rápido con 1 tap a *Inicio*, *Buscar*, *Tu biblioteca* y *Premium*.
- **Mini Reproductor compacto:** Carátula, título, artista, botón de me gusta y botón play/pause sin desbordamientos de pantalla.
- **Drawer deslizable de Biblioteca (*Off-Canvas Drawer*):** Al tocar *Tu biblioteca*, se despliega un panel lateral con fondo desenfocado y botón de cierre para gestionar listas sin perder espacio visual.
- **Tablas de canciones adaptativas:** En pantallas pequeñas se oculta la columna de álbum para priorizar el nombre de la pista, artista, botón de corazón y duración.

### 💻 Tablets y Escritorio (768px – 4K)
- **Barra lateral fija de alta productividad:** Navegación en dos columnas con biblioteca completa, filtros por pastilla (*Listas, Artistas, Álbumes*) y buscador interno.
- **Reproductor de audio extendido:** Incluye barra de tiempo para arrastrar (*seek scrubber*), volumen interactivo, modo aleatorio, repetición, letras sincronizadas, cola de reproducción y pantalla completa.
- **Cuadrículas adaptativas fluidas:** Desde 2 columnas en pantallas pequeñas hasta 8 columnas en pantallas ultra-anchas.

---

## 🌟 Características Principales

### 1. 🎧 Reproductor de Audio Interactivo (Bottom Player)
- **Control de reproducción total:** Play/Pause, canción siguiente, anterior, modo aleatorio (*Shuffle*) y repetición (*Repeat All / Repeat One*).
- **Barra de tiempo interactiva (Scrubbing):** Haz clic o arrastra en cualquier segundo de la pista para avanzar o retroceder al instante.
- **Control de volumen y silenciado:** Slider interactivo con color verde oficial y botón de mute/unmute.
- **Respaldo de Audio Procedural (Web Audio API Synthesizer):** Si el navegador bloquea un streaming remoto o no tienes conexión a internet, el motor sintetiza acordes y ritmos lo-fi agradables de forma procedural para garantizar reproducción 100% ininterrumpida.
- **Teclas de acceso rápido (Keyboard Shortcuts):**
  - <kbd>Espacio</kbd>: Reproducir / Pausar
  - <kbd>→</kbd> / <kbd>←</kbd>: Avanzar / Retroceder 5 segundos
  - <kbd>↑</kbd> / <kbd>↓</kbd>: Subir / Bajar volumen
  - <kbd>M</kbd>: Silenciar / Reactivar sonido

### 2. ⚡ Navegación SPA Fluida (Single Page Application)
- **Inicio (Home View):**
  - Saludo dinámico según la hora del día (*"Buenos días"*, *"Buenas tardes"*, *"Buenas noches"*).
  - 6 tarjetas de acceso rápido ("Tus me gusta", "Top 50 - Global", etc.) con botón instantáneo de reproducción al pasar el cursor.
  - Secciones organizadas: *Canciones en tendencia*, *Artistas populares*, *Álbumes y sencillos populares*, *Emisoras de radio* y *Listas de éxitos*.
- **Búsqueda en Vivo y Explorar (Search View):**
  - Barra de búsqueda con filtrado instantáneo en tiempo real sobre canciones, artistas y álbumes.
  - Vista *"Explorar todo"* con tarjetas coloridas angulares de géneros (Pop, Urbano Latino, Reggaeton, Rock, Trap, etc.).
- **Páginas de Playlists y Álbumes:**
  - Encabezado con degradado dinámico, carátula en alta resolución, conteo de canciones y duración estimada.
  - Tabla de pistas con índice, botón hover para reproducir, título, artista, álbum, botón de Me gusta y duración.
- **Perfiles de Artistas:**
  - Banner en alta resolución, insignia de *Artista verificado*, número de oyentes mensuales, top 5 temas más escuchados y biografía.

### 3. 🎤 Modo Letras Sincronizadas (Karaoke View)
- Modal inmersivo a pantalla completa con fondo degradado a juego con la carátula.
- Las líneas de la letra se iluminan y escalan automáticamente conforme la canción avanza.

### 4. 📚 Tu Biblioteca Interactiva (Sidebar)
- Filtros por pastillas: *Todo*, *Listas*, *Artistas*, *Álbumes*.
- Botón **(+)** para crear nuevas listas de reproducción dinámicas al instante.
- Lista de Me gusta (*Canciones que te gustan* con insignia fijada y contador sincronizado).
- Guardado y actualización dinámica del estado de canciones favoritas.

### 5. 💎 Modales y Microinteracciones
- **Modal de Spotify Premium:** Comparativa interactiva de planes (Individual, Duo, Familiar) con características y precios.
- **Sistema de notificaciones Toast:** Feedback visual elegante al dar me gusta o crear listas.
- **Animación de Ecualizador:** Barras verdes animadas en tiempo real en la canción que está sonando.
- **Hover Micro-animations:** Botón flotante de reproducción verde con elevación suave y sombras volumétricas.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico:** Estructura limpia y accesible con soporte ARIA.
- **Tailwind CSS (v3.4+ CDN):** Utilidades optimizadas con paleta oficial de colores Spotify (`#121212`, `#1ed760`, `#181818`, `#282828`, `#000000`).
- **CSS3 Personalizado (`styles.css`):** Barras de desplazamiento finas personalizadas, sliders de rango de volumen y progreso, ecualizador animado, efectos de desenfoque de fondo (*backdrop-blur*).
- **JavaScript Moderno (ES6+ Modular):**
  - `js/data.js`: Colección completa de metadatos, artistas, álbumes, listas, radios y letras.
  - `js/player.js`: Motor de audio HTML5 y sintetizador procedural Web Audio API.
  - `js/app.js`: Controlador de interfaz, enrutamiento dinámico SPA, eventos reactivos y modales.
- **FontAwesome 6.5:** Iconografía vectorial oficial.
- **Google Fonts (Inter):** Tipografía nítida y legible.

---

## 🌐 Publicación en GitHub Pages

Este proyecto está configurado para ejecutarse directamente desde GitHub Pages:

1. Ve a tu repositorio en GitHub: [https://github.com/andresescobar14/Proyecto-Spotify-Andres](https://github.com/andresescobar14/Proyecto-Spotify-Andres)
2. Ingresa a **Settings** > **Pages** (en el menú lateral izquierdo).
3. En la sección **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `root (/)`
4. Haz clic en **Save**.
5. ¡Listo! Tu clon de Spotify estará en vivo en:
   👉 **`https://andresescobar14.github.io/Proyecto-Spotify-Andres/`**

---

## 🚀 Cómo Ejecutar en Local

No requiere dependencias complejas ni procesos de compilación (npm/webpack). Puedes abrirlo directamente:

1. **Abrir directamente en el navegador:**
   - Haz doble clic en el archivo `index.html` o arrástralo a tu navegador (Chrome, Edge, Firefox, Brave, Safari).

2. **O mediante un servidor local (Recomendado):**
   - Con **Python**:
     ```bash
     python -m http.server 8080
     ```
     Luego visita `http://localhost:8080` en tu navegador.
   - Con la extensión **Live Server** de VS Code:
     - Haz clic derecho en `index.html` y selecciona *"Open with Live Server"*.

---

## 📂 Estructura del Repositorio

```text
Proyecto-Spotify-Andres/
├── index.html          # Interfaz principal completa, accesible y responsiva
├── styles.css          # Estilos personalizados, sliders, scrollbars y animaciones
├── js/
│   ├── data.js         # Base de datos de canciones, álbumes, artistas y letras
│   ├── player.js       # Motor de reproducción y audio procedural
│   └── app.js          # Lógica SPA, enrutamiento, eventos y modales
├── 121148.png          # Favicon / Logo Spotify oficial
├── images.jpg          # Carátulas locales del proyecto
├── images (1).jpg      # Carátula "Canciones que te gustan"
├── images (2).jpg      # Carátula Shakira BZRP Session
├── img9.jpg            # Carátula Private Suite
├── img10.jpg           # Carátula Cosa Nuestra
├── ar.jpg              # Carátula Radio Regional
├── en.jpg              # Carátula Trap Latino
├── en (1).jpg          # Carátula Reggaeton Hits
├── .gitignore          # Archivos ignorados (documentos personales)
└── README.md           # Documentación completa y badges del proyecto
```

---

## 👨‍💻 Autor

- **Andrés Escobar** ([@andresescobar14](https://github.com/andresescobar14))
- Proyecto: Clon de Spotify Web Player
- Año: 2026

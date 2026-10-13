# Spotify Web Player · Andrés Escobar

Proyecto educativo en HTML, CSS y JavaScript. Las carátulas y metadatos ilustran el catálogo; los audios son grabaciones de demostración y no corresponden a las canciones anunciadas. No se conecta con cuentas ni servicios de Spotify.

## Cambios

- Corregida la carga de datos que impedía renderizar el contenido.
- Tarjetas con imágenes locales para mixes, canciones, artistas, álbumes y emisoras. Las portadas se incluyen en `assets/covers/`.
- Cuadrículas adaptadas al ancho real del contenido, biblioteca lateral en escritorio y panel con cierre y navegación por teclado en móvil.
- Reproductor compacto en móvil, con progreso y controles accesibles.
- Búsqueda por título, artista, álbum o género; enlaces «Mostrar todos» funcionales.
- Favoritos, listas creadas y volumen guardados en el navegador. Si el almacenamiento está bloqueado, la sesión sigue funcionando.
- Reproducción de listas y álbumes con su propia cola; panel de cola y errores de audio visibles. No se sustituye una canción fallida por sonidos generados.
- Eventos delegados para evitar múltiples navegaciones por un solo clic; búsquedas escapadas para evitar insertar HTML.
- CSS de Tailwind precompilado: la página carga sin ejecutar el CDN de Tailwind.
- Compatibilidad con teclado y preferencias de movimiento reducido.

## Ejecutar

```sh
python -m http.server 8080
```

Abre `http://localhost:8080`. El sitio incluye el CSS compilado, por lo que no necesita instalar dependencias para ejecutarse. Las portadas, los iconos de Font Awesome y el CSS se incluyen localmente. Inter se solicita a Google Fonts, con tipografía de sistema como alternativa. El audio requiere conexión y depende de la disponibilidad del servidor externo.

## Desarrollo y comprobaciones

Requiere Node.js y npm únicamente para regenerar el CSS y ejecutar las comprobaciones:

```sh
npm ci
npm run build:css
npm run check
npm test
```

Después de añadir clases de Tailwind en HTML o JavaScript, vuelve a generar y guardar `assets/utilities.css`. Las pruebas cubren persistencia, almacenamiento bloqueado, volumen inválido, avance con repetición, límites de progreso y promesas de audio interrumpidas.

## Publicar

En GitHub: **Settings → Pages → Deploy from a branch → main → /(root)**. Los cambios de una rama de trabajo aparecen en Pages después de integrar esa rama en `main`.

## Alcance

Es una demostración del diseño y del reproductor. Las letras son ejemplos con resaltado proporcional al tiempo, no sincronización oficial. Las listas nuevas comienzan vacías; no incluye edición de sus canciones, autenticación, suscripciones, descargas ni conexión a dispositivos. Los botones promocionales y de cuenta forman parte de la maqueta.

## Recursos

Font Awesome Free 6.5.1: [licencias de iconos, fuentes y código](https://fontawesome.com/license/free). Las portadas incluidas se conservan como material ilustrativo del proyecto educativo; los derechos pertenecen a sus titulares.

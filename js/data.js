/**
 * Spotify Clone Data Store
 * All tracks, artists, albums, playlists and radio stations
 */

const SPOTIFY_DATA = {
  // Current user info
  currentUser: {
    name: "Andres Escobar",
    username: "andres_escobar",
    avatar: "images.jpg",
    followers: 142,
    following: 89,
    plan: "Spotify Free",
  },

  // Songs collection
  songs: [
    {
      id: "song-1",
      title: "kiss me",
      artist: "Ariana Grande",
      artistId: "artist-ariana",
      album: "eternal sunshine",
      albumId: "album-eternal",
      duration: 219,
      durationFormatted: "3:39",
      cover: "assets/covers/song-1.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/3a0d16699c1134c6b347060eed74a931eaff804c",
      isLiked: true,
      genre: "Pop",
      plays: "—",
      previewDuration: 30,
      spotifyId: "0lok0VDJn0zRvHLBCITSSw",
      spotifyUrl: "https://open.spotify.com/track/0lok0VDJn0zRvHLBCITSSw",
      lyrics: []
    },
    {
      id: "song-2",
      title: "MATADORA",
      artist: "KAROL G",
      artistId: "artist-karol-g",
      album: "MAÑANA SERÁ BONITO",
      albumId: "album-msb",
      duration: 144,
      durationFormatted: "2:24",
      cover: "assets/covers/song-2.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/cd72c77a9e03a9b8c82ecb301a87a3f6fdf6d661",
      isLiked: true,
      genre: "Urbano Latino",
      plays: "—",
      previewDuration: 30,
      spotifyId: "6cWxlpfHEcNXojMyCKcIpx",
      spotifyUrl: "https://open.spotify.com/track/6cWxlpfHEcNXojMyCKcIpx",
      lyrics: []
    },
    {
      id: "song-3",
      title: "Buenas",
      artist: "Clarent",
      artistId: "artist-clarent",
      album: "BUENAS - Single",
      albumId: "album-buenas",
      duration: 183,
      durationFormatted: "3:03",
      cover: "assets/covers/song-3.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/454f1ef42d573dd16af6e6f462f5830bd29cb9ed",
      isLiked: false,
      genre: "Urbano",
      plays: "—",
      previewDuration: 30,
      spotifyId: "3QQzzrcgiepqc9WhH0dqUU",
      spotifyUrl: "https://open.spotify.com/track/3QQzzrcgiepqc9WhH0dqUU",
      lyrics: []
    },
    {
      id: "song-4",
      title: "Animal",
      artist: "KATSEYE",
      artistId: "artist-katseye",
      album: "SIS (Soft Is Strong)",
      albumId: "album-sis",
      duration: 158,
      durationFormatted: "2:38",
      cover: "assets/covers/song-4.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/65040556453e4f1c76bcefebf54a718521588331",
      isLiked: false,
      genre: "Pop Global",
      plays: "—",
      previewDuration: 30,
      spotifyId: "3ouNEk0tv5TTi8VWMe1xbX",
      spotifyUrl: "https://open.spotify.com/track/3ouNEk0tv5TTi8VWMe1xbX",
      lyrics: []
    },
    {
      id: "song-5",
      title: "amoureux",
      artist: "Alleh",
      artistId: "artist-alleh",
      album: "LA CIUDAD",
      albumId: "album-laciudad",
      duration: 133,
      durationFormatted: "2:13",
      cover: "assets/covers/song-5.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/87ef50adf71cd6c0e3ff7c6c9d3c24c658bc4a5a",
      isLiked: true,
      genre: "R&B Latino",
      plays: "—",
      previewDuration: 30,
      spotifyId: "172YRaBrecw8yp15qJhnzd",
      spotifyUrl: "https://open.spotify.com/track/172YRaBrecw8yp15qJhnzd",
      lyrics: []
    },
    {
      id: "song-6",
      title: "SUPERESTRELLA",
      artist: "Aitana",
      artistId: "artist-aitana",
      album: "alpha",
      albumId: "album-alpha",
      duration: 183,
      durationFormatted: "3:03",
      cover: "assets/covers/song-6.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/16b40227ae79de93f49eb21da2cce8a6e4af4690",
      isLiked: false,
      genre: "Pop / Electro",
      plays: "—",
      previewDuration: 30,
      spotifyId: "6hpuesKPNa3WhV48O7Fa47",
      spotifyUrl: "https://open.spotify.com/track/6hpuesKPNa3WhV48O7Fa47",
      lyrics: []
    },
    {
      id: "song-7",
      title: "REINA (KRIMINAL)",
      artist: "Kapo",
      artistId: "artist-kapo",
      album: "Ohnana",
      albumId: "album-kapo",
      duration: 164,
      durationFormatted: "2:44",
      cover: "assets/covers/song-7.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/9d6d359c25fafd202770f46cd26f3d4040fb3362",
      isLiked: true,
      genre: "Afrobeat / Latino",
      plays: "—",
      previewDuration: 30,
      spotifyId: "6YCdfQNDpfvY9D9JHc9VmR",
      spotifyUrl: "https://open.spotify.com/track/6YCdfQNDpfvY9D9JHc9VmR",
      lyrics: []
    },
    {
      id: "song-8",
      title: "MI BB",
      artist: "Lunay, Omar Courtz",
      artistId: "artist-karol-g",
      album: "MAÑANA SERÁ BONITO",
      albumId: "album-msb",
      duration: 232,
      durationFormatted: "3:52",
      cover: "assets/covers/song-8.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/da4a8e2f2a9dbe30d982a57b144dd290b015154d",
      isLiked: true,
      genre: "Reggaeton",
      plays: "—",
      previewDuration: 30,
      spotifyId: "6bmhecXBNupQjLC1QnvLxU",
      spotifyUrl: "https://open.spotify.com/track/6bmhecXBNupQjLC1QnvLxU",
      lyrics: []
    },
    {
      id: "song-9",
      title: "Who",
      artist: "Jimin",
      artistId: "artist-jimin",
      album: "MUSE",
      albumId: "album-muse",
      duration: 170,
      durationFormatted: "2:50",
      cover: "assets/covers/song-9.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/02687a01e9ec00f4e947f39e910c7e0c6fa83e10",
      isLiked: false,
      genre: "K-Pop / R&B",
      plays: "—",
      previewDuration: 30,
      spotifyId: "7tI8dRuH2Yc6RuoTjxo4dU",
      spotifyUrl: "https://open.spotify.com/track/7tI8dRuH2Yc6RuoTjxo4dU",
      lyrics: []
    },
    {
      id: "song-10",
      title: "Efectos Secundarios",
      artist: "Silvestre Dangond, ELENA ROSE",
      artistId: "artist-silvestre",
      album: "Ta Malo",
      albumId: "album-tamalo",
      duration: 177,
      durationFormatted: "2:57",
      cover: "assets/covers/song-10.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/d784fe18feee45564438aa3056f1ab878fe52583",
      isLiked: true,
      genre: "Vallenato",
      plays: "—",
      previewDuration: 30,
      spotifyId: "3ZBeHVnqHHMOmv1ofhq6T0",
      spotifyUrl: "https://open.spotify.com/track/3ZBeHVnqHHMOmv1ofhq6T0",
      lyrics: []
    },
    {
      id: "song-11",
      title: "Shakira: Bzrp Music Sessions, Vol. 53/66",
      artist: "Bizarrap, Shakira",
      artistId: "artist-bizarrap",
      album: "Bzrp Music Sessions",
      albumId: "album-bzrp53",
      duration: 214,
      durationFormatted: "3:34",
      cover: "assets/covers/song-11.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/95e346339b50920523f00296248117e24abfa183",
      isLiked: true,
      genre: "Electro Pop / Dance",
      plays: "—",
      previewDuration: 30,
      spotifyId: "4nrPB8O7Y7wsOCJdgXkthe",
      spotifyUrl: "https://open.spotify.com/track/4nrPB8O7Y7wsOCJdgXkthe",
      lyrics: []
    },
    {
      id: "song-12",
      title: "DtMF",
      artist: "Bad Bunny",
      artistId: "artist-bad-bunny",
      album: "nadie sabe lo que va a pasar mañana",
      albumId: "album-nslqvapm",
      duration: 237,
      durationFormatted: "3:57",
      cover: "assets/covers/song-12.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/e41ce6b82410d81c08baacca2a7169e5ace4287d",
      isLiked: true,
      genre: "Trap Latino",
      plays: "—",
      previewDuration: 30,
      spotifyId: "3sK8wGT43QFpWrvNQsrQya",
      spotifyUrl: "https://open.spotify.com/track/3sK8wGT43QFpWrvNQsrQya",
      lyrics: []
    },
    {
      id: "song-13",
      title: "borondo",
      artist: "Beéle",
      artistId: "artist-beele",
      album: "BORONDO - Single",
      albumId: "album-borondo",
      duration: 141,
      durationFormatted: "2:21",
      cover: "assets/covers/song-13.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/275d0f4f132c9d8346a8f889c410cda8ee72aee4",
      isLiked: false,
      genre: "Afrobeat / Caribe",
      plays: "—",
      previewDuration: 30,
      spotifyId: "60RgDM1qDQ22HpfsK9Ul4h",
      spotifyUrl: "https://open.spotify.com/track/60RgDM1qDQ22HpfsK9Ul4h",
      lyrics: []
    },
    {
      id: "song-14",
      title: "LO MISMO DE SIEMPRE",
      artist: "Mora",
      artistId: "artist-mora",
      album: "ESTRELLA",
      albumId: "album-estrella",
      duration: 195,
      durationFormatted: "3:15",
      cover: "assets/covers/song-14.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/6e03d919512af79499764978ea8b0ad6af61ae7a",
      isLiked: true,
      genre: "Reggaeton Melódico",
      plays: "—",
      previewDuration: 30,
      spotifyId: "3I25c1rihFkPSh2s1ceLq8",
      spotifyUrl: "https://open.spotify.com/track/3I25c1rihFkPSh2s1ceLq8",
      lyrics: []
    },
    {
      id: "song-15",
      title: "Me Porto Bonito",
      artist: "Bad Bunny, Chencho Corleone",
      artistId: "artist-bad-bunny",
      album: "Un Verano Sin Ti",
      albumId: "album-uvst",
      duration: 178,
      durationFormatted: "2:58",
      cover: "assets/covers/song-15.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/5c80aedfe75d2bc15aa0e803993c43395d8054fe",
      isLiked: true,
      genre: "Reggaeton",
      plays: "—",
      previewDuration: 30,
      spotifyId: "6Sq7ltF9Qa7SNFBsV5Cogx",
      spotifyUrl: "https://open.spotify.com/track/6Sq7ltF9Qa7SNFBsV5Cogx",
      lyrics: []
    },
    {
      id: "song-16",
      title: "Cosa Nuestra",
      artist: "Rauw Alejandro",
      artistId: "artist-rauw",
      album: "Cosa Nuestra",
      albumId: "album-cosanuestra",
      duration: 260,
      durationFormatted: "4:20",
      cover: "assets/covers/song-16.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/cdec908e5695aeec4ecf7990ea3edc2041ab4a46",
      isLiked: true,
      genre: "Urbano / Bolero",
      plays: "—",
      previewDuration: 30,
      spotifyId: "5UxEKpzvvLnjoC10XoogN3",
      spotifyUrl: "https://open.spotify.com/track/5UxEKpzvvLnjoC10XoogN3",
      lyrics: []
    },
    {
      id: "song-17",
      title: "PETITE",
      artist: "ROA",
      artistId: "artist-roa",
      album: "Private Suite",
      albumId: "album-privatesuite",
      duration: 140,
      durationFormatted: "2:20",
      cover: "assets/covers/song-17.jpg",
      audioUrl: "https://p.scdn.co/mp3-preview/625bd7e9802e3052f14b61ba397721b43fb30546",
      isLiked: false,
      genre: "Trap Melódico",
      plays: "—",
      previewDuration: 30,
      spotifyId: "2QlBSKPmcINWigD2mlmE5G",
      spotifyUrl: "https://open.spotify.com/track/2QlBSKPmcINWigD2mlmE5G",
      lyrics: []
    }
  ],

  // Artists collection
  artists: [
    {
      id: "artist-karol-g",
      name: "KAROL G",
      monthlyListeners: "54,829,102 oyentes mensuales",
      verified: true,
      cover: "assets/covers/659024b1fc2a68ae.jpg",
      banner: "assets/covers/659024b1fc2a68ae.jpg",
      bio: "Carolina Giraldo Navarro, conocida mundialmente como KAROL G o 'La Bichota', es una cantautora colombiana ganadora de múltiples premios Grammy y Latin Grammy.",
      topSongIds: ["song-2", "song-8"]
    },
    {
      id: "artist-rauw",
      name: "Rauw Alejandro",
      monthlyListeners: "48,190,450 oyentes mensuales",
      verified: true,
      cover: "assets/covers/197203662fb3d139.jpg",
      banner: "assets/covers/197203662fb3d139.jpg",
      bio: "Raúl Alejandro Ocasio Ruiz es un cantante, compositor y bailarín puertorriqueño, pionero en fusionar R&B, reggaetón y sonidos synth-pop.",
      topSongIds: ["song-16"]
    },
    {
      id: "artist-beele",
      name: "Beele",
      monthlyListeners: "22,430,900 oyentes mensuales",
      verified: true,
      cover: "assets/covers/3d0d7d55c18eae08.jpg",
      banner: "assets/covers/3d0d7d55c18eae08.jpg",
      bio: "Brandon De Jesús López Orozco, conocido como Beele, es un cantautor colombiano de música urbana, dancehall e influencias afrocaribeñas.",
      topSongIds: ["song-13"]
    },
    {
      id: "artist-feid",
      name: "Feid",
      monthlyListeners: "45,980,120 oyentes mensuales",
      verified: true,
      cover: "assets/covers/f1a802cbb500db09.jpg",
      banner: "assets/covers/f1a802cbb500db09.jpg",
      bio: "Salomón Villada Hoyos, el Ferxxo, es un cantante y productor colombiano que ha revolucionado la escena urbana con su estilo verde inconfundible.",
      topSongIds: ["song-14", "song-2"]
    },
    {
      id: "artist-westcol",
      name: "Westcol",
      monthlyListeners: "3,210,500 oyentes mensuales",
      verified: true,
      cover: "images (4).jpg",
      banner: "images (4).jpg",
      bio: "Streamer y creador de contenido número uno de Colombia, organizador de eventos musicales masivos y apariciones en colaboraciones urbanas.",
      topSongIds: ["song-7"]
    },
    {
      id: "artist-bad-bunny",
      name: "Bad Bunny",
      monthlyListeners: "72,450,890 oyentes mensuales",
      verified: true,
      cover: "assets/covers/44dd8f7f65adbb5c.jpg",
      banner: "assets/covers/44dd8f7f65adbb5c.jpg",
      bio: "Benito Antonio Martínez Ocasio es el artista latino más escuchado en la historia de Spotify, rompiendo récords globales continuamente.",
      topSongIds: ["song-12", "song-15"]
    },
    {
      id: "artist-mora",
      name: "Mora",
      monthlyListeners: "26,104,330 oyentes mensuales",
      verified: true,
      cover: "assets/covers/6e20f837a33ff928.jpg",
      banner: "assets/covers/6e20f837a33ff928.jpg",
      bio: "Gabriel Armando Mora Quintero es un productor, cantante y compositor puertorriqueño caracterizado por su estilo melódico y producciones innovadoras.",
      topSongIds: ["song-14"]
    },
    {
      id: "artist-danny-ocean",
      name: "Danny Ocean",
      monthlyListeners: "24,800,450 oyentes mensuales",
      verified: true,
      cover: "assets/covers/eda15ae6faf9ac0e.jpg",
      banner: "assets/covers/eda15ae6faf9ac0e.jpg",
      bio: "Daniel Alejandro Morales Reyes es un cantautor y productor venezolano con un sonido pop tropical inconfundible reconocido mundialmente.",
      topSongIds: ["song-5"]
    },
    {
      id: "artist-j-balvin",
      name: "J Balvin",
      monthlyListeners: "49,300,100 oyentes mensuales",
      verified: true,
      cover: "assets/covers/c4352bb4cd1cca1a.jpg",
      banner: "assets/covers/c4352bb4cd1cca1a.jpg",
      bio: "José Álvaro Osorio Balvín es el embajador global del reggaetón de Medellín, llevando la cultura colombiana a festivales de todo el planeta.",
      topSongIds: ["song-8"]
    },
    {
      id: "artist-maluma",
      name: "Maluma",
      monthlyListeners: "37,600,000 oyentes mensuales",
      verified: true,
      cover: "iamge7.jpg",
      banner: "iamge7.jpg",
      bio: "Juan Luis Londoño Arias, Don Juan, icono de la moda y la música latina con éxitos globales en pop, reggaetón y salsa.",
      topSongIds: ["song-3"]
    }
  ],

  // Albums collection
  albums: [
    {
      id: "album-uvst",
      title: "Un Verano Sin Ti",
      artist: "Bad Bunny",
      year: 2022,
      cover: "assets/covers/e3a9b0ac4c53bbfb.jpg",
      trackIds: ["song-15", "song-12"]
    },
    {
      id: "album-cosanuestra",
      title: "Cosa Nuestra",
      artist: "Rauw Alejandro",
      year: 2024,
      cover: "img10.jpg",
      trackIds: ["song-16"]
    },
    {
      id: "album-privatesuite",
      title: "Private Suite (Vol.2)",
      artist: "ROA",
      year: 2024,
      cover: "img9.jpg",
      trackIds: ["song-17"]
    },
    {
      id: "album-msb",
      title: "MAÑANA SERÁ BONITO",
      artist: "KAROL G",
      year: 2023,
      cover: "assets/covers/6037ee3917d9576d.jpg",
      trackIds: ["song-2", "song-8"]
    },
    {
      id: "album-estrella",
      title: "ESTRELLA",
      artist: "Mora",
      year: 2023,
      cover: "assets/covers/2d305d67d0761329.jpg",
      trackIds: ["song-14"]
    },
    {
      id: "album-borondo",
      title: "BORONDO",
      artist: "Beele",
      year: 2024,
      cover: "assets/covers/9c838c96a460bad5.jpg",
      trackIds: ["song-13"]
    }
  ],

  // Playlists collection
  playlists: [
    {
      id: "playlist-liked",
      title: "Canciones que te gustan",
      owner: "Andres Escobar",
      cover: "images (1).jpg",
      gradient: "from-[#450af5] to-[#8e8ee5]",
      description: "Todas las canciones a las que les diste me gusta en Spotify.",
      pinned: true,
      trackIds: ["song-1", "song-2", "song-5", "song-7", "song-8", "song-10", "song-11", "song-12", "song-14", "song-15", "song-16"]
    },
    {
      id: "playlist-andress",
      title: "Andress",
      owner: "Andres Escobar",
      cover: "images.jpg",
      gradient: "from-[#1e3264] to-[#121212]",
      description: "Mi lista personal con los temas que más escucho a diario.",
      pinned: true,
      trackIds: ["song-2", "song-8", "song-11", "song-15", "song-16", "song-12"]
    },
    {
      id: "playlist-top50-global",
      title: "Top 50 - Global",
      owner: "Spotify Charts",
      cover: "assets/covers/top50-global.svg",
      gradient: "from-[#006450] to-[#121212]",
      description: "Tu actualización diaria con las pistas más reproducidas en el mundo ahora mismo.",
      pinned: false,
      trackIds: ["song-1", "song-2", "song-4", "song-7", "song-9", "song-12", "song-15"]
    },
    {
      id: "playlist-top50-ve",
      title: "Top 50 - Venezuela",
      owner: "Spotify Charts",
      cover: "assets/covers/top50-ve.svg",
      gradient: "from-[#8400e7] to-[#121212]",
      description: "Tu actualización diaria con las pistas más reproducidas en Venezuela.",
      pinned: false,
      trackIds: ["song-2", "song-7", "song-8", "song-10", "song-13", "song-14"]
    },
    {
      id: "playlist-urban",
      title: "Hits Urbanos 2026",
      owner: "Spotify",
      cover: "images (5).jpg",
      gradient: "from-[#e13300] to-[#121212]",
      description: "El reggaetón y trap latino que la está rompiendo en las discotecas.",
      pinned: false,
      trackIds: ["song-2", "song-8", "song-12", "song-14", "song-15", "song-16", "song-17"]
    }
  ],

  // Radios collection
  radios: [
    {
      id: "radio-1",
      title: "Radio de Caifanes",
      cover: "assets/covers/535db70618801d7f.jpg",
      description: "Con Caifanes, León Larregui, Soda Stereo y Enanitos Verdes.",
      trackIds: ["song-5", "song-10", "song-1"]
    },
    {
      id: "radio-2",
      title: "Radio de Alfredo Olivas",
      cover: "assets/covers/f28ef39bcc70f435.jpg",
      description: "Con Alfredo Olivas, Joss Favela, El Fantasma y Julión Álvarez.",
      trackIds: ["song-10", "song-7"]
    },
    {
      id: "radio-3",
      title: "Radio de La Ley",
      cover: "assets/covers/382e234485a715c2.jpg",
      description: "Con La Ley, Caifanes, Los Prisioneros y Lucybell.",
      trackIds: ["song-1", "song-6"]
    },
    {
      id: "radio-4",
      title: "Radio de Eden Muñoz",
      cover: "assets/covers/77a10c8c2d3e288c.jpg",
      description: "Con Eden Muñoz, Edwin Luna y la Trakalosa de Monterrey.",
      trackIds: ["song-10", "song-12"]
    },
    {
      id: "radio-5",
      title: "Radio Regional Mexicano",
      cover: "ar.jpg",
      description: "Con Alfredo Olivas, Grupo Firme, Carin León y Peso Pluma.",
      trackIds: ["song-10", "song-7"]
    },
    {
      id: "radio-6",
      title: "Radio Trap Latino",
      cover: "en.jpg",
      description: "Con Tito Double P, Peso Pluma, Anuel AA y Eladio Carrión.",
      trackIds: ["song-12", "song-17"]
    },
    {
      id: "radio-7",
      title: "Radio Reggaeton Hits",
      cover: "en (1).jpg",
      description: "Con Feid, Bad Bunny, Ozuna, KAROL G y Rauw Alejandro.",
      trackIds: ["song-2", "song-8", "song-14", "song-15", "song-16"]
    }
  ],

  // Search Browse Categories
  categories: [
    { title: "Música", color: "bg-[#dc148c]", cover: "assets/covers/6037ee3917d9576d.jpg" },
    { title: "Podcasts", color: "bg-[#006450]", cover: "images (4).jpg" },
    { title: "Eventos en vivo", color: "bg-[#8400e7]", cover: "img10.jpg" },
    { title: "Creados para ti", color: "bg-[#1e3264]", cover: "images (1).jpg" },
    { title: "Novedades", color: "bg-[#e8115b]", cover: "assets/covers/6c391e8f2783e1f8.jpg" },
    { title: "Urbano Latino", color: "bg-[#bc5900]", cover: "images (5).jpg" },
    { title: "Pop", color: "bg-[#148a08]", cover: "assets/covers/4140f690674bdb6f.jpg" },
    { title: "Reggaeton", color: "bg-[#e91429]", cover: "assets/covers/659024b1fc2a68ae.jpg" },
    { title: "Verano", color: "bg-[#d84000]", cover: "assets/covers/e3a9b0ac4c53bbfb.jpg" },
    { title: "Entrenamiento", color: "bg-[#777777]", cover: "img9.jpg" },
    { title: "Relax", color: "bg-[#503750]", cover: "ar.jpg" },
    { title: "Rock", color: "bg-[#e61e32]", cover: "en.jpg" }
  ]
};


// Shared data and resilient persistence (also works when browser storage is blocked).
window.SPOTIFY_DATA = SPOTIFY_DATA;
window.spotifyStorage = {
  read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Session remains usable. */ }
  }
};
const savedLikes = window.spotifyStorage.read('spotify_likes', null);
if (Array.isArray(savedLikes)) {
  SPOTIFY_DATA.songs.forEach(song => { song.isLiked = savedLikes.includes(song.id); });
}
const likedList = SPOTIFY_DATA.playlists.find(list => list.id === 'playlist-liked');
if (likedList) likedList.trackIds = SPOTIFY_DATA.songs.filter(song => song.isLiked).map(song => song.id);
const savedLists = window.spotifyStorage.read('spotify_playlists', []);
if (Array.isArray(savedLists)) {
  SPOTIFY_DATA.playlists.unshift(...savedLists.filter(list =>
    typeof list?.id === 'string' && list.id.startsWith('playlist-custom-') &&
    typeof list.title === 'string' && Array.isArray(list.trackIds)
  ).map(list => ({ ...list, title: list.title.replace(/[<>"&']/g, ''), owner: SPOTIFY_DATA.currentUser.name,
    cover: 'images (1).jpg', description: 'Lista creada por el usuario.' })));
}

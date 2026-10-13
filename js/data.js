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
      duration: 198,
      durationFormatted: "3:18",
      cover: "assets/covers/6c391e8f2783e1f8.jpg",
      audioUrl: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg", // High quality fallback audio streams
      isLiked: true,
      genre: "Pop",
      plays: "148,291,040",
      lyrics: [
        "Baby, won't you kiss me through the wire",
        "Looking in your eyes, setting hearts on fire",
        "Every single moment that we spend alone",
        "Makes me feel like heaven when you're coming home",
        "Kiss me like you did before",
        "Leave your jacket by the door",
        "We don't need no words to say",
        "Just kiss me till the break of day"
      ]
    },
    {
      id: "song-2",
      title: "MATADORA",
      artist: "KAROL G",
      artistId: "artist-karol-g",
      album: "MAÑANA SERÁ BONITO",
      albumId: "album-msb",
      duration: 184,
      durationFormatted: "3:04",
      cover: "assets/covers/6037ee3917d9576d.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      isLiked: true,
      genre: "Urbano Latino",
      plays: "329,812,410",
      lyrics: [
        "Ella no quiere amores, quiere vacilar",
        "Sale con las amigas listas pa' perrear",
        "Matadora en la pista, nadie le compite",
        "Pide reggaeton del viejo que se repite",
        "Bichota en la disco, flow internacional",
        "To' el mundo mirándola por su porte natural",
        "Mañana será bonito, hoy se vive el momento",
        "Bailando hasta que el sol apague este sentimiento"
      ]
    },
    {
      id: "song-3",
      title: "BUENAS",
      artist: "Clarent",
      artistId: "artist-clarent",
      album: "BUENAS - Single",
      albumId: "album-buenas",
      duration: 165,
      durationFormatted: "2:45",
      cover: "assets/covers/5e832f5f6f37a034.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      isLiked: false,
      genre: "Urbano",
      plays: "45,120,900",
      lyrics: [
        "Buenas noches, ¿cómo estás?",
        "Dime si esta noche tú conmigo te vas",
        "Una miradita y me puse a pensar",
        "En todas las cosas que te quiero dar",
        "Sube el volumen, deja la timidez",
        "Que esta noche se repite otra vez"
      ]
    },
    {
      id: "song-4",
      title: "Animal",
      artist: "KATSEYE",
      artistId: "artist-katseye",
      album: "SIS (Soft Is Strong)",
      albumId: "album-sis",
      duration: 172,
      durationFormatted: "2:52",
      cover: "assets/covers/0307c583a88e4673.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      isLiked: false,
      genre: "Pop Global",
      plays: "89,450,110",
      lyrics: [
        "Unleash the animal inside of you",
        "There is nothing left that we can't do",
        "Rhythm in our bones, energy alive",
        "When the spotlight hits, we survive",
        "Soft is strong, unstoppable power",
        "Reigning over every midnight hour"
      ]
    },
    {
      id: "song-5",
      title: "ARNOUREUX",
      artist: "Alleh",
      artistId: "artist-alleh",
      album: "LA CIUDAD",
      albumId: "album-laciudad",
      duration: 195,
      durationFormatted: "3:15",
      cover: "assets/covers/29d7462576265095.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      isLiked: true,
      genre: "R&B Latino",
      plays: "38,720,540",
      lyrics: [
        "Entre las luces de la capital",
        "Tu silueta me parece tan irreal",
        "Un amor que nació en la velocidad",
        "De una noche que no tiene piedad",
        "Allez amour, ven y bésame otra vez",
        "Que el mundo entero gira al revés"
      ]
    },
    {
      id: "song-6",
      title: "SUPERESTRELLA",
      artist: "Aitana",
      artistId: "artist-aitana",
      album: "alpha",
      albumId: "album-alpha",
      duration: 180,
      durationFormatted: "3:00",
      cover: "assets/covers/4140f690674bdb6f.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      isLiked: false,
      genre: "Pop / Electro",
      plays: "112,890,300",
      lyrics: [
        "Brillando en el club como una superstar",
        "No me mires así si no vas a bailar",
        "Los flashes no me ciegan, yo sé dónde voy",
        "Orgullosa y segura de lo que soy",
        "Superestrella en la pista de baile",
        "Mi energía flota por el aire"
      ]
    },
    {
      id: "song-7",
      title: "REINA CRIMINAL",
      artist: "Kapo",
      artistId: "artist-kapo",
      album: "Ohnana",
      albumId: "album-kapo",
      duration: 174,
      durationFormatted: "2:54",
      cover: "assets/covers/2512fb3da12115c8.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      isLiked: true,
      genre: "Afrobeat / Latino",
      plays: "215,640,890",
      lyrics: [
        "Ella tiene un tumbao que a cualquiera domina",
        "Camina tranquila como toda una reina",
        "Reina criminal, se robó mi corazón",
        "Me puso a cantar al compás de esta canción",
        "Ohnana, dime qué me hiciste tú",
        "Llenaste mi cielo de brillo y de luz"
      ]
    },
    {
      id: "song-8",
      title: "MI BB",
      artist: "KAROL G",
      artistId: "artist-karol-g",
      album: "MAÑANA SERÁ BONITO",
      albumId: "album-msb",
      duration: 188,
      durationFormatted: "3:08",
      cover: "assets/covers/4ae9c054db8a3274.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      isLiked: true,
      genre: "Reggaeton",
      plays: "410,230,000",
      lyrics: [
        "Hola mi bb, te llamo pa' saber",
        "Si esta noche nos volvemos a ver",
        "Extraño tu risa, tu calor en mi piel",
        "Tú sabes que como tú no hay nadie tan fiel",
        "Vente pa' Medellín, te tengo una sorpresa",
        "De mi cabeza nunca te me sales, princesa"
      ]
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
      cover: "assets/covers/c4da12bac925d710.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      isLiked: false,
      genre: "K-Pop / R&B",
      plays: "389,012,300",
      lyrics: [
        "We never met, but can we be together?",
        "Searching for someone to love me forever",
        "Who is my heart waiting for?",
        "Standing lonely by an open door",
        "Tell me who, who are you?",
        "Come into my life out of the blue"
      ]
    },
    {
      id: "song-10",
      title: "Efectos Secundarios",
      artist: "Silvestre Dangond",
      artistId: "artist-silvestre",
      album: "Ta Malo",
      albumId: "album-tamalo",
      duration: 215,
      durationFormatted: "3:35",
      cover: "assets/covers/c4e5ed88462c4d91.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      isLiked: true,
      genre: "Vallenato",
      plays: "95,340,120",
      lyrics: [
        "Los efectos secundarios de tu despedida",
        "Dejaron una huella profunda en mi vida",
        "El acordeón llora con este sentimiento",
        "Y en cada nota se escucha mi lamento",
        "Silvestre canta con el corazón herido",
        "Buscando los besos que se me han perdido"
      ]
    },
    {
      id: "song-11",
      title: "Shakira: Bzrp Music Sessions, Vol. 53",
      artist: "Bizarrap, Shakira",
      artistId: "artist-bizarrap",
      album: "Bzrp Music Sessions",
      albumId: "album-bzrp53",
      duration: 213,
      durationFormatted: "3:33",
      cover: "images (2).jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      isLiked: true,
      genre: "Electro Pop / Dance",
      plays: "945,780,210",
      lyrics: [
        "Perdón, ya cogí otro avión",
        "Aquí no vuelvo, no quiero otra decepción",
        "Tanto que te las das de campeón",
        "Y cuando te necesitaba diste tu peor versión",
        "Una loba como yo no está pa' tipos como tú",
        "A ti te quedé grande y por eso estás con una igualita que tú",
        "Las mujeres ya no lloran, las mujeres facturan"
      ]
    },
    {
      id: "song-12",
      title: "DeBÍ TiR FOToS",
      artist: "Bad Bunny",
      artistId: "artist-bad-bunny",
      album: "nadie sabe lo que va a pasar mañana",
      albumId: "album-nslqvapm",
      duration: 182,
      durationFormatted: "3:02",
      cover: "assets/covers/64bc343e70c8edc7.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      isLiked: true,
      genre: "Trap Latino",
      plays: "278,920,400",
      lyrics: [
        "Debí tirar más fotos cuando estuvimos juntos",
        "Para acordarme de cada segundo y punto",
        "Ahora solo me queda el recuerdo en la mente",
        "De cómo me mirabas tan diferente",
        "Bad Bunny en la isla pensando en ti",
        "Dime si tú también te acuerdas de mí"
      ]
    },
    {
      id: "song-13",
      title: "BORONDO",
      artist: "Beele",
      artistId: "artist-beele",
      album: "BORONDO - Single",
      albumId: "album-borondo",
      duration: 178,
      durationFormatted: "2:58",
      cover: "assets/covers/9c838c96a460bad5.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      isLiked: false,
      genre: "Afrobeat / Caribe",
      plays: "167,430,900",
      lyrics: [
        "Vámonos a dar un borondo por la playa",
        "Donde la brisa del mar nunca se calla",
        "Con tu sonrisa que todo lo ilumina",
        "Bailando pegaito con agua marina"
      ]
    },
    {
      id: "song-14",
      title: "LO MISMO",
      artist: "Mora",
      artistId: "artist-mora",
      album: "ESTRELLA",
      albumId: "album-estrella",
      duration: 191,
      durationFormatted: "3:11",
      cover: "assets/covers/2d305d67d0761329.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      isLiked: true,
      genre: "Reggaeton Melódico",
      plays: "312,890,200",
      lyrics: [
        "Siempre terminamos haciendo lo mismo",
        "Cayendo otra vez en el mismo abismo",
        "Dices que te vas pero te quedas conmigo",
        "Más que amantes, más que amigos"
      ]
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
      cover: "assets/covers/e3a9b0ac4c53bbfb.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      isLiked: true,
      genre: "Reggaeton",
      plays: "1,892,450,120",
      lyrics: [
        "Tú no ere' bebecita, tú ere' una morra",
        "Si te portas bonito te doy lo que pidas",
        "En la disco bailando con las luces encendidas",
        "Chencho y el Conejo Malo marcando la vida"
      ]
    },
    {
      id: "song-16",
      title: "Cosa Nuestra",
      artist: "Rauw Alejandro",
      artistId: "artist-rauw",
      album: "Cosa Nuestra",
      albumId: "album-cosanuestra",
      duration: 204,
      durationFormatted: "3:24",
      cover: "img10.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      isLiked: true,
      genre: "Urbano / Bolero",
      plays: "219,840,000",
      lyrics: [
        "Lo de nosotros es cosa nuestra, nadie lo entiende",
        "Es un fuego sagrado que siempre nos enciende",
        "Desde San Juan de noche hasta la madrugada",
        "Contigo mi vida está complementada"
      ]
    },
    {
      id: "song-17",
      title: "Private Suite (Vol.2)",
      artist: "ROA",
      artistId: "artist-roa",
      album: "Private Suite",
      albumId: "album-privatesuite",
      duration: 168,
      durationFormatted: "2:48",
      cover: "img9.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      isLiked: false,
      genre: "Trap Melódico",
      plays: "64,210,000",
      lyrics: [
        "En la suite privada con vista al océano",
        "Todo lo que soñamos lo tenemos en la mano",
        "Luces bajas y una melodía suave",
        "De este sentimiento nadie tiene la llave"
      ]
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

/**
 * Spotify Clone - Audio Player Engine
 * Manages audio playback, queue, procedural audio fallback, and player controls
 */

class SpotifyPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";
    
    // Player state
    this.currentTrack = null;
    this.queue = [...SPOTIFY_DATA.songs];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = 'all'; // 'off' | 'all' | 'one'
    this.volume = this.loadSavedVolume();
    this.isMuted = false;
    this.previousVolume = this.volume;

    // Web Audio Synthesizer fallback for offline/preview guarantee
    this.audioCtx = null;
    this.isUsingSynthFallback = false;
    this.synthInterval = null;

    // Event callbacks
    this.callbacks = {
      onTrackChange: [],
      onPlayStateChange: [],
      onTimeUpdate: [],
      onVolumeChange: [],
      onQueueChange: [],
      onModeChange: []
    };

    this.initAudioListeners();
    this.initKeyboardShortcuts();
    this.setVolume(this.volume);

    // Initial default track (first trending song)
    if (SPOTIFY_DATA.songs.length > 0) {
      this.currentTrack = SPOTIFY_DATA.songs[0];
    }
  }

  loadSavedVolume() {
    try {
      const stored = localStorage.getItem('spotify_volume');
      if (stored === null) return 0.75;
      const value = Number(stored);
      return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.75;
    } catch {
      return 0.75;
    }
  }

  // Subscribe to player events
  on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    }
  }

  emit(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(cb => cb(data));
    }
  }

  initAudioListeners() {
    this.audio.addEventListener('timeupdate', () => {
      if (!this.isUsingSynthFallback && this.currentTrack) {
        this.emit('onTimeUpdate', {
          currentTime: this.audio.currentTime,
          duration: this.audio.duration || this.currentTrack.duration,
          progress: (this.audio.currentTime / (this.audio.duration || this.currentTrack.duration)) * 100
        });
      }
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.emit('onPlayStateChange', { isPlaying: true });
    });

    this.audio.addEventListener('pause', () => {
      if (!this.isUsingSynthFallback) {
        this.isPlaying = false;
        this.emit('onPlayStateChange', { isPlaying: false });
      }
    });

    this.audio.addEventListener('ended', () => {
      this.handleTrackEnded();
    });

    this.audio.addEventListener('error', (err) => {
      console.warn("Audio source issue, switching to procedural audio engine...", err);
      this.startSynthFallback();
    });
  }

  initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't capture when typing in text inputs or textareas
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === 'ArrowRight' && !e.ctrlKey) {
        e.preventDefault();
        this.seekRelative(5);
      } else if (e.code === 'ArrowLeft' && !e.ctrlKey) {
        e.preventDefault();
        this.seekRelative(-5);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        this.setVolume(Math.min(1, this.volume + 0.05));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        this.setVolume(Math.max(0, this.volume - 0.05));
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        this.toggleMute();
      }
    });
  }

  // Play a specific track (optionally setting a new queue)
  playTrack(track, queue = null) {
    if (!track) return;
    
    if (queue && queue.length > 0) {
      this.queue = [...queue];
    }

    this.currentIndex = this.queue.findIndex(t => t.id === track.id);
    if (this.currentIndex === -1) {
      this.queue.unshift(track);
      this.currentIndex = 0;
    }

    this.currentTrack = track;
    this.stopSynthFallback();

    this.audio.src = track.audioUrl;
    this.audio.currentTime = 0;
    
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.emit('onTrackChange', this.currentTrack);
        this.emit('onPlayStateChange', { isPlaying: true });
      }).catch(err => {
        console.log("Playback note (browser autoplay policy or offline URL), activating sound synthesizer...", err);
        this.startSynthFallback();
        this.isPlaying = true;
        this.emit('onTrackChange', this.currentTrack);
        this.emit('onPlayStateChange', { isPlaying: true });
      });
    }
  }

  togglePlay() {
    if (!this.currentTrack) {
      if (this.queue.length > 0) {
        this.playTrack(this.queue[0]);
      }
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (!this.currentTrack) return;
    this.isPlaying = true;

    if (this.isUsingSynthFallback) {
      this.startSynthLoop();
      this.emit('onPlayStateChange', { isPlaying: true });
      return;
    }

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise.catch(() => {
        this.startSynthFallback();
      });
    }
    this.emit('onPlayStateChange', { isPlaying: true });
  }

  pause() {
    this.isPlaying = false;
    if (this.isUsingSynthFallback) {
      this.pauseSynthLoop();
    } else {
      this.audio.pause();
    }
    this.emit('onPlayStateChange', { isPlaying: false });
  }

  next() {
    if (this.queue.length === 0) return;

    if (this.repeatMode === 'one' && this.isPlaying) {
      this.seek(0);
      this.play();
      return;
    }

    if (this.isShuffle) {
      let nextIndex = Math.floor(Math.random() * this.queue.length);
      if (this.queue.length > 1 && nextIndex === this.currentIndex) {
        nextIndex = (nextIndex + 1) % this.queue.length;
      }
      this.currentIndex = nextIndex;
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.queue.length;
    }

    this.playTrack(this.queue[this.currentIndex]);
  }

  prev() {
    if (this.queue.length === 0) return;

    // If more than 3 seconds in, restart track
    const current = this.getCurrentTime();
    if (current > 3) {
      this.seek(0);
      return;
    }

    this.currentIndex = (this.currentIndex - 1 + this.queue.length) % this.queue.length;
    this.playTrack(this.queue[this.currentIndex]);
  }

  handleTrackEnded() {
    if (this.repeatMode === 'one') {
      this.seek(0);
      this.play();
    } else if (this.repeatMode === 'all') {
      this.next();
    } else {
      // 'off'
      if (this.currentIndex < this.queue.length - 1) {
        this.next();
      } else {
        this.pause();
        this.seek(0);
      }
    }
  }

  seek(seconds) {
    if (this.isUsingSynthFallback) {
      this.synthCurrentTime = Math.max(0, Math.min(seconds, this.currentTrack.duration));
      this.emit('onTimeUpdate', {
        currentTime: this.synthCurrentTime,
        duration: this.currentTrack.duration,
        progress: (this.synthCurrentTime / this.currentTrack.duration) * 100
      });
      return;
    }

    if (this.audio.duration) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration));
    }
  }

  seekRelative(delta) {
    const cur = this.getCurrentTime();
    this.seek(cur + delta);
  }

  seekPercent(percent) {
    const dur = this.getDuration();
    if (dur > 0) {
      this.seek((percent / 100) * dur);
    }
  }

  getCurrentTime() {
    return this.isUsingSynthFallback ? (this.synthCurrentTime || 0) : (this.audio.currentTime || 0);
  }

  getDuration() {
    return this.isUsingSynthFallback 
      ? (this.currentTrack ? this.currentTrack.duration : 180) 
      : (this.audio.duration || (this.currentTrack ? this.currentTrack.duration : 180));
  }

  setVolume(fraction) {
    const numericVolume = Number(fraction);
    if (!Number.isFinite(numericVolume)) return;
    this.volume = Math.max(0, Math.min(1, numericVolume));
    this.audio.volume = this.volume;
    if (this.volume > 0) {
      this.isMuted = false;
      this.previousVolume = this.volume;
    } else {
      this.isMuted = true;
    }
    try {
      localStorage.setItem('spotify_volume', this.volume.toString());
    } catch {
      // Playback should continue even when browser storage is unavailable.
    }
    this.emit('onVolumeChange', { volume: this.volume, isMuted: this.isMuted });
  }

  toggleMute() {
    if (this.isMuted || this.volume === 0) {
      this.setVolume(this.previousVolume > 0 ? this.previousVolume : 0.5);
    } else {
      this.previousVolume = this.volume;
      this.setVolume(0);
    }
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    this.emit('onModeChange', { isShuffle: this.isShuffle, repeatMode: this.repeatMode });
  }

  toggleRepeat() {
    if (this.repeatMode === 'off') {
      this.repeatMode = 'all';
    } else if (this.repeatMode === 'all') {
      this.repeatMode = 'one';
    } else {
      this.repeatMode = 'off';
    }
    this.emit('onModeChange', { isShuffle: this.isShuffle, repeatMode: this.repeatMode });
  }

  toggleLike(songId) {
    const song = SPOTIFY_DATA.songs.find(s => s.id === songId);
    if (!song) return false;

    song.isLiked = !song.isLiked;

    // Update "Canciones que te gustan" playlist
    const likedPlaylist = SPOTIFY_DATA.playlists.find(p => p.id === 'playlist-liked');
    if (likedPlaylist) {
      if (song.isLiked && !likedPlaylist.trackIds.includes(song.id)) {
        likedPlaylist.trackIds.unshift(song.id);
      } else if (!song.isLiked) {
        likedPlaylist.trackIds = likedPlaylist.trackIds.filter(id => id !== song.id);
      }
    }

    return song.isLiked;
  }

  // ==========================================
  // Web Audio Procedural Fallback Engine
  // Ensures musical sound always plays smoothly
  // ==========================================
  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  startSynthFallback() {
    this.isUsingSynthFallback = true;
    this.synthCurrentTime = this.synthCurrentTime || 0;
    this.initAudioContext();
    this.startSynthLoop();
  }

  startSynthLoop() {
    if (this.synthInterval) clearInterval(this.synthInterval);
    
    // Musical progression notes for ambient lo-fi / latin groove
    const chords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66]  // G
    ];
    let chordIdx = 0;

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying) return;

      this.synthCurrentTime += 0.5;
      const dur = this.currentTrack ? this.currentTrack.duration : 180;
      
      if (this.synthCurrentTime >= dur) {
        this.handleTrackEnded();
        return;
      }

      this.emit('onTimeUpdate', {
        currentTime: this.synthCurrentTime,
        duration: dur,
        progress: (this.synthCurrentTime / dur) * 100
      });

      // Play soft harmonic note
      if (this.audioCtx && this.volume > 0 && Math.floor(this.synthCurrentTime * 2) % 2 === 0) {
        try {
          const chord = chords[chordIdx % chords.length];
          chordIdx++;
          chord.forEach((freq, i) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = i === 0 ? "triangle" : "sine";
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            gain.gain.setValueAtTime(0.04 * this.volume, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.8);
          });
        } catch (e) {
          // Ignore background audio interruptions
        }
      }
    }, 500);
  }

  pauseSynthLoop() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  stopSynthFallback() {
    this.isUsingSynthFallback = false;
    this.synthCurrentTime = 0;
    this.pauseSynthLoop();
  }
}

// Global player instance
window.spotifyPlayer = new SpotifyPlayer();

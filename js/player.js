/** Audio demo player. Metadata is illustrative; audio sources are demo recordings. */
class SpotifyPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.queue = [...SPOTIFY_DATA.songs];
    this.currentIndex = 0;
    this.currentTrack = this.queue[0] || null;
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = 'all';
    const savedVolume = Number(window.spotifyStorage.read('spotify_volume', 0.75));
    this.volume = Number.isFinite(savedVolume) ? Math.max(0, Math.min(1, savedVolume)) : 0.75;
    this.previousVolume = this.volume || 0.75;
    this.isMuted = this.volume === 0;
    this.callbacks = {};
    this.requestId = 0;
    this.audio.volume = this.volume;
    this.audio.addEventListener('timeupdate', () => this.emitTime());
    this.audio.addEventListener('loadedmetadata', () => this.emitTime());
    this.audio.addEventListener('play', () => this.setPlaying(true));
    this.audio.addEventListener('pause', () => this.setPlaying(false));
    this.audio.addEventListener('ended', () => this.handleTrackEnded());
    this.audio.addEventListener('error', () => {
      if (!this.audio.getAttribute('src')) return;
      this.setPlaying(false);
      this.emit('onPlaybackError', this.currentTrack);
    });
    window.addEventListener('keydown', event => {
      if (event.ctrlKey || event.altKey || event.metaKey || event.repeat ||
          event.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="dialog"]')) return;
      const actions = { Space: () => this.togglePlay(), ArrowRight: () => this.seekRelative(5),
        ArrowLeft: () => this.seekRelative(-5), ArrowUp: () => this.setVolume(this.volume + 0.05),
        ArrowDown: () => this.setVolume(this.volume - 0.05), KeyM: () => this.toggleMute() };
      if (actions[event.code]) { event.preventDefault(); actions[event.code](); }
    });
  }
  on(event, callback) { (this.callbacks[event] ||= []).push(callback); }
  emit(event, value) { this.callbacks[event]?.forEach(callback => callback(value)); }
  setPlaying(value) { this.isPlaying = value; this.emit('onPlayStateChange', { isPlaying: value }); }
  emitTime() {
    const duration = this.getDuration(), currentTime = this.getCurrentTime();
    this.emit('onTimeUpdate', { currentTime, duration, progress: duration ? Math.min(100, currentTime / duration * 100) : 0 });
  }
  playTrack(track, queue = null) {
    if (!track) return;
    this.pause();
    if (queue) this.queue = [...queue];
    this.currentIndex = this.queue.findIndex(item => item.id === track.id);
    if (this.currentIndex < 0) { this.queue.unshift(track); this.currentIndex = 0; }
    this.currentTrack = track;
    this.audio.src = track.audioUrl;
    this.emit('onTrackChange', track);
    this.emit('onQueueChange', this.queue);
    this.emitTime();
    this.play();
  }
  async play() {
    if (!this.currentTrack) return;
    if (!this.audio.getAttribute('src')) this.audio.src = this.currentTrack.audioUrl;
    const request = ++this.requestId;
    try {
      await this.audio.play();
      if (request === this.requestId) this.setPlaying(true);
    } catch (error) {
      if (request !== this.requestId || error.name === 'AbortError') return;
      this.setPlaying(false);
      // Media errors also dispatch an error event; avoid duplicate notifications.
      if (!this.audio.error) this.emit('onPlaybackError', this.currentTrack);
    }
  }
  pause() { ++this.requestId; this.audio.pause(); this.setPlaying(false); }
  togglePlay() { this.isPlaying ? this.pause() : this.play(); }
  next() {
    if (!this.queue.length) return;
    let index = (this.currentIndex + 1) % this.queue.length;
    if (this.isShuffle && this.queue.length > 1) {
      index = (this.currentIndex + 1 + Math.floor(Math.random() * (this.queue.length - 1))) % this.queue.length;
    }
    this.playTrack(this.queue[index]);
  }
  prev() {
    if (!this.queue.length) return;
    if (this.getCurrentTime() > 3) return this.seek(0);
    this.playTrack(this.queue[(this.currentIndex - 1 + this.queue.length) % this.queue.length]);
  }
  handleTrackEnded() {
    if (this.repeatMode === 'one') { this.seek(0); this.play(); }
    else if (this.repeatMode === 'all' || this.currentIndex < this.queue.length - 1) this.next();
    else { this.pause(); this.seek(0); }
  }
  seek(seconds) {
    if (Number.isFinite(this.audio.duration) && this.audio.duration > 0 && Number.isFinite(seconds)) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration));
      this.emitTime();
    }
  }
  seekRelative(delta) { this.seek(this.getCurrentTime() + delta); }
  seekPercent(percent) { this.seek(percent / 100 * this.getDuration()); }
  getCurrentTime() { return this.audio.currentTime || 0; }
  getDuration() { return Number.isFinite(this.audio.duration) && this.audio.duration > 0 ? this.audio.duration : this.currentTrack?.duration || 0; }
  setVolume(value) {
    if (!Number.isFinite(value)) return;
    this.volume = Math.max(0, Math.min(1, value));
    this.audio.volume = this.volume;
    this.isMuted = this.volume === 0;
    if (this.volume) this.previousVolume = this.volume;
    window.spotifyStorage.write('spotify_volume', this.volume);
    this.emit('onVolumeChange', { volume: this.volume, isMuted: this.isMuted });
  }
  toggleMute() { this.setVolume(this.isMuted ? this.previousVolume : 0); }
  toggleShuffle() { this.isShuffle = !this.isShuffle; this.emitMode(); }
  toggleRepeat() { this.repeatMode = { off: 'all', all: 'one', one: 'off' }[this.repeatMode]; this.emitMode(); }
  emitMode() { this.emit('onModeChange', { isShuffle: this.isShuffle, repeatMode: this.repeatMode }); }
  toggleLike(id) {
    const song = SPOTIFY_DATA.songs.find(item => item.id === id);
    if (!song) return false;
    song.isLiked = !song.isLiked;
    const liked = SPOTIFY_DATA.songs.filter(item => item.isLiked).map(item => item.id);
    const playlist = SPOTIFY_DATA.playlists.find(item => item.id === 'playlist-liked');
    if (playlist) playlist.trackIds = liked;
    window.spotifyStorage.write('spotify_likes', liked);
    return song.isLiked;
  }
}
window.spotifyPlayer = new SpotifyPlayer();

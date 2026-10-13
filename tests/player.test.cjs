const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function setup(stored = {}, blocked = false) {
  class Audio {
    constructor() { this.listeners = {}; this.currentTime = 0; this.duration = NaN; this.src = ''; }
    addEventListener(name, callback) { this.listeners[name] = callback; }
    getAttribute() { return this.src; }
    play() { return Promise.resolve(); }
    pause() {}
  }
  const window = { addEventListener() {} };
  const context = vm.createContext({ window, Audio, localStorage: {
    getItem(key) { if (blocked) throw Error('blocked'); return stored[key] ?? null; },
    setItem(key, value) { if (blocked) throw Error('blocked'); stored[key] = value; }
  } });
  vm.runInContext(fs.readFileSync('js/data.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('js/player.js', 'utf8'), context);
  return { player: window.spotifyPlayer, data: window.SPOTIFY_DATA, stored };
}
test('data is exposed and player starts with the first track, even with blocked storage', () => {
  const { player, data } = setup({}, true);
  assert.equal(player.currentTrack.id, data.songs[0].id);
  player.setVolume(0.5);
  assert.equal(player.volume, 0.5);
});
test('favorite changes persist and rebuild the liked playlist on reload', () => {
  const { player, data, stored } = setup();
  const song = data.songs[0], expected = !song.isLiked;
  assert.equal(player.toggleLike(song.id), expected);
  const restored = setup(stored).data;
  assert.equal(restored.songs[0].isLiked, expected);
  assert.equal(restored.playlists.find(list => list.id === 'playlist-liked').trackIds.includes(song.id), expected);
});
test('manual next advances while repeat one applies only at the end of audio', () => {
  const { player } = setup();
  player.repeatMode = 'one';
  player.next();
  assert.equal(player.currentIndex, 1);
  player.audio.duration = 200;
  player.audio.currentTime = 200;
  player.handleTrackEnded();
  assert.equal(player.currentIndex, 1);
  assert.equal(player.audio.currentTime, 0);
});
test('invalid volume is ignored and mute restores the previous level', () => {
  const { player } = setup({ spotify_volume: '"invalid"' });
  assert.equal(player.volume, 0.75);
  player.setVolume(NaN);
  assert.equal(player.volume, 0.75);
  player.setVolume(0.4); player.toggleMute();
  assert.equal(player.volume, 0);
  player.toggleMute(); assert.equal(player.volume, 0.4);
});
test('seeking clamps to actual media duration and waits for metadata', () => {
  const { player } = setup();
  player.seek(500); assert.equal(player.audio.currentTime, 0);
  player.audio.duration = 120;
  player.seek(500); assert.equal(player.audio.currentTime, 120);
  player.seek(-10); assert.equal(player.audio.currentTime, 0);
});
test('late play promise cannot restart a paused player', async () => {
  const { player } = setup();
  let resolve;
  player.audio.play = () => new Promise(done => { resolve = done; });
  const pending = player.play(); player.pause(); resolve(); await pending;
  assert.equal(player.isPlaying, false);
});

test('catalog audio matches official Spotify IDs and contains no demo recordings or fake lyrics', () => {
  const { data } = setup();
  assert.equal(data.songs.length, 17);
  const sources = new Set();
  for (const song of data.songs) {
    assert.match(song.spotifyId, /^[A-Za-z0-9]{22}$/);
    assert.equal(song.spotifyUrl, `https://open.spotify.com/track/${song.spotifyId}`);
    assert.match(song.audioUrl, /^https:\/\/p\.scdn\.co\/mp3-preview\/[a-f0-9]+$/);
    assert.equal(song.previewDuration, 30);
    assert.equal(song.lyrics.length, 0);
    sources.add(song.audioUrl);
  }
  assert.equal(sources.size, 17);
});
test('preview duration uses the clip before metadata and then the decoded media duration', () => {
  const { player } = setup();
  assert.equal(player.getDuration(), 30);
  player.audio.duration = 29.8;
  assert.equal(player.getDuration(), 29.8);
});
test('missing audio reports an error and never starts a different recording', async () => {
  const { player } = setup();
  let failed;
  player.currentTrack = { id: 'missing', audioUrl: '' };
  player.on('onPlaybackError', track => { failed = track.id; });
  await player.play();
  assert.equal(failed, 'missing');
  assert.equal(player.isPlaying, false);
});
test('local playback notifies the interface before starting to stop an embedded player', async () => {
  const { player } = setup();
  let notified = false;
  player.on('onBeforePlay', () => { notified = true; });
  player.audio.play = () => { assert.equal(notified, true); return Promise.resolve(); };
  await player.play();
});

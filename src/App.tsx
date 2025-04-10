import { fetchJazzTracks } from "./utils/fetchJazzTracks";

import { useEffect, useState } from "react";
import Track from "./types/track";
import WhiteNoiseController from "./components/WhiteNoiseController";
import useAudioPlayer from "./hooks/useAudioPlayer";
import { getSavedTrackIndex, saveTrackIndex } from "./utils/storage";

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    getSavedTrackIndex()
  );
  const {
    track,
    isPlaying,
    playTrack,
    playNext,
    playPrev,
    currentTime,
    displayTime,
    setCurrentTime,
    setDisplayTime,
    duration,
    audio,
    volume,
    setVolume,
  } = useAudioPlayer(tracks, currentIndex, setCurrentIndex);
  // const [reverbOn, setReverbOn] = useState(false);

  useEffect(() => {
    fetchJazzTracks().then((data) => {
      setTracks(data);
    });
  }, []);

  useEffect(() => {
    saveTrackIndex(currentIndex);
  }, [currentIndex]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div>
      <h1>🎷 SoJazzy</h1>
      {track && (
        <>
          <h2>
            {currentIndex}.{track.title}
          </h2>
          <p>{track.artist}</p>
        </>
      )}
      <div>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={displayTime}
          onChange={(e) => {
            const newTime = parseFloat(e.target.value);
            setDisplayTime(newTime); // 슬라이더 즉시 반응
            if (audio) {
              audio.currentTime = newTime;
              setCurrentTime(newTime); // 동기화
            }
          }}
          style={{ width: "30%", marginTop: "1rem" }}
        />
        <span>
          {formatTime(currentTime)} /{" "}
          {track && <>{formatTime(track.duration)}</>}
        </span>
      </div>
      <button onClick={playPrev}>⏮</button>
      <button onClick={() => playTrack(currentIndex)}>
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button onClick={playNext}>⏭</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => {
          const newVolume = parseFloat(e.target.value);
          setVolume(newVolume);
          if (audio) {
            audio.volume = newVolume;
          }
        }}
      />
      <WhiteNoiseController />
    </div>
  );
}

export default App;

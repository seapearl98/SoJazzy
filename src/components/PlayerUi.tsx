import React from "react";
import Track from "../types/track";

interface Props {
  track: Track;
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  displayTime: number;
  duration: number;
  volume: number;
  audio: HTMLAudioElement | null;
  setDisplayTime: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  playTrack: (index: number) => void;
  playNext: () => void;
  playPrev: () => void;
}

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const PlayerUi = ({
  track,
  currentIndex,
  isPlaying,
  currentTime,
  displayTime,
  duration,
  volume,
  audio,
  setDisplayTime,
  setCurrentTime,
  setVolume,
  playTrack,
  playNext,
  playPrev,
}: Props) => {
  if (!track) return null;
  return (
    <div>
      {currentIndex < 10 ? (
        <h2>
          0{currentIndex}. {track.title}
        </h2>
      ) : (
        <h2>
          {currentIndex}. {track.title}
        </h2>
      )}
      <p>{track.artist}</p>
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
    </div>
  );
};

export default PlayerUi;

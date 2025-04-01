import { fetchJazzTracks } from "./utils/fetchJazzTracks";

import { useEffect, useRef, useState } from "react";
import Track from "./types/track";

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem("currentTrackIndex");
    return saved ? Number(saved) : 0;
  });
  const currentIndexRef = useRef(currentIndex);
  const [currentTime, setCurrentTime] = useState(0); // 현재 시간 (초 단위)
  const [displayTime, setDisplayTime] = useState(0);
  const [duration, setDuration] = useState(0); // 총 길이

  // const [reverbOn, setReverbOn] = useState(false);

  useEffect(() => {
    fetchJazzTracks().then((data) => {
      setTracks(data);
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    localStorage.setItem("currentTrackIndex", String(currentIndex));
  }, [currentIndex]);

  const playTrack = (index: number) => {
    if (!tracks[index]) return;

    if (index === currentIndex && audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    audio?.pause(); // 기존 오디오 정지

    const newAudio = new Audio(tracks[index].url);
    newAudio.loop = false;
    newAudio.volume = volume;

    newAudio.addEventListener("loadedmetadata", () => {
      console.log("곡 로드됨");
      setCurrentTime(0);
      setDisplayTime(0);
      setDuration(newAudio.duration);
    });
    newAudio.addEventListener("timeupdate", () => {
      const time = newAudio.currentTime;
      setCurrentTime(time);
      setDisplayTime(time);
      // console.log(newAudio.ended);
    });

    newAudio.addEventListener("ended", playNext);
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);
    setCurrentIndex(index);
  };

  const playNext = () => {
    const nextIndex = (currentIndexRef.current + 1) % tracks.length;
    playTrack(nextIndex);
    setCurrentIndex(nextIndex);
    // console.log("실행", nextIndex, currentIndex);
  };

  const playPrev = () => {
    const prevIndex =
      (currentIndexRef.current - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
  };

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
      {tracks[currentIndex] && (
        <>
          <h2>{tracks[currentIndex].title}</h2>
          <p>{tracks[currentIndex].artist}</p>
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
            setDisplayTime(newTime); // 슬라이더는 즉시 반응
            if (audio) {
              audio.currentTime = newTime;
              setCurrentTime(newTime); // 같이 동기화
            }
          }}
          style={{ width: "30%", marginTop: "1rem" }}
        />
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
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
}

export default App;

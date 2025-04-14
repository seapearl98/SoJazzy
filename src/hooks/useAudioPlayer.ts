import { useEffect, useRef, useState } from "react";
import Track from "../types/track";

const useAudioPlayer = (
  tracks: Track[],
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [soundOff, setSoundOff] = useState(false);
  const previousVolumeRef = useRef(0.5);

  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (audio) {
      if (soundOff) {
        previousVolumeRef.current = volume;
        audio.volume = 0;
        setVolume(0);
      } else {
        audio.volume = previousVolumeRef.current;
        setVolume(previousVolumeRef.current);
      }
      console.log(soundOff, volume);
    }
  }, [soundOff, audio]);

  const setupNewAudio = (index: number) => {
    const newAudio = new Audio(tracks[index].url);
    newAudio.loop = false;
    newAudio.volume = volume;

    newAudio.addEventListener("loadedmetadata", () => {
      setCurrentTime(0);
      setDisplayTime(0);
      setDuration(newAudio.duration);
      newAudio.volume = volume;
    });

    newAudio.addEventListener("timeupdate", () => {
      const time = newAudio.currentTime;
      setCurrentTime(time);
      setDisplayTime(time);
    });

    newAudio.addEventListener("ended", playNext);

    return newAudio;
  };

  const playTrack = (index: number) => {
    if (!tracks[index] || isSwitching) return;
    setIsSwitching(true);

    if (index === currentIndex && audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        // console.log(currentTime);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      setTimeout(() => setIsSwitching(false), 300);
      return;
    }

    if (audio) {
      audio.pause();
      audio.removeEventListener("ended", playNext);
    }

    const newAudio = setupNewAudio(index);
    newAudio
      .play()
      .catch((err) => console.warn("play 실패:", err))
      .finally(() => {
        setIsSwitching(false);
      });

    setAudio(newAudio);
    setIsPlaying(true);
    setCurrentIndex(index);
  };

  const playNext = () => {
    setCurrentTime(0);
    setDisplayTime(0);
    const nextIndex = (currentIndexRef.current + 1) % tracks.length;
    playTrack(nextIndex);
    setCurrentIndex(nextIndex);
  };

  const playPrev = () => {
    setCurrentTime(0);
    setDisplayTime(0);
    const prevIndex = (currentIndexRef.current - 1) % tracks.length;
    playTrack(prevIndex);
    setCurrentIndex(prevIndex);
  };

  return {
    track: tracks[currentIndex],
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
    soundOff,
    setSoundOff,
  };
};

export default useAudioPlayer;

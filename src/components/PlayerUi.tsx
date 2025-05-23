import Track from "../types/track";
import { IoPause } from "react-icons/io5";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import {
  TbPlayerPlayFilled,
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";

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
  soundOff: boolean;
  setSoundOff: (value: boolean) => void;
  soundHandler: (value: boolean) => void;
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
  soundOff,
  setSoundOff,
  soundHandler,
}: Props) => {
  if (!track) return null;

  return (
    <div className="flex flex-col items-center justify-center pl-12 pr-12">
      <img
        src={track.image}
        alt={`${track.title} cover`}
        className="min-w-48 w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 object-cover rounded-2xl shadow-lg mb-4"
      />
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-0 sm:mb-1">
        {track.title}
      </h2>
      <p className="text-xs sm:text-s md:text-base text-zinc-600 mb-2 sm:mb-4">
        {track.artist}
      </p>
      <div className="relative w-1/2 h-2 min-w-48 bg-white/50 rounded-lg mb-5 sm:mb-10">
        <span
          className="absolute left-0 top-0 bottom-0 w-full h-full bg-gradient-to-r from-[#3d7eaa] to-[#ffe47a]  rounded-lg"
          style={{
            width: `calc(${(Math.floor(currentTime) / track.duration) * 100}%)`,
          }}
        >
          <span className="absolute -right-1 -top-1 w-4 h-4 bg-gradient-to-l from-[#ffe47a] to-[#ffe47a] rounded-full"></span>
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={displayTime}
          onChange={(e) => {
            const newTime = parseFloat(e.target.value);
            setDisplayTime(newTime);
            if (audio) {
              audio.currentTime = newTime;
              setCurrentTime(newTime);
            }
          }}
          className="absolute left-0 top-0 bottom-0 w-full accent-#3d7eaa border-none outline-none appearance-none bg-transparent opacity-0"
        />
        <span className="absolute top-4 left-0 right-0 flex justify-between items-center text-xs sm:text-s text-zinc-500">
          <span>{formatTime(currentTime)}</span>
          <span>{track && <>{formatTime(track.duration)}</>}</span>
        </span>
      </div>
      <div className=" w-full flex items-center justify-center mb-4">
        <button
          className="text-xl sm:text-2xl hover:scale-110 transition mr-4 ml-0 sm:ml-8"
          onClick={playPrev}
        >
          <TbPlayerSkipBackFilled />
        </button>
        <button
          onClick={() => playTrack(currentIndex)}
          className="text-2xl backdrop-blur-md bg-white/50 sm:text-3xl p-3 sm:p-4 rounded-full  hover:bg-black/50 hover:text-white transition"
        >
          {isPlaying ? <IoPause /> : <TbPlayerPlayFilled />}
        </button>
        <button
          className="text-xl ml-4 sm:text-2xl scale-110 transition"
          onClick={playNext}
        >
          <TbPlayerSkipForwardFilled />
        </button>
        <div className="hidden sm:flex items-center group ml-4">
          <button onClick={() => soundHandler(soundOff)} className="mr-1">
            {soundOff ? (
              <HiMiniSpeakerXMark className="text-2xl" />
            ) : (
              <HiMiniSpeakerWave className="text-2xl" />
            )}
          </button>
          <div
            className="relative h-1 bg-white/50 rounded-xl w-0 origin-left
              transition-all duration-300 ease-in-out
              group-hover:w-16"
          >
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
                if (newVolume === 0) {
                  setSoundOff(true);
                } else {
                  setSoundOff(false);
                }
              }}
              className="range_custom absolute left-0 top-0 h-full w-full opacity-0"
            />
            <span
              className="absolute left-0 top-0 bottom-0 h-full bg-slate-600 rounded-xl pointer-events-none"
              style={{
                width: `${volume * 100}%`,
              }}
            >
              <span className="absolute -right-1 -top-1 w-3 h-3 bg-slate-600 rounded-lg pointer-events-none scale-0 transition-all duration-300 ease-in-out group-hover:scale-100"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerUi;

import { fetchJazzTracks } from "./utils/fetchJazzTracks";

import { useEffect, useState } from "react";
import Track from "./types/track";
import WhiteNoiseController from "./components/WhiteNoiseController";
import useAudioPlayer from "./hooks/useAudioPlayer";
import { getSavedTrackIndex, saveTrackIndex } from "./utils/storage";
import PlayerUi from "./components/PlayerUi";

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
    soundOff,
    setSoundOff,
  } = useAudioPlayer(tracks, currentIndex, setCurrentIndex);

  const soundHandler = () => {
    if (!soundOff) {
      setSoundOff(true);
    } else {
      setSoundOff(false);
    }
  };

  // const [reverbOn, setReverbOn] = useState(false);

  useEffect(() => {
    fetchJazzTracks().then((data) => {
      setTracks(data);
    });
  }, []);

  useEffect(() => {
    saveTrackIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div
      className="relative bg-gradient-to-b from-[#3d7eaa] to-[#ffe47a] min-h-screen flex flex-col justify-center items-center p-5 md:p-0"
      style={{ minWidth: "21.5625rem" }}
    >
      <h1 className="fixed left-5 md:left-10 top-5 md:top-10 text-4xl sm:text-6xl italic font-black tracking-tight text-zinc-50 opacity-50">
        SoJazzy
      </h1>
      <div
        className="text-center backdrop-blur-md bg-white/30 rounded-2xl shadow-lg text-zinc-800 pt-20 pb-14 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
        style={{ minWidth: "19.0625rem" }}
      >
        {track && (
          <PlayerUi
            //트랙정보
            track={track}
            currentIndex={currentIndex}
            //재생상태
            isPlaying={isPlaying}
            currentTime={currentTime}
            displayTime={displayTime}
            duration={duration}
            volume={volume}
            audio={audio}
            //제어함수
            setDisplayTime={setDisplayTime}
            setCurrentTime={setCurrentTime}
            setVolume={setVolume}
            playTrack={playTrack}
            playNext={playNext}
            playPrev={playPrev}
            soundOff={soundOff}
            setSoundOff={setSoundOff}
            soundHandler={soundHandler}
          />
        )}
        <WhiteNoiseController />
      </div>
    </div>
  );
}

export default App;

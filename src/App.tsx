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

  return (
    <div>
      <h1>🎷 SoJazzy</h1>
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
        />
      )}
      <WhiteNoiseController />
    </div>
  );
}

export default App;

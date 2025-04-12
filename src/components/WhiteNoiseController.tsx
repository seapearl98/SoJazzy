import { useState, useRef, useEffect } from "react";
import { GiCampfire, GiWaterSplash } from "react-icons/gi";

const whiteNoises = [
  { id: "rain", src: "sounds/rain.mp3" },
  { id: "fire", src: "sounds/fire.mp3" },
  { id: "waves", src: "sounds/waves.mp3" },
];

const WhiteNoiseController = () => {
  const [playingNoises, setPlayingNoises] = useState<{
    [key: string]: boolean;
  }>({});
  const [volume, setVolume] = useState(0.5);
  const whiteNoiseRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const toggleWhiteNoise = (id: string, src: string) => {
    const isPlaying = playingNoises[id];

    if (isPlaying) {
      whiteNoiseRefs.current[id]?.pause();
      setPlayingNoises((prev) => ({ ...prev, [id]: false }));
    } else {
      const audio = new Audio(src);
      audio.play();
      audio.loop = true;
      audio.volume = volume;

      whiteNoiseRefs.current[id] = audio;
      setPlayingNoises((prev) => ({ ...prev, [id]: true }));
    }

    console.log(whiteNoiseRefs.current[id], id);
  };

  const labelDivider = (label: string) => {
    // console.log(label);
    switch (label) {
      case "rain":
        return <GiWaterSplash />;
      case "fire":
        return <GiCampfire />;
      case "waves":
        return "Waves";
      case "bugs":
        return "Bugs";
      default:
        return "Noise";
    }
  };

  useEffect(() => {
    // console.log(Object.values(whiteNoiseRefs.current));

    Object.values(whiteNoiseRefs.current).forEach((audio) => {
      if (audio && !audio.paused) audio.volume = volume;
    });
  }, [volume]);

  return (
    <div>
      <div style={{ display: "flex", gap: "12px" }}>
        {whiteNoises.map((noise) => (
          <button
            key={noise.id}
            onClick={() => toggleWhiteNoise(noise.id, noise.src)}
            style={{
              opacity: playingNoises[noise.id] ? 1 : 0.5,
              transition: "opacity 0.2s ease-in-out",
              borderRadius: "8px",
              background: "none",
              fontSize: "36px",
              color: "white",
            }}
            className="hover:opacity-100"
          >
            {labelDivider(noise.id)}
          </button>
        ))}
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  );
};

export default WhiteNoiseController;

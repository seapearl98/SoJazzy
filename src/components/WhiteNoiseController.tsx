import React, { useState, useRef, useEffect } from "react";

const whiteNoises = [
  { id: "rain", label: "Rain", src: "sounds/rain.mp3" },
  { id: "fire", label: "Fire", src: "sounds/fire.mp3" },
  { id: "waves", label: "Waves", src: "sounds/waves.mp3" },
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
      audio.loop = true;
      audio.volume = volume;
      audio.play();
      whiteNoiseRefs.current[id] = audio;
      setPlayingNoises((prev) => ({ ...prev, [id]: true }));
    }
  };

  useEffect(() => {
    Object.values(whiteNoiseRefs.current).forEach((audio) => {
      if (audio) audio.volume = volume;
    });
  }, [volume]);

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
        {whiteNoises.map((noise) => (
          <button
            key={noise.id}
            onClick={() => toggleWhiteNoise(noise.id, noise.src)}
            style={{
              opacity: playingNoises[noise.id] ? 1 : 0.5,
              transition: "opacity 0.2s ease-in-out",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "#f9f9f9",
            }}
          >
            {noise.label}
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

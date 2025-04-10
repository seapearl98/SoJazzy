export const getSavedTrackIndex = (): number => {
  const saved = localStorage.getItem("currentTrackIndex");
  return saved ? Number(saved) : 0;
};

export const saveTrackIndex = (index: number): void => {
  localStorage.setItem("currentTrackIndex", String(index));
};

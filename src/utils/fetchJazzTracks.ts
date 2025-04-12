import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

export const fetchJazzTracks = async () => {
  const res = await axios.get("https://api.jamendo.com/v3.0/tracks", {
    params: {
      client_id: CLIENT_ID,
      format: "json",
      limit: 200,
      tags: "jazz, smoothjazz",
      audioformat: "mp31",
      order: "popularity_total_desc",
      include: "musicinfo",
    },
  });

  const allTracks = res.data.results.map((track: any) => ({
    id: track.id,
    title: track.name,
    artist: track.artist_name,
    url: track.audio,
    genres: track.musicinfo?.tags?.genres || [],
    moods: track.musicinfo?.tags?.vartags || [],
    duration: track.duration,
    image: track.album_image,
  }));

  return allTracks;
};

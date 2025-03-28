import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

export const fetchJazzTracks = async () => {
  const res = await axios.get("https://api.jamendo.com/v3.0/tracks", {
    params: {
      client_id: CLIENT_ID,
      format: "json",
      limit: 10,
      tags: "jazz",
      audioformat: "mp31",
      order: "popularity_total_desc",
    },
  });

  return res.data.results.map((track: any) => ({
    id: track.id,
    title: track.name,
    artist: track.artist_name,
    url: track.audio,
  }));
};

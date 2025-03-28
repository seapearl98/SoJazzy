// import { useEffect, useRef, useState } from "react";
// import { fetchVideoInfo } from "../utils/fetchJazzTracks";

// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// const JazzPlayer = () => {
//   const playerInstance = useRef<any>(null);
//   const playerRef = useRef<HTMLDivElement>(null);
//   const videoId = import.meta.env.VITE_YOUTUBE_VIDEO_ID;
//   const [isReady, setIsReady] = useState(false);
//   const [playerState, setPlayerState] = useState<number | null>(null); // ← 상태 저장

//   const [info, setInfo] = useState<{
//     title: string;
//     channel: string;
//     thumbnail: string;
//   } | null>(null);

//   useEffect(() => {
//     // 1. 영상 정보 불러오기
//     fetchVideoInfo().then(setInfo);

//     // 2. YouTube API 로드 & 재생 (소리만)
//     const loadYouTubeAPI = () => {
//       if (window.YT) {
//         createPlayer();
//       } else {
//         const tag = document.createElement("script");
//         tag.src = "https://www.youtube.com/iframe_api";
//         document.body.appendChild(tag);
//         window.onYouTubeIframeAPIReady = createPlayer;
//       }
//     };

//     const createPlayer = () => {
//       if (!playerRef.current) return;

//       const newPlayer = new window.YT.Player(playerRef.current, {
//         videoId,
//         height: "0",
//         width: "0",
//         events: {
//           onReady: (event: any) => {
//             console.log("유튜브 재생 준비 완료!");
//             playerInstance.current = event.target;
//             event.target.playVideo();
//             setIsReady(true);
//           },
//           onStateChange: (event: any) => {
//             setPlayerState(event.data); // ← 상태 저장!
//             console.log("🔁 플레이어 상태:", event.data);
//           },
//         },
//       });
//     };

//     loadYouTubeAPI();
//   }, [videoId]);

//   // 🔘 버튼 클릭 시 재생/일시정지 토글
//   const togglePlay = () => {
//     const player = playerInstance.current;
//     if (!player) return;

//     if (playerState === 1) {
//       // 재생 중이면 멈추기
//       player.pauseVideo();
//     } else {
//       // 일시정지 중이면 재생
//       player.playVideo();
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <div ref={playerRef}></div>
//       {info && (
//         <>
//           <h2>🎵 {info.title}</h2>
//           <p>👤 {info.channel}</p>
//         </>
//       )}

//       {isReady ? (
//         <button onClick={togglePlay}>
//           {playerState === 1 ? "⏸ 일시정지" : "▶ 재생"}
//         </button>
//       ) : (
//         <p>🎷 재생 준비 중...</p>
//       )}
//     </div>
//   );
// };

// export default JazzPlayer;

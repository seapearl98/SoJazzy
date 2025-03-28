<h1>SoJazzy</h1>

감성적인 재즈 음악 + 백색소음 믹스 플레이어
Jamendo API를 통해 재즈 음악을 스트리밍하고,  
사용자가 직접 재생, 볼륨, 위치 등을 조절할 수 있는 감성 웹앱입니다.

프로젝트 시작일: 2025.03.28  
배포 주소: https://seapearl98.github.io/SoJazzy/

<h3>주요 기능</h3>

- 재즈 음악 스트리밍 재생

  - Jamendo API를 이용해 재즈 트랙 불러오기
  - 곡 제목 및 아티스트 정보 표시

- 재생 / 일시정지 토글

  - 버튼을 눌러 현재 곡 재생 상태를 토글 가능

- 볼륨 조절 기능

  - range 슬라이더로 음량 실시간 조절 가능

- 이전곡 / 다음곡 이동

  - 곡 리스트 순서를 기억하고, 양방향 탐색 가능

- 재생 위치 표시 및 조절 (Progress bar)

  - 현재 재생 시간 / 전체 재생 시간 시각화
  - 슬라이더로 재생 위치 직접 이동 가능

- 재생 종료 시 자동 다음 곡으로 전환

  - 현재 곡이 끝나면 자동으로 다음 곡 재생

- 현재 재생 중인 곡 기억 (localStorage)
  - 새로고침해도 마지막 곡부터 이어서 재생 가능

---

<h3>사용 기술</h3>

- Frontend: Vite + React + TypeScript
- Audio: HTMLAudioElement API
- API: [Jamendo Open API](https://developer.jamendo.com/)
- 배포: GitHub Pages + gh-pages CLI

---

<h3>설치 및 실행 방법</h3>

# 1. 레포지토리 클론

git clone https://github.com/seapearl98/SoJazzy.git
cd SoJazzy

# 2. 의존성 설치

npm install

# 3. 개발 서버 실행

npm run dev

---

추가 예정 기능

- 백색소음 믹스 기능 추가 (빗소리, 장작불 등)
- Web Audio API 기반 이퀄라이저 시각화

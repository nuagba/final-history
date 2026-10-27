
"use strict";

/* =========================================
   야르한 역사 — 문화유산 탐험 게임
   index.html / style.css / Player.png
========================================= */

const $ = id => document.getElementById(id);
const START = [35.1595, 126.8526];
const COLLECT_RADIUS = 100;
const NOTICE_RADIUS = 300;
const BASE_SPEED = 300;

/* =========================================
   문화유산 데이터
========================================= */

const PLACES = [
  {
    name: "증심사",
    group: "gwangju",
    city: "광주 동구",
    period: "통일신라~현재",
    lat: 35.126,
    lng: 126.953,
    rarity: "★★★★",
    desc: "무등산 자락에 자리한 증심사는 광주의 대표적인 불교 사찰이야. 통일신라 시대에 창건되었다고 전해지며 여러 차례 중창과 복원을 거쳤어. 특히 철조비로자나불좌상은 당시의 불교문화와 금속 주조 기술을 이해하는 데 중요한 자료야.",
    quiz: [
      ["증심사와 관련된 불상은?", ["철조비로자나불좌상", "석굴암 본존불", "금동미륵보살반가사유상", "마애삼존불"], 0, "증심사에는 철조비로자나불좌상이 있어."],
      ["통일신라 후기에 널리 확산된 불교 종파는?", ["천주교", "선종", "성리학", "실학"], 1, "선종은 통일신라 후기에 널리 확산되었어."]
    ]
  },
  {
    name: "충효동 왕버들군",
    group: "gwangju",
    city: "광주 북구",
    period: "오래된 마을 자연유산",
    lat: 35.184,
    lng: 127.003,
    rarity: "★★★★",
    desc: "충효동 왕버들군은 오랜 세월 마을을 지켜 온 왕버들나무들이 모여 있는 곳이야. 충효동이라는 지명은 임진왜란 의병장 김덕령 일가의 충·효·열과 관련이 있어. 자연유산과 지역의 역사적 기억을 함께 살펴볼 수 있는 장소야.",
    quiz: [
      ["충효동 지명과 관련이 깊은 의병장은?", ["이순신", "김덕령", "정몽주", "장보고"], 1, "김덕령 일가의 충·효·열과 관련된 지명이야."],
      ["오래된 나무가 역사 자료로 중요한 이유는?", ["옛 마을의 경관과 생활환경을 보여 주기 때문", "나무가 글을 쓰기 때문", "모든 나무가 같은 나이이기 때문", "왕의 명령을 기록하기 때문"], 0, "자연유산도 지역 생활사의 단서가 될 수 있어."]
    ]
  },
  {
    name: "충장사",
    group: "gwangju",
    city: "광주 북구",
    period: "임진왜란 관련",
    lat: 35.185,
    lng: 126.997,
    rarity: "★★★★",
    desc: "충장사는 임진왜란 당시 의병장으로 활동한 충장공 김덕령을 기리는 사우야. 김덕령의 삶을 통해 국가적 위기에서 지역사회가 어떤 역할을 했는지 살펴볼 수 있어.",
    quiz: [
      ["김덕령이 활약한 전쟁은?", ["병자호란", "임진왜란", "한국전쟁", "청일전쟁"], 1, "김덕령은 임진왜란 때 의병장으로 활동했어."],
      ["임진왜란 때 의병의 특징은?", ["외국에서 파견된 군대", "자발적으로 조직되어 외적에 맞섰다", "왕족만 참여했다", "고려를 건국했다"], 1, "의병은 자발적으로 조직되어 외적에 맞섰어."]
    ]
  },
  {
    name: "무양서원",
    group: "gwangju",
    city: "광주 광산구",
    period: "1927년 건립",
    lat: 35.215,
    lng: 126.845,
    rarity: "★★★★",
    desc: "무양서원은 1927년 탐진 최씨 문중이 건립한 서원이야. 최사전·최윤덕·최부·유희춘·나덕헌을 배향하고 있어. 최부의 『표해록』과 유희춘의 『미암일기』를 통해 당시 사회와 지식인의 생활을 살펴볼 수 있어.",
    quiz: [
      ["최부가 남긴 표류 기록은?", ["난중일기", "표해록", "열하일기", "삼국유사"], 1, "최부는 표류 경험을 『표해록』에 기록했어."],
      ["유희춘이 남긴 일기는?", ["미암일기", "목민심서", "동의보감", "징비록"], 0, "『미암일기』는 조선 사회를 살펴볼 수 있는 기록이야."]
    ]
  },
  {
    name: "양림역사문화마을",
    group: "gwangju",
    city: "광주 남구",
    period: "근대",
    lat: 35.141,
    lng: 126.914,
    rarity: "★★★★★",
    desc: "광주 양림동은 근대 서양식 건축물과 전통 한옥이 함께 남아 있는 지역이야. 선교사들이 학교와 의료시설을 세우며 활동했던 흔적이 남아 있어. 근대화가 교육과 의료, 주거문화에 어떤 변화를 가져왔는지 살펴볼 수 있어.",
    quiz: [
      ["양림동 근대 역사와 관련 깊은 사람들은?", ["신라 화랑", "서양 선교사", "고려 무신", "발해 사신"], 1, "양림동에는 근대 선교 관련 건축물이 남아 있어."],
      ["근대 건축물을 조사하면 알 수 있는 것은?", ["당시 생활과 문화의 변화", "미래의 정확한 인구", "모든 선사인의 이름", "고구려 왕의 전체 족보"], 0, "건축물은 생활과 문화 변화를 보여 주는 역사 자료야."]
    ]
  },
  {
    name: "경복궁",
    group: "national",
    city: "서울 종로구",
    period: "조선 · 1395년 창건",
    lat: 37.5796,
    lng: 126.977,
    rarity: "★★★★★",
    desc: "경복궁은 조선 건국 이후 1395년에 세운 법궁이야. 임진왜란 때 불탄 뒤 흥선대원군 시기에 크게 중건되었어. 궁궐의 공간을 통해 조선의 정치와 국가 의례, 파괴와 복원의 역사를 살펴볼 수 있어.",
    quiz: [
      ["경복궁이 처음 세워진 왕조는?", ["고려", "조선", "백제", "대한제국"], 1, "경복궁은 조선 건국 직후 세워졌어."],
      ["경복궁 중건과 관련된 인물은?", ["흥선대원군", "장보고", "김유신", "정약용"], 0, "흥선대원군 집권기에 경복궁 중건이 추진되었어."]
    ]
  },
  {
    name: "수원 화성",
    group: "national",
    city: "경기 수원시",
    period: "조선 · 정조",
    lat: 37.2879,
    lng: 127.0138,
    rarity: "★★★★★",
    desc: "수원 화성은 정조의 명으로 1794년부터 1796년까지 축조한 성곽이야. 정약용의 설계 구상과 당시의 과학기술이 활용되었으며, 건설 과정은 『화성성역의궤』에 자세히 기록되어 있어.",
    quiz: [
      ["수원 화성 건설을 추진한 왕은?", ["태종", "세종", "정조", "고종"], 2, "정조가 수원 화성 건설을 추진했어."],
      ["화성 축조 과정을 기록한 책은?", ["화성성역의궤", "삼국사기", "동국통감", "훈민정음"], 0, "『화성성역의궤』에 공사 과정이 기록되어 있어."]
    ]
  },
  {
    name: "불국사",
    group: "national",
    city: "경북 경주시",
    period: "통일신라",
    lat: 35.79,
    lng: 129.332,
    rarity: "★★★★★",
    desc: "불국사는 통일신라 불교문화를 대표하는 사찰이야. 다보탑과 석가탑은 서로 다른 조형미를 보여 주며, 당시의 뛰어난 석조 기술을 알려 줘. 석굴암과 함께 유네스코 세계유산에 등재되어 있어.",
    quiz: [
      ["불국사에 있는 두 탑은?", ["다보탑과 석가탑", "미륵사지 석탑과 정림사지 오층석탑", "첨성대와 석빙고", "원각사지 십층석탑과 경천사지 십층석탑"], 0, "불국사에는 다보탑과 석가탑이 있어."],
      ["불국사의 대표적 문화유산이 꽃핀 시대는?", ["고조선", "통일신라", "조선 후기", "대한제국"], 1, "불국사는 통일신라 불교예술을 대표해."]
    ]
  },
  {
    name: "해인사 장경판전",
    group: "national",
    city: "경남 합천군",
    period: "조선 건축 · 고려대장경 보관",
    lat: 35.801,
    lng: 128.098,
    rarity: "★★★★★",
    desc: "해인사 장경판전은 고려대장경 목판을 보관하는 건물이야. 통풍과 습도 조절에 유리한 구조를 갖추어 목판을 오랫동안 보존하는 데 도움을 주었어. 유네스코 세계유산이기도 해.",
    quiz: [
      ["장경판전에 보관된 대표적인 목판은?", ["고려대장경", "훈민정음 해례본", "직지 금속활자본", "조선왕조실록 원본 전체"], 0, "장경판전은 고려대장경 목판을 보관해."],
      ["장경판전에서 중요한 건축 기능은?", ["통풍과 습도 조절", "지하철 운행", "해상 항해", "천체 관측"], 0, "목판 보존에는 통풍과 습도 관리가 중요해."]
    ]
  },
  {
    name: "공산성",
    group: "national",
    city: "충남 공주시",
    period: "백제 웅진기",
    lat: 36.4626,
    lng: 127.119,
    rarity: "★★★★★",
    desc: "공산성은 백제가 수도를 웅진으로 옮긴 시기의 역사를 보여 주는 왕성이야. 금강을 내려다보는 지형을 활용했으며, 백제역사유적지구의 일부로 유네스코 세계유산에 등재되어 있어.",
    quiz: [
      ["백제가 웅진으로 천도한 뒤 중심이 된 지역은?", ["공주", "경주", "평양", "개성"], 0, "웅진은 오늘날의 공주 지역이야."],
      ["공산성이 속한 세계유산은?", ["백제역사유적지구", "조선왕릉", "한국의 서원", "산사, 한국의 산지 승원"], 0, "공산성은 백제역사유적지구에 포함돼."]
    ]
  },
  {
    name: "광주경신여자고등학교",
    group: "demo",
    city: "광주 북구",
    period: "학술제 시연 장소 · 문화유산 아님",
    lat: null,
    lng: null,
    rarity: "DEMO",
    desc: "이 장소는 문화유산이 아니라 야르한 역사 프로젝트의 학술제 시연 장소야. GIS가 위치 정보를 지도에 표현하는 방식과 실제 GPS의 오차, 위치 기반 역사학습의 원리를 체험해 보자.",
    quiz: [
      ["GIS의 뜻은?", ["지리정보시스템", "음성인식시스템", "게임결제시스템", "문자인식시스템"], 0, "GIS는 지리정보시스템을 뜻해."],
      ["야르한 역사에서 도감을 해금하는 조건은?", ["지도 확대", "100m 이내 접근 + 사진 + 퀴즈 정답", "로그아웃", "마커 클릭"], 1, "위치와 사진, 퀴즈 조건을 충족해야 해."]
    ]
  }
];

/* =========================================
   게임 상태
========================================= */

let map = null;
let playerMarker = null;
let radiusLayer = null;
let gpsCircle = null;

let playerPosition = [...START];
let currentUser = null;
let collected = [];

let gpsMode = false;
let gpsWatch = null;
let gpsReady = false;
let gpsAccuracy = null;
let gpsLastFixTime = 0;

let selectedPlace = null;
let correctAnswers = new Set();
let selectedPhoto = null;
let photoPreviewURL = null;
let detailPhotoURL = null;

let gisEnabled = false;
let currentFilter = "all";
let collecting = false;
let started = false;
let lastFrame = 0;

const markers = new Map();
const discoveryLocks = new Set();
const pressedKeys = new Set();

let joystick = { x: 0, y: 0 };

/* =========================================
   기본 도구
========================================= */

function status(message) {
  $("mapStatus").textContent = message;
}

function getPlace(name) {
  return PLACES.find(place => place.name === name);
}

function hasCoordinates(place) {
  return Boolean(
    place &&
    Number.isFinite(place.lat) &&
    Number.isFinite(place.lng)
  );
}

function getDistance(place) {
  if (!map || !hasCoordinates(place)) return Infinity;

  return map.distance(
    playerPosition,
    [place.lat, place.lng]
  );
}

function nearestPlace(includeCollected = true) {
  let nearest = null;
  let shortest = Infinity;

  for (const place of PLACES) {
    if (!includeCollected && collected.includes(place.name)) {
      continue;
    }

    const distance = getDistance(place);

    if (distance < shortest) {
      shortest = distance;
      nearest = place;
    }
  }

  return { place: nearest, distance: shortest };
}

function isModalOpen() {
  return (
    !$("discovery").hidden ||
    !$("detail").hidden ||
    !$("stampOverlay").hidden
  );
}

function refreshMap() {
  if (!map || $("gameScreen").hidden) return;

  requestAnimationFrame(() => map.invalidateSize());

  setTimeout(() => {
    if (map && !$("gameScreen").hidden) {
      map.invalidateSize();
    }
  }, 200);
}

/* =========================================
   로그인
========================================= */

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem("users") || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function signup() {
  const id = $("loginId").value.trim();
  const password = $("loginPassword").value;

  if (!id || !password) {
    $("loginMessage").textContent =
      "아이디와 비밀번호를 입력해 줘.";
    return;
  }

  const users = readUsers();

  if (users[id]) {
    $("loginMessage").textContent =
      "이미 존재하는 아이디야.";
    return;
  }

  users[id] = { password, collection: [] };
  saveUsers(users);

  $("loginMessage").textContent =
    "회원가입 완료! 이제 로그인해 줘.";
}

function login() {
  const id = $("loginId").value.trim();
  const password = $("loginPassword").value;
  const users = readUsers();

  if (!users[id] || users[id].password !== password) {
    $("loginMessage").textContent =
      "아이디 또는 비밀번호가 올바르지 않아.";
    return;
  }

  currentUser = id;
  localStorage.setItem("currentUser", id);
  enterGame();
}

function saveCollection() {
  if (!currentUser) return;

  const users = readUsers();
  if (!users[currentUser]) return;

  users[currentUser].collection = [...new Set(collected)];
  saveUsers(users);
}

function enterGame() {
  const users = readUsers();
  if (!currentUser || !users[currentUser]) return;

  collected = (users[currentUser].collection || [])
    .filter(name => Boolean(getPlace(name)));

  $("loginScreen").hidden = true;
  $("gameScreen").hidden = false;
  $("welcomeUser").textContent = currentUser + " 탐험가";

  renderPlaces();
  renderCollection();

  if (!started) {
    initializeMap();
    initializeJoystick();
    requestAnimationFrame(gameLoop);
    findSchoolLocation();
    started = true;
  }

  setVirtualMode();
  refreshMap();
}

function logout() {
  setVirtualMode();
  closeDiscovery();
  closeDetail();
  closeBook();

  $("stampOverlay").hidden = true;
  $("gameScreen").hidden = true;
  $("loginScreen").hidden = false;

  currentUser = null;
  discoveryLocks.clear();
  localStorage.removeItem("currentUser");
}

/* =========================================
   지도 초기화
========================================= */

function initializeMap() {
  if (typeof L === "undefined") {
    status("지도 라이브러리를 불러오지 못했어.");
    alert("Leaflet 로딩 실패! 인터넷 연결을 확인해 줘.");
    return;
  }

  map = L.map("map", {
    zoomControl: true,
    preferCanvas: true
  }).setView(START, 12);

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors"
    }
  ).addTo(map);

  radiusLayer = L.layerGroup().addTo(map);

  const playerIcon = L.icon({
    iconUrl: "Player.png",
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [0, -30],
    className: "custom-player-icon"
  });

  playerMarker = L.marker(playerPosition, {
    icon: playerIcon,
    zIndexOffset: 1000
  }).addTo(map);

  playerMarker.bindTooltip("땡땡이");

  for (const place of PLACES) {
    createMarker(place);
  }

  map.whenReady(refreshMap);
  status("🕹 땡땡이를 움직여 문화유산을 찾아보자!");
  updateGIS();
}

function createMarker(place) {
  if (!map || !hasCoordinates(place)) return;

  const old = markers.get(place.name);
  if (old) map.removeLayer(old);

  const icon = L.divIcon({
    className: "heritage-marker",
    html: `<div class="heritage-pin">${
      collected.includes(place.name) ? "🔵" : "📍"
    }</div>`,
    iconSize: [36, 40],
    iconAnchor: [18, 38]
  });

  const marker = L.marker(
    [place.lat, place.lng],
    { icon }
  ).addTo(map);

  marker.bindTooltip(place.name);

  marker.on("click", () => {
    const distance = getDistance(place);

    if (collected.includes(place.name)) {
      showDetail(place.name);
    } else if (distance <= COLLECT_RADIUS) {
      openPlace(place.name);
    } else {
      status(
        `🧭 ${place.name}까지 ${Math.round(distance)}m 남았어!`
      );
    }
  });

  markers.set(place.name, marker);
}

function refreshMarkers() {
  PLACES.forEach(createMarker);
}

/* =========================================
   문화유산 자동 발견
========================================= */

function checkNearbyHeritage() {
  if (!map || !currentUser) return;
  if (gpsMode && !gpsReady) return;

  // 멀어지면 다시 발견할 수 있도록 잠금 해제
  for (const name of [...discoveryLocks]) {
    const place = getPlace(name);

    if (!place || getDistance(place) > COLLECT_RADIUS + 30) {
      discoveryLocks.delete(name);
    }
  }

  if (isModalOpen() || !$("collectionBook").hidden) return;

  const nearby = PLACES
    .filter(place => !collected.includes(place.name))
    .filter(hasCoordinates)
    .map(place => ({
      place,
      distance: getDistance(place)
    }))
    .sort((a, b) => a.distance - b.distance);

  const nearest = nearby[0];
  if (!nearest) return;

  const { place, distance } = nearest;

  if (distance <= COLLECT_RADIUS) {
    if (!discoveryLocks.has(place.name)) {
      discoveryLocks.add(place.name);
      openPlace(place.name);
    }
    return;
  }

  if (distance <= NOTICE_RADIUS) {
    status(
      `🔎 근처에 문화유산이 있어! ${place.name}까지 ${Math.round(distance)}m`
    );
    return;
  }

  if (!gpsMode) {
    status(
      `🧭 ${place.name}까지 ${Math.round(distance)}m · 탐험 중`
    );
  }
}

function updatePlayer() {
  if (!map || !playerMarker) return;

  playerMarker.setLatLng(playerPosition);

  if (selectedPlace) updateCollectState();

  updateGIS();
  checkNearbyHeritage();
}

/* =========================================
   WASD 이동
========================================= */

function movementSpeed() {
  const distance = nearestPlace().distance;

  if (distance < 350) return 25;
  if (distance < 1200) return 80;

  return BASE_SPEED;
}

function gameLoop(time) {
  const dt = lastFrame
    ? Math.min((time - lastFrame) / 1000, 0.05)
    : 0;

  lastFrame = time;

  if (
    map &&
    !gpsMode &&
    !isModalOpen() &&
    $("collectionBook").hidden &&
    !$("gameScreen").hidden
  ) {
    let x = joystick.x;
    let y = joystick.y;

    if (pressedKeys.has("a") || pressedKeys.has("arrowleft")) x--;
    if (pressedKeys.has("d") || pressedKeys.has("arrowright")) x++;
    if (pressedKeys.has("w") || pressedKeys.has("arrowup")) y--;
    if (pressedKeys.has("s") || pressedKeys.has("arrowdown")) y++;

    const length = Math.hypot(x, y);

    if (length > 0.01) {
      const scale = Math.min(1, length) / length;

      x *= scale;
      y *= scale;

      const step = movementSpeed() * dt;

      playerPosition[0] -= y * step / 111320;
      playerPosition[1] +=
        x * step /
        (
          111320 *
          Math.max(
            0.2,
            Math.cos(playerPosition[0] * Math.PI / 180)
          )
        );

      updatePlayer();

      const point = map.latLngToContainerPoint(playerPosition);
      const size = map.getSize();

      if (
        point.x < 80 ||
        point.y < 80 ||
        point.x > size.x - 80 ||
        point.y > size.y - 80
      ) {
        map.panTo(playerPosition, { animate: false });
      }
    }
  }

  requestAnimationFrame(gameLoop);
}

function initializeJoystick() {
  const area = $("joystick");
  const knob = $("joystickKnob");

  let pointer = null;

  function move(event) {
    event.preventDefault();

    const rect = area.getBoundingClientRect();

    let x = event.clientX - rect.left - rect.width / 2;
    let y = event.clientY - rect.top - rect.height / 2;

    const length = Math.hypot(x, y);
    const maximum = 32;

    if (length > maximum) {
      x = x / length * maximum;
      y = y / length * maximum;
    }

    joystick.x = x / maximum;
    joystick.y = y / maximum;

    knob.style.transform =
      `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }

  function reset() {
    pointer = null;
    joystick = { x: 0, y: 0 };
    knob.style.transform = "translate(-50%, -50%)";
  }

  area.addEventListener("pointerdown", event => {
    if (gpsMode) return;

    pointer = event.pointerId;
    area.setPointerCapture(pointer);
    move(event);
  });

  area.addEventListener("pointermove", event => {
    if (pointer === event.pointerId) move(event);
  });

  ["pointerup", "pointercancel", "lostpointercapture"]
    .forEach(type => area.addEventListener(type, reset));
}

window.addEventListener("keydown", event => {
  if (
    ["INPUT", "TEXTAREA"].includes(
      document.activeElement.tagName
    )
  ) return;

  const key = event.key.toLowerCase();

  if (
    [
      "w", "a", "s", "d",
      "arrowup", "arrowdown",
      "arrowleft", "arrowright"
    ].includes(key)
  ) {
    pressedKeys.add(key);
    event.preventDefault();
  }
});

window.addEventListener("keyup", event => {
  pressedKeys.delete(event.key.toLowerCase());
});

window.addEventListener("blur", () => {
  pressedKeys.clear();
  joystick = { x: 0, y: 0 };
  $("joystickKnob").style.transform = "translate(-50%, -50%)";
});

/* =========================================
   GPS
========================================= */

function setVirtualMode() {
  gpsMode = false;
  gpsReady = false;
  gpsAccuracy = null;

  if (gpsWatch !== null) {
    navigator.geolocation?.clearWatch(gpsWatch);
    gpsWatch = null;
  }

  if (gpsCircle && map) {
    map.removeLayer(gpsCircle);
    gpsCircle = null;
  }

  $("virtualButton").classList.add("active");
  $("gpsButton").classList.remove("active");
  $("joystick").hidden = false;

  if (map) updatePlayer();
}

function startGPS() {
  if (!navigator.geolocation || !window.isSecureContext) {
    alert("실제 GPS는 HTTPS 또는 localhost에서 사용할 수 있어.");
    return;
  }

  if (!map || gpsMode) return;

  gpsMode = true;
  gpsReady = false;

  $("gpsButton").classList.add("active");
  $("virtualButton").classList.remove("active");
  $("joystick").hidden = true;

  status("📍 GPS 위치를 측정하는 중이야…");

  gpsWatch = navigator.geolocation.watchPosition(
    result => {
      if (!gpsMode) return;

      const { latitude, longitude, accuracy } = result.coords;

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        !Number.isFinite(accuracy)
      ) return;

      gpsAccuracy = accuracy;

      if (accuracy > 100) {
        gpsReady = false;
        status(
          `⚠️ GPS 추정 오차 ±${Math.round(accuracy)}m · 정확한 위치를 기다리는 중`
        );
        if (selectedPlace) updateCollectState();
        return;
      }

      gpsReady = true;
      gpsLastFixTime = Date.now();
      playerPosition = [latitude, longitude];

      playerMarker.setLatLng(playerPosition);
      map.setView(playerPosition, Math.max(16, map.getZoom()));

      if (!gpsCircle) {
        gpsCircle = L.circle(playerPosition, {
          radius: accuracy,
          color: "#477eb9",
          fillColor: "#7eaee6",
          fillOpacity: 0.15
        }).addTo(map);
      } else {
        gpsCircle.setLatLng(playerPosition);
        gpsCircle.setRadius(accuracy);
      }

      status(
        `📍 GPS 수신 · 추정 오차 ±${Math.round(accuracy)}m`
      );

      updatePlayer();
    },
    error => {
      if (!gpsMode) return;

      gpsReady = false;
      status("⚠️ GPS 오류: " + error.message);

      if (error.code === 1) {
        setVirtualMode();
      }
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000
    }
  );
}

/* =========================================
   GIS 반경
========================================= */

function updateGIS() {
  if (!map || !radiusLayer) return;

  radiusLayer.clearLayers();

  if (!gisEnabled) {
    $("gisInfo").textContent =
      "GIS 반경 버튼을 누르면 문화유산의 100m 수집 범위를 볼 수 있어.";
    return;
  }

  for (const place of PLACES) {
    if (!hasCoordinates(place)) continue;

    L.circle([place.lat, place.lng], {
      radius: COLLECT_RADIUS,
      color: "#477eb9",
      fillColor: "#c9def5",
      fillOpacity: 0.16,
      weight: 1
    }).addTo(radiusLayer);
  }

  if (selectedPlace) {
    L.polyline(
      [
        playerPosition,
        [selectedPlace.lat, selectedPlace.lng]
      ],
      {
        color: "#173b69",
        dashArray: "5,6",
        weight: 2
      }
    ).addTo(radiusLayer);

    $("gisInfo").textContent =
      `${selectedPlace.name}까지 ${Math.round(getDistance(selectedPlace))}m · 수집 반경 100m`;
  } else {
    $("gisInfo").textContent =
      "파란 원은 각 장소의 100m 수집 범위야.";
  }
}

function toggleGIS() {
  gisEnabled = !gisEnabled;
  $("gisButton").classList.toggle("active", gisEnabled);
  updateGIS();
}

/* =========================================
   학교 시연
========================================= */

async function findSchoolLocation() {
  const school = getPlace("광주경신여자고등학교");

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: "광주경신여자고등학교 광주광역시",
        format: "json",
        limit: "1",
        countrycodes: "kr"
      });

    const response = await fetch(url);
    if (!response.ok) return;

    const results = await response.json();
    if (!results.length) return;

    const lat = Number(results[0].lat);
    const lng = Number(results[0].lon);

    if (
      lat >= 35 && lat <= 35.35 &&
      lng >= 126.7 && lng <= 127.2
    ) {
      school.lat = lat;
      school.lng = lng;
      createMarker(school);
      updateGIS();
    }
  } catch (error) {
    console.warn("학교 위치 검색 실패:", error);
  }
}

function goToSchool() {
  if (!map) return;

  const school = getPlace("광주경신여자고등학교");

  if (!hasCoordinates(school)) {
    alert("학교 좌표를 아직 확인하지 못했어.");
    return;
  }

  map.setView([school.lat, school.lng], 18);

  if (!gpsMode) {
    playerPosition = [school.lat, school.lng];
    updatePlayer();
  }
}

/* =========================================
   장소 목록
========================================= */

function renderPlaces() {
  const container = $("placeList");
  container.replaceChildren();

  for (const place of PLACES) {
    if (
      currentFilter !== "all" &&
      place.group !== currentFilter
    ) continue;

    const button = document.createElement("button");
    button.className = "place-item";

    const left = document.createElement("span");
    const title = document.createElement("strong");
    const sub = document.createElement("small");
    const right = document.createElement("span");

    title.textContent = place.name;
    sub.textContent = `${place.city} · ${place.period}`;
    right.className = "done-label";

    right.textContent = collected.includes(place.name)
      ? "✓ 수집 완료"
      : "위치 보기 →";

    left.append(title, sub);
    button.append(left, right);

    button.addEventListener("click", () => {
      if (!map || !hasCoordinates(place)) {
        status("이 장소의 좌표를 확인하는 중이야.");
        return;
      }

      map.setView(
        [place.lat, place.lng],
        Math.max(15, map.getZoom())
      );

      status(
        `🧭 ${place.name}까지 ${Math.round(getDistance(place))}m`
      );
    });

    container.appendChild(button);
  }
}

/* =========================================
   발견 창
========================================= */

function openPlace(name) {
  const place = getPlace(name);
  if (!place) return;

  if (collected.includes(name)) {
    showDetail(name);
    return;
  }

  if (getDistance(place) > COLLECT_RADIUS) {
    status(`🧭 ${name}에 더 가까이 가 보자!`);
    return;
  }

  if (gpsMode && !gpsReady) return;

  selectedPlace = place;
  correctAnswers = new Set();

  clearPhoto();

  $("monumentCategory").textContent =
    place.group === "demo"
      ? "SCHOOL DEMONSTRATION"
      : "HERITAGE DISCOVERY";

  $("monumentName").textContent = place.name;
  $("monumentPeriod").textContent = place.period;
  $("monumentLocation").textContent = place.city;
  $("monumentRarity").textContent = place.rarity;
  $("monumentDescription").textContent = place.desc;

  $("monumentImage").hidden = true;
  $("discovery").hidden = false;

  renderQuiz();
  updateCollectState();
  updateGIS();
}

function closeDiscovery() {
  $("discovery").hidden = true;
  selectedPlace = null;
  correctAnswers.clear();
  clearPhoto();
  updateGIS();
}

/* =========================================
   사진 첨부
========================================= */

function clearPhoto() {
  selectedPhoto = null;
  $("photoInput").value = "";

  if (photoPreviewURL) {
    URL.revokeObjectURL(photoPreviewURL);
    photoPreviewURL = null;
  }

  $("photoPreview").hidden = true;
  $("photoPreview").removeAttribute("src");
}

function handlePhotoChange(event) {
  const file = event.target.files?.[0];

  if (photoPreviewURL) {
    URL.revokeObjectURL(photoPreviewURL);
    photoPreviewURL = null;
  }

  selectedPhoto = null;
  $("photoPreview").hidden = true;

  if (file) {
    if (
      !file.type.startsWith("image/") ||
      file.size > 12 * 1024 * 1024
    ) {
      alert("12MB 이하의 사진을 선택해 줘.");
      event.target.value = "";
    } else {
      selectedPhoto = file;
      photoPreviewURL = URL.createObjectURL(file);
      $("photoPreview").src = photoPreviewURL;
      $("photoPreview").hidden = false;
    }
  }

  updateCollectState();
}

/* =========================================
   역사 퀴즈
========================================= */

function renderQuiz() {
  if (!selectedPlace) return;

  const container = $("quizContainer");
  container.replaceChildren();

  selectedPlace.quiz.forEach((quiz, index) => {
    const [question, choices, answer, explanation] = quiz;

    const card = document.createElement("div");
    card.className = "quiz-card";

    const heading = document.createElement("h4");
    heading.textContent = `문제 ${index + 1}. ${question}`;
    card.appendChild(heading);

    const feedback = document.createElement("p");
    feedback.className = "quiz-feedback";

    choices.forEach((choice, choiceIndex) => {
      const button = document.createElement("button");
      button.className = "quiz-choice";
      button.textContent = `${choiceIndex + 1}. ${choice}`;

      if (correctAnswers.has(index)) {
        button.disabled = true;

        if (choiceIndex === answer) {
          button.classList.add("correct");
        }
      }

      button.addEventListener("click", () => {
        if (correctAnswers.has(index)) return;

        if (choiceIndex === answer) {
          correctAnswers.add(index);
          renderQuiz();
          updateCollectState();
        } else {
          feedback.textContent =
            "아쉽다! 다시 생각해 보고 도전해 봐.";
        }
      });

      card.appendChild(button);
    });

    if (correctAnswers.has(index)) {
      feedback.textContent = `✓ 정답이야! ${explanation}`;
    }

    card.appendChild(feedback);
    container.appendChild(card);
  });

  $("quizCount").textContent =
    `${correctAnswers.size}/${selectedPlace.quiz.length}`;

  $("quizProgress").style.width =
    `${correctAnswers.size / selectedPlace.quiz.length * 100}%`;
}

/* =========================================
   수집 조건
========================================= */

function collectionState() {
  if (!selectedPlace) {
    return { ok: false, message: "장소를 선택해 줘." };
  }

  if (gpsMode) {
    if (!gpsReady || Date.now() - gpsLastFixTime > 30000) {
      return {
        ok: false,
        message: "최신 GPS 위치를 확인하는 중이야."
      };
    }
  }

  const distance = getDistance(selectedPlace);

  if (distance > COLLECT_RADIUS) {
    return {
      ok: false,
      message: `문화유산까지 ${Math.round(distance)}m 남았어.`
    };
  }

  if (!selectedPhoto) {
    return {
      ok: false,
      message: "도착했어! 사진을 첨부해 줘."
    };
  }

  if (correctAnswers.size !== selectedPlace.quiz.length) {
    return {
      ok: false,
      message: "역사 퀴즈를 모두 맞혀 줘."
    };
  }

  return {
    ok: true,
    message: "🎉 모든 조건 달성! 도감을 해금할 수 있어!"
  };
}

function updateCollectState() {
  if (!selectedPlace) return;

  const distance = getDistance(selectedPlace);

  $("monumentDistance").textContent =
    `📍 현재 거리 ${Math.round(distance)}m / 수집 반경 100m` +
    (
      gpsMode && gpsAccuracy !== null
        ? ` · GPS 추정 오차 ±${Math.round(gpsAccuracy)}m`
        : ""
    );

  const state = collectionState();

  $("collectMessage").textContent = state.message;
  $("collectButton").disabled = !state.ok;

  $("collectButton").textContent = state.ok
    ? "✦ 도감 해금하기"
    : "🔒 아직 해금할 수 없어요";
}

/* =========================================
   사진 저장 — IndexedDB
========================================= */

const DB_NAME = "YarhanHistoryPhotos";
const STORE_NAME = "heritagePhotos";

function openPhotoDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB를 사용할 수 없어."));
      return;
    }

    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function savePhoto(username, placeName, file) {
  const db = await openPhotoDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite"
    );

    transaction.objectStore(STORE_NAME).put(
      file,
      `${username}::${placeName}`
    );

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function loadPhoto(username, placeName) {
  const db = await openPhotoDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readonly"
    );

    const request = transaction
      .objectStore(STORE_NAME)
      .get(`${username}::${placeName}`);

    request.onsuccess = () => {
      db.close();
      resolve(request.result || null);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}

/* =========================================
   문화유산 수집 완료
========================================= */

async function collectPlace() {
  if (collecting || !selectedPlace || !currentUser) return;

  const state = collectionState();
  if (!state.ok) {
    updateCollectState();
    return;
  }

  collecting = true;
  $("collectButton").disabled = true;
  $("collectButton").textContent = "사진 저장 중…";

  const name = selectedPlace.name;
  const username = currentUser;

  try {
    await savePhoto(username, name, selectedPhoto);

    if (currentUser !== username) return;

    if (!collected.includes(name)) {
      collected.push(name);
    }

    saveCollection();
    refreshMarkers();
    renderPlaces();
    renderCollection();

    closeDiscovery();

    $("stampName").textContent = name;
    $("stampOverlay").hidden = false;

    status(`🎉 ${name} 발견 완료! 도감에 기록했어.`);
  } catch (error) {
    console.error(error);
    $("collectMessage").textContent =
      "사진 저장에 실패했어. 저장 공간을 확인해 줘.";
    $("collectButton").disabled = false;
  } finally {
    collecting = false;
  }
}

/* =========================================
   도감
========================================= */

function renderCollection() {
  const container = $("collectionList");
  container.replaceChildren();

  let count = 0;

  for (const place of PLACES) {
    const unlocked = collected.includes(place.name);

    if (unlocked) count++;

    const card = document.createElement("button");
    card.className =
      "collection-card " + (unlocked ? "unlocked" : "locked");

    const symbol = document.createElement("div");
    symbol.className = "collection-symbol";
    symbol.textContent = unlocked ? "✦" : "?";

    const title = document.createElement("strong");
    title.textContent = unlocked
      ? place.name
      : "미발견 문화유산";

    const subtitle = document.createElement("small");
    subtitle.textContent = unlocked
      ? `${place.city} · ${place.period}`
      : "탐험을 통해 발견해 보자!";

    card.append(symbol, title, subtitle);

    card.addEventListener("click", () => {
      if (unlocked) {
        closeBook();
        showDetail(place.name);
      }
    });

    container.appendChild(card);
  }

  $("collectionCount").textContent =
    `${count} / ${PLACES.length}`;

  $("collectionMessage").textContent =
    `${PLACES.length}곳 중 ${count}곳 발견 완료`;

  $("totalProgress").style.width =
    `${count / PLACES.length * 100}%`;
}

function openBook() {
  renderCollection();
  $("collectionBook").hidden = false;
  $("collectionBook").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function closeBook() {
  $("collectionBook").hidden = true;
}

async function showDetail(name) {
  const place = getPlace(name);

  if (!place || !collected.includes(name)) return;

  $("detail").hidden = false;
  $("detailName").textContent = place.name;
  $("detailPeriod").textContent = place.period;
  $("detailLocation").textContent = place.city;
  $("detailDescription").textContent = place.desc;

  if (detailPhotoURL) {
    URL.revokeObjectURL(detailPhotoURL);
    detailPhotoURL = null;
  }

  $("detailPhoto").hidden = true;

  const username = currentUser;

  try {
    const photo = await loadPhoto(username, name);

    if (
      !photo ||
      currentUser !== username ||
      $("detail").hidden ||
      $("detailName").textContent !== name
    ) return;

    detailPhotoURL = URL.createObjectURL(photo);
    $("detailPhoto").src = detailPhotoURL;
    $("detailPhoto").hidden = false;
  } catch (error) {
    console.warn("도감 사진 불러오기 실패:", error);
  }
}

function closeDetail() {
  $("detail").hidden = true;

  if (detailPhotoURL) {
    URL.revokeObjectURL(detailPhotoURL);
    detailPhotoURL = null;
  }

  $("detailPhoto").hidden = true;
}

function resetCollection() {
  if (!currentUser) return;

  if (!confirm("도감 수집 기록을 초기화할까?")) return;

  collected = [];
  discoveryLocks.clear();

  saveCollection();
  refreshMarkers();
  renderPlaces();
  renderCollection();

  status("도감 수집 기록을 초기화했어.");
}

/* =========================================
   필터 및 지도 버튼
========================================= */

function filterPlaces(group) {
  currentFilter = group;

  document.querySelectorAll("[data-filter]")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === group
      );
    });

  renderPlaces();
}

function centerOnPlayer() {
  if (!map) return;

  map.setView(
    playerPosition,
    Math.max(16, map.getZoom())
  );
}

/* =========================================
   이벤트 연결
========================================= */

function connectEvents() {
  $("signupButton").addEventListener("click", signup);
  $("loginButton").addEventListener("click", login);
  $("logoutButton").addEventListener("click", logout);

  $("virtualButton").addEventListener("click", setVirtualMode);
  $("gpsButton").addEventListener("click", startGPS);
  $("gisButton").addEventListener("click", toggleGIS);
  $("centerButton").addEventListener("click", centerOnPlayer);
  $("schoolButton").addEventListener("click", goToSchool);

  $("closeDiscoveryButton").addEventListener(
    "click",
    closeDiscovery
  );

  $("collectButton").addEventListener("click", collectPlace);

  $("photoInput").addEventListener(
    "change",
    handlePhotoChange
  );

  $("bookButton").addEventListener("click", openBook);
  $("closeBookButton").addEventListener("click", closeBook);
  $("closeDetailButton").addEventListener("click", closeDetail);
  $("resetButton").addEventListener("click", resetCollection);

  $("stampOverlay").addEventListener("click", () => {
    $("stampOverlay").hidden = true;
  });

  document.querySelectorAll("[data-filter]")
    .forEach(button => {
      button.addEventListener("click", () => {
        filterPlaces(button.dataset.filter);
      });
    });

  ["loginId", "loginPassword"].forEach(id => {
    $(id).addEventListener("keydown", event => {
      if (event.key === "Enter") login();
    });
  });

  window.addEventListener("resize", refreshMap);
}

/* =========================================
   시작
========================================= */

function initializeGame() {
  connectEvents();

  const savedUser = localStorage.getItem("currentUser");
  const users = readUsers();

  if (savedUser && users[savedUser]) {
    currentUser = savedUser;
    enterGame();
  }

  console.log("야르한 역사 준비 완료!");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeGame
  );
} else {
  initializeGame();
}

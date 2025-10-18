const videosBySeason = {
  spring: [
    { type: "youtube", id: "flacQ-9ieuA", title: "Frühlingsfest", thumb: "./img/video-thumbnails/fruehlingsfest.png" },
  ],
  summer: [
    { type: "youtube", id: "unZFWkv_5FI", title: "Roßfeld", thumb: "./img/video-thumbnails/rossfeld.png" },
    // { type: "youtube", id: "def456", title: "Sunny Day", thumb: "./img/summer1.jpg" },
  ],
  fall: [
    { type: "vimeo", id: "1127267638", title: "Autumn", thumb: "./img/video-thumbnails/herbst.jpg" },
  ],
  winter: [
    { type: "youtube", id: "FmIY3R98fpA", title: "Winter", thumb: "./img/video-thumbnails/winter.png", start: 22 },
  ]
};

function setVideo(season, index) {
  const video = videosBySeason[season][index];
  let src = "";
  if (video.type === "youtube") {
    src = `https://www.youtube.com/embed/${video.id}?si=5cjljTz_atfyxqoO&autoplay=1&mute=1&loop=1&playlist=${video.id}&start=${video.start || 0}?vq=hd1080p`;
  } else if (video.type === "vimeo") {
    src = `https://player.vimeo.com/video/${video.id}?h=7732c0008a&autoplay=1&muted=1&background=1&loop=1&title=0&byline=0&portrait=0`;
  }
  document.getElementById("video-frame").src = src;
}

function populateVideoList(season) {
  const listContainer = document.querySelector(".video-list .list");
  listContainer.innerHTML = "";
  videosBySeason[season].forEach((video, index) => {
    const videoDiv = document.createElement("div");
    videoDiv.classList.add("video");
    videoDiv.innerHTML = `
      <img class="video-thumb" src="${video.thumb}" alt="${video.title}">
      <h3 class="video-title">${video.title}</h3>
    `;
    videoDiv.addEventListener("click", () => setVideo(season, index));
    listContainer.appendChild(videoDiv);
  });
}

const switchers = document.querySelectorAll(".season-switch");
switchers.forEach((switcher) => {
  switcher.addEventListener("click", () => {
    switchers.forEach(s => s.classList.remove("active"));
    switcher.classList.add("active");
    const season = switcher.id;
    populateVideoList(season);
    // setVideo(season, 0);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const defaultSeason = "fall";
  document.getElementById(defaultSeason).classList.add("active");
  populateVideoList(defaultSeason);
  setVideo(defaultSeason, 0);
});

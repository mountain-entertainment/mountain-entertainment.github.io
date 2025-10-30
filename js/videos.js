const videosBySeason = {
  spring: [
    { type: "local", file: "Fruehlingsfest.MP4", title: "Frühlingsfest", thumb: "./img/video-thumbnails/frühlingsfest.png" },
  ],
  summer: [
    { type: "local", file: "eagles_nest.MP4", title: "", thumb: "./media/eaglesnest-img.png" },
    { type: "local", file: "gin-tonic.mp4", title: "", thumb: "./img/video-thumbnails/gin-tonic-hintersee.jpg" },
    { type: "local", file: "koenigssee_boot.MOV", title: "", thumb: "./img/video-thumbnails/see.png" },
    { type: "local", file: "aschi.mp4", title: "", thumb: "./img/video-thumbnails/aschi.png" },
  ],
  fall: [
    { type: "local", file: "Herbst.mp4", title: "Autumn", thumb: "./img/video-thumbnails/herbst.jpg" },
  ],
  winter: [
    { type: "local", file: "winter.MOV", title: "Winter", thumb: "./img/video-thumbnails/markt_winter.jpg" },
    { type: "local", file: "hintersee_winter.MOV", title: "Wintersee", thumb: "./img/video-thumbnails/see_winter.png" },
  ]
};

function setVideo(season, index) {
  const video = videosBySeason[season][index];
  const videoContainer = document.querySelector(".video-wrapper");
  videoContainer.innerHTML = "";

  let src = "";

  if (video.type === "youtube") {
    src = `https://www.youtube.com/embed/${video.id}?si=5cjljTz_atfyxqoO&autoplay=1&mute=1&loop=1&playlist=${video.id}&start=${video.start || 0}&vq=hd1080p`;
    const iframe = document.createElement("iframe");
    iframe.id = "video-frame";
    iframe.src = src;
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    videoContainer.appendChild(iframe);

  } else if (video.type === "vimeo") {
    src = `https://player.vimeo.com/video/${video.id}?h=7732c0008a&autoplay=1&muted=1&background=1&loop=1&title=0&byline=0&portrait=0`;
    const iframe = document.createElement("iframe");
    iframe.id = "video-frame";
    iframe.src = src;
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    videoContainer.appendChild(iframe);

  } else if (video.type === "local") {
    const videoTag = document.createElement("video");
    videoTag.id = "video-frame";
    videoTag.src = `./videos-folder/${video.file}`;
    videoTag.autoplay = true;
    videoTag.muted = true;
    videoTag.loop = true;
    videoTag.playsInline = true;
    videoTag.controls = false;
    videoTag.style.position = "absolute";
    videoTag.style.top = "0";
    videoTag.style.left = "0";
    videoTag.style.width = "100%";
    videoTag.style.height = "100%";
    videoTag.style.objectFit = "cover";
    videoTag.style.borderRadius = "17px 0 0 17px";
    videoContainer.appendChild(videoTag);
  }
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
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const defaultSeason = "fall";
  document.getElementById(defaultSeason)?.classList.add("active");
  populateVideoList(defaultSeason);
  setVideo(defaultSeason, 0);
});

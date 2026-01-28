const videosBySeason = {
  spring: [
    { type: "local", file: "Fruehlingsfest.MP4", title: "Frühlingsfest", thumb: "./img/video-thumbnails/fruehlingsfest.png" },
  ],
  summer: [
    { type: "local", file: "eagles_nest.MP4", title: "", thumb: "./img/video-thumbnails/eaglesnest-img.png" },
    { type: "local", file: "gin-tonic.mp4", title: "", thumb: "./img/video-thumbnails/gin-tonic-hintersee_small.jpg" },
    { type: "local", file: "koenigssee_boot.MOV", title: "", thumb: "./img/video-thumbnails/see_small.png" },
    { type: "local", file: "aschi.mp4", title: "", thumb: "./img/video-thumbnails/aschi.png" },
  ],
  fall: [
    { type: "local", file: "Herbst.mp4", title: "Autumn", thumb: "./img/video-thumbnails/herbst_small.jpg" },
  ],
  winter: [
    { type: "local", file: "ice_stock.MOV", title: "Winter", thumb: "./img/video-thumbnails/ice_stock.png" },
    { type: "local", file: "hintersee_winter.MOV", title: "Wintersee", thumb: "./img/video-thumbnails/see_winter.png" },
  ]
};

function getVideoBasePath() {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/de/')) {
    return '../videos-folder/';
  }
  return './videos-folder/';
}

// Get correct base path for thumbnails (works for both English and German)
function getThumbnailBasePath() {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/de/')) {
    return '../';
  }
  return './';
}

const videoBasePath = getVideoBasePath();
const thumbnailBasePath = getThumbnailBasePath();

let currentlyLoadingVideo = false;
let currentSelectedVideoDiv = null;

function setVideo(season, index) {
  const video = videosBySeason[season][index];
  const videoContainer = document.querySelector(".video-wrapper");

  if (currentlyLoadingVideo) {
    return;
  }
  currentlyLoadingVideo = true;

  let src = "";

  if (video.type === "youtube") {
    src = `https://www.youtube.com/embed/${video.id}?si=5cjljTz_atfyxqoO&autoplay=1&mute=1&loop=1&playlist=${video.id}&start=${video.start || 0}&vq=hd1080p`;
    const iframe = document.createElement("iframe");
    iframe.id = "video-frame";
    iframe.src = src;
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.opacity = "0";
    iframe.style.transition = "opacity 0.5s ease-in-out";
    
    videoContainer.appendChild(iframe);
    
    setTimeout(() => {
      iframe.style.opacity = "1";
      currentlyLoadingVideo = false;
    }, 100);

  } else if (video.type === "vimeo") {
    src = `https://player.vimeo.com/video/${video.id}?h=7732c0008a&autoplay=1&muted=1&background=1&loop=1&title=0&byline=0&portrait=0`;
    const iframe = document.createElement("iframe");
    iframe.id = "video-frame";
    iframe.src = src;
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.opacity = "0";
    iframe.style.transition = "opacity 0.5s ease-in-out";
    
    videoContainer.appendChild(iframe);
    
    setTimeout(() => {
      iframe.style.opacity = "1";
      currentlyLoadingVideo = false;
    }, 100);

  } else if (video.type === "local") {
    const videoTag = document.createElement("video");
    videoTag.id = "video-frame";
    videoTag.src = `${videoBasePath}${video.file}`;
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
    videoTag.style.opacity = "0";
    videoTag.style.transition = "opacity 0.5s ease-in-out";
    
    videoContainer.appendChild(videoTag);
    
    videoTag.addEventListener("canplay", () => {
      videoTag.style.opacity = "1";
      currentlyLoadingVideo = false;
    }, { once: true });
    
    setTimeout(() => {
      if (videoTag.style.opacity === "0") {
        videoTag.style.opacity = "1";
        currentlyLoadingVideo = false;
      }
    }, 1000);
  }
}

function populateVideoList(season) {
  const listContainer = document.querySelector(".video-list .list");
  listContainer.innerHTML = "";
  videosBySeason[season].forEach((video, index) => {
    const videoDiv = document.createElement("div");
    videoDiv.classList.add("video");
    
    let thumbPath = video.thumb;
    if (thumbPath.startsWith("./")) {
      thumbPath = thumbnailBasePath + thumbPath.substring(2);
    }
    
    videoDiv.innerHTML = `
      <img class="video-thumb" src="${thumbPath}" alt="${video.title}">
      <h3 class="video-title">${video.title}</h3>
    `;
    videoDiv.style.cursor = "pointer";
    videoDiv.addEventListener("click", () => {
      document.querySelectorAll(".video-list .video").forEach(v => {
        v.style.opacity = "0.6";
      });
      videoDiv.style.opacity = "1";
      currentSelectedVideoDiv = videoDiv;
      setVideo(season, index);
    });
    listContainer.appendChild(videoDiv);
  });
  
  const firstVideo = listContainer.querySelector(".video");
  if (firstVideo) {
    firstVideo.style.opacity = "1";
    currentSelectedVideoDiv = firstVideo;
  }
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

const videos = [
  { type: "youtube", id: "VIDEO_ID_1" },
  { type: "vimeo", id: "VIDEO_ID_2" }
];

function setVideo(index) {
  const video = videos[index];
  let src = "";
  if (video.type === "youtube") {
    src = `https://www.youtube.com/embed/${video.id}`;
  } else if (video.type === "vimeo") {
    src = `https://player.vimeo.com/video/${video.id}`;
  }
  document.getElementById("video-frame").src = src;
}
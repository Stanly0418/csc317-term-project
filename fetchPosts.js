// fetch the photos once the page loads:
document.addEventListener("DOMContentLoaded", () => {
  const videoContainer = document.getElementById("video-container");

  fetch("/api/videos")  // Assumes you have an API endpoint set up at /api/videos
    .then((response) => response.json())
    .then((data) => {
      data.forEach((video) => {
        const videoItem = document.createElement("div");
        videoItem.classList.add("video-item");

        const title = document.createElement("p");
        title.textContent = video.title;

        videoItem.appendChild(title);
        videoContainer.appendChild(videoItem);

        videoItem.addEventListener("click", () => {
          window.location.href = `/viewpost.html?id=${video.id}`; // Redirects to the detailed video page on click
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching videos:", error);
    });
});

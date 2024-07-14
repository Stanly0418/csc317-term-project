// fetch the photos once the page loads:
document.addEventListener("DOMContentLoaded", () => {
  const photoContainer = document.getElementById("photo-container");
  const photoCountElement = document.getElementById("photo-count");

  fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((photo) => {
        const photoItem = document.createElement("div");
        photoItem.classList.add("photo-item");

        const img = document.createElement("img");
        img.src = photo.thumbnailUrl;
        img.alt = photo.title;

        const title = document.createElement("p");
        title.textContent = photo.title;

        photoItem.appendChild(img);
        photoItem.appendChild(title);
        photoContainer.appendChild(photoItem);

        photoItem.addEventListener("click", () => {
          fadeOut(photoItem, () => {
            photoItem.remove();
            updatePhotoCount();
          });
        });
      });

      updatePhotoCount();
    });

  // update photo count:
  function updatePhotoCount() {
    const photoCount = document.querySelectorAll(".photo-item").length;
    photoCountElement.textContent = `Total Photos: ${photoCount}`;
  }

  // add fade out effect when photo is clicked:
  function fadeOut(element, callback) {
    let opacity = 1;
    const fadeEffect = setInterval(() => {
      if (opacity <= 0) {
        clearInterval(fadeEffect);
        callback();
      } else {
        opacity -= 0.1;
        element.style.opacity = opacity;
      }
    }, 50);
  }
});

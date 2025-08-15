const fileInput = document.getElementById("file-input");
const photoGallery = document.getElementById("photo-gallery");

fileInput.addEventListener("change", function() {
  const files = fileInput.files;
  photoGallery.innerHTML = ""; // előző képek törlése

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      photoGallery.appendChild(img);
    }

    reader.readAsDataURL(file);
  }
});

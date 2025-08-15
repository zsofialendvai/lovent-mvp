const fileInput = document.getElementById("file-input");
const photoGallery = document.getElementById("photo-gallery");

// Cloudinary adatok
const cloudName = "dya8pgfp5"; // a te cloud neved
const unsignedUploadPreset = "lovent_mvp_upload"; // amit az előző lépésben létrehoztál

fileInput.addEventListener("change", function() {
  const files = fileInput.files;
  photoGallery.innerHTML = ""; // előző képek törlése

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      const img = document.createElement("img");
      img.src = data.secure_url; // a feltöltött kép URL-je
      img.style.width = "150px"; // egyszerű stílus
      img.style.margin = "5px";
      photoGallery.appendChild(img);
    })
    .catch(err => console.error(err));
  }
});

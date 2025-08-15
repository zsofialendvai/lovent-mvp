// --- 1. Admin login ---
const loginBtn = document.getElementById("login-btn");
const passwordInput = document.getElementById("admin-password");
const loginError = document.getElementById("login-error");
const photoUploadSection = document.getElementById("photo-upload");

const adminPassword = "lovent123"; // ide írd a jelszót, amit szeretnél

loginBtn.addEventListener("click", () => {
  if(passwordInput.value === adminPassword){
    loginError.textContent = "";
    photoUploadSection.style.display = "block"; // mutatjuk az upload részt
    document.getElementById("login-section").style.display = "none"; // eltüntetjük a login-t
  } else {
    loginError.textContent = "Hibás jelszó!";
  }
});

// --- 2. Cloudinary képfeltöltő ---
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

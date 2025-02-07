export const handleFileUpload = (e) => {
  e.preventDefault();
  const file = e.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", localStorage.getItem("userId"));

    const authToken = localStorage.getItem("authToken");

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fichier téléchargé avec succès", data);
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement du fichier", error);
      });
  }
};

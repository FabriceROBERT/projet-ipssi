import React from "react";
import {
  FiFile,
  FiFileText,
  FiEdit,
  FiTrash2,
  FiDownload,
} from "react-icons/fi";
import { MdPictureAsPdf } from "react-icons/md"; // Icône PDF
import { toast } from "react-hot-toast";
export default function FileCard({ file, onDelete, onEdit }) {
  const formattedDate = new Date(file.uploadedAt).toLocaleDateString();

  // Fonction pour afficher l'icône en fonction du type de fichier
  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <MdPictureAsPdf className="text-red-500 text-2xl" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FiFile className="text-blue-500 text-2xl" />;
      default:
        return <FiFileText className="text-gray-500 text-2xl" />;
    }
  };

  // Fonction pour gérer le téléchargement du fichier
  const handleDownload = () => {
    // Simule un téléchargement
    toast.success(`Téléchargement de ${file.fileName}...`);
  };

  // Fonction pour confirmer et supprimer le fichier
  const handleDelete = async () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ${file.fileName} ?`))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/${file.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Échec de la suppression : ${response.statusText}`);
      }

      toast.success(`${file.fileName} a été supprimé avec succès.`);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Impossible de supprimer le fichier.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-72">
      {/* En-tête avec l'icône du fichier et son nom */}
      <div className="flex items-center mb-4">
        <div className="mr-4">{getFileIcon(file.fileType)}</div>
        <h3 className="text-lg font-semibold truncate">{file.fileName}</h3>
      </div>

      {/* Détails du fichier */}
      <div className="text-sm text-gray-700">
        <ul>
          <li className="mb-2 flex justify-between">
            <span className="font-medium">Nom:</span>{" "}
            <span>{file.fileName}</span>
          </li>
          <li className="mb-2 flex justify-between">
            <span className="font-medium">Taille:</span>{" "}
            <span>{file.fileSize} bytes</span>
          </li>
          <li className="mb-2 flex justify-between">
            <span className="font-medium">Type:</span>{" "}
            <span>{file.fileType}</span>
          </li>
          <li className="mb-2 flex justify-between">
            <span className="font-medium">Ajouté le:</span>{" "}
            <span>{formattedDate}</span>
          </li>
        </ul>
      </div>

      {/* Boutons d'action */}
      <div className="flex w-full bg justify-center gap-6 mt-6">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-3 py-2 rounded flex items-center"
        >
          <FiDownload />
        </button>
        <button
          onClick={() => onEdit(file)}
          className="bg-yellow-500 text-white px-3 py-2 rounded flex items-center"
        >
          <FiEdit />
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-2 rounded flex items-center"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}

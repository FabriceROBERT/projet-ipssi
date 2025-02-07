import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

const generateInvoicePDF = async (invoice, user) => {
  const doc = new jsPDF();

  // Infos de la société
  const company = {
    name: "Stockéa",
    address: "123 Rue de l'Entreprise, 75000 Paris",
    siret: "123 456 789 00010",
  };

  // Ajout du titre
  doc.setFontSize(18);
  doc.text(`Facture ${invoice.id}`, 14, 20);

  // Infos de la société
  doc.setFontSize(12);
  doc.text(`Société: ${company.name}`, 14, 30);
  doc.text(`Adresse: ${company.address}`, 14, 36);
  doc.text(`SIRET: ${company.siret}`, 14, 42);

  // Infos du client
  doc.text(`Client: ${user.lastName} ${user.firstName} `, 14, 54);
  doc.text(`Société: ${user.company}`, 14, 60);
  doc.text(`Adresse: ${user.address}`, 14, 66);

  // Date de la facture
  doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 14, 72);

  // Contenu de la facture (tableau)
  doc.autoTable({
    startY: 80,
    head: [
      [
        "Désignation",
        "Quantité",
        "Prix Unité. HT",
        "Total HT",
        "TVA",
        "Total TTC",
      ],
    ],
    body: [
      [
        "Espace de stockage de 20Go",
        invoice.quantity,
        `${invoice.pricePerUnit} €`,
        `${invoice.totalHt} €`,
        `${invoice.tax} €`,
        `${invoice.totalTtc} €`,
      ],
    ],
  });

  // Ajout des totaux
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Montant TVA: ${invoice.tax} €`, 14, finalY);
  doc.text(`Total TTC: ${invoice.totalTtc} €`, 14, finalY + 6);

  // Sauvegarde du fichier
  doc.save(`facture_${invoice.id}.pdf`);

  const pdfBlob = doc.output("blob");

  const formData = new FormData();
  formData.append("invoice", pdfBlob, `facture_${invoice.id}.pdf`);
  formData.append("email", user.email);

  try {
    await fetch("http://localhost:5000/api/mail/send-invoice", {
      method: "POST",
      body: formData,
    });
    toast.success("Facture envoyée par e-mail !");
    console.log(formData);
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    toast.error("Échec de l'envoi de la facture.");
  }
};

export default generateInvoicePDF;

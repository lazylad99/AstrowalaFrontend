import { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast
import logoImage from "../../../../assets/certificate/astrowala_logo.png"; // Replace with your logo path
import signatureImage from "../../../../assets/certificate/authorized_signature.png"; // Replace with your signature path
import backgroundImage from "../../../../assets/certificate/certificate_bg.png"; // Replace with your signature path
import { certificateEndpoints } from "../../../../services/apis";
import IconBtn from "../../../common/IconBtn";

const { GENERATE_UPLOAD_CERTIFICATE } = certificateEndpoints;

const Certificate = ({ userId, courseId }) => {
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");

  const generateAndUploadCertificate = async () => {
    const toastId = toast.loading("Generating Certificate...");

    try {
      // Request template data from server
      const templateResponse = await axios.post(
        `${GENERATE_UPLOAD_CERTIFICATE}/generate`,
        { userId, courseId }
      );
      const { certificateId, userName, courseName } = templateResponse.data;

      const doc = new jsPDF("landscape");
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Helper function to calculate the center position
      const getCenteredTextPosition = (text, fontSize) => {
        doc.setFontSize(fontSize);
        const textWidth = doc.getTextWidth(text);
        return (pageWidth - textWidth) / 2;
      };

      // Add Background Image (full page)
      const backgroundImg = new Image();
      backgroundImg.src = backgroundImage;
      doc.addImage(backgroundImg, "PNG", 0, 0, pageWidth, pageHeight);

      // Add Logo
      const logoImg = new Image();
      logoImg.src = logoImage;
      const logoWidth = 75;
      const logoHeight = 75;
      const logoX = (pageWidth - logoWidth) / 2;
      doc.addImage(logoImg, "JPG", logoX, 5, logoWidth, logoHeight);

      // Set font sizes and styles
      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");

      // Title
      let text = "Certificate of Completion";
      doc.text(text, getCenteredTextPosition(text, 32), 70);

      // Texts
      doc.setFontSize(14);
      text = "This certifies that";
      doc.text(text, getCenteredTextPosition(text, 16), 85);

      // Username
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      text = userName.toUpperCase();
      doc.text(text, getCenteredTextPosition(text, 28), 100);

      // Reset font style to normal
      doc.setFont("helvetica", "normal");

      // Course Completion Text
      doc.setFontSize(14);
      text = "has completed the course";
      doc.text(text, getCenteredTextPosition(text, 16), 115);

      // Course Name
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      text = courseName.toUpperCase();
      doc.text(text, getCenteredTextPosition(text, 28), 130);

      // Reset font style to normal
      doc.setFont("helvetica", "normal");

      // Congratulations Text
      doc.setFontSize(14);
      text = "Congratulations!";
      doc.text(text, getCenteredTextPosition(text, 20), 145);

      // Add Signature
      const signatureImg = new Image();
      signatureImg.src = signatureImage;
      doc.addImage(signatureImg, "PNG", (pageWidth - 25) / 2, 150, 25, 25);

      // Save PDF to Blob
      const pdfBlob = doc.output("blob");

      // Upload PDF to Cloudinary
      const formData = new FormData();
      formData.append("certificate", pdfBlob, "certificate.pdf");
      formData.append("certificateId", certificateId);

      const uploadToastId = toast.loading("Uploading Certificate...");
      const uploadResponse = await axios.post(
        `${GENERATE_UPLOAD_CERTIFICATE}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.dismiss(uploadToastId);

      const { secure_url } = uploadResponse.data;
      setCloudinaryUrl(secure_url);

      // Update the PDF with the Cloudinary URL in the top right corner
      doc.setFontSize(10);
      doc.text(
        `URL: ${secure_url}`,
        pageWidth - doc.getTextWidth(`URL: ${secure_url}`) - 10,
        25
      );
      doc.text(
        `ID: ${certificateId}`,
        pageWidth - doc.getTextWidth(`ID: ${certificateId}`) - 20,
        30
      );

      doc.save("certificate.pdf");
      toast.success("Certificate issued and uploaded successfully");
    } catch (error) {
      toast.error("Error issuing certificate: " + error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <IconBtn>
        <div onClick={generateAndUploadCertificate}>Issue Certificate</div>
      </IconBtn>
    </div>
  );
};

export default Certificate;

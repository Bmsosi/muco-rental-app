import express from "express";
import PDFDocument from "pdfkit";
import { format } from "date-fns";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      tenantName,
      propertyAddress,
      landlordName,
      insuranceCompany,
      coverageLimit,
      startDate,
      endDate,
    } = req.body;

    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Renter_Insurance.pdf`,
      });
      res.end(pdfData);
    });

    // Header
    doc
      .fontSize(20)
      .text("Renter’s Insurance Certificate", { align: "center" });
    doc.moveDown(1);

    // Tenant Information
    doc.fontSize(12).text(`Tenant Name: ${tenantName}`);
    doc.text(`Property Address: ${propertyAddress}`);
    doc.text(`Landlord Name: ${landlordName}`);
    doc.moveDown(1);

    // Policy Details
    doc.text(`Insurance Company: ${insuranceCompany || "N/A"}`);
    doc.text(`Coverage Limit: $${coverageLimit || "N/A"}`);
    doc.text(
      `Effective Date: ${
        startDate ? format(new Date(startDate), "PPP") : "N/A"
      }`
    );
    doc.text(
      `Expiry Date: ${endDate ? format(new Date(endDate), "PPP") : "N/A"}`
    );
    doc.moveDown(2);

    // Signature
    doc.text("Authorized Signature: _________________________");
    doc.text(`Date: ${format(new Date(), "PPP")}`);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

export default router;

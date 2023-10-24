const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const app = express();
const pdf = require("pdf-parse");
const pdfService = require("./service/pdf-service");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const router = express.Router();

app.use(cors());

app.get("/generate-pdf", async (req, res, next) => {
  const filePath = path.join(
    __dirname,
    "costallocationpdfs/costallocation.pdf"
  );
  console.log("File name: " + filePath);

  fs.unlink(filePath, err => {
    if (err) {
      console.log("Error in deleting file: ", err);
    } else {
      console.log("Deleted file successfully");
    }
  });
  const doc = new PDFDocument();

  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.fontSize(20).text(`A heading`);
  doc
    .fontSize(12)
    .text(
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
    );

  doc.end();

  stream.on("close", () => {
    const file = path.join(__dirname, "costallocationpdfs/costallocation.pdf");
    res.sendFile(file);
  });
});
// app.get("/generate-pdf", (req, res, next) => {
//   const stream = res.writeHead(200, {
//     "Content-Type": "application/pdf",
//     "Content-Disposition": `attachment;filename=invoice.pdf`,
//   });
//   pdfService.buildPDF(
//     (chunk) => stream.write(chunk),
//     () => stream.end()
//   );
// });

module.exports = router;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fs = require('fs');

module.exports = (PDFDocument, blobStream) => {
  async function helloWorld() {
    const PDFDocument = require("pdfkit");
    const fs = require("fs");

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF document to a file
    const fileStream = fs.createWriteStream("output.pdf");
    doc.pipe(fileStream);

    // Add content to the PDF
    doc
      .fontSize(25)
      .text("Hello, this is a PDF created with PDFKit!", 100, 100);

    // Finalize the PDF
    doc.end();

    // When the PDF is fully written, log a message
    fileStream.on("finish", () => {
      console.log("PDF saved as output.pdf");
    });
  }

  async function helloWorldBlobStream() {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Create a blob stream to capture the output
    const stream = doc.pipe(blobStream());

    // Add some content to the PDF
    doc
      .fontSize(25)
      .text(
        "Hello, this is a PDF created with PDFKit and Blob-Stream!",
        100,
        100,
      );

    // Finalize the PDF and end the stream
    doc.end();

    // When the PDF is fully written, get the Blob
    stream.on("finish", () => {
      // Get a Blob from the stream
      //   const blob = stream.toBlob("application/pdf");

      // Optionally, you can get a URL for the Blob
      // const blobUrl = stream.toBlobURL("application/pdf");

      // Output the Blob URL (for example, to display it in a browser)
      // console.log("Blob URL:", blobUrl);

      const buffer = stream.toBuffer();

      // Save the PDF to the file system
      fs.writeFileSync("output.pdf", buffer);

      console.log("PDF saved as output.pdf");
    });
  }

  return {
    helloWorld,
  };
};

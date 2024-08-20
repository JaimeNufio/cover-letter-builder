const fs = require("fs");

module.exports = (PDFDocument, blobStream) => {
  // function centerTextWithinMargin(doc, text, yOffset) {
  //   const pageWidth = doc.page.width;
  //   const marginLeft = doc.page.margins.left;
  //   const marginRight = doc.page.margins.right;

  //   const availableWidth = pageWidth - marginLeft - marginRight;
  //   const textWidth = doc.widthOfString(text);
  //   const startX = marginLeft + (availableWidth - textWidth) / 2;
  //   doc.text(text, startX, yOffset, { align: 'justify' });
  // }

  async function exportLocal(data) {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Pipe the PDF document to a file before adding content
    const fileStream = fs.createWriteStream("output.pdf");
    doc.pipe(fileStream);

    // Add content to the PDF
    doc.fontSize(11);
    // centerTextWithinMargin(doc, data.body, 100);
    doc.text(data.body);

    // Finalize the PDF (this triggers the `finish` event)
    doc.end();

    // When the PDF is fully written, log a message
    fileStream.on("finish", () => {
      console.log("PDF saved as output.pdf");
    });
  }

  // async function helloWorldBlobStream() {
  //   // Create a new PDF document
  //   const doc = new PDFDocument();

  //   // Create a blob stream to capture the output
  //   const stream = doc.pipe(blobStream());

  //   // Add some content to the PDF
  //   doc
  //     .fontSize(14)
  //     .text(
  //       "Hello, this is a PDF created with PDFKit and Blob-Stream!",
  //       100,
  //       100,
  //     );

  //   // Finalize the PDF and end the stream
  //   doc.end();

  //   // When the PDF is fully written, get the Blob
  //   stream.on("finish", () => {
  //     // Get a Blob from the stream
  //     //   const blob = stream.toBlob("application/pdf");

  //     // Optionally, you can get a URL for the Blob
  //     // const blobUrl = stream.toBlobURL("application/pdf");

  //     // Output the Blob URL (for example, to display it in a browser)
  //     // console.log("Blob URL:", blobUrl);

  //     const buffer = stream.toBuffer();

  //     // Save the PDF to the file system
  //     fs.writeFileSync("output.pdf", buffer);

  //     console.log("PDF saved as output.pdf");
  //   });
  // }

  return {
    exportLocal,
  };
};

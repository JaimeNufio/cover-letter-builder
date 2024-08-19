const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream");
const OpenAI = require("openai");

const keys = require("../local.json");

const client = new OpenAI({
  // organization: keys.OpenAi.organization,
  // project: keys.OpenAi.project,
  apiKey: keys.OpenAi.apiKey,
});

module.exports.promptBuilderService = require("./promptBuilder")();
module.exports.openAiService = require("./openAI")(client);
module.exports.pdfExportService = require("./pdfkit")(PDFDocument, blobStream);

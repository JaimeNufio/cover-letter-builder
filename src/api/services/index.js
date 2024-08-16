const OpenAI = require('openai')
const openAiConfig = require('../local.json')
const createOpenAIService = require('./openAI')

// Initialize OpenAI with configuration
const openai = new OpenAI({
  organization: openAiConfig.organization,
  project: openAiConfig.project,
  apiKey: openAiConfig.key
});

// Export the service
module.exports.openAiService = createOpenAIService(openai);

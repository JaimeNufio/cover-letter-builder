const OpenAI = require('openai')
const keys = require('../local.json')
const createOpenAIService = require('./openAI')

// Initialize OpenAI with configuration
const openai = new OpenAI({
  organization: keys.OpenAi.organization,
  project: keys.OpenAi.project,
  apiKey: keys.OpenAi.key
});


// Export the service
module.exports.openAiService = createOpenAIService(openai);

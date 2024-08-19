module.exports = (
  openai
  // {promptBuilderService}
) => {
  async function genericPrompt(data) {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: data.role, content: data.content }],
      stream: true,
    });

    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  }

  async function promptGeneration(promptData) {
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [{ role: data.role, content: data.content }],
      max_tokens: 1000, // Adjust as needed
    });

    const chatResponse = completion.data.choices[0].message.content;

    return chatResponse;
  }

  return {
    genericPrompt,
    promptGeneration,
  };
};

module.exports = (openai) => {
  async function helloWorld() {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say this is a test" }],
      stream: true,
    });

    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  }

  async function promptGeneration(promptData) {

    const completion = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100, // Adjust as needed
    });

    const chatResponse = completion.data.choices[0].message.content;

    return chatResponse
  }

  return {
    helloWorld,
    promptGeneration,
  };
};

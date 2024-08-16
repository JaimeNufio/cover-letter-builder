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

  return {
    helloWorld,
  };
};

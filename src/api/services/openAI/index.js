module.exports = (
  openai,
  // {promptBuilderService}
) => {
  async function promptGeneration(data) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages: [{ role: data.role, content: data.content }],
        max_tokens: 1000, // Adjust as needed
        stream: true, // Enable streaming
    });

    let chatResponse = '';
    
    for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || '';
        // process.stdout.write(content); // Optional: Display in real-time
        chatResponse += content;
    }

    return chatResponse;
}

  return {
    promptGeneration,
  };
};

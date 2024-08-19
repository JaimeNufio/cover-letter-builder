module.exports = () => {
  function generateIntro(data) {
    let prompt =
      "Write a singular introduction paragraph for the cover letter, in first person.";

    prompt +=
      `State clearly in your opening sentence the purpose for your letter and a brief professional introduction. ` +
      `Specify why you are interested in that specific position and organization. ` +
      `Provide an overview of the main strengths and skills you will bring to the role.`;

    if (data.fields.jobDescription){
      prompt += `The job has the following description: ${data.fields.jobDescription}`
    }


    prompt +=
      `The cover letter is for a company named '${data.fields.companyName} ` +
      `where you are applying for the position of '${data.fields.position} ` +
      `The job has the following responsibilities: ${data.fields.responsibilities}` +
      ` emphasize some of these, taking keywords from them and obviously restating all of them.` +
      `Do not add the "Dear Person" part of the letter. Just the first paragraph.`;

    if (data.fields.keywords){
      prompt += `The following keywords are MANDATORY in the reply: ${data.fields.keywords.join(', ')}.`
    }

    prompt += `Don't assume personal experience matches perfectly to the job description, but do assume you are a good fit for the job.`

    prompt = prompt.replace(/[\n\r\t]/g, "");

    return prompt;
  }

  function generateBody() {}

  function generateClosing() {}

  function generatePrompt(data) {
    let prompt =
      "Write me a professional cover letter body text excluding the address, and signature fields.\
         Focus only on the paragraphs of the letter.\n";

    // jobDescription ////////////////////////////////////////////////////////////////////////////////////

    prompt += `The cover letter should be for a company named ${data.jobDescription.fields.companyName} \
            with the role being applied for being ${data.jobDescription.fields.companyName}. \
            The job has the following responsibilities: ${data.jobDescription.responsibilities}. \
            Highlight some of them as my strengths. \n`;

    if (data.jobDescription.industry) {
      prompt += `Be aware that the is in the ${data.jobDescription.industry} industry.\n`;
    }

    if (data.jobDescription.responsibilities) {
      prompt += `The job has the following responsibilities: ${data.jobDescription.responsibilities}. \
             Highlight some of them as my strengths.`;
    }

    if (data.jobDescription.values) {
      prompt += `Be sure to mention how I exude some of these values, but in a humble way, professional\
             way: ${data.jobDescription.industry}. `;
    }

    if (data.jobDescription.values) {
      prompt += `Be sure to include these keywords in the letter: ${data.jobDescription.industry}. `;
    }

    /// //////////////////////////////////////////////////////////////////////////////////////////////////
  }

  return {
    generatePrompt,
    generateIntro,
    generateBody,
    generateClosing,
  };
};

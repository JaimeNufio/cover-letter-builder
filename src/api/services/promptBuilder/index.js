module.exports = () => {
  function generateIntroPrompt(data) {
    let prompt =
      "Write a singular introduction paragraph for the cover letter, in first person.";

    prompt +=
      `State clearly in your opening sentence the purpose for your letter and a brief professional introduction. ` +
      `Specify why you are interested in that specific position and organization. ` +
      `Provide an overview of the main strengths and skills you will bring to the role.`;

    if (data.jobData.description) {
      prompt += `The job has the following description: ${data.jobData.listing.description}`;
    }

    prompt +=
      `The cover letter is for a company named '${data.jobData.companyInfo.companyName} ` +
      `where you are applying for the position of '${data.jobData.companyInfo.position} ` +
      `The job has the following responsibilities: ${data.jobData.listing.responsibilities}` +
      ` emphasize some of these, taking keywords from them and obviously restating all of them.` +
      `Do not add the "Dear Person" part of the letter. Just the first paragraph.`;

    if (data.jobData.keywords) {
      prompt += `The following keywords are MANDATORY in the reply: ${data.jobData.keywords.join(", ")}.`;
    }

    prompt += `Don't assume personal experience matches perfectly to the job description, but do assume you are a good fit for the job.`;

    prompt = prompt.replace(/[\n\r\t]/g, "");

    return prompt;
  }

  function generateBodyPrompt(data,intro = '') {
    let prompt =
      "Write two body paragraphs AT MOST for the BODY of the cover letter, in first person. Do not exceed this structure, do not add a conclusion.";

    prompt += `Cite a couple of examples from your experience that support your ability to be successful in the position or organization. Try not to simply repeat your resume in paragraph form, complement your resume by offering a little more detail about key experiences. Discuss what skills you have developed and connect these back to the target role.`;
    data.applicantData.experience.forEach((experience) => {
      if (field.type === "workExperience") {
        prompt += `Consider the following Work Experience at ${experience.where} as a ${experience.title} from ${experience.start} to ${experience.end}. In addition, here's the bullet points from my resume for this experience "${experience.content}", try and avoid repeating anything here, but instead reword it or use variatons of it while remaining based in what it says.`;
      }
    });

    prompt += `Be sure to only summarize the relevant information and keep it short and succient. We only need two paragraphs AT MOST for the body of the letter. Avoid writing more than two paragraphs.`;

    if (intro){
      prompt += `Also consider what was mentioned in the previous paragraph, and avoid repeating anything: ${intro}`;
    }

    prompt = prompt.replace(/[\n\r\t]/g, "");

    return prompt;
  }

  function generateClosingPrompt(data) {
    let prompt = `Consider the following Cover Letter:${data.intro + data.body}. write a simple conclusion for it. Only the conclusion, a single paragraph at most. No formatting. Only a single paragraph for the conclusion. Don't repeat back the prior parts of the cover letter.`;

    prompt = prompt.replace(/[\n\r\t]/g, "");

    return prompt;
  }

  return {
    generateIntroPrompt,
    generateBodyPrompt,
    generateClosingPrompt,
  };
};

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

  function generateBody(data) {

    let prompt = "Write two body paragraphs AT MOST for the BODY of the cover letter, in first person. Do not exceed this structure, do not add a conclusion.";

    prompt += `Cite a couple of examples from your experience that support your ability to be successful in the position or organization. Try not to simply repeat your resume in paragraph form, complement your resume by offering a little more detail about key experiences. Discuss what skills you have developed and connect these back to the target role.`,

    data.fields.forEach((field)=>{
      if (field.type == 'workExperience'){
        prompt += `Consider the following Work Experience at ${field.where} as a ${field.title} from ${field.start} to ${field.end}. In addition, here's the bullet points from my resume for this experience "${field.content}", try and avoid repeating anything here, but instead reword it or use variatons of it while remaining based in what it says.`
      }
    })
    
    prompt+= `Be sure to only summarize the relevant information and keep it short and succient. We only need two paragraphs AT MOST for the body of the letter. Avoid writing more than two paragraphs.`

    prompt+= `Also consider what was mentioned in the previous paragraph, and avoid repeating anything: ${data.intro}`

    prompt = prompt.replace(/[\n\r\t]/g, "");

    return prompt;
  }

  function generateClosing(data) {
    let prompt = `Consider the following Cover Letter:${data.intro + data.body}. write a simple conclusion for it. Only the conclusion, a single paragraph at most. No formatting. Only a single paragraph for the conclusion. Don't repeat back the prior parts of the cover letter.`

    prompt = prompt.replace(/[\n\r\t]/g, "");

    return prompt
  }


  return {
    generateIntro,
    generateBody,
    generateClosing,
  };
};

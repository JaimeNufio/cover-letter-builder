module.exports = ({ promptBuilderService, openAiService }) => {

  build = async (data) => {
    const addressSection = assembleAddressSection(data);
    const mainSection = await assembleMainTextSection(data)
    const signOffSection = assembleSignOff(data) //TODO - Make PDF section access this

    return `${addressSection}\n${mainSection}\n${signOffSection}`;
  }

  buildAsObject = async (data) =>{
    const addressSection = assembleAddressSection(data);
    const mainSection = await assembleMainTextSectionAsObject(data)
    const signOffSection = assembleSignOff(data) //TODO - Make PDF section access this

    return {addressSection,...mainSection,signOffSection}
  }

  assembleSignOff = (data) =>{
    let section = ""

    section += `\n\n${data.bookends.closing},\n\n`
    section += `${'_'.repeat(data.applicantData.personalInfo.name.length)}\n` //TODO - Make PDF section access this 
    section += `${data.applicantData.personalInfo.name}`

    return section
  }

  assembleAddressSection =  (data) => {
    let contactSection = ``;

    const applicantData = data.applicantData.personalInfo;

    contactSection += `${applicantData.addressOne}\n`;
    if (applicantData.addressTwo) {
      contactSection += `${applicantData.addressTwo}\n`;
    }
    if (applicantData.phone) {
      contactSection += `${applicantData.phone}\n`;
    }
    if (applicantData.email) {
      contactSection += `${applicantData.email}\n`;
    }
    contactSection += `\n`;

    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    contactSection += `${formattedDate}\n\n`;

    const companyData = data.jobData.companyInfo;

    if (companyData.name) {
      contactSection += `${companyData.name}\n`;
    }
    if (companyData.position) {
      contactSection += `${companyData.position}\n`;
    }
    if (companyData.companyName) {
      contactSection += `${companyData.companyName}\n`;
    }
    if (companyData.addressOne) {
      contactSection += `${companyData.addressOne}\n`;
    }
    if (companyData.addressTwo) {
      contactSection += `${companyData.addressTwo}\n`;
    }

    contactSection += `\n`;

    contactSection += `${data.bookends.greeting} ${companyData.name},\n\n`

    return contactSection;
  };

  assembleMainTextSection = async (data) =>{
    const intro = await assembleIntroSection(data)
    const body = await assembleBodySection(data,intro)
    const conclusion = await assembleConclusionSection(intro,body)


    return `${intro}\n\n${body}\n\n${conclusion}`
  }

  assembleMainTextSectionAsObject = async (data) =>{
    const intro = await assembleIntroSection(data)
    const body = await assembleBodySection(data,intro)
    const conclusion = await assembleConclusionSection(intro,body)


    return {intro,body,conclusion}
  }

  assembleIntroSection = async (data) => {
    const section = promptBuilderService.generateIntroPrompt(data)
    return openAiService.promptGeneration(section)
  };

  assembleBodySection = async (data, intro) =>{
    const section = promptBuilderService.generateBodyPrompt(data,intro)
    return openAiService.promptGeneration(section)
  }

  assembleConclusionSection = async (data) =>{
    const section = promptBuilderService.generateClosingPrompt(data)
    return openAiService.promptGeneration(section)
  }

  return {
    build,
    buildAsObject,
  };
};

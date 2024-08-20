module.exports = ({ promptBuilder, openAiService }) => {

  build = async (data) => {
    const addressSection = assembleAddressSection(data);

    return addressSection;
  }

  assembleAddressSection = async (data) => {
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

    return contactSection;
  };

  assembleMainTextSection = async (data) =>{
    const [introText,bodyText,conclusionText] = await Promise.all(
        assembleIntroSection(data),
        assembleBodySection(data),
        assembleConclusionSection(data),
    )

    return `\n${introText}\n\n${bodyText}\n\n${conclusionText}\n`
  }

  assembleIntroSection = async (data) => {
    const section = promptBuilder.generateIntroPrompt(data)
    return openAiService.promptGeneration(section)
  };

  assembleBodySection = async (data) =>{
    const section = promptBuilder.generateBodyPrompt(data)
    return openAiService.promptGeneration(section)
  }

  assembleConclusionSection = async (data) =>{
    const section = promptBuilder.generateClosingPrompt(data)
    return openAiService.promptGeneration(section)
  }

  assembleSignOffSection = async (data) => {};

  return {
    build,
    assembleMainTextSection,
  };
};

module.exports = ({ promptBuilder, openAiService }) => {
  async function build(data) {

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

  assembleBodySection = async (data) => {};

  assembleSignOffSection = async (data) => {};

  return {
    build,
    assembleAddressSection,
  };
};

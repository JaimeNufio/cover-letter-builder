(async () => {
  const { assemblerService, pdfExportService } = require("./services");

  const data = {
    applicantData: {
      personalInfo: {
        name: "Jaime Nufio",
        addressOne: "555 Somewhere",
        addressTwo: "City, State, Zip",
        phone: "732-555-5555",
        email: "email@gmail.com",
        website: "www.linkedin.com/in/jaimenufio",
      },
      experience: [
        {
          type: "workExperience",
          where: `Advisr`,
          title: "Software Engineer",
          start: "February 2022",
          end: "August 2024",
          content: `
                    • Developing a data-driven advertising campaign platform to accelerate sales and streamline campaign planning, utilizing
                    Vue.js, Express.js, PostgreSQL, and Docker.
                    • Engineering a comprehensive file management feature, leveraging AWS and Digital Ocean infrastructure to enable seamless
                    file upload, organization, and sharing between users groups.
                    • Integrated a service for commenting, notifying, and “pinging” a user through Slack and email using Mailgun.
                    • Modernizing the UI and underlying system for the flagship application feature: sales campaign generation, to enhance user
                    experience and efficiency.
                    • Designing and managing database tables with PostgreSQL and Redis, using Knex and Objection.js for efficient data
                    management.
                    • Implementing automated tests using Cypress and Jenkins for robust quality assurance processes.
                    • Conducted code reviews with fellow developers to offer constructive criticism and maintain good coding practices and
                    standards.`,
        },
        {
          type: "workExperience",
          where: `ADP`,
          title: "Software Engineer",
          start: "July 2020",
          end: "Feb 2022",
          content: `• Managed the CD/CI pipeline with automation tools including Jenkins, Docker, Kubernetes, and Kafka.
• Monitored the production environment and constructed dashboards using Splunk for effective visualization and analysis.
• Led the implementation of a long-term storage solution for daily performance logs, utilizing a Grafana/InfluxDB stack.
• Wrote and executed test scripts to conduct load testing on critical components of the product.
• Built a React-based application for internal team and resource organization purposes.`,
        },
      ],
    },
    jobData: {
      listing: {
        description:
          "We are seeking a skilled Network Engineer to join our team. The ideal candidate will be responsible for designing, implementing, and maintaining our network infrastructure. This is a remote position that requires on site work as needed.",
        position: "Software Engineer",
        responsibilities:
          "- Lead and contribute to research projects in the field of quantum engineering and artificial intelligence.- Conduct data mining and analysis to extract valuable insights from large datasets.- Design and implement databases to store and manage research data effectively.- Develop natural language processing algorithms for text analysis.- Collaborate with cross-functional teams to integrate analytics solutions into existing systems.- Execute ETL processes to transform and load data for analysis.- Utilize advanced statistical techniques for modeling and prediction.",
      },
      companyInfo: {
        name: "Some Name",
        position: "Hiring manager",
        companyName: "some company",
        addressOne: "555 Somewhere",
        addressTwo: "City, State, Zip",
        phone: "732-555-5555",
        email: "email@gmail.com",
        website: "www.linkedin.com/in/jaimenufio",
      },
      keywords: "",
    },
    bookends: {
      greeting: "Dear",
      target: "Hiring Manager",
      closing: "Best Regards",
    },
  };

  text = await assemblerService.build(data);

  console.log(text)

  await pdfExportService.exportLocal({body:text})

})();

(async () => {

    const {openAiService, pdfExportService, promptBuilderService} = require('./services');

    const responsibilities = `- Lead and contribute to research projects in the field of quantum engineering and artificial intelligence.- Conduct data mining and analysis to extract valuable insights from large datasets.- Design and implement databases to store and manage research data effectively.- Develop natural language processing algorithms for text analysis.- Collaborate with cross-functional teams to integrate analytics solutions into existing systems.- Execute ETL processes to transform and load data for analysis.- Utilize advanced statistical techniques for modeling and prediction.`


    const userAddress = promptBuilderService.generateAddressBlock(
        {
            name: 'Jaime Nufio',
            addressOne: '555 Somewhere',
            addressTwo: '555 Somewhere',
            phone: '732-555-5555',
            email: 'email@gmail.com',
            website: 'www.linkedin.com/in/jaimenufio',
        }
    )

    const companyAddress = promptBuilderService.generateAddressBlock(
        {
            name: 'Some Name',
            position: 'Hiring manager',
            companyName: 'some company',
            addressOne: '555 Somewhere',
            addressTwo: '555 Somewhere',
            phone: '732-555-5555',
            email: 'email@gmail.com',
            website: 'www.linkedin.com/in/jaimenufio',
        }
    )


    const promptGenA = promptBuilderService.generateIntroPrompt(
        {
            // jobDescription:{
                fields:{
                    companyName: 'Franklin Industrial',
                    position: 'Software Developer',
                    jobDescription: 'We are seeking a skilled Network Engineer to join our team. The ideal candidate will be responsible for designing, implementing, and maintaining our network infrastructure. This is a remote position that requires on site work as needed.',
                    responsibilities: responsibilities,
                    keywords: []
                }
            // }
        }
    )


    console.log('working intro')
    const intro = await openAiService.promptGeneration({
        content: promptGenA,
        role: 'system'
    })

    const promptGenB = promptBuilderService.generateBodyPrompt(
        {
            intro,
            // personal experience
            fields:[
                {
                    type:'workExperience',
                    where: `Advisr`,
                    title:'Software Engineer',
                    start: 'February 2022',
                    end: 'August 2024',
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
                    standards.`
                },
                {
                    type:'workExperience',
                    where: `ADP`,
                    title:'Software Engineer',
                    start: 'July 2020',
                    end: 'Feb 2022',
                    content: `• Managed the CD/CI pipeline with automation tools including Jenkins, Docker, Kubernetes, and Kafka.
• Monitored the production environment and constructed dashboards using Splunk for effective visualization and analysis.
• Led the implementation of a long-term storage solution for daily performance logs, utilizing a Grafana/InfluxDB stack.
• Wrote and executed test scripts to conduct load testing on critical components of the product.
• Built a React-based application for internal team and resource organization purposes.`
                }
            ]
        
        }
    )

    console.log('working body')
    const body = await openAiService.promptGeneration({
        content: promptGenB,
        role: 'system'
    })

    const promptGenC = promptBuilderService.generateClosingPrompt(
        {
            intro,
            body
        }
    )

    console.log('working conclusion')
    const conclusion = await openAiService.promptGeneration({
        content: promptGenC,
        role: 'system'
    })

    console.log(
    '---Intro:\n',
    intro,
    '\n --- Body:\n',
    body,
    '\n --- Conclusion:\n',
    conclusion,
    '---')

    const data = {
        body: (`${intro}\n\n${body}\n\n${conclusion}`.replace(/^/gm, '    '))
    }

    pdfExportService.exportLocal(data)

})();
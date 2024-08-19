const {openAiService, pdfExportService, promptBuilderService} = require('./services');

console.log(promptBuilderService)

const jobDescription = `- Lead and contribute to research projects in the field of quantum engineering and artificial intelligence.- Conduct data mining and analysis to extract valuable insights from large datasets.- Design and implement databases to store and manage research data effectively.- Develop natural language processing algorithms for text analysis.- Collaborate with cross-functional teams to integrate analytics solutions into existing systems.- Execute ETL processes to transform and load data for analysis.- Utilize advanced statistical techniques for modeling and prediction.`

promptBuilderService.generateIntro(
    {
        // jobDescription:{
            fields:{
                companyName: 'Aperture Science',
                position: 'Software Developer',
                responsibilities: jobDescription
            }
        // }
    }
)

// openAiService.helloWorld()
// pdfExportService.helloWorld()
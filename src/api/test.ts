(async () => {

    const {openAiService, pdfExportService, promptBuilderService} = require('./services');

    const responsibilities = `- Lead and contribute to research projects in the field of quantum engineering and artificial intelligence.- Conduct data mining and analysis to extract valuable insights from large datasets.- Design and implement databases to store and manage research data effectively.- Develop natural language processing algorithms for text analysis.- Collaborate with cross-functional teams to integrate analytics solutions into existing systems.- Execute ETL processes to transform and load data for analysis.- Utilize advanced statistical techniques for modeling and prediction.`


    const promptGen = promptBuilderService.generateIntro(
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

    const paraOne = await openAiService.promptGeneration({
        content: promptGen,
        role: 'system'
    })

// console.log(paraOne)
})();


// openAiService.helloWorld()
// pdfExportService.helloWorld()
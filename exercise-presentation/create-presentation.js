const pptxgen = require('pptxgenjs');
const { html2pptxBatch } = require('../.cursor/skills/presentation-generation/scripts/html2pptx');

async function createExercisePresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Exercise Benefits Presentation';
    pptx.title = 'Benefits of Exercise';

    const htmlFiles = [
        'slide-01-title.html',
        'slide-02-physical.html',
        'slide-03-mental.html'
    ];

    // Process all slides with batch processing
    const batchResult = await html2pptxBatch(htmlFiles, pptx, {
        minBottomMargin: 0.3,
        strictMode: false,
        autoFix: true,
        concurrency: 1
    });

    // Check results
    if (batchResult.errors && batchResult.errors.length > 0) {
        console.error('Errors:', batchResult.errors);
        throw new Error('Some slides failed validation');
    }

    if (batchResult.warnings && batchResult.warnings.length > 0) {
        console.warn('Warnings (non-critical):', batchResult.warnings);
    }

    if (batchResult.fixes && batchResult.fixes.length > 0) {
        console.log('Auto-fix suggestions available:', batchResult.fixes.length);
    }

    // Save the presentation
    await pptx.writeFile({ fileName: 'benefits-of-exercise.pptx' });
    console.log('✅ Presentation created successfully: benefits-of-exercise.pptx');
}

createExercisePresentation().catch(console.error);

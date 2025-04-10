import { controller } from '../modules/index.js'

describe('Controller Prediction Functions', () => {
    const testData = [10, 12, 15, 18, 22, 27, 33, 40]; // Example historical data
    const numPredictions = 5; // Number of predictions to generate

    const validatePredictions = (predictions, expectedLength) => {
        expect(Array.isArray(predictions)).toBe(true); // Should return an array
        expect(predictions.length).toBe(expectedLength); // Should match the number of predictions
        predictions.forEach(value => {
            expect(typeof value).toBe('number'); // All values should be numbers
        });
    };

    test('builtInARIMA generates valid predictions', async () => {
        const predictions = await controller.builtInARIMA(testData, numPredictions);
        validatePredictions(predictions, numPredictions);
    });

    test('OurARIMA generates valid predictions', async () => {
        const predictions = await controller.OurARIMA(testData, numPredictions);
        validatePredictions(predictions, numPredictions);
    });

    test('ls (Linear Regression) generates valid predictions', async () => {
        const predictions = await controller.ls(testData, numPredictions);
        validatePredictions(predictions, numPredictions);
    });
});
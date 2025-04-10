// for logic and complex operations and API handlers
import ARIMA from "arima";

const average = array => array.reduce((sum, current) => sum + current, 0) / array.length;
const sum = array => array.reduce((sum, curr) => sum + curr, 0);
const constantC = array => average(array.slice(1)) - lsForPhi(array) * average(array.slice(0, array.length-1));
export async function formatDataAsObject(numberArr, startAt = 0) { return { labels: Array.from({ length: numberArr.length }, (_, i) => i + startAt), values: numberArr } };

/**
 * ARIMA using lib (a bit easier)
 * @param {Number[]} data List of historical data that is used to make predictions
 * @param {Number} numPreds Number of predictions to make
 * @returns A promise constaining two lists of numbers: One with predictions, another with errors
 */
export async function builtInARIMA(data, numPreds) {
    // Init arima and start training
    const arima = new ARIMA({
        p: 2,
        d: 1,
        q: 2,
        verbose: false
    }).train(data);

    // predict
    const allPreds = arima.predict(numPreds);
    return allPreds[0];     // 1 is errors
}

function difference(data) {

    let diff = [];

    for(let i = 1; i < data.length; i++) {
        diff.push(data[i] - data[i - 1]);
    }
    return diff;
}

function lsForPhi(diffData) {

    let m = average(diffData);
    let num = 0, den = 0;
    
    for(let t = 1;t < diffData.length; t++) {
        num += (diffData[t] - m) * (diffData[t-1] - m) //tælleren
        den += Math.pow(diffData[t - 1]- m, 2); //nævneren
    }
    
    return num / den;

}

/**
 * Least squares regression/linear regression
 * @param {Number[]} data List of historical data that is used to make predictions
 * @param {Number} numPreds Number of predictions to make
 * @returns A promise that contains a list of numbers
 */
export async function ls(data, numPreds) {
    // data is a time series, so all y are the data, and x are the index/date/other
    const N = data.length;
    const x = [...Array(N).keys()];     // 0,1,2,...,N-1
    const y = data;

    // 2:sums (apparently more effecient to do locally)
    // regner med det hedder x og y, ændre senere
    const sumX = (N * (N - 1)) / 2;
    const sumY = y.reduce((sum, curr) => sum + curr, 0);
    const sumXY = x.reduce((sum, xVal, i) => sum + xVal * y[i]);                    // sum of x * y
    const sumX2 = x.reduce((sum, xVal) => sum + xVal * xVal, 0);                    // sum of x^2

    // 3: Calculate Slope m
    // m = (n∑xy - ∑y∑x)/[n∑x2 - (∑x)2] and b = (∑y - m∑x)/n
    const m = (N * sumXY - sumX * sumY) / (N * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / N;

    // 5: "assemble"
    //const y = m * x + b
    return Array.from({ length: numPreds }, (_, i) => m * (N + i) + b);
}

function estimateTheta(diffData, phi, c) {

    let bestTheta = 0;
    let bestError = Number.POSITIVE_INFINITY;

    // Grid search over theta in the interval [-1, 1] with steps of 0.01
    for(let theta = -1; theta <= 1; theta += 0.01) {
        let error = 0;
        let epsilon = 0; // initially assume starting epsilon_0 = 0
        
        // compute residuals from t = 1 to lengt - 1, because our data is lagged.
        for(let t = 1; t < diffData.length; t++){

            // predict Δy_t from formula with diffData as Δy_{t-1} and epsilon_{t-1}
            const prediction = c + phi * diffData[t - 1] + theta * epsilon;
            const e = diffData[t] - prediction;
            // we update espilon, with the assumption about this mistake being used in next iteration
            epsilon = e;
            error += Math.pow(e, 2);
        }

        if (error < bestError) {
            bestError = error;
            bestTheta = theta;
        }
    }

    return bestTheta;
    
}



// ∆yt = c + ϕ1∆yt−1 + ··· + ϕp∆yt−p + ϵt + θ1ϵt−1 + ··· + θqϵt−q
async function OurARIMA(data) {
    
    // delta y
    let deltaY = [];

    // uncertainty

    // calc c
    // calc auto reg
    // calc moving avr
    const c = 1;



}

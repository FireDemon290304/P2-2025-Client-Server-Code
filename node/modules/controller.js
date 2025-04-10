// for logic and complex operations and API handlers
import ARIMA from "arima";

const average = array => array.reduce((sum, current) => sum + current, 0) / array.length;
const constantC = array => average(array.slice(1)) - lsForPhi(array) * average(array.slice(0, array.length-1));
export async function formatDataAsObject(numberArr, startAt = 0) { return { labels: Array.from({ length: numberArr.length }, (_, i) => i + startAt), values: numberArr } };

/**
 * ARIMA using lib (a bit easier)
 * @param {Number[]} data List of historical data that is used to make predictions
 * @param {Number} numPreds Number of predictions to make
 * @returns A promise constaining a list of numbers with predictions
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

    console.log("data", data);
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

    return [m, b]; // m = slope, b = y-intercept
    // 5: "assemble"
    //const y = m * x + b
    // return Array.from({ length: numPreds }, (_, i) => m * (N + i) + b);
}

function estimateTheta(diffData, phi, c) {

    let bestTheta = 0;
    let bestError = Number.POSITIVE_INFINITY;
    let bestEpsiolon = 0;

    // we need to estimate theta, so we need to iterate over all possible values of theta
    // and find the one that minimizes the error

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
            bestEpsiolon = epsilon;
        }
    }

    return [bestTheta, bestEpsiolon];
    
}


function computeARIMA(data) {

    let deltaY = difference(data); // ∆yt = yt − yt−1

    let phi = lsForPhi(deltaY); // ϕ1
    let thetaEpsilon = estimateTheta(deltaY, phi); 
    let theta = thetaEpsilon[0]; // θ1
    let epsilon = thetaEpsilon[1]; // εt−1
    let c = constantC(deltaY); // c

    let deltaYt = c + phi * deltaY[deltaY.length - 1] + theta * epsilon; // ∆yt = c + ϕ1∆yt−1 + θ1ϵt−1

    let yt = data[data.length - 1] + deltaYt; // yt = yt−1 + ∆yt

    return yt;
}

// ∆yt = c + ϕ1∆yt−1 + ··· + ϕp∆yt−p + ϵt + θ1ϵt−1 + ··· + θqϵt−q
export async function OurARIMA(data, numPreds) {

    let predictions = [];
    let prediction;
    let tempData = data.slice(); // make a copy of the data

    // loop over the data and predict
    for(let i = 0; i < numPreds; i++) {
        // predict the next value
        prediction = await computeARIMA2(tempData); // ÆNDRET MIDLERTIDIG
        predictions.push(prediction);

        // update the data with the new prediction
        tempData.push(prediction);
        
    }

    return predictions;


}

// --------------------------------------------------------------------------- CHATGPT!!!!!

function lsForPhi2(diffData) {
    // We'll start from index 2 so that we have diffData[t-2] defined.
    let n = diffData.length;
    let sumX1 = 0, sumX2 = 0, sumY = 0;
    let sumX1X1 = 0, sumX2X2 = 0, sumX1X2 = 0;
    let sumX1Y = 0, sumX2Y = 0;
    
    for (let t = 2; t < n; t++) {
         let x1 = diffData[t - 1];
         let x2 = diffData[t - 2];
         let y = diffData[t];
         sumX1 += x1;
         sumX2 += x2;
         sumY += y;
         sumX1X1 += x1 * x1;
         sumX2X2 += x2 * x2;
         sumX1X2 += x1 * x2;
         sumX1Y += x1 * y;
         sumX2Y += x2 * y;
    }
    
    // Solve the normal equations using Cramer's rule:
    // Matrix A: [[sumX1X1, sumX1X2], [sumX1X2, sumX2X2]]
    // Vector B: [sumX1Y, sumX2Y]
    let det = sumX1X1 * sumX2X2 - sumX1X2 * sumX1X2;
    let phi1 = (sumX1Y * sumX2X2 - sumX1X2 * sumX2Y) / det;
    let phi2 = (sumX2Y * sumX1X1 - sumX1X2 * sumX1Y) / det;
    
    return [phi1, phi2];
}

function estimateTheta2(diffData, phi, c) {
    let bestTheta1 = 0, bestTheta2 = 0;
    let bestError = Number.POSITIVE_INFINITY;
    
    // Use a nested grid search for theta1 and theta2. Adjust step size as needed.
    for (let theta1 = -1; theta1 <= 1; theta1 += 0.01) {
        for (let theta2 = -1; theta2 <= 1; theta2 += 0.01) {
            let error = 0;
            let epsilon1 = 0, epsilon2 = 0; // initial residuals for t=0 and t=1
            // Start at t = 2 because we need two lag values
            for (let t = 2; t < diffData.length; t++) {
                const prediction = c 
                    + phi[0] * diffData[t - 1] 
                    + phi[1] * diffData[t - 2] 
                    + theta1 * epsilon1 
                    + theta2 * epsilon2;
                const e = diffData[t] - prediction;
                // Shift the residuals: update epsilon2, then epsilon1.
                epsilon2 = epsilon1;
                epsilon1 = e;
                error += Math.pow(e, 2);
            }
            if (error < bestError) {
                bestError = error;
                bestTheta1 = theta1;
                bestTheta2 = theta2;
            }
        }
    }
    
    return [bestTheta1, bestTheta2];
}

async function computeARIMA2(data) {
    let deltaY = difference(data); // ∆y_t = y_t − y_{t-1}
    
    // Get AR coefficients for order 2
    // let phi = lsForPhi2(deltaY); // returns [phi1, phi2]
     let phi = await ls(deltaY); // returns [phi1, phi2]
    console.log("phi", phi);
    // You may also recompute constant c; here we keep your constantC function,
    // but note that when extending to AR(2) you might need to adjust how c is estimated.
    let c = constantC(deltaY);
    
    // Estimate the two MA coefficients
    let thetaPair = estimateTheta2(deltaY, phi, c); 
    let theta1 = thetaPair[0];
    let theta2 = thetaPair[1];
    
    // To forecast, we need the last two observed differences.
    let n = deltaY.length;
    // Also, simulate the residual sequence using the chosen parameters.
    let epsilon1 = 0, epsilon2 = 0;
    // Process residuals for all available diff values (starting from index 2)
    for (let t = 2; t < n; t++) {
        const prediction = c + phi[0] * deltaY[t - 1] + phi[1] * deltaY[t - 2] 
                                  + theta1 * epsilon1 + theta2 * epsilon2;
        const e = deltaY[t] - prediction;
        epsilon2 = epsilon1;
        epsilon1 = e;
    }
    
    // Forecast the next difference Δy_{n+1}
    let forecastDelta = c + phi[0] * deltaY[n - 1] + phi[1] * deltaY[n - 2] 
                               + theta1 * epsilon1 + theta2 * epsilon2;
    // Convert forecasted difference to forecasted level: y_{n+1} = y_n + forecastDelta
    let yt = data[data.length - 1] + forecastDelta;
    
    return yt;
}


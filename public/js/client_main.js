'use strict'
// ! All console.logs that happen here get sent to user's browser console!!!


function createChart(endpoint) {
    fetch(`/api/forecast/${endpoint}`)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
            return response.json();
        })
        .then(data => {
            console.log(data);
            /*console.log(data.labels);
            console.log(data.historicalValues);
            console.log(data.predictedValues);*/
            const ctx = document.getElementById('forecastChart');

            renderChart(ctx, data);
        })
        .catch(err => {
            console.error(`Error loading forecast data from ${endpoint}:`, err);
        });
}

/**
 * Renders a chart in the context using thedata
 * @param {HTMLElement} ctx Element(canvas) to insert into
 * @param {Object} dataObj Data to insert
 */
async function renderChart(ctx, dataObj) {
    // Reset if chart exists
    if (Chart.getChart('forecastChart')) Chart.getChart('forecastChart').destroy();

    // add nulls to predicted data to align it with historical data
    const alignedPredictedValues = Array(dataObj.historicalValues.length - 1).fill(null).concat(dataObj.predictedValues);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataObj.labels,
            datasets: [
                {
                    label: 'Historical Data',
                    data: dataObj.historicalValues,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.3,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                    pointBorderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Predicted Data',
                    data: alignedPredictedValues,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.3,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                    pointBorderColor: 'rgba(255, 99, 132, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
}

document.getElementById("import-button1").addEventListener("click", () => createChart('otherARIMA'));
document.getElementById("import-button2").addEventListener("click", () => createChart('ourArima'));

document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded client js");
});

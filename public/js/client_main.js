'use strict'

function createChart(endpoint) {
    fetch(`/api/${endpoint}`)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
            return response.json();
        })
        .then(data => {
            console.log(data);
            const ctx = document.getElementById('forecastChart');

            // reset if chart exists
            if (Chart.getChart('forecastChart')) {
                Chart.getChart('forecastChart').destroy();
            }

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Revenue Forecast (DKK)',
                        data: data.values,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                        pointBorderColor: 'rgba(255, 99, 132, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        })
        .catch(err => {
            console.error(`Error loading forecast data from ${endpoint}:`, err);
        });
}

document.getElementById("import-button1").addEventListener("click", () => createChart('otherARIMA'));
document.getElementById("import-button2").addEventListener("click", () => createChart('linearregression'));

document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded client js");
});

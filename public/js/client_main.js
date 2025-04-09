'use strict'

//import { Chart } from 'chart';

function testButton() {
    fetch('/api/forecast')
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch forecast data");
            return response.json();
        })
        .then(data => {
            console.log(data);
            const ctx = document.getElementById('forecastChart');
            // chart imported in client using jsdelivr.net
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
                        fill: true, // fills area under the curve
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
            console.error('Error loading forecast:', err);
        });
}

document.getElementById("import-button").addEventListener("click", testButton);

document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded client js");
});

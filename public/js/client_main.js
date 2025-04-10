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

// input file functionality
const fileInput = document.getElementById("file-input");

// This fires when the file input button is clicked
document.getElementById("select-file").addEventListener("click", () => {
    
    fileInput.click();
    
    //obviously just a test function to render the chart when clicking the button
    testButton();

});

// This fires when a file is selected
fileInput.addEventListener("change", (e) => {
    
    const file = e.target.files[0]; // get the first file selected

    //debug function to log the selected file.
    if (file) {
        console.log("Selected file:", file.name);
    }

});


document.getElementById("import-button").addEventListener("click", testButton);

document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded client js");
});

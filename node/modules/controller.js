// for logic and complex operations and API handlers

// send random data
export async function testAPI() {
    const testData = {
        labels: [
            "01 Apr", "02 Apr", "03 Apr", "04 Apr", "05 Apr", "06 Apr", "07 Apr",
            "08 Apr", "09 Apr", "10 Apr", "11 Apr", "12 Apr", "13 Apr", "14 Apr"
        ],
        values: [
            1200, 1350, 1280, 1600, 1700, 1850, 2100,
            1950, 2000, 2300, 2200, 2100, 2250, 2400
        ]
    };
    return testData
}

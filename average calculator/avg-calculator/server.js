const express = require('express');
const { fetchNumbers } = require('./api');

const app = express();
const PORT = 9876;

// Sliding window to store the last 10 numbers
let slidingWindow = [];
const WINDOW_SIZE = 10;

// Function to calculate average
const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
};

// ✅ Welcome Route (Fix for "Cannot GET /")
app.get('/', (req, res) => {
    res.send("Welcome to the Average Calculator API! Use /numbers/{p|f|e|r} to fetch numbers.");
});

// ✅ API Endpoint: GET /numbers/:numberid
app.get('/numbers/:numberid', async (req, res) => {
    const numberType = req.params.numberid;

    // ✅ Validate number type
    if (!['p', 'f', 'e', 'r'].includes(numberType)) {
        return res.status(400).json({ error: "Invalid number type. Use 'p', 'f', 'e', or 'r'." });
    }

    try {
        // ✅ Fetch numbers
        const newNumbers = await fetchNumbers(numberType);

        if (!newNumbers.length) {
            return res.status(500).json({ error: "Failed to fetch numbers from the API." });
        }

        // ✅ Remove duplicates
        const uniqueNumbers = newNumbers.filter(num => !slidingWindow.includes(num));

        // ✅ Update sliding window (keep last 10 numbers)
        slidingWindow = [...slidingWindow, ...uniqueNumbers].slice(-WINDOW_SIZE);

        // ✅ Calculate average
        const avg = calculateAverage(slidingWindow);

        // ✅ Send response
        res.json({
            windowPrevState: slidingWindow.slice(0, -uniqueNumbers.length),
            windowCurrState: slidingWindow,
            numbers: newNumbers,
            avg: avg
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

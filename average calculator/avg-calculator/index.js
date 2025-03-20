const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

const NUMBER_SOURCES = {
    p: 'http://20.244.56.144/test/primes',
    f: 'http://20.244.56.144/test/fibo',
    e: 'http://20.244.56.144/test/even',
    r: 'http://20.244.56.144/test/rand'
};

let numberWindow = [];

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    if (!NUMBER_SOURCES[numberid]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    try {
        const response = await axios.get(NUMBER_SOURCES[numberid], { timeout: 500 });
        let newNumbers = response.data.numbers;

        // Remove duplicates
        newNumbers = [...new Set(newNumbers)];

        // Store previous state
        const windowPrevState = [...numberWindow];

        // Maintain window size
        numberWindow = [...new Set([...numberWindow, ...newNumbers])].slice(-WINDOW_SIZE);

        // Calculate average
        const avg = numberWindow.length > 0 ?
            (numberWindow.reduce((sum, num) => sum + num, 0) / numberWindow.length).toFixed(2) : 0;

        res.json({
            windowPrevState,
            windowCurrState: numberWindow,
            numbers: newNumbers,
            avg: parseFloat(avg)
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch numbers within time limit' });
    }
});

app.listen(PORT, () => {
    console.log(`Average Calculator microservice running on http://localhost:${PORT}`);
});

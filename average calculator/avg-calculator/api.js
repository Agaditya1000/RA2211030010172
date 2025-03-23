const axios = require('axios');

const BASE_URL = "http://20.244.56.144/test";

// ✅ Function to fetch numbers based on type
const fetchNumbers = async (type) => {
    const urls = {
        p: `${BASE_URL}/primes`,
        f: `${BASE_URL}/fibo`,
        e: `${BASE_URL}/even`,
        r: `${BASE_URL}/rand`
    };

    try {
        console.log(`Fetching numbers from: ${urls[type]}`);
        const response = await axios.get(urls[type], { timeout: 500 }); // ✅ Timeout after 500ms
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching numbers for ${type}:`, error.message);
        return [];
    }
};

module.exports = { fetchNumbers };

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const TIMEOUT_MS = 500;

async function fetchNumbers(url) {
    try {
        const response = await axios.get(url, { timeout: TIMEOUT_MS });
        if (response.status === 200) {
            const data = response.data;
            return data.numbers || [];
        }
    } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
    }
    return [];
}

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid URLs' });
    }

    const promises = urls.map(url => fetchNumbers(url));
    const results = await Promise.all(promises);

    const mergedNumbers = results.flat().filter((num, index, self) => self.indexOf(num) === index).sort((a, b) => a - b);

    res.json({ numbers: mergedNumbers });
});

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
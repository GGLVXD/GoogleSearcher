// /index.js
const axios = require('axios');
const cheerio = require('cheerio');

async function googlesearch(query, limit, page) {
    if (!query) {
        throw new Error('query is required.');
    }
    const start = page - 1;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=${limit}&start=${start}`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    };
    try {
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);
        const results = [];
        $('.tF2Cxc').each((index, element) => {
            const title = $(element).find('.DKV0Md').text(); 
            const link = $(element).find('.yuRUbf a').attr('href');
            const description = $(element).find('.VwiC3b').text();

            if (title && link) {
                results.push({ title, link, description });
            }
        });

        return results;
    } catch (error) {
        throw new Error(`error fetching results: ${error.message}`);
    }
}
module.exports = { googlesearch };

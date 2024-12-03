// /test.js
const { googlesearch } = require('./index');

(async () => {
    try {
        console.log("Searching...");
        const results = await googlesearch('Hello world', 20, 2); // query, limit, page

        if (results.length === 0) {
            console.warn("no results found");
        } else {
            console.log("Results:");
            results.forEach((result, index) => {
                console.log(`Result ${index + 1}:`);
                console.log(`Title: ${result.title}`);
                console.log(`Link: ${result.link}`);
                console.log(`Description: ${result.description}`);
                console.log('---');
            });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();

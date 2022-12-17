/** Command-line tool to generate Markov text. */
const { readFile } = require('fs');
const { MarkovMachine } = require('./markov.js');
const process = require('process');
const axios = require('axios');
let markov;
// Read file and return text
const read = (path) => {
    readFile(path, 'utf8', async function (err, data) {
        if (err) {
            console.log(`Error: ${err}`);
            process.kill(1);
        }
        else {
            markov = new MarkovMachine(data);
            let text = markov.makeText(20);
            console.log(text);
        }
    });
};
const readURL = async (path) => {
    try {
        const resp = await axios.get(path);
        const webText = resp.data;
        markov = new MarkovMachine(webText);
        let text = markov.makeText(20);
        console.log(text);
    }
    catch (err) {
        console.log(err);
    }
};
const path = process.argv[2];
if (path.includes('http')) {
    readURL(path);
}
else {
    read(path);
}

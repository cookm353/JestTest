/** Command-line tool to generate Markov text. */
const { readFile } = require('fs');
const { MarkovMachine } = require('./markov.js');
const process = require('process');
let words;
let markov;
// Read file and return text
const read = async (path) => {
    words = await readFile(path, 'utf8', async function (err, data) {
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
const path = process.argv[2];
read(path);

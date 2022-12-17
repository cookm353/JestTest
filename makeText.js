/** Command-line tool to generate Markov text. */
const { readFile } = require('fs');
const process = require('process');
let words;
// Read file and return text
const read = async (path) => {
    words = await readFile(path, 'utf8', async function (err, data) {
        if (err) {
            console.log(`Error: ${err}`);
            process.kill(1);
        }
        else {
            // console.log(data)
            return await data;
        }
    });
};
const path = process.argv[2];
// const words: Promise<string> = read(path)
console.log(words);

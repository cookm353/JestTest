/** Textual markov chain generator */
class MarkovMachine {
    /** build markov machine; read in text.*/
    words;
    chain;
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.chain = this.makeChains();
    }
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
    makeChains() {
        // Build a Markov chain from input
        let chain = {};
        for (let i = 0; i < this.words.length; i++) {
            let word = this.words[i];
            if (!chain[`${word}`]) {
                chain[`${word}`] = [];
            }
            if (this.words[i + 1] !== undefined) {
                chain[`${word}`].push(this.words[i + 1]);
            }
            else {
                chain[`${word}`].push(null);
            }
        }
        return chain;
    }
    /** return random text from chains */
    makeText(numWords = 100) {
        let text = '';
        let word;
        let previousWord;
        let currentNumWords = 0;
        while (currentNumWords < numWords) {
            // Find first word
            if (currentNumWords === 0) {
                let randomWordIndex = Math.floor(Math.random() * this.words.length);
                word = this.words[randomWordIndex];
                console.log('First word: ', word);
                // text = word
            }
            else {
                previousWord = word;
                let wordChainLink = this.chain[`${previousWord}`];
                let chainLength = this.chain[`${previousWord}`].length;
                let randomWordIndex = Math.floor(Math.random() * chainLength);
                word = wordChainLink[randomWordIndex];
                // Prevent nulls and duplicates from being added
                if (word == null || word === previousWord) {
                    let randomWordIndex = Math.floor(Math.random() * this.words.length);
                    word = this.words[randomWordIndex];
                }
            }
            text = `${text} ${word}`;
            currentNumWords++;
        }
        return `${text}.`;
    }
}
// const markov = new MarkovMachine('the cat in the hat is in the hat')
const markov = new MarkovMachine('a man a plan a canal panama');
const text = markov.makeText(100);
console.log(text);
module.exports = {
    MarkovMachine: MarkovMachine
};

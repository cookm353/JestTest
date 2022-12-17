/** Textual markov chain generator */

class MarkovMachine {
    /** build markov machine; read in text.*/
    words: Array<String | null>
    chain: Object
  
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
      let chain: Object = {}

      for (let i = 0; i < this.words.length; i++) {
        let word = this.words[i]

        if (! chain[`${word}`]) {
            chain[`${word}`] = []
        }
        
        if (this.words[i + 1] !== undefined) {
            chain[`${word}`].push(this.words[i+1])
        } else {
            chain[`${word}`].push(null)
        }
      }

      return chain
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {

      let text: String = ''
      let word: String
      let previousWord: String
      let currentNumWords: number = 0

      while (currentNumWords < numWords) {
        // Find first word
        if ( currentNumWords === 0 ) {
            let randomWordIndex: number = Math.floor(Math.random() * this.words.length)
            word = this.words[randomWordIndex]
        } else {
            previousWord = word
            let wordChainLink: Array<string> = this.chain[`${previousWord}`]
            let chainLength: number = this.chain[`${previousWord}`].length
            
            let randomWordIndex: number = Math.floor(Math.random() * chainLength)
            word = wordChainLink[randomWordIndex]

            // Prevent nulls and duplicates from being added
            if (word == null || word === previousWord) {
              let randomWordIndex: number = Math.floor(Math.random() * this.words.length)
              word = this.words[randomWordIndex]
            }
            
        }
        text = `${text} ${word}`.trim()

        currentNumWords++
      }
      
      if ( text.slice(-1) === '.' || text.slice(-1) === '!' ) {
        return `${text}`
      } else {
        return `${text}.`
      }
    }
  }

module.exports = {
    MarkovMachine: MarkovMachine
  }
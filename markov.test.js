const { MarkovMachine } = require('./markov.js')

describe('Test MarkovMachine', () => {
    let markov
    
    beforeAll(() => {
        markov = new MarkovMachine('the cat in the hat is in the hat')
    })

    test('Making array of words', () => {
        expect(markov.words).toEqual([
            'the', 'cat', 'in', 'the', 'hat', 'is', 'in', 'the', 'hat'
        ])
    })

    test('Making Markov chain', () => {
        expect(markov.chain).toEqual({
            'the': ['cat', 'hat', 'hat'],
            'cat': ['in'],
            'in': ['the', 'the'],
            'hat': ['is', null],
            'is': ['in']
        })
    })
})
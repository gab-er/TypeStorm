import {words} from 'popular-english-words'

const mostCommonWords = words.getMostPopularLength(35, 5)

const wordsData = []
for (let i = 0; i < mostCommonWords.length; i++) {
    const obj = {key: i, value: mostCommonWords[i]}
    wordsData.push(obj)
}

export {wordsData}
// export [ {0: "Word0"}, {1: "Word1"}]
export class ScoringLogic {

    calculateBasicScore(word: string) {
        const score = word.split('').reduce((total, char) => {
            const val = (char.charCodeAt(0) == 32) ? 0 : (char.charCodeAt(0) - 96)
            return total + val
        }, 0)

        return score;
    }
}


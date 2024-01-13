import cosSimilarity from 'compute-cosine-similarity';



export function cosineSimilarity(vec1: Array<number>, vec2: Array<number>) {
    let similarityScore = cosSimilarity(vec1, vec2)
    console.log("SIMILARITY SCORE")
    if (!similarityScore) {
        similarityScore = 0

        console.log(similarityScore)

    }
    console.log(similarityScore)

    return similarityScore
}

export function computeMeanWeightedRow(rowVector: Array<number>) {
    let average = computeAverage(rowVector)

    const meanWeightedRow = rowVector.map((val, index) => {
        if (val == 0) {
            return 0
        }

        return val - average
    })

    console.log("MEAN WEIGHTED ROW")
    console.log(rowVector)
    console.log(average)
    console.log(meanWeightedRow)
    return meanWeightedRow
}

export function computeAverage(numbers: Array<number>) {
    let total = 0
    numbers.forEach((val) => {
        total = total + val
    })
    return total / numbers.length
}
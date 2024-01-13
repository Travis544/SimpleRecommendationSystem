import { Matrix } from "./Matrix";

export interface RatingPredictor {
    predictScore(userId: string, itemId: string, matrix: Matrix): number;
}

export class ItemBasedRatingPredictor implements RatingPredictor {
    matrix: Matrix
    constructor(matrix: Matrix) {
        this.matrix = matrix
    }

    predictScore(userId: string, itemId: string): number {
        let filteredMatrixOnlyItemRatedByGivenUser = this.matrix.filterRow((row: string) => {
            if (this.matrix.exist(row, userId) || row == itemId) {
                return true
            } else {
                return false
            }
        })


        let similarities = filteredMatrixOnlyItemRatedByGivenUser.weightedAverageCosineSimilarity(itemId, 5)
        /**
        * Item based: 
        * get most similar items to the item in question, 
        * and multiply the similarities to my rating for the similar items
        * 
        * User based: get most similar users to the current user in question who have rated the item we want rating for, 
        * multiply the similarities to the user's rating for the item we want rating for
       */
        let numerator = 0
        let denominator = 0
        similarities.forEach((similarity, similiarItemId) => {
            let rating = this.matrix.getDataByRowAndColumn(similiarItemId, userId)
            if (!rating) {
                rating = 0
            }


            numerator = numerator + (rating * similarity)
            denominator = denominator + similarity
        })

        console.log("Computing final weighted average..")

        if (denominator == 0) {
            console.log(0)
            return 0
        }

        console.log(numerator / denominator)
        return numerator / denominator
    }

}
import { ItemBasedRatingPredictor } from "./RatingPredictor";
import { RatingStore } from "./RatingStore";
import { RecommendationObject } from "./RecommendationObject";
import { User } from "./User";

export enum RecommendationType {
    Item_Based = 1,
    User_Based = 2
}

export class RecommendationEngine {
    ratingStore: RatingStore
    constructor(ratingStore: RatingStore) {
        this.ratingStore = ratingStore

    }

    // public generateRecommendation(forUser: User, forItem: RecommendationObject, recommendationType: RecommendationType) {
    //     let itemBasedMatrix = this.ratingStore.createItemMatrix()
    //     let itemBasedRatingPredictor = new ItemBasedRatingPredictor(itemBasedMatrix)
    //     return itemBasedRatingPredictor.predictScore(forUser.getUserId(), forItem.getId())
    // }

    public predictScore(forUser: User, forItem: RecommendationObject, recommendationType: RecommendationType) {
        let itemBasedMatrix = this.ratingStore.createItemMatrix()
        let itemBasedRatingPredictor = new ItemBasedRatingPredictor(itemBasedMatrix)
        return Math.round(itemBasedRatingPredictor.predictScore(forUser.getUserId(), forItem.getId()))
    }

    //user based stratey: loop through all other user, choose a user who have the most similar rating to the current user. Within that most similar user's watched list, pick an unwatched movie with highest rating
    /**
     * item based strategy: choose something user have not found, 
     * calculate all pairs of similarities with other items that the user have rated, 
     * take into account 
     */

}
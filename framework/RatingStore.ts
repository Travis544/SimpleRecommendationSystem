import { Matrix } from "./Matrix";
import { RecommendationObject } from "./RecommendationObject";
import { User } from "./User";

export class RatingStore {
    recommendationObjectToUserRatings: Map<RecommendationObject, Map<User, number>>
    userRatingsToRecommendationObject: Map<User, Map<RecommendationObject, number>>
    items: Array<RecommendationObject>
    users: Array<User>

    ratingUpperBound: number
    constructor(ratingUpperBound: number) {
        this.recommendationObjectToUserRatings = new Map()
        this.userRatingsToRecommendationObject = new Map()
        this.users = []
        this.items = []
        this.ratingUpperBound = ratingUpperBound
    }

    /**
     * creates item based matrix where each row is the item id and each column is the user id,
     * and the value is the user's rating for that item
     */
    public createItemMatrix(): Matrix {
        const index = this.items.map((item) => {
            return item.getId()
        })

        const columns = this.users.map((user) => {
            return user.getUserId()
        })

        const data: Map<string, Map<string, number>> = new Map()
        this.recommendationObjectToUserRatings.forEach((userRatings, recommendationObject) => {
            if (!data.has(recommendationObject.getId())) {
                data.set(recommendationObject.getId(), new Map())
            }
            userRatings.forEach((rating, user) => {
                data.get(recommendationObject.getId())?.set(user.getUserId(), rating)
            })
        })
        return new Matrix(index, columns, data)
    }

    public createUserMatrix() {

    }

    addRating(user: User, recommendationObject: RecommendationObject, rating: number) {
        if (rating < 0 || rating > 5) {
            return
        }

        if (!this.recommendationObjectToUserRatings.has(recommendationObject)) {
            this.recommendationObjectToUserRatings.set(recommendationObject, new Map())
            this.items.push(recommendationObject)
        }

        if (!this.userRatingsToRecommendationObject.has(user)) {
            this.userRatingsToRecommendationObject.set(user, new Map())
            this.users.push(user)
        }
        this.recommendationObjectToUserRatings.get(recommendationObject)!.set(user, rating)
        this.userRatingsToRecommendationObject.get(user)!.set(recommendationObject, rating)
    }

    addItem(item: RecommendationObject) {
        if (this.recommendationObjectToUserRatings.has(item)) {
            return
        }

        this.recommendationObjectToUserRatings.set(item, new Map())
        this.items.push(item)
    }

    getUserRatings(user: User) {
        return this.userRatingsToRecommendationObject.get(user)
    }

    getObjectRatings(recommendationObject: RecommendationObject) {
        return this.recommendationObjectToUserRatings.get(recommendationObject)
    }


}
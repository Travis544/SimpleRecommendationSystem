import { RatingStore } from "../RatingStore";
import { RecommendationEngine, RecommendationType } from "../RecommendationEngine";
import { User } from "../User";
import { Video } from "../tests/Video"

let kel = new User("kel")
let travis = new User("travis")
let mon = new User("mon")

let theMatrixMovie = new Video("Matrix")
let theBeeMovie = new Video("Bee")
let theScaryMovie = new Video("Super scary")

let ratingStore = new RatingStore(5)
ratingStore.addRating(kel, theMatrixMovie, 5)
ratingStore.addRating(mon, theMatrixMovie, 3)
ratingStore.addRating(travis, theMatrixMovie, 4)

ratingStore.addRating(kel, theScaryMovie, 4)
ratingStore.addRating(mon, theScaryMovie, 2)
ratingStore.addRating(travis, theScaryMovie, 2)

ratingStore.addRating(kel, theBeeMovie, 3)
ratingStore.addRating(mon, theBeeMovie, 4)

let recommendationEngine: RecommendationEngine = new RecommendationEngine(ratingStore)
let score = recommendationEngine.predictScore(travis, theBeeMovie, RecommendationType.Item_Based)

console.log(score)
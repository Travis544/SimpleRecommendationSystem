export class User {
    private userId: string
    constructor(userId: string) {
        this.userId = userId
    }

    getUserId() {
        return this.userId
    }
}
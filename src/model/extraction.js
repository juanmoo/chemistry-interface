export default class Extraction {
    constructor(collectionName, modelName, creationTime) {
        this.collection = collectionName
        this.modelName = modelName
        this.creationTime = creationTime
    }

    getCollection() {
        return this.collection
    }

    getModel() {
        return this.modelName
    }

    getCreateTime() {
        return this.creationTime
    }

}
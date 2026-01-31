export enum MongoItemKeys {
    _Id = "_id"
}

export interface MongoItem {
    [MongoItemKeys._Id]: string
}
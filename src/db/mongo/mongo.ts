import * as mongo from 'mongodb';

const host = 'localhost'
const port = '27017'
const HouseStockDBName = 'house_stock'
const productsCollection = 'products'
const url = `mongodb://${host}:${port}`

export class Mongo {
    public static client: mongo.MongoClient;
    public static productsCollection: mongo.Collection<any>

    public static connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongo.MongoClient
                .connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
                    (error, client: mongo.MongoClient) => {
                        if (error) {
                            console.error('Error while connecting to Mongodb server.', error)
                            return reject(error);
                        }
                        Mongo.client = client;
                        Mongo.productsCollection = client.db(HouseStockDBName).collection(productsCollection)
                        resolve(client);
                    });
        });
    }

    public disconnect(): void {
        Mongo.client.close();
    }
}
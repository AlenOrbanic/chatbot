import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
"mongodb+srv://Orbanic99:<alenorbanic123>@cluster0.jth4cin.mongodb.net/?retryWrites=true&w=majority";
    //"mongodb+srv://Alan:Alan123@webappspractice.ev3ojrc.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

let db = null;

export default (database) => {
    return new Promise((resolve, reject) => {
        if (db && client.connected) {
            resolve(db);
        } else {
            try {
                db = client.db(database);
                resolve(db);
            } catch {
                (err) => reject(err);
            }
        }
    });
};
 
//https://www.mongodb.com/docs/drivers/node/current/quick-start/
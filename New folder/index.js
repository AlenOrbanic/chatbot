import mongo from "mongodb";
import express from "express";
import connect from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// READ
app.get("/bucket/:id", async (req, res) => {
    let id = req.params.id;
    let db = await connect("inventory");
    let doc = await db.collection("bucket").findOne({
        _id: mongo.ObjectId(id),
    });
    if (doc) {
        res.json({ status: "OK", data: doc });
    } else {
        res.json({ status: "Failed" });
    }
});

// READ ALL
app.get("/buckets", async (req, res) => {
    let db = await connect("inventory");
    let cursor = await db.collection("bucket").find();
    let doc = await cursor.toArray();
    res.json(doc);
});

// CREATE
app.post("/bucket", async (req, res) => {
    let { item, qty, tags, size } = req.body;
    qty = ~~qty;
    tags = JSON.parse(tags);
    size = JSON.parse(size);
    let db = await connect("inventory");
    let inserted = await db.collection("bucket").insertOne({
        item: item,
        qty: qty,
        tags: tags,
        size: size,
    });
    let item_id = inserted.insertedId;
    let doc = await db.collection("bucket").findOne({
        _id: mongo.ObjectId(item_id),
    });
    res.json(doc);
});

// UPDATE
app.patch("/bucket/:id", async (req, res) => {
    let db = await connect("inventory");
    let id = req.params.id;
    let { item, qty, tags, size } = req.body;
    qty = ~~qty;
    tags = JSON.parse(tags);
    size = JSON.parse(size);
    await db
        .collection("bucket")
        .updateOne(
            { _id: mongo.ObjectId(id) },
            { $set: { item: item, qty: qty, tags: tags, size: size } }
        );
    let doc = await db.collection("bucket").findOne({
        _id: mongo.ObjectId(id),
    });
    res.json(doc);
});

// DELETE
app.delete("/bucket/:id", async (req, res) => {
    let db = await connect("inventory");
    let id = req.params.id;
    let doc = await db
        .collection("bucket")
        .findOne({ _id: mongo.ObjectId(id) });
    await db.collection("bucket").deleteOne({ _id: mongo.ObjectId(id) });
    res.json(doc);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

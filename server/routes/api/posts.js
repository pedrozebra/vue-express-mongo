const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async(req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//Get Posts

router.post('/', async(req, res) => {
    const posts = await loadPostCollection();

    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

router.delete('/:postId', async(req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.postId) });
    res.status(200).send();
})

//Add Posts

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://fullstackvue:fullstackvue1@ds125423.mlab.com:25423/fullstack_vue_express', {
        useNewUrlParser: true
    });

    return client.db('fullstack_vue_express').collection('posts');
}

//Delete Posts

module.exports = router;
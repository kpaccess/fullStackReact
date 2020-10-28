const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json())

const port = 8000;

// const articlesInfo = {
//     'learn-react': {
//         upvotes: 0,
//         comments: [],
//     },
//     'learn-node': {
//         upvotes: 0,
//         comments: [],
//     },
//     'my-thoughts-on-resumes': {
//         upvotes: 0,
//         comments: [],
//     }
// }

// app.get('/hello', (req, res) =>
//     res.send('hello'));
//
// app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`))
//
// app.post('/hello', (req, res) => res.send(`Hello1 ${req.body.name}`))


app.get('/api/articles/:name', async (req, res) => {
    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useUnifiedTopology: true
        });
        const db = client.db('my-blog');

        const articleInfo = await db.collection('articles').findOne({ name: articleName});
        res.status(200).json(articleInfo);
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db ', error})
    }

})


app.post('/api/articles/:name/upvote', async (req, res) => {
    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useUnifiedTopology: true
        });
        const db = client.db('my-blog');

        const articleInfo = await db.collection('articles').findOne({ name: articleName});
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName});
        res.status(200).json(updatedArticleInfo);
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db ', error})
    }
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const {username, text } = req.body;
    const articleName = req.params.name;

    articlesInfo[articleName].comments.push({ username, text});
    res.status(200).send(articlesInfo[articleName]);
})

app.listen(port, () => {
    console.log(`app started at port ${port}`)
})
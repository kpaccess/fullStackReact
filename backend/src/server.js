const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/build')))

const port = 8000;

const withDB = async (operations, res) => {
    try {

        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useUnifiedTopology: true
        });
        const db = client.db('my-blog');
        await operations(db)

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db ', error})
    }
}

app.get('/api/articles/:name', async (req, res) => {
      withDB(async db => {
          const articleName = req.params.name;

          const articleInfo = await db.collection('articles').findOne({ name: articleName});
          res.status(200).json(articleInfo);
      }, res)
})


app.post('/api/articles/:name/upvote', async (req, res) => {
        withDB(async db => {
            const articleName = req.params.name;

            const articleInfo = await db.collection('articles').findOne({ name: articleName});
            await db.collection('articles').updateOne({ name: articleName }, {
                '$set': {
                    upvotes: articleInfo.upvotes + 1,
                },
            });
            const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName});
            res.status(200).json(updatedArticleInfo);
        }, res)

});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        console.log(" articleInfo ", articleInfo)
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: [...articleInfo.comments, { username, text}]
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(port, () => {
    console.log(`app started at port ${port}`)
})
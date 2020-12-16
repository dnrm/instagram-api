const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const axios = require('axios');
const path = require('path');

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://daniel:DanMongo@cluster0.sstzd.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function saveUsername(data) {
    try {
      await client.connect();
      const database = client.db('instagram-api-app');
      let collection = database.collection('usernames');
      
      let document = {
          date: new Date(),
          type: 'username',
          content: data
      }
      const result = await collection.insertOne(document);
    } catch {
        console.log('Something went wrong')
    }
}

async function saveJson(user, bio) {
    try {
      await client.connect();
      const database = client.db('instagram-api-app');
      let collection = database.collection('json');
      
      let document = {
          date: new Date(),
          type: 'json',
          username: user,
          bio: bio
      }
      const result = await collection.insertOne(document);
    } catch {
        console.log('lol something went wrong')
    }
}

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/history.html'));
})

app.get('/db/:content', (req, res) => {
    saveUsername(req.params.content).catch(console.dir);
    res.send({
        'received': req.params.content
    })
})

app.get('/json/db/:username/:bio', (req, res) => {
    saveJson(req.params.username, req.params.bio).catch(() => {
        res.status(500).send({
            "status": "uh oh, something went wrong"
        })
    });
    res.send({
        "received": `${req.params.username}, ${req.params.bio}`
    })
})

app.get('/auth', (req, res) => {
    axios.post('https://api.instagram.com/oauth/access_token', {
        client_id: '790042041543698',
        client_secret: '83a9f075689032b3c00ce421ef2ba84b',
        grant_type: 'authorization_code',
        redirect_uri: 'https://dnrm-instagram-api.herokuapp.com/auth/',
        code: req.query.code
    })
    .then(res => {
        console.log(`statusCode: ${response.statusCode}`)
        res.send({
            response
        });
    })
    .catch(error => {
        res.status(500).send({
            "status": "Something went wrong on out end :(",
            "error": error
        })
    })
})

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));
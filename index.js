const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const axios = require('axios');
const path = require('path');

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://daniel:DanMongo@cluster0.sstzd.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(uri);

async function save(type, data) {
    try {
      await client.connect();
      const database = client.db('instagram-api-app');
      let collection = database.collection('usernames');

      if (type == 'json') {
          collection = database.collection('json');
      }
      
      let document = {
          date: new Date(),
          type: type,
          content: json
      }
      const result = await collection.insertOne(document);
    } finally {
      
      await client.close();
    }
}

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/db/:type/:content', (req, res) => {
    save(req.params.type, req.params.content).catch(console.dir);
    res.send({
        'received': req.params.content
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
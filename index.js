const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const axios = require('axios');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
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

app.get('/track/:content' , (req, res) => {
    console.log(req.params.content);
    res.send({
        'received': req.params.content
    })
})

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));
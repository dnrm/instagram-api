const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
})

app.get('/auth', (req, res) => {
    res.send({
        token: req.query.code
    });
})

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));
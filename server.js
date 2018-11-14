const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

var allocine = require('allocine-api');
app.post('/api/movies', (req, res) => {
    var vm = this;
    allocine.api('search', { q: req.body.search, filter: 'movie' }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Voici les données retournées par l\'API Allociné:');
        console.log(results.feed.movie);
        res.send(results.feed.movie);
    });

});


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
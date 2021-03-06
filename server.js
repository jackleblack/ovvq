const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

var allocine = require('allocine-api');
app.post('/api/search', (req, res) => {
    allocine.api('search', { q: req.body.search, filter: req.body.filter }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        let searchResults = results.feed || results;
        console.log('Result call search:', searchResults);
        res.send(searchResults);
    });
});

app.post('/api/showtimelist', (req, res) => {
    allocine.api('showtimelist', { theaters: req.body.theater, date: req.body.date }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Result call showtimelist:', results);
        res.send(results.feed);
    });
});

app.post('/api/theaterlist', (req, res) => {
    var parameters = {};
    if (req.body.zip !== undefined) {
        parameters.zip = req.body.zip;
    }
    if (req.body.lat !== undefined) {
        parameters.lat = req.body.lat;
    }
    if (req.body.long !== undefined) {
        parameters.long = req.body.long;
    }
    console.log(parameters)
    
    allocine.api('theaterlist', parameters, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Result call theaterlist:', results);
        res.send(results.feed);
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
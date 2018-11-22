app.post('/api/movie', (req, res) => {
    allocine.api('search', { q: req.body.search, filter: 'movie' }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Voici les données retournées par l\'API Allociné:');
        console.log(results.feed.movie)
        res.send(results.feed.movie);
    });
});

app.post('/api/person', (req, res) => {
    allocine.api('search', { q: req.body.search, filter: 'person' }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Voici les données retournées par l\'API Allociné:');
        console.log(results)
        res.send(results.feed.person);
    });
});

app.post('/api/theather', (req, res) => {
    allocine.api('search', { q: req.body.search, filter: 'theater' }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Voici les données retournées par l\'API Allociné:');
        res.send(results.feed.theather);
    });
});

app.post('/api/new', (req, res) => {
    allocine.api('search', { q: req.body.search, filter: 'news' }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Voici les données retournées par l\'API Allociné:');
        res.send(results.feed.new);
    });
});

app.post('/api/tvserie', (req, res) => {
    allocine.api('search', { q: req.body.search, filter: 'tvseries' }, function (error, results) {
        if (error) { console.log('Error : ' + error); return; }
        console.log('Voici les données retournées par l\'API Allociné:');
        res.send(results.feed.tvserie);
    });
});
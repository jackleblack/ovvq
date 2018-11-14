import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'

import Movie from '../components/Movie'

class MoviesList extends Component {

    state = {
        movies: [],
        searchString: ''
    }
    constructor() {
        super()
        this.getMovies()
    }
    getMovies = () => {
        var allocine = require('allocine-api');
        var vm = this;
        allocine.api('search', { q: this.state.searchString, filter: 'movie' }, function (error, results) {
            if (error) { console.log('Error : ' + error); return; }

            console.log('Voici les données retournées par l\'API Allociné:');
            console.log(results.feed.movie);
            vm.setState({ movies: results.feed.movie })
            console.log(vm.state.movies)
        });

    }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getMovies()
    }
    render() {
        return (
            <div>
                {this.state.movies ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for Movies"
                            margin="normal"
                            onChange={this.onSearchInputChange}
                        />
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {this.state.movies.map(currentMovie => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Movie movie={currentMovie} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No movies found"}
            </div>
        )
    }
}
export default MoviesList;

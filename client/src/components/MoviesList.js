import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

import Movie2 from '../components/Movie2'

class MoviesList extends Component {

    state = {
        movies: [],
        searchString: 'Ninja'
    }
    constructor() {
        super()
        // this.getMovies = _.debounce(this.getMovies, 2000);
    }
    componentDidMount() {
        this.getMovies()
            .then(res => this.setState({ movies: res }))
            .catch(err => console.log(err));
    }
    getMovies = async () => {
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: this.state.searchString }),
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    // getMovies = () => {
    //     var vm = this;
    // allocine.api('search', { q: this.state.searchString, filter: 'movie' }, function (error, results) {
    //     if (error) { console.log('Error : ' + error); return; }

    //     console.log('Voici les données retournées par l\'API Allociné:');
    //     console.log(results.feed.movie);
    //     vm.setState({ movies: results.feed.movie })
    //     console.log(vm.state.movies)
    // });
    // }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getMovies()
        .then(res => this.setState({ movies: res }))
        .catch(err => console.log(err));
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
                                    <Movie2 movie={currentMovie} />
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

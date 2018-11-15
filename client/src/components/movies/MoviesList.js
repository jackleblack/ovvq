import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import Movie from './Movie'

class MoviesList extends Component {
    state = {
        movies: [],
        searchString: 'Ninja'
    }
    constructor() {
        super()
    }
    componentDidMount() {
        this.getMovies()
            .then(res => this.setState({ movies: res }))
            .catch(err => console.log(err));
    }
    getMovies = async () => {
        const response = await fetch('/api/movie', {
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

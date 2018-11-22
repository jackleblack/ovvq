import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import Movie from './Movie'
import Badge from '@material-ui/core/Badge';

class MoviesList extends Component {
    state = {
        movies: [],
        searchString: '',
        totalResults: 0
    }
    constructor() {
        super()
    }
    componentDidMount() {
        this.getMovies()
            .then(res => this.setState({ movies: res.movie }))
            .catch(err => console.log(err));
    }
    getMovies = async () => {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: this.state.searchString, filter: 'movie' }),
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
            .then(res => this.setState({ movies: res.movie, totalResults: res.totalResults }))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <div>
                    <div style={{ padding: 24 }}>
                        <Badge badgeContent={this.state.totalResults} color="primary" invisible={this.state.totalResults === 0} >
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <SearchIcon color="primary" />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="searchInput"
                                        label="Search for Movies"
                                        type="search"
                                        onChange={this.onSearchInputChange}
                                    />
                                </Grid>
                            </Grid>

                        </Badge>
                    </div>
                    {this.state.movies ? (
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {this.state.movies.map(currentMovie => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Movie movie={currentMovie} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : "No movies found"}
                </div>
            </div>
        )
    }
}
export default MoviesList;

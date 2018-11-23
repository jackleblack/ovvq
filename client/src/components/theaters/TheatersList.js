import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import Theater from './Theater'
import Badge from '@material-ui/core/Badge';

class TheatersList extends Component {
    state = {
        theaters: [],
        searchString: '',
        totalResults: 0
    }
    constructor() {
        super()
    }
    componentDidMount() {
        this.getTheaters()
            .then(res => this.setState({ theaters: res.theater }))
            .catch(err => console.log(err));
    }
    getTheaters = async () => {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: this.state.searchString, filter: 'theater' }),
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
        this.getTheaters()
            .then(res => this.setState({ theaters: res.theater, totalResults: res.totalResults }))
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
                                        label="Search for Theaters"
                                        type="search"
                                        onChange={this.onSearchInputChange}
                                    />
                                </Grid>
                            </Grid>

                        </Badge>
                    </div>
                    {this.state.theaters ? (
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {this.state.theaters.map(currentTheater => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Theater theater={currentTheater} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : "No theaters found"}
                </div>
            </div>
        )
    }
}
export default TheatersList;

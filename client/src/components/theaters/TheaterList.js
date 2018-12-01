import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import TheaterNotFound from './TheaterNotFound';
import TheaterListItem from './TheaterListItem';
import TheaterDetail from './TheaterDetail';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Demo from '../Demo';

class TheaterList extends Component {
    state = {
        theaters: [],
        searchString: '13',
        totalResults: 0
    }

    constructor(props) {
        super(props);
        console.log(this.props);
        this.getInnerRef = this.getInnerRef.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }
    innerRef;
    getInnerRef(ref) {
        this.innerRef = ref;
    }
    getLocation() {
        this.innerRef && this.innerRef.getLocation();
    }
    componentDidMount() {
        this.getTheaters(this.state.searchString)
            .then(res => this.setState({ theaters: res.theater, totalResults: res.totalResults }))
            .catch(err => console.log(err));
    }
    getTheaters = async (searchString) => {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: searchString, filter: 'theater' }),
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
        this.getTheaters(event.target.value)
            .then(res => this.setState({ theaters: res.theater, totalResults: res.totalResults }))
            .catch(err => console.log(err));
    }
    render() {
        const { getInnerRef, getLocation } = this;
        return (
            <div>
                <Route path={`${this.props.match.url}/:theaterCode`} component={TheaterDetail} />
                <div>
                    <Demo onError={error => console.log(error)} ref={getInnerRef} />

                    <button
                        className="pure-button pure-button-primary"
                        onClick={getLocation}
                        type="button"
                    >
                        Get location
</button>
                    <div style={{ padding: 24 }}>
                        <Badge badgeContent={this.state.totalResults} color="primary" invisible={!this.state.totalResults} >
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
                                <Grid key={currentTheater.code} item xs={12} sm={6} lg={4} xl={3}>
                                    <TheaterListItem theater={currentTheater} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                            <TheaterNotFound />
                        )}
                </div>
            </div>
        )
    }
}
export default TheaterList;

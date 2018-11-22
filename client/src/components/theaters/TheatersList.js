import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import Theater from './Theater'

class TheatersList extends Component {
    state = {
        theaters: [],
        searchString: '13170'
    }
    constructor() {
        super()
    }
    componentDidMount() {
        this.getTheaters()
            .then(res => this.setState({ theaters: res }))
            .catch(err => console.log(err));
    }
    getTheaters = async () => {
        const response = await fetch('/api/theater', {
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
        this.getTheaters()
        .then(res => this.setState({ theaters: res }))
        .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                {this.state.theaters ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for Theaters"
                            margin="normal"
                            onChange={this.onSearchInputChange}
                        />
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {this.state.theaters.map(currentTheater => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Theater theater={currentTheater} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No theaters found"}
            </div>
        )
    }
}
export default TheatersList;

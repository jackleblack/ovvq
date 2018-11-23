import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import Person from './Person';

class PersonList extends Component {
    state = {
        persons: [],
        searchString: 'Ninja'
    }
    constructor() {
        super()
    }
    componentDidMount() {
        this.getPersons()
            .then(res => this.setState({ persons: res }))
            .catch(err => console.log(err));
    }
    getPersons = async () => {
        const response = await fetch('/api/person', {
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
        this.getPersons()
        .then(res => this.setState({ persons: res }))
        .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                {this.state.persons ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for Persons"
                            margin="normal"
                            onChange={this.onSearchInputChange}
                        />
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {this.state.persons.map(currentPerson => (
                                <Grid item xs={12} sm={6} lg={2} xl={3}>
                                    <Person person={currentPerson} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No persons found"}
            </div>
        )
    }
}
export default PersonList;

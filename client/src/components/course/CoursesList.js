import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'

import Course from '../components/Course'

const SPACE_ID = 'da09r4wfsuti'
const ACCESS_TOKEN = 'f4eecdeb239d05d071b90cb4ff4c47c72290e3d6b8dfe0416b1254cf57dc9ea3'

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

class CoursesList extends Component {
    state = {
        courses: [],
        searchString: ''
    }
    constructor() {
        super()
        this.getCourses()
    }
    getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString
        })
            .then((response) => {
                console.log(response.items )
                this.setState({ courses: response.items })
                console.log(this.state.courses)
            })
            .catch((error) => {
                console.log("Error occurred while fetching Entries")
                console.error(error)
            })
    }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getCourses()
    }
    render() {
        return (
            <div>
                {this.state.courses ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for Courses"
                            margin="normal"
                            onChange={this.onSearchInputChange}
                        />
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found"}
            </div>
        )
    }
}
export default CoursesList;

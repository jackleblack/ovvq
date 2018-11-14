import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import CoursesList from './components/CoursesList'
import MoviesList from './components/MoviesList'


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {/* <CoursesList /> */}
        <MoviesList />
      </div>
    );
  }
}

export default App;

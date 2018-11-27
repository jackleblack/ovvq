import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Route, Link , NavLink } from "react-router-dom";
// import TheatersList from './theaters/TheatersList';
import Home from './Home';
import MovieList from './movies/MovieList';
import TheaterList from './theaters/TheaterList';
import PersonList from './persons/PersonList';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1500 + theme.spacing.unit * 3 * 2)]: {
      width: 1500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});


const sections = [
  'Movies',
  'Persons',
  'Theaters',
];

function News() {
  return (
    <div>
      <h2>News</h2>
    </div>
  );
}
function Blog(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Toolbar className={classes.toolbarMain}>
          {/* <Button size="small">Subscribe</Button> */}
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            On Va Voir Quoi ?
          </Typography>
          {/* <IconButton>
            <SearchIcon />
          </IconButton> */}
          {/* <Button variant="outlined" size="small">
            Sign up
          </Button> */}
        </Toolbar>
        <Router>
          <div>
            <div>
              <Toolbar variant="regular" className={classes.toolbarSecondary}>
                <Button component={NavLink} to="/">
                  Home
                </Button>
                {sections.map(section => (
                  <Button component={NavLink} to={section}>
                    {section}
                  </Button>
                ))}
              </Toolbar>
            </div>
            <main>
              <Route exact path="/" component={Home} />
              <Route path="/movies" component={MovieList} />
              <Route path="/persons" component={PersonList} />
              <Route path="/theaters" component={TheaterList} />
            </main>
          </div>
        </Router>
      </div>
      {/* Footer */}
      {/* <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer> */}
      {/* End footer */}
    </React.Fragment>
  );
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);
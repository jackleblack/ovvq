import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoviesList from './MoviesList'

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const styles = theme => ({
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
});


const sections = [
  'Technology',
  'Design',
  'Culture',
  'Business',
  'Politics',
  'Opinion',
  'Science',
  'Health',
  'Style',
  'Travel',
];

//  <Toolbar variant="regular" className={classes.toolbarSecondary}>
//           {sections.map(section => (
//             <Typography color="inherit" noWrap key={section}>
//               {section}
//             </Typography>
//           ))}
//         </Toolbar> 

const Menu = (classes) => (
  <Router>
    <div>
      {/* <Toolbar variant="regular" className={classes.toolbarSecondary}>
        <Button component={Link} to="/home">
          Link
        </Button>
        <Button component={Link} to="/movies">
          Link
        </Button>
        <Button component={Link} to="/theathers">
          Link
        </Button>
        <Button component={Link} to="/actors">
          Link
      </Button>
      </Toolbar> */}

  <Toolbar variant="regular" className={classes.toolbarSecondary}>
           {sections.map(section => (
             <Typography color="inherit" noWrap key={section}>
               {section}
             </Typography>
           ))}

         </Toolbar> 

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies/">Movies</Link>
          </li>
          <li>
            <Link to="/theathers/">Theathers</Link>
          </li>
          <li>
            <Link to="/actors/">Actors</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/movies/" component={MoviesList} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);

export default Menu;
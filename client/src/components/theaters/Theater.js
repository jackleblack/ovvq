import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class Theater extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const { theater } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

      return (
        <Card className={classes.card}>
          <CardContent>
            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
              {theater.address}
            </Typography> */}
            <Typography variant="h5" component="h2">
              {theater.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {theater.address} <br />
            {theater.postalCode} <br />
            {theater.city}adjective
            </Typography>
            {/* <Typography component="p">
           
             
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button  size="small" component={Link} to={`/theaters/${theater.code}`}>
                    Voir +
                  </Button>
          </CardActions>
        </Card>
    );
  }
}

Theater.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Theater);

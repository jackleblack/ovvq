import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import CameraRollIcon from '@material-ui/icons/Camera';
import { Divider } from '@material-ui/core';
import moment from 'moment'
import 'moment/locale/fr';

moment().locale('fr')

const styles = theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  typographyInline: {
    display: 'inline-block'
    },
});

function TheaterDetailShowtime(props) {
  const { classes, theme, movieShowtimes } = props;
  moment.locale('fr'); // 'fr'

  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5" className={classes.typographyInline}>
            {movieShowtimes.onShow.movie.title}
            <Typography component="span" color="textPrimary" variant="overline" className={classes.typographyInline} style={{ marginLeft : 12}}>
              {moment.utc(movieShowtimes.onShow.movie.runtime * 1000).format('HH [h] mm')}
            </Typography>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {movieShowtimes.onShow.movie.release &&
              moment(movieShowtimes.onShow.movie.release.releaseDate).format("DD MMMM YYYY")}
          </Typography>
          <Typography variant="subtitle1" paragraph>
          </Typography>
          {movieShowtimes.onShow.movie.castingShort &&
            <div>
              <Typography variant="subtitle1" color="primary" >
                {movieShowtimes.onShow.movie.castingShort.directors &&
                  <Chip
                    label={movieShowtimes.onShow.movie.castingShort.directors}
                    className={classes.chip}
                    color="primary"
                    icon={<CameraRollIcon />}
                  />
                }
              </Typography>
              <br />
              <Typography variant="subtitle2" color="primary" >
                <Chip
                  label={movieShowtimes.onShow.movie.castingShort.actors}
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                  icon={<MovieFilterIcon />}
                />
              </Typography>
            </div>
          }
        </CardContent>
      </div>
      <Hidden xsDown>
        <CardMedia
          className={classes.cardMedia}
          image={movieShowtimes.onShow.movie.poster.href}
          title="Image title"
        />
      </Hidden>
    </Card>
  );
}

TheaterDetailShowtime.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TheaterDetailShowtime);
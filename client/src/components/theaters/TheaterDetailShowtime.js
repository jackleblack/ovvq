import { Button, withWidth } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CameraRollIcon from '@material-ui/icons/Camera';
import moment from 'moment';
import 'moment/locale/fr';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'recompose/compose';

moment().locale('fr')

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'orange',
    color: 'black',
  },
  card: {
    [theme.breakpoints.down('sm')]: {
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {

    [theme.breakpoints.down('sm')]: {
      objectFit: 'cover',
      objectPosition: 'top'
    },
    [theme.breakpoints.up('sm')]: {

      width: 160

    },
  },
  typographyInline: {
    display: 'inline-block'
  },
});

function TheaterDetailShowtime(props) {
  const { classes, theme, movieShowtime, groupedMovieShowTime } = props;
  moment.locale('fr'); // 'fr'

  return (

    <Card className={classes.card}>
      <Hidden smUp>
        <CardMedia
          component="img"
          height="300"
          className={classes.cardMedia}
          image={movieShowtime.onShow.movie.poster.href}
          title="Image title"
        />
      </Hidden>
      <Hidden xsDown>
        <CardMedia
          className={classes.cardMedia}
          image={movieShowtime.onShow.movie.poster.href}
          title="Image title"
        />
      </Hidden>
      <div className={classes.cardDetails}>

        <CardContent>
          <Typography component="h6" variant="h6" className={classes.typographyInline}>
            {movieShowtime.onShow.movie.title}
            <Typography component="span" color="textPrimary" variant="overline" className={classes.typographyInline} style={{ marginLeft: 12 }}>
              {moment.utc(movieShowtime.onShow.movie.runtime * 1000).format('HH [h] mm')}
            </Typography>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {movieShowtime.onShow.movie.release &&
              moment(movieShowtime.onShow.movie.release.releaseDate).format("DD MMMM YYYY")}
            {movieShowtime.onShow.movie.genre.map((currentGenre) => (
              ' / ' + currentGenre.$
            ))}
          </Typography>
          <Typography variant="subtitle1" paragraph>
          </Typography>
          {movieShowtime.onShow.movie.castingShort &&
            <div>
              <Typography variant="subtitle1" color="primary" >
                {movieShowtime.onShow.movie.castingShort.directors &&
                  <Chip
                    label={movieShowtime.onShow.movie.castingShort.directors}
                    className={classes.chip}
                    color="primary"
                    icon={<CameraRollIcon />}
                  />
                }
              </Typography>
              <br />
              <Typography variant="subtitle2" color="secondary" >
                {movieShowtime.onShow.movie.castingShort.actors}
                {/* <Chip
                  label={movieShowtime.onShow.movie.castingShort.actors}
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                  icon={<MovieFilterIcon />}
                /> */}
              </Typography>
              {groupedMovieShowTime.map((currentGroupedMovieShowTime) => (
                <Typography variant="subtitle2" color="secondary" paragraph>
                  {currentGroupedMovieShowTime.screenFormat.$}  {currentGroupedMovieShowTime.screen ? 'Salle ' + currentGroupedMovieShowTime.screen.$ : ''}

                  {currentGroupedMovieShowTime.scr.map((currentMovieShowTime) => (
                    <Typography variant="subtitle1" color="default" paragraph>
                      {currentMovieShowTime.d}
                      {currentMovieShowTime.t.map((currentMovieShowTimeByDay) => (
                        <Button variant="contained" color="inherit" aria-label="Add" className={classes.button}>
                        {currentMovieShowTimeByDay.$}
                        </Button>
                      ))}

                    </Typography>


                  ))}
                </Typography>
              ))}
            </div>
          }
        </CardContent>
      </div>
    </Card>
  );
}

TheaterDetailShowtime.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,

};

export default compose(
  withStyles(styles),
  withWidth(),
)(TheaterDetailShowtime);
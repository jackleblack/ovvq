import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TheaterDetailShowtime from './TheaterDetailShowtime';


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


class TheaterDetail extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.match.params.theaterCode)
        this.state = { theaterShowtimes: null };
    }

    componentDidMount() {
        this.getTheaterShowtimes(this.props.match.params.theaterCode)
            .then(res => this.setState({
                theaterShowtimes
                    : res.theaterShowtimes[0]
            }))
            .catch(err => console.log(err));
    }

    getTheaterShowtimes = async (theaterCode) => {
        const response = await fetch('/api/showtimelist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: theaterCode, filter: 'theater' }),
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* Main featured post */}
                {this.state.theaterShowtimes ? (
                    <div>
                        <Paper className={classes.mainFeaturedPost}>
                            <Grid container>
                                <Grid item md={6}>
                                    <div className={classes.mainFeaturedPostContent}>
                                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                            {this.state.theaterShowtimes.place.theater.name}
                                        </Typography>
                                        <Typography variant="h5" color="inherit" paragraph>
                                            Multiple lines of text that form the lede, informing new readers quickly and
                                            efficiently about what&apos;s most interesting in this post&apos;s contents…
                  </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid container spacing={40} className={classes.cardGrid}>
                            {this.state.theaterShowtimes.movieShowtimes.map((currentMovieShowtimes, index) => (
                                <Grid item key={index} xs={12} md={6}>
                                    <TheaterDetailShowtime movieShowtimes={currentMovieShowtimes} />

                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : 'Nothing'}

            </div>
        )
    }
}

TheaterDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TheaterDetail);;
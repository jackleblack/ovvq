import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Movie = (props) => {
    console.log(props)
    return (
        <div>
            {props.movie ? (
                <Card >
                    <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                        image={props.movie.poster ? props.movie.poster.href : 'https://fakeimg.pl/350x200/?text=Missing-Poster&font=lobster'}
                        title={props.movie.originalTitle}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {props.movie.originalTitle}
                        </Typography>
                        <Typography component="p">
                            {props.movie.productionYear}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/* <Button size="small" color="primary" href={props.movie.fields.url} target="_blank">
                            Go To movie
                    </Button> */}
                    </CardActions>
                </Card>
            ) : null}
        </div>
    )
}
export default Movie
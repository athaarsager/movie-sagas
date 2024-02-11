import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const movieDetails = useSelector(store => store.movieDetails);
    // Grabs id from url. The variable name needs to match what it is called in the route defined in App.jsx
    const params = useParams();

    // Tell the database what movie info to grab and put in store on page load. Redux updates and React renders
    useEffect(() => {
        dispatch({ type: "GET_DETAILS", payload: params.movie_id });
    }, []);

    if (movieDetails.length === 0) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (

        <Box display="flex" flexDirection="column" justifyContent="center" align-items="center" data-testid="movieDetails">
            <Grid container justifyContent="center" sx={{marginBottom: 2}}>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title={movieDetails.title}>
                        </CardHeader>
                        <CardMedia>
                            <img src={movieDetails.poster} alt={movieDetails.title} />
                        </CardMedia>
                        <CardContent>
                            <p><strong>Details:</strong></p>
                            <p>{movieDetails.description}</p>
                            <p><strong>Genres:</strong><em> {movieDetails.genres}</em></p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid container justifyContent="center" columnSpacing={1}>
                    <Grid item>
                        <Button variant="contained" color="inherit" data-testid="toList" onClick={() => history.goBack()}>Back to Movie List</Button>
                        </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => history.push(`/movie/${params.movie_id}/edit`)}>Edit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>

    )
}

export default MovieDetails;
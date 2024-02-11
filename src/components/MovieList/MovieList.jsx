import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import './MovieList.css';

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <Button variant="contained" color="secondary" sx={{ marginBottom: 1 }} onClick={() => history.push("/add_movie")}>Add a New Movie!</Button>
      <p>Click a Movie to Learn More About it!</p>
      <section className="movies">
        <Box sx={{ width: "100%", marginBottom: "1rem"}}>
          <Grid container rowSpacing={1} columnSpacing={1}>
            {movies.map(movie => {
              return (
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: "#0288d1", cursor: "pointer" }} variant="outlined" data-testid='movieItem' key={movie.id} onClick={() => history.push(`/movies/${movie.id}`)}>
                    <CardMedia component="img" image={movie.poster} alt={movie.title}  />
                    <CardContent>
                      <Typography variant="h4" component="div">{movie.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </section>
    </main>
  );
}

export default MovieList;

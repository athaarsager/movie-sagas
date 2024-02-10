import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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
      <Button variant="contained" onClick={() => history.push("/add_movie")}>Add a New Movie!</Button>
      <section className="movies">
        {movies.map(movie => {
          return (
            <Card sx={{width: 300}} data-testid='movieItem' key={movie.id} onClick={() => history.push(`/movies/${movie.id}`)}>
                <CardMedia component="img" image={movie.poster} title={movie.title} sx={{ height: 450}}/>
              <CardContent>
                <Typography variant="h4" component="div">{movie.title}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;

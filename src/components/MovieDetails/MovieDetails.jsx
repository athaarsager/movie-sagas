import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

        <div data-testid="movieDetails">
            <h2>{movieDetails.title}</h2>
            <img src={movieDetails.poster} alt={movieDetails.title} />
            <p><strong>Details:</strong></p>
            <p>{movieDetails.description}</p>
            <p><strong>Genres:</strong><em> {movieDetails.genres}</em></p>
            <button data-testid="toList" onClick={() => history.goBack()}>Back to Movie List</button>
            <button onClick={() => history.push(`/movie/${params.movie_id}/edit`)}>Edit</button>
        </div>

    )
}

export default MovieDetails;
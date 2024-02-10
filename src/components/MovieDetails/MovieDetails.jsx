import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
function MovieDetails() {
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.movieDetails);
    // Grabs id from url. The variable name needs to match what it is called in the route defined in App.jsx
    const { movie_id } = useParams();

    useEffect(() => {
        dispatch({type: "GET_DETAILS", payload: movie_id});
    })

    // action.type: "GET_DETAILS"
    return (
        <>
        </>
    )
}

export default MovieDetails;
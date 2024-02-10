import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function EditDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const genres = useSelector(store => store.genres);
    const movieDetails = useSelector(store => store.movieDetails);

    // key is where data should be kept in local storage
    // data is the data we are storing. Have to stringify it because local storage can only store strings
    // .setItem sets the key-value pair in local storage
    const saveData = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
      };

      // Once again uses key from local storage
      // getItem retrieves the data in the key in local storage
      // JSON.parse converts the saved string back into a JSON object, or returns null if data doesn't exist
      // (such as if browser history is cleared)
      const getSavedData = (key) => {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : null;
      };

      // Store the retrieved data in a variable or grab default values
      const savedMovieData = getSavedData("movieData") || {
        title: movieDetails.title || "",
        poster: movieDetails.poster || "",
        description: movieDetails.description || "",
        genre_id: movieDetails.genre_id || "",
      };

    // This gets cleared on refresh...
    // (still don't fully understand why since using store and useParams...gets set before data retrieved and just never updates?)
    // so have to store it locally so it can be accessed after a refresh
    // local save functions above so they can be accessed here
    const [movie, setMovie] = useState({
        title: movieDetails.title || savedMovieData.title,
        poster: movieDetails.poster || savedMovieData.poster,
        description: movieDetails.description || savedMovieData.description,
        genre_id: movieDetails.genre_id || savedMovieData.genre_id
    });
      

    const handleChange = (e) => {
        
        // Can't just alter object keys directly
        // This variable stores the name and value from the target
        const { name, value } = e.target;

        // This populates the movie object with all other info using the spread operator, 
        // and adds the values declared in the object above
        setMovie((currentInfo) => ({ ...currentInfo, [name]: value}));

        // Potentially add input validation here
    }

    
    useEffect(() => {
       // Need to fetch genres right away so drop down has something to display
         dispatch({type: "FETCH_GENRES"});
        // Need to also fetch the current movie details right away to auto-populate fields
         dispatch({ type: "GET_DETAILS", payload: params.movie_id });

         saveData("movieData", movie);
    }, [movie]);// Save data to local state whenever state updates

    return (
        <>
        <h2>EDIT</h2>
        <form>
            <label htmlFor="title">Movie Title</label><br/>
            <input className="movie-input" id="title" name="title" type="text" placeholder="Movie Title" value={movie.title} onChange={handleChange} required/><br/>
            <label htmlFor="url">Poster Url</label><br/>
            <input id="url" name="poster" type="url" placeholder="https://m.media-amazon.com/images/I/51XhnMdSQdL._AC_UF894,1000_QL80_.jpg" value={movie.poster} onChange={handleChange} required/><br/>
            <label htmlFor="description">Description</label><br/>
            <input id="description" name="description" type="text" placeholder="Kung Fu Panda is a children's animated movie starring Jack Black as the titular character: Po. It follows Po on his quest to become the Dragon Warrior..." value={movie.description} onChange={handleChange} required/><br/>
            <label htmlFor="genre">Genre</label><br/>
            <select id="genre" name="genre_id" onChange={handleChange} required>
                {/*  Hidden prevents option from showing up in the dropdown menu and allows it to be the default value */}
                <option hidden>--Select Genre--</option>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select><br/>
            <button>Save</button>
            <button onClick={() => history.goBack()} type="button">Cancel (Return to Home)</button>
        </form>
        </>
    );
}

export default EditDetails;
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function EditDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const genres = useSelector(store => store.genres);
    const movieDetails = useSelector(store => store.movieDetails);

    // Info on saving local state below:

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
        id: params.movie_id
    };

    // This gets cleared on refresh...
    // (still don't fully understand why since using store and useParams...gets set before data retrieved and just never updates?)
    // so have to store it locally so it can be accessed after a refresh
    // local save functions above so they can be accessed here
    const [movie, setMovie] = useState({
        title: movieDetails.title || savedMovieData.title,
        poster: movieDetails.poster || savedMovieData.poster,
        description: movieDetails.description || savedMovieData.description,
        genre_id: movieDetails.genre_id || savedMovieData.genre_id,
        id: params.movie_id
    });

    const [validationErrors, setValidationErrors] = useState({
        title: false,
        poster: false,
        description: false,
        genre_id: false,
    });

    // This function should return truthy or falsey, and will be the value that determines if the dispatch fires
    // It declares an object that compares the values of the movie keys to an empty string
    // If key is empty, that key stores "true"
    // Then sets local state to this array of truthy and falsey values
    // Then uses code wizardry to see if any values are truthy. Return falsey if so

    const validateForm = () => {
        const errors = {
            title: newMovie.title === "",
            poster: newMovie.poster === "",
            description: newMovie.description === "",
            genre_id: newMovie.genre_id === "",
        };
        setValidationErrors(errors);
        // convert the errors object into an array of truthy and falsey values
        // .some checks if at least one element in an array satisfies a given condition
        // (Boolean is a callback that converts each array value into its boolean representation)
        // If .some finds any truthy values (errors in this case), it returns true, which we negate with the NOT operator. Wow
        return !Object.values(errors).some(Boolean);
    };


    const handleChange = (e) => {

        // Can't just alter object keys directly
        // This variable stores the name and value from the target
        const { name, value } = e.target;

        // This populates the movie object with all other info using the spread operator, 
        // and adds the values declared in the object above
        setMovie((currentInfo) => ({ ...currentInfo, [name]: value }));

        // Input validation uses local state created above and the name declared in this function
        // Updates validationErrors to a false value for the target input while retaining any errors for other inputs with the spread operator
        // Should reset the error when a user starts typing. 

        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }

    const submitChanges = (e) => {
        e.preventDefault();
        // Still doing input validation just to make sure no records are simply sitting empty
        if (validateForm()) {
            // Type: "SUBMIT_CHANGES"
            dispatch({ type: "EDIT_MOVIE", payload: movie });
            Swal.fire({
                title: "Success!",
                text: "Edits Saved!",
                icon: "success",
                confirmButtonColor: "#000080"
            });
            history.goBack();
        } else {
            Swal.fire({
                icon: "error",
                title: "Unable to Process",
                text: "All Form Fields are Required.",
            });
        }
    }


    useEffect(() => {
        // Need to fetch genres right away so drop down has something to display
        dispatch({ type: "FETCH_GENRES" });
        // Need to also fetch the current movie details right away to auto-populate fields
        dispatch({ type: "GET_DETAILS", payload: params.movie_id });

        saveData("movieData", movie);
    }, [movie]);// Save data to local state whenever state updates

    return (
        <Box sx={{ marginTop: "5%"}}>
            <h2 style={{marginTop: "5%", marginBottom: "3%"}}>Edit Details Here!</h2>
            <form>
                <TextField sx={{marginBottom: ".5rem"}} size="small" label="Movie Title" className="movie-input" id="title" name="title" type="text" placeholder="Movie Title" value={movie.title} onChange={handleChange} error={validationErrors.title} helperText={"This field is required."} /><br />
                <TextField sx={{marginBottom: ".5rem"}} size="small" label="Poster Url" id="url" name="poster" type="url" placeholder="www.coolmovieposter.com" value={movie.poster} onChange={handleChange} error={validationErrors.poster} helperText={"This field is required."} /><br />
                <TextField sx={{marginBottom: ".5rem"}} size="small" label="Description" id="description" name="description" type="text" placeholder="Cool Description Here!" value={movie.description} onChange={handleChange} error={validationErrors.description} helperText={"This field is required."} /><br />
                <TextField sx={{ width: "22ch"}} size="small" select label="Select Genre" id="genre" name="genre_id" onChange={handleChange} error={validationErrors.genre_id}>
                    <option hidden>--Select Genre--</option>
                    {genres.map(genre => (
                        <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                    ))}
                </TextField>
                <FormHelperText>
                    {validationErrors.genre_id && "Genre is required"}
                </FormHelperText><br />
                <Grid container justifyContent="center" columnSpacing={1}>
                    <Grid item>
                        <Button variant="contained" color="inherit" onClick={() => history.goBack()} type="button">Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={submitChanges}>Save</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default EditDetails;
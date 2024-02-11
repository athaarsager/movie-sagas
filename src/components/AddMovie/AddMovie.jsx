import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const [newMovie, setNewMovie] = useState({
        title: "",
        poster: "",
        description: "",
        genre_id: ""
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

        // This populates the newMovie object with all other info using the spread operator, 
        // and adds the values declared in the object above
        setNewMovie((currentInfo) => ({ ...currentInfo, [name]: value }));

        // Input validation uses local state created above and the name declared in this function
        // Updates validationErrors to a false value for the target input while retaining any errors for other inputs with the spread operator
        // Should reset the error when a user starts typing. 

        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }

    const addMovie = (e) => {
        e.preventDefault();

        // Adding validation check to make sure form is not sent if inputs are invalid
        if (validateForm()) {
            // Send all the movie info as an object
            dispatch({ type: "ADD_MOVIE", payload: newMovie });
            Swal.fire({
                title: "Success!",
                text: "Movie Added! Returning to Main Page",
                icon: "success",
                confirmButtonColor: "#42a5f5"
            });
            history.push("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Unable to Process",
                text: "All Form Fields are Required.",
            });
        }
    }

    //need to fetch genres right away so drop down has something to display
    useEffect(() => {
        //Path="FETCH_GENRES"
        dispatch({ type: "FETCH_GENRES" });
    }, []);

    return (
        <Box sx={{ marginTop: "5%"}}>
            <h2 style={{marginTop: "5%", marginBottom: "3%"}}>Add a New Movie Here!</h2>
            <form>
                <TextField sx={{marginBottom: ".5rem"}} size="small" label="Movie Title" className="movie-input" id="title" name="title" type="text" placeholder="Movie Title" value={newMovie.title} onChange={handleChange} error={validationErrors.title} helperText={"This field is required."} /><br />
                <TextField sx={{marginBottom: ".5rem"}} size="small" label="Poster Url" id="url" name="poster" type="url" placeholder="www.coolmovieposter.com" value={newMovie.poster} onChange={handleChange} error={validationErrors.poster} helperText={"This field is required."} /><br />
                <TextField sx={{marginBottom: ".5rem"}} size="small" label="Description" id="description" name="description" type="text" placeholder="Cool Description Here!" value={newMovie.description} onChange={handleChange} error={validationErrors.description} helperText={"This field is required."} /><br />
                <TextField size="small" sx={{ width: "22ch" }} select label="Select Genre" id="genre" name="genre_id" onChange={handleChange} error={validationErrors.genre_id}>
                    {genres.map(genre => (
                        <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                    ))}
                </TextField>
                <FormHelperText>
                    {validationErrors.genre_id && "Genre is required"}
                </FormHelperText><br />

                <Button sx={{ marginBottom: 1 }} variant="contained" onClick={addMovie}>Save</Button><br />
                <Button variant="contained" color="inherit" onClick={() => history.goBack()} type="button">Cancel (Return to Home)</Button>
            </form>
        </Box>
    )
}

export default AddMovie;
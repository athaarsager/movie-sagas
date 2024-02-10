import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function EditDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const genres = useSelector(store => store.genres);
    const [movie, setMovie] = useState({
        title: "",
        poster: "",
        description: "",
        genre_id: ""
    });

    const handleChange = (e) => {
        
        // Can't just alter object keys directly
        // This variable stores the name and value from the target
        const { name, value } = e.target;

        // This populates the newMovie object with all other info using the spread operator, 
        // and adds the values declared in the object above
        setMovie((currentInfo) => ({ ...currentInfo, [name]: value}));

        // Potentially add input validation here
    }

    //need to fetch genres right away so drop down has something to display
    useEffect(() => {
        //Path="FETCH_GENRES"
         dispatch({type: "FETCH_GENRES"});
    }, []);

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
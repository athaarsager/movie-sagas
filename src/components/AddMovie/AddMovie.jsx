import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <form>
            <label for="title">Movie Title</label><br/>
            <input id="title" name="title" type="text" placeholder="Movie Title"/>
            <label for="url">Poster Url</label><br/>
            <input id="url" name="url" type="url" placeholder="https://m.media-amazon.com/images/I/51XhnMdSQdL._AC_UF894,1000_QL80_.jpg"/>
            <label for="description">Description</label><br/>
            <input id="description" name="description" type="text" placeholder="Kung Fu Panda is a children's animated movie starring Jack Black as the titular character: Po. It follows Po on his quest to become the Dragon Warrior..."/>
            <label for="genre">Genre</label><br/>
            <select id="genre" name="genre">
                
            </select>
        </form>
    )
}

export default AddMovie;
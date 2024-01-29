import {Link} from "react-router-dom";
import Logout from "./Logout";
import Title from "./Title";
import MenuButton from "./MenuButton";

export default function NavBar() {
    return (
        <div className="d-flex bd-highlight mb-3">
            <Title />
            <div className="p-2 bd-highlight">
                <Link to="/notes">
                    <button className="btn btn-default btn-xs active">Notes</button>
                </Link>
            </div>
            <div className="p-2 bd-highlight">
                <Link to="/rss">
                    <button className="btn btn-default btn-xs active">RSS</button>
                </Link>
            </div>
            <div className="p-2 bd-highlight">
                <Link to="/settings">
                    <button className="btn btn-default btn-xs active">Configuration</button>
                </Link>
            </div>
            <Logout/>
        </div>
    )
}
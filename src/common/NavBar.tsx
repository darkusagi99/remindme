import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <div className="text-center">
            <h1>RemindMe</h1>
            <Link to="/notes" >
                <button>Notes</button>
            </Link>
            <Link to="/rss" >
                <button>RSS</button>
            </Link>
            <Link to="/settings">
                <button>Configuration</button>
            </Link>
        </div>
    )
}
import {Link} from "react-router-dom";

export const MenuButton = ({ label, path } : any) => {
    return (
        <div className="p-2 bd-highlight">
            <Link to={path}>
                <button className="btn btn-default btn-xs active">{label}</button>
            </Link>
        </div>
    )
}

export default MenuButton;
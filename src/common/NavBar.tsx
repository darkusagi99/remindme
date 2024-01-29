import Logout from "./Logout";
import Title from "./Title";
import MenuButton from "./MenuButton";

export default function NavBar() {
    return (
        <div className="d-flex bd-highlight mb-3">
            <Title />
            <MenuButton path="/notes" label = "Notes" />
            <MenuButton path="/rss" label = "RSS" />
            <MenuButton path="/settings" label = "Configuration" />
            <Logout/>
        </div>
    )
}
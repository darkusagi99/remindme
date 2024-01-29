import { auth } from '../services/firebase';
import {User} from "@firebase/auth";

import '../App.css';
/** Component for Logout Window - v9 version */
export default function Logout () {
    return (
        <div> { /* logoff DIV */ }
            <div className="p-2 bd-highlight">
                <button type="button" className="btn btn-default btn-xs active" onClick={() => auth.signOut()}>Sign out</button>
            </div>
        </div>
    )
}

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firebase';

import '../App.css';
import Legal from "./Legal";
/** Component for login Window - v9 version */
export default function Login() {
  return (
    <div className="text-center">
		<div>
			<button className="btn btn-default btn-lg active" onClick={() => {
				  signInWithPopup(auth, provider).then(() => {});
				}}>
			<i className="fab fa-google">
			</i>Sign in with google</button>
		</div>
		<Legal />
    </div>
  )
}

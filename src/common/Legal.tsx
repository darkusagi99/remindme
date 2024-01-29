import * as React from 'react';

import '../App.css';
/** Component for login Window - v9 version */
export default function Legal() {
    return (
        <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <figure className="text-center">
                <figcaption className="blockquote-footer">
                By connecting to this application, you accept that all contest information are saved inside the application database.<br />
                All available data is directly visible inside the interface.<br />
                Data can be directly deleted in the interface or by the contest creator.
                </figcaption>
            </figure>
        </div>
    );
    }

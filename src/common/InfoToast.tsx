import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import {ToastContainer} from "react-bootstrap";

function InfoToast(toastMessage: string, displayToast: boolean, setShowToast: (value: (((prevState: boolean) => boolean) | boolean)) => void) {

    return (
            <ToastContainer position="bottom-center">
                <Toast onClose={() => setShowToast(false)} show={displayToast} delay={3000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
    );
}

export default InfoToast;
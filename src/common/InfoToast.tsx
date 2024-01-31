import React from 'react';
import Toast from 'react-bootstrap/Toast';
import {ToastContainer} from "react-bootstrap";
import ToastProps from "../types/toast-props";

function InfoToast(toastParam : ToastProps, setToastParam : (newProps : ToastProps) => void) {

    return (
            <ToastContainer position="bottom-center">
                <Toast onClose={() => setToastParam({toastMessage : "", showToast : false})} show={toastParam.showToast} delay={3000} autohide>
                    <Toast.Body>{toastParam.toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
    );
}

export default InfoToast;
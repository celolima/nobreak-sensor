import React from 'react';
import { Alert } from 'reactstrap';
import './alert.css'

const alertLoadingDanger = (props) => {
    const color = props.serverError ? 'danger' : 'warning';
    const msg = props.serverError ? 'Não foi possível conectar com o servidor' : 'Loading...!'
    return (
        <Alert className='alert-size' color={color}>{msg}</Alert>
    );
};

export default alertLoadingDanger;
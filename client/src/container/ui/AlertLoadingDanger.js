import React from 'react';
import { Alert } from 'reactstrap';

const alertLoadingDanger = (props) => {
    const color = props.serverError ? 'danger' : 'warning';
    const msg = props.serverError ? 'Não foi possível conectar com o servidor' : 'Loading...!'
    return (
        <Alert className='center' color={color}>{msg}</Alert>
    );
};

export default alertLoadingDanger;
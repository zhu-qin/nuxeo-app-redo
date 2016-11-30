import React from 'react';

const ErrorsComponent = ({ errors }) => {
    return (
        <div>{JSON.stringify(errors)}</div>
    );
};


export default ErrorsComponent;
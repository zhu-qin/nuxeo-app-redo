import React from 'react';

class ErrorsComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let errors;
        if (this.props.errors.length > 0) {
            errors = this.props.errors[0].message;
        }

        return (
            <div className="main-wrapper">
                <div className="error-messages">{errors}</div>
                {this.props.children}
            </div>

        )
    }
};


export default ErrorsComponent;
import React from 'react';

class ErrorsComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.errors)
        return (
            <div>
                {JSON.stringify(this.props.errors)}
                {this.props.children}
            </div>

        )
    }
};


export default ErrorsComponent;
import { connect } from 'react-redux';
import { receiveErrors } from '../../../actions/error_actions';

import ErrorsComponent from './errors_component.jsx';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = (dispatch) => ({
    receiveErrors: (errors) => dispatch(receiveErrors(errors))
});

const ErrorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorsComponent);

export default ErrorContainer;
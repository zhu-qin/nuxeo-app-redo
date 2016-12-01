import { connect } from 'react-redux';
import { receiveErrors, clearErrors, flashErrors } from '../../actions/error_actions';
import ErrorsComponent from './errors_component.jsx';

const mapStateToProps = ({ errors }) => ({
    errors: errors
});

const mapDispatchToProps = (dispatch) => ({
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    clearErrors: () => dispatch(clearErrors()),
    flashErrors: (errors) => dispatch(flashErrors(errors))
});

const ErrorContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorsComponent);

export default ErrorContainer;
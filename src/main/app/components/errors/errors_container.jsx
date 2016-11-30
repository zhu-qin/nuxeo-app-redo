import { connect } from 'react-redux';
import { receiveErrors, clearErrors } from '../../actions/error_actions';
import ErrorsComponent from './errors_component.jsx';

const mapStateToProps = ({ errors }) => ({
    errors: errors
});

const mapDispatchToProps = (dispatch) => ({
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    clearErrors: () => dispatch(clearErrors())
});

const ErrorContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorsComponent);

export default ErrorContainer;
import PropTypes from 'prop-types';
const { Snackbar, Alert } = require('@mui/material');

const AlertContacts = ({
  success,
  error,
  handleClose,
  successText = 'Add contact success.',
  errorText = 'Such contact already exists.',
}) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        onClose={handleClose}
        open={error}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity="error">
          {errorText}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        onClose={handleClose}
        open={success}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity="success">
          {successText}
        </Alert>
      </Snackbar>
    </>
  );
};

AlertContacts.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  handleClose: PropTypes.func,
  successText: PropTypes.string,
  errorText: PropTypes.string,
};

export default AlertContacts;

/**
 *
 * DeleteDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

function DeleteDialog(props) {
  const { open, onClose, onDelete, intl, title, description } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={intl.formatMessage({...messages.title})}
      aria-describedby={intl.formatMessage({...messages.description})}
    >
      <DialogTitle id="alert-dialog-title">
        {title || <FormattedMessage {...messages.title} />}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description || <FormattedMessage {...messages.description} />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button onClick={onDelete} color="secondary" autoFocus>
          <FormattedMessage {...messages.delete} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  description: PropTypes.any,
  title: PropTypes.any,
};

export default injectIntl(DeleteDialog);

/**
 *
 * ChangeDosageDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const ListItemInfo = styled.div`
  margin-left: 5rem;
`;

/* eslint-disable react/prefer-stateless-function */
class ChangeDosageDialog extends React.PureComponent {
  state = {};

  doseInstructionsSigns = ['Reduce', 'Increase'];

  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Dialog
        aria-labelledby="change-dosage-dialog"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle id="form-dialog-title">Change Dosage</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Single-line item"
                secondary="Secondary text"
              />
              <ListItemInfo>
                <Typography variant="caption">
                  Caption
                </Typography>
              </ListItemInfo>

            </ListItem>
            <li>
              <Divider/>
            </li>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.onSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ChangeDosageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChangeDosageDialog;

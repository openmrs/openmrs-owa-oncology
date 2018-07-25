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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const ListItemInfo = styled.div`
  margin-left: 6rem;
`;
const Warning = styled.div`
  background: ${yellow[100]};
  padding: 0.5rem 1.5rem;
`;
const Content = styled.div`
  min-width: 400px;
`;

const OptionalButton = styled.button`
  display: block;
  font-size: 0.75em;
  border-bottom: 1px dotted ${grey[400]};
  color: ${grey[500]};
`;

/* eslint-disable react/prefer-stateless-function */
class ChangeDosageDialog extends React.PureComponent {
  state = { reduce: true, percentage: '' };

  toggle = () => {
    this.setState({ reduce: !this.state.reduce });
  }

  render() {
    const { medications } = this.props;
    const { reduce } = this.state;
    return (
      <Dialog
        aria-labelledby="change-dosage-dialog"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Content>
          <DialogTitle id="form-dialog-title">Change Dosage</DialogTitle>
          <List>
            {medications.map(medication =>
              [
                <ListItem key={`medication-${medication.drug.uuid}`}>
                  <ListItemText
                    primary={medication.drug.name}
                    secondary="Secondary text"
                  />
                  <ListItemInfo>
                    {this.state.percentage !== '' &&
                      <Typography variant="caption">
                        {reduce ? <span>-</span> : <span>+</span>}
                        {this.state.percentage}
                      </Typography>
                    }
                    {this.state.percentage === '' &&
                      <Typography variant="caption">
                        No reduction
                      </Typography>
                    }
                  </ListItemInfo>
                </ListItem>,
                <li key={`divider-${medication.drug.uuid}`}>
                  <Divider/>
                </li>,
              ]
            )}
          </List>
          {!reduce &&
            <Warning>
              <Typography variant="caption">
                <FontAwesomeIcon icon={faExclamationTriangle} color={yellow[700]} /> Increasing the dose can be dangerous
              </Typography>
            </Warning>
          }
          <DialogContent>
            <TextField
              fullWidth
              id="dosageReduction"
              label={`${reduce ? 'Reduce' : 'Increase'} the dosage for all drugs by`}
              style={{ widht: '100px' }}
              value={this.state.percentage}
              onChange={e => this.setState({ percentage: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {reduce ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                  </InputAdornment>
                ),
              }}
              placeholder="20%"
              margin="normal"
            />
            <OptionalButton
              onClick={this.toggle}
            >
              {reduce ? 'I want to increase dosage' : 'I want to reduce dosage'}
            </OptionalButton>
          </DialogContent>
        </Content>
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
  medications: PropTypes.array,
};

export default ChangeDosageDialog;

/**
 *
 * EditMedicationDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Textarea from 'components/Textarea';

/* eslint-disable react/prefer-stateless-function */
class EditMedicationDialog extends React.PureComponent {
  state = {
    units: 0,
    route: 0,
    doseInstructionsSign: 0,
  };

  units = ['ml', 'mg', 'l'];
  routes = ['Oral', 'IV', 'PO'];
  doseInstructionsSigns = ['Reduce', 'Increase'];

  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Dialog
        aria-labelledby="edit-medication-dialog"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <Grid container spacing={16}>
            <Grid item xs={4}>
              <FormLabel>Medication</FormLabel>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subheading" gutterBottom>
                Dexamethasone
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Dose</FormLabel>
            </Grid>
            <Grid item xs={4}>
              <TextField id="dose" type="text" fullWidth defaultValue="1000" />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  value={this.state.units}
                  onChange={this.handleSelect}
                  inputProps={{
                    name: 'units',
                    id: 'units',
                  }}
                >
                  {this.units.map((unit, i) => (
                    <MenuItem key={`unit-${unit}`} value={i}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Dose instructions</FormLabel>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  value={this.state.doseInstructionsSign}
                  onChange={this.handleSelect}
                  inputProps={{
                    name: 'dose-instructions-sign',
                    id: 'dose-instructions-sign',
                  }}
                >
                  {this.doseInstructionsSigns.map((sign, i) => (
                    <MenuItem key={`dose-instructions-sign-${sign}`} value={i}>
                      {sign}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="dose-instructions"
                type="text"
                fullWidth
                defaultValue="20%"
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Route</FormLabel>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  value={this.state.route}
                  onChange={this.handleSelect}
                  inputProps={{
                    name: 'route',
                    id: 'route',
                  }}
                >
                  {this.routes.map((route, i) => (
                    <MenuItem key={`route-${route}`} value={i}>
                      {route}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <FormLabel>Instructions</FormLabel>
            </Grid>
            <Grid item xs={8}>
              <Textarea
                rows="3"
                multiid="medication"
                type="text"
                defaultValue="Once prior chemotherapy"
                fullWidth
              />
            </Grid>
          </Grid>
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

EditMedicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditMedicationDialog;

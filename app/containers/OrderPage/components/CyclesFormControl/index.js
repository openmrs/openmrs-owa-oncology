/**
 *
 * CyclesFormControl
 *
 */

import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

/* eslint-disable react/prefer-stateless-function */
class CyclesFormControl extends React.PureComponent {
  state = { cycleTemplate: '0', duration: 0 };

  durations = ['1 week', '2 weeks', '3 weeks', '4 weeks', '5 weeks'];

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <FormControl component="fieldset" required>
        <RadioGroup
          aria-label="Gender"
          name="gender1"
          value={this.state.cycleTemplate}
          onChange={(e, cycleTemplate) => {
            this.setState({ cycleTemplate });
          }}
        >
          <FormControlLabel
            value="0"
            control={<Radio color="primary" />}
            label={
              <span>
                Every&nbsp;&nbsp;
                <FormControl>
                  <Select
                    value={this.state.duration}
                    onChange={this.handleSelect}
                    inputProps={{
                      name: 'duration',
                      id: 'duration',
                    }}
                  >
                    {this.durations.map((duration, i) => (
                      <MenuItem value={i} key={`duration-${duration}`}>
                        {duration}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                &nbsp;&nbsp;x&nbsp;&nbsp;
                <TextField
                  style={{ width: '50px' }}
                  id="cycles"
                  defaultValue="6"
                />
                &nbsp;&nbsp;cycles
              </span>
            }
          />
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label={
              <span>
                Day&nbsp;&nbsp;
                <TextField
                  style={{ width: '80px' }}
                  id="days"
                  placeholder="1, 8, 15"
                />
                &nbsp;&nbsp;of&nbsp;&nbsp;
                <TextField
                  style={{ width: '50px' }}
                  id="day-duration"
                  defaultValue="28"
                />
                &nbsp;&nbsp;day cycle x&nbsp;&nbsp;
                <TextField
                  style={{ width: '50px' }}
                  id="day-cycles"
                  defaultValue="6"
                />
                &nbsp;&nbsp;cycles
              </span>
            }
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

CyclesFormControl.propTypes = {};

export default CyclesFormControl;

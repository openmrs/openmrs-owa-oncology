/**
 *
 * CyclesFormControl
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldChip from 'components/TextFieldChip';

const isNumber = value => !Number.isNaN(Number(value));

/* eslint-disable react/prefer-stateless-function */
class CyclesFormControl extends React.PureComponent {
  state = { cycleTemplate: '0', daysValue: '' };

  durations = [
    {
      value: 7,
      label: '1 week',
    },
    ...[2, 3, 4, 5, 6].map(week => ({
      value: 7 * week,
      label: `${week} weeks`,
    })),
  ];

  handleSelectCycleDuration = e => {
    this.props.onCyclesDescriptionChange({
      ...this.props.cyclesDescription,
      cycleDuration: e.target.value,
    });
  };

  handleCycleDurationChange = e => {
    this.props.onCyclesDescriptionChange({
      ...this.props.cyclesDescription,
      cycleDuration: +e.target.value,
    });
  };

  handleCyclesChange = e => {
    this.props.onCyclesDescriptionChange({
      ...this.props.cyclesDescription,
      cycles: e.target.value,
    });
  };

  handleDaysChange = e => {
    const { value } = e.target;
    const substr = value.substring(0, value.length - 1);
    if (substr !== '' && isNumber(substr) && !isNumber(value)) { // eslint-disable-line
      this.addDay(substr);
    } else {
      this.setState({ daysValue: value });
    }
  };

  handleDaysKeyDown = e => {
    const { days } = this.props.cyclesDescription;
    if (e.which === 13) {
      this.addDay(this.state.daysValue);
    } else if (e.which === 8 && this.state.daysValue === '') {
      this.props.onCyclesDescriptionChange({
        ...this.props.cyclesDescription,
        days: days.slice(0, -1),
      });
    }
  };

  addDay(day) {
    const { days } = this.props.cyclesDescription;
    if (!days.includes(day)) {
      this.props.onCyclesDescriptionChange({
        ...this.props.cyclesDescription,
        days: [...days, day],
      });
      this.setState({ daysValue: '' });
    }
  }

  handleDayDelete(day) {
    const { days } = this.props.cyclesDescription;
    this.props.onCyclesDescriptionChange({
      ...this.props.cyclesDescription,
      days: days.filter(d => d !== day),
    });
  };

  render() {
    const { cycles, cycleDuration, days } = this.props.cyclesDescription;
    const { cycleTemplate } = this.state;

    return (
      <FormControl component="fieldset" required>
        <RadioGroup
          aria-label="Cycle Template"
          name="cycleTemplate"
          value={this.state.cycleTemplate}
          onChange={(e, value) => {
            this.setState({ cycleTemplate: value });
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
                    value={cycleTemplate === '0' ? cycleDuration : ''}
                    onChange={this.handleSelectCycleDuration}
                    disabled={cycleTemplate !== '0'}
                    displayEmpty
                    inputProps={{
                      name: 'duration',
                      id: 'duration',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.durations.map(({ value, label }) => (
                      <MenuItem value={value} key={`duration-${label}`}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                &nbsp;&nbsp;x&nbsp;&nbsp;
                <TextField
                  style={{ width: '50px' }}
                  disabled={cycleTemplate !== '0'}
                  id="cycles"
                  placeholder="6"
                  value={cycleTemplate === '0' ? cycles : ''}
                  onChange={this.handleCyclesChange}
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
                  id="days"
                  onChange={this.handleDaysChange}
                  disabled={cycleTemplate !== '1'}
                  onKeyDown={this.handleDaysKeyDown}
                  placeholder={cycleTemplate === '1' && days.length > 0 ? '' : '1, 8, 15'}
                  value={cycleTemplate === '1' ? this.state.daysValue : ''}
                  InputProps={{
                    startAdornment: cycleTemplate === '1' && days.length > 0 ? (
                      <InputAdornment position="start">
                        {days.map(day=>
                          <TextFieldChip
                            key={day}
                            label={day}
                            onDelete={() => this.handleDayDelete(day)}
                          />
                        )}
                      </InputAdornment>
                    ) : null,
                  }}
                />
                &nbsp;&nbsp;of&nbsp;&nbsp;
                <TextField
                  style={{ width: '50px' }}
                  id="day-duration"
                  disabled={cycleTemplate !== '1'}
                  placeholder="28"
                  value={cycleTemplate === '1' ? cycleDuration : ''}
                  onChange={this.handleCycleDurationChange}
                />
                &nbsp;&nbsp;day cycle x&nbsp;&nbsp;
                <TextField
                  style={{ width: '50px' }}
                  id="day-cycles"
                  disabled={cycleTemplate !== '1'}
                  placeholder="6"
                  value={cycleTemplate === '1' ? cycles : ''}
                  onChange={this.handleCyclesChange}
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

CyclesFormControl.propTypes = {
  cyclesDescription: PropTypes.object.isRequired,
  onCyclesDescriptionChange: PropTypes.func.isRequired,
};

export default CyclesFormControl;

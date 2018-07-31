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
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const ListItemInfo = styled.div`
  margin-left: 6rem;
`;
const Warning = styled.div`
  background: ${yellow[100]};
  padding: 0.5rem 1.5rem;
`;
const Content = styled.div`
  width: 600px;
`;
const SliderLabel = styled.div`
  margin: 1em 0 0.5em;
`
const SliderWrapper = styled.div`
  margin: 0 1.5em 0 0.4em;
`

const OptionalButton = styled.button`
  font-size: 0.75rem;
  display: bolck;
  margin-top: 2em;
  padding: 0.5em 0;
  border-bottom: 1px dotted ${grey[400]};
  color: ${grey[500]};
`;

/* eslint-disable react/prefer-stateless-function */
class ChangeDosageDialog extends React.PureComponent {
  state = { reduce: true, percentage: 0 };

  toggle = () => {
    this.setState({ reduce: !this.state.reduce, percentage: 0 });
  }

  handleSave = () => {
    this.props.onSave(
      this.props.medications.map(medication => ({
        ...medication,
        dosingModifications: {
          sign: this.state.reduce ? -1 : 1,
          value: this.state.percentage,
          units: '%',
        },
      })),
    );
  }

  renderDosingModifications(medication) {
    return (
      <span>
        {medication.dosingModifications.sign === 1 ? <span>&plus;</span> : <span>&minus;</span>}
        {medication.dosingModifications.value}{medication.dosingModifications.units}
      </span>
    );
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
                <ListItem key={`medication-${medication.uuid}`}>
                  <ListItemText
                    primary={medication.drugConcept}
                    secondary={medication.dosingInstructions.dosingTiming}
                  />
                  <ListItemInfo>
                    {this.state.percentage !== 0 &&
                      <Typography variant="caption">
                        {reduce ? <span>-</span> : <span>+</span>}
                        {this.state.percentage}
                        %
                      </Typography>
                    }
                    {this.state.percentage === 0 &&
                      <Typography variant="caption">
                        {(medication.dosingModifications && this.renderDosingModifications(medication))
                          || 'No reduction'
                        }
                      </Typography>
                    }
                  </ListItemInfo>
                </ListItem>,
                <li key={`divider-${medication.uuid}`}>
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
            <SliderLabel>
              <Typography variant="body1">
                {reduce ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} /> }
                &nbsp;
                {`${reduce ? 'Reduce' : 'Increase'} the dosage for all drugs by`}
              </Typography>
            </SliderLabel>
            <SliderWrapper>
              {reduce &&
                <SliderWithTooltip
                  value={this.state.percentage}
                  onChange={percentage => {
                    this.setState({ percentage });
                  }}
                  min={0}
                  max={50}
                  tipFormatter={value => `-${value}%`}
                  marks={{
                    0: <strong>0</strong>,
                    10: '-10%',
                    20: '-20%',
                    30: '-30%',
                    40: '-40%',
                    50: '-50%',
                  }}
                  step={5}
                />
              }
              {!reduce &&
                <SliderWithTooltip
                  min={0}
                  max={50}
                  tipFormatter={value => `+${value}%`}
                  value={this.state.percentage}
                  onChange={percentage => {
                    this.setState({ percentage });
                  }}
                  marks={{
                    0: <strong>0</strong>,
                    10: '+10%',
                    20: '+20%',
                    30: '+30%',
                    40: '+40%',
                    50: '+50%',
                  }}
                  step={5}
                  railStyle={{ backgroundColor: yellow[200] }}
                />
              }
            </SliderWrapper>
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
          <Button onClick={this.handleSave} color="primary">
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

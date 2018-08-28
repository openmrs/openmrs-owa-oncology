/**
 *
 * SummaryMedListControl
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ListItem, List, Divider, ListItemText } from '@material-ui/core';

import Tag from '../../../../components/Tag';

const SytledListHeader = styled(ListItem)`
  background: #f5f5f5;
`;

const Details = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const DetailsKey = styled.dt`
  font-weight: bold;
  flex: 1 0 20%;
  margin-bottom: 0.25em;
`;

const DetailsItem = styled.dd`
  flex: 1 0 80%;
  margin: 0 0 0.25em;
`;

/* eslint-disable react/prefer-stateless-function */
class SummaryMedListControl extends React.PureComponent {

  renderDetails(medication) {
    const { dosingInstructions, dose, doseUnits } = medication;
    const { dosingTimingInstructions, dosingDilutionInstructions } = dosingInstructions;

    return (
      <Details>
        <DetailsKey>Instructions:</DetailsKey>
        <DetailsItem>
          {dosingTimingInstructions} {dosingDilutionInstructions || ''}
        </DetailsItem>
        <DetailsKey>Dose:</DetailsKey>
        <DetailsItem>
          {dose} {doseUnits}
        </DetailsItem>
      </Details>
    );
  }

  render() {
    const { medications, orderIndex, label } = this.props
    return (
      <List>
        <SytledListHeader>
          <ListItemText primary={label} />
        </SytledListHeader>
        {medications && medications[orderIndex].length > 0 &&
        medications[orderIndex].map((med) => (
          <div key={`drug-${med.uuid}`}>
            <ListItem >
              <ListItemText
                primary={med.drugConcept}
                secondary={this.renderDetails(med)}
              />
              {!!med.dosingInstructions.dosingAdjustmentPercentage &&
                <Tag
                  value={`${Math.abs(med.dosingInstructions.dosingAdjustmentPercentage)}%`}
                  sign={med.dosingInstructions.dosingAdjustmentPercentage >= 0 ? <span>&#43;</span> : <span>&#8722;</span>}
                />
              }
            </ListItem>
            <Divider/>
          </div>
        ))}
      </List>
    );
  }
}

SummaryMedListControl.propTypes = {
  medications: PropTypes.array.isRequired,
  orderIndex: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

SummaryMedListControl.propTypes = {};

export default SummaryMedListControl;

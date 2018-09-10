/**
 *
 * SummaryMedListControl
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ListItem, List, Divider, ListItemText, Typography } from '@material-ui/core';

import Tag from '../../../../components/Tag';

const SytledListHeader = styled(ListItem)`
  background: #f5f5f5;
`;

const Details = styled.ul`
  margin: 0.25em 0 0 0;
  padding: 0;
  font-size: 0.825em;
`;

const DetailsKey = styled.dt`
  display: inline-block;
  margin-bottom: 0.25em;
  min-width: 100px;
`;

const DetailsItem = styled.dd`
  margin: 0;
  display: inline-block;
`;

const ListItemHead = styled.div`
  width: 100%;
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
        <br/>
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
              <ListItemHead>
                <Typography variant="body2">
                  {med.drugConcept}
                </Typography>
                {this.renderDetails(med)}
              </ListItemHead>
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

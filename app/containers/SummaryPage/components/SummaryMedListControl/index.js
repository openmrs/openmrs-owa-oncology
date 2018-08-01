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

/* eslint-disable react/prefer-stateless-function */
class SummaryMedListControl extends React.PureComponent {


  render() {
    const { medications, orderIndex, label } = this.props
    return (
      <List>
        <SytledListHeader>
          <ListItemText primary={label} />
        </SytledListHeader>
        {medications && medications[orderIndex].length > 0 &&
        medications[orderIndex].map(({uuid, drugConcept, dosingInstructions }) => (
          <div key={`drug-${uuid}`}>
            <ListItem >
              <ListItemText
                primary={drugConcept}
                secondary={`${dosingInstructions.dosingTimingInstructions} ${dosingInstructions.dosingDilutionInstructions ? dosingInstructions.dosingDilutionInstructions : ''}`}
              />
              {!!dosingInstructions.dosingAdjustmentPercentage &&
                <Tag
                  value={`${Math.abs(dosingInstructions.dosingAdjustmentPercentage)}%`}
                  sign={dosingInstructions.dosingAdjustmentPercentage >= 0 ? <span>&#43;</span> : <span>&#8722;</span>}
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

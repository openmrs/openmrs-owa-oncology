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
        {medications && medications[orderIndex].length > 0 && medications[orderIndex].map(({uuid, drug, administrationInstructions, dosingModifications}) => (
          <div key={`drug-${uuid}`}>
            <ListItem >
              <ListItemText
                primary={drug.name}
                secondary={administrationInstructions}
              />
              {dosingModifications &&
              <Tag
                value={`${dosingModifications.value}${dosingModifications.units}`}
                sign={dosingModifications.sign === 1 ? <span>&plus;</span> : <span>&minus;</span>}
              />}
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

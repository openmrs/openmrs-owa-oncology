/**
 *
 * MedicationTable
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import MedicationTableToolbar from './MedicationTableToolbar';
import MedicationTableHead from './MedicationTableHead';

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

class MedicationTable extends React.Component {
  state = { selected: [] };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.medications.map(({ drug }) => drug.uuid) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { medications } = this.props;
    const { selected } = this.state;

    return (
      <Wrapper>
        <MedicationTableToolbar
          title={this.props.name}
          numSelected={selected.length}
        />
        <div>
          <Table aria-labelledby="tableTitle">
            <MedicationTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={medications.length}
            />
            <TableBody>
              {medications.map(medication =>
                <TableRow
                  onClick={e => this.handleClick(e, medication.drug.uuid)}
                  role="checkbox"
                  aria-checked={this.isSelected(medication.drug.uuid)}
                  tabIndex={-1}
                  key={medication.drug.uuid}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={this.isSelected(medication.drug.uuid)} />
                  </TableCell>
                  <TableCell padding="none">
                    {medication.drug.name}
                  </TableCell>
                  <TableCell >
                    {medication.dosingInstructions.dose} {medication.dosingInstructions.doseUnits}
                  </TableCell>
                  <TableCell>{medication.dosingInstructions.route}</TableCell>
                  <TableCell>{medication.administrationInstructions}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Wrapper>
    );
  }
}

MedicationTable.propTypes = {
  name: PropTypes.string,
  medications: PropTypes.array,
};

export default MedicationTable;

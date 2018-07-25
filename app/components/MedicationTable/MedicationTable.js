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

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import DeleteDialog from 'components/DeleteDialog';
import EditMedicationDialog from './components/EditMedicationDialog';
import ChangeDosageDialog from './components/ChangeDosageDialog';
import MedicationTableToolbar from './components/MedicationTableToolbar';
import MedicationTableHead from './components/MedicationTableHead';
import messages from './messages';

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

class MedicationTable extends React.Component {
  state = { selected: [], openDialog: '' };

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

  getSelectedMedications() {
    return this.state.selected.map(uuid =>
      this.props.medications.find(medication =>
        medication.drug.uuid === uuid
      )
    )
  }

  getDeleteDialogDescription(selectedMedications) {
    const { intl } = this.props;
    let description = '';
    if (selectedMedications.length > 1) {
      description = intl.formatMessage({...messages.deleteDialogDescriptionPlural});
    } else if (selectedMedications.length === 1) {
      description = <FormattedMessage
        {...messages.deleteDialogDescription}
        values={{ medication: <strong>{selectedMedications[0].drug.name}</strong> }}
      />;
    }
    return description;
  }

  closeDialogs = () => {
    this.setState({ openDialog: '' });
  }

  render() {
    const { medications, intl } = this.props;
    const { selected } = this.state;
    const selectedMedications = this.getSelectedMedications();

    return (
      <Wrapper>
        <MedicationTableToolbar
          title={this.props.name}
          numSelected={selected.length}
          onEdit={() => this.setState({ openDialog: 'edit' })}
          onDelete={() => this.setState({ openDialog: 'delete' })}
          onChangeDosage={() => this.setState({ openDialog: 'change-dosage' })}
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
        {selectedMedications.length === 1 &&
          <EditMedicationDialog
            open={this.state.openDialog === 'edit'}
            onSave={this.closeDialogs}
            onClose={this.closeDialogs}
            medication={selectedMedications[0]}
          />
        }
        <DeleteDialog
          open={this.state.openDialog === 'delete'}
          onClose={this.closeDialogs}
          onDelete={this.closeDialogs}
          title={intl.formatMessage({...messages.deleteDialogTitle})}
          description={this.getDeleteDialogDescription(selectedMedications)}
        />
        {selectedMedications.length >= 1 &&
          <ChangeDosageDialog
            medications={selectedMedications}
            open={this.state.openDialog === 'change-dosage'}
            onClose={this.closeDialogs}
            onSave={this.closeDialogs}
          />
        }
      </Wrapper>
    );
  }
}

MedicationTable.propTypes = {
  name: PropTypes.string,
  medications: PropTypes.array,
  intl: intlShape.isRequired,
};

export default injectIntl(MedicationTable);

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
import Typography from '@material-ui/core/Typography';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import DeleteDialog from 'components/DeleteDialog';
import Tag from 'components/Tag';
import EditMedicationDialog from './components/EditMedicationDialog';
import ChangeDosageDialog from './components/ChangeDosageDialog';
import MedicationTableToolbar from './components/MedicationTableToolbar';
import MedicationTableHead from './components/MedicationTableHead';
import messages from './messages';

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

class MedicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      openDialog: '',
    };
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.medications.map(({ uuid }) => uuid) });
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
        medication.uuid === uuid
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
        values={{ medication: <strong>{selectedMedications[0].drugConcept}</strong> }}
      />;
    }
    return description;
  }

  closeDialogs = () => {
    this.setState({ openDialog: '' });
  }

  saveChanges = (updatedMedications) => {
    this.props.onMedicationsChange(this.props.medications.map(medication => {
      const updatedMedication = updatedMedications
        .find(m => m.uuid === medication.uuid);
      return updatedMedication || medication
    }));
    this.setState({ openDialog: '', selected: [] });
  }

  deleteMedications = () => {
    this.props.onMedicationsChange(this.props.medications.filter(medication =>
      !this.state.selected.some(uuid => medication.uuid === uuid)
    ));
    this.setState({ openDialog: '', selected: [] });
  }

  render() {
    const { medications, intl, readOnly } = this.props;
    const { selected } = this.state;
    const selectedMedications = this.getSelectedMedications();

    return (
      <Wrapper>
        <MedicationTableToolbar
          title={this.props.name}
          numSelected={selected.length}
          readOnly={readOnly}
          onEdit={() => this.setState({ openDialog: 'edit' })}
          onDelete={() => this.setState({ openDialog: 'delete' })}
          onChangeDosage={() => this.setState({ openDialog: 'change-dosage' })}
        />
        <div>
          <Table aria-labelledby="tableTitle">
            <MedicationTableHead
              readOnly={readOnly}
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={medications.length}
            />
            <TableBody>
              {medications.map(medication =>
                <TableRow
                  onClick={e => !readOnly && this.handleClick(e, medication.uuid)}
                  role="checkbox"
                  aria-checked={this.isSelected(medication.uuid)}
                  tabIndex={-1}
                  key={medication.uuid}
                >
                  {!readOnly &&
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={this.isSelected(medication.uuid)} />
                    </TableCell>
                  }
                  <TableCell>
                    {medication.drugConcept}
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>
                      {medication.dose} {medication.doseUnits}
                      &nbsp;&nbsp;
                      {medication.dosingModifications &&
                        <Tag
                          value={`${medication.dosingModifications.value}${medication.dosingModifications.units}`}
                          sign={medication.dosingModifications.sign === 1 ? <span>&plus;</span> : <span>&minus;</span>}
                        />
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>{medication.route}</TableCell>
                  <TableCell>{medication.dosingInstructions.dosingTiming}</TableCell>
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
          onDelete={this.deleteMedications}
          title={intl.formatMessage({...messages.deleteDialogTitle})}
          description={this.getDeleteDialogDescription(selectedMedications)}
        />
        {selectedMedications.length >= 1 &&
          <ChangeDosageDialog
            medications={selectedMedications}
            open={this.state.openDialog === 'change-dosage'}
            onClose={this.closeDialogs}
            onSave={this.saveChanges}
          />
        }
      </Wrapper>
    );
  }
}

MedicationTable.propTypes = {
  name: PropTypes.string,
  medications: PropTypes.array,
  onMedicationsChange: PropTypes.func,
  intl: intlShape.isRequired,
  readOnly: PropTypes.bool,
};

MedicationTable.defaultProps = {
  readOnly: false,
}

export default injectIntl(MedicationTable);

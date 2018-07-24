/*
 * MedicationTable Messages
 *
 * This contains all the text for the MedicationTable component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  chemoHeader: {
    id: 'app.components.MedicationTable.chemoHeader',
    defaultMessage: 'CHEMOTHERAPY',
  },
  changeDosage: {
    id: 'app.components.MedicationTable.changeDosage',
    defaultMessage: 'Change Dosage',
  },
  edit: {
    id: 'app.components.MedicationTable.edit',
    defaultMessage: 'Edit',
  },
  delete: {
    id: 'app.components.MedicationTable.delete',
    defaultMessage: 'Delete',
  },
  deleteDialogDescriptionPlural: {
    id: 'app.components.MedicationTable.deleteDialogDescriptionPlural',
    defaultMessage: 'Are you sure you want to remove the selected medications?',
  },
  deleteDialogDescription: {
    id: 'app.components.MedicationTable.deleteDialogDescription',
    defaultMessage: 'Are you sure you want to remove {medication}?',
  },
  deleteDialogTitle: {
    id: 'app.components.MedicationTable.deleteDialogTitle',
    defaultMessage: 'Delete medication',

  },
});

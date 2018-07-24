/**
 *
 * MedicationTableHead
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';


const columnData = [
  {
    id: 'medication',
    numeric: false,
    disablePadding: true,
    label: 'MEDICATION',
  },
  { id: 'dose', numeric: false, disablePadding: false, label: 'DOSE' },
  { id: 'route', numeric: false, disablePadding: false, label: 'ROUTE' },
  {
    id: 'instructions',
    numeric: false,
    disablePadding: false,
    label: 'INSTRUCTIONS',
  },
];

function MedicationTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columnData.map(
          column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'default'}
            >
              {column.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

MedicationTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default MedicationTableHead;

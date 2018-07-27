/**
 *
 * TextFieldChip
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const styles = {
  root: {
    height: 24,
    marginRight: 3,
  },
  deleteIcon: {
    margin: '0 8px 0 0',
  },
  label: {
    padding: '0 10px',
  },
};

function TextFieldChip(props) {
  return <Chip deleteIcon={<FontAwesomeIcon icon={faTimes} />} {...props} />;
}

export default withStyles(styles)(TextFieldChip);

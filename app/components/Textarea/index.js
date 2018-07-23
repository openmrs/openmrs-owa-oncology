/**
 *
 * Textarea
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  input: {
    border: '1px solid #ced4da',
    padding: '0.5em',
  },
});

function Textarea(props) {
  return (
    <TextField
      InputProps={{
        disableUnderline: true,
        classes: {
          input: props.classes.input,
        },
      }}
      multiline
      {...props}
    />
  );
}

Textarea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Textarea);

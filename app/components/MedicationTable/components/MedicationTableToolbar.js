/**
 *
 * MedicationTableToolbar
 *
 */

import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import grey from '@material-ui/core/colors/grey';

import messages from '../messages';

const styles = theme => ({
  root: {
    justifyContent: 'space-between',
    background: grey[100],
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const Wrapper = styled.div`
  position: sticky;
  left: 0;
`;

const ToolbarTitle = styled.div`
`;

const ToolbarActions = styled.div`
`;

function MedicationTableToolbar(props) {
  const { numSelected, classes, readOnly } = props;

  return (
    <Wrapper>
      <Toolbar className={classes.root}>
        <ToolbarTitle>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="subheading">{props.title}</Typography>
          )}
        </ToolbarTitle>

        {!readOnly &&
          <ToolbarActions>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={props.onChangeDosage}
              disabled={numSelected === 0}
            >
              <FormattedMessage {...messages.changeDosage} />
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={props.onEdit}
              disabled={numSelected !== 1}
            >
              <FormattedMessage {...messages.edit} />
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              onClick={props.onDelete}
              disabled={numSelected === 0}
            >
              <FormattedMessage {...messages.delete} />
            </Button>
          </ToolbarActions>
        }
      </Toolbar>
    </Wrapper>
  );
}

MedicationTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeDosage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MedicationTableToolbar);

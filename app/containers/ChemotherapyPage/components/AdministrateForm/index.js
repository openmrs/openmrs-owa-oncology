/**
 *
 * AdministrateForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Textarea from 'components/Textarea';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const Head = styled.div`
  margin-bottom: 1em;
`;

const ListWrapper = styled.div`
  margin-bottom: 1em;
`;

const Actions = styled.div`
  text-align: center;
  margin: 2em 0;
`;

const items = [{
  title: 'Prednisone',
  dose: '100mg',
}, {
  title: 'Doxorubicin',
  dose: '50 mg/m2',
}, {
  title: 'Vincristine',
  dose: '1.4mg/m2',
}];

function AdministrateForm() {
  return (
    <div>
      <Head>
        <Typography variant="headline">
          CHOP: Protocol for Non Hodgkin Lymphome
        </Typography>
        <Typography variant="subheading">
          Cycle 3 of 6
        </Typography>
      </Head>
      <Grid container spacing={16}>
        <Grid item md={10} sm={12} lg={8}>
          <Typography variant="subheading">Please record the dosage given to the patient.</Typography>
          <ListWrapper>
            <List>
              {items.map(item =>
                <ListItem button divider>
                  <ListItemText primary={item.title} secondary={item.dose} />
                  <TextField
                    id="mg"
                    label="mg"
                    style={{ width: 60 }}
                    placeholder="-"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  &nbsp;
                  &nbsp;
                  <TextField
                    id="ml"
                    label="ml"
                    style={{ width: 60 }}
                    placeholder="-"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ListItem>
              )}
            </List>
          </ListWrapper>
          <Typography variant="subheading">Cycle summary notes</Typography>
          <Textarea
            rows="3"
            fullWidth
            placeholder="Typo your summary here..."
          />
          <Actions>
            <Button
              variant="outlined"
              component={Link}
              to="/chemotherapy"
            >
              Cancel
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/chemotherapy"
            >
              Submit
            </Button>
          </Actions>
        </Grid>
      </Grid>
    </div>
  );
}

AdministrateForm.propTypes = {};

export default AdministrateForm;

/**
 *
 * MedicationList
 *
 */

import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
// import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

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

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
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
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ),
          this,
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    background: '#f5f5f5',
  },
  // highlight:
  //   theme.palette.type === 'light' ?
  //     {
  //       color: theme.palette.secondary.main,
  //       backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  //     } : {
  //       color: theme.palette.text.primary,
  //       backgroundColor: theme.palette.secondary.dark,
  //     },
  spacer: {
    flex: '1 1 auto',
  },
  actions: {
    color: theme.palette.text.secondary,
    flex: '0 0 auto',
  },
  buttonContainer: {
    margin: '0px 3px',
    padding: '0px 30px',
  },
  title: {
    flex: '0 0 auto',
    fontSize: '10px',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="subheading">{props.title}</Typography>
        )}
      </div>
      <div className={classes.spacer} />

      {/* List item actions */}
      <div className={classes.actions}>
        <Button
          className={classes.buttonContainer}
          variant="outlined"
          onClick={() => {
            // alert('Change Dosage Clicked');
          }}
          disabled={numSelected > 0}
        >
          <FormattedMessage {...messages.changeDosage} />
        </Button>
        <Button
          className={classes.buttonContainer}
          variant="outlined"
          onClick={() => {
            // alert('Edit Clicked');
          }}
          disabled={numSelected > 0}
        >
          <FormattedMessage {...messages.edit} />
        </Button>
        <Button
          className={classes.buttonContainer}
          variant="outlined"
          onClick={() => {
            // alert('Delete Clicked');
          }}
          disabled={numSelected > 0}
        >
          <FormattedMessage {...messages.delete} />
        </Button>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [
        createData('Cupcake', 305, 3.7, 67),
        createData('Donut', 452, 25.0, 51),
        createData('Eclair', 262, 16.0, 24),
        createData('Frozen yoghurt', 159, 6.0, 24),
      ],
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, medications } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

    return (
      <Wrapper>
        <EnhancedTableToolbar
          title={this.props.name}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {medications
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell padding="none">
                        {n.drug.name}
                      </TableCell>
                      <TableCell >
                        {n.dosingInstructions.dose} {n.dosingInstructions.doseUnits}
                      </TableCell>
                      <TableCell>{n.dosingInstructions.route}</TableCell>
                      <TableCell>{n.administrationInstructions}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Wrapper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  medications: PropTypes.array,
};

export default withStyles(styles)(EnhancedTable);

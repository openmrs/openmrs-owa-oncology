/**
 *
 * NaviList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import Status from 'components/Status';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const Arrow = styled.div`
  font-size: 1.2em;
`;

const Num = styled.div`
  border: 2px solid ${grey[300]};
  color: ${grey[700]};
  width: 35px;
  font-weight: bold;
  height: 35px;
  line-height: 33px;
  text-align: center;
  border-radius: 50%;
`;

const styles = theme => ({
  root: {
    background: '#FFFFFF',
    borderLeft: `5px solid transparent`,
    '&$selected, &$selected:hover': {
      borderLeftColor: theme.palette.primary.main,
      background: grey[50],
    },
    '&:hover': {
      background: grey[200],
      borderLeftColor: grey[200],
    },
  },
  selected: {},
  disabledMenuItem: {
    background: grey[100],
    padding: '0.1em 1.75em',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    pointerEvents: 'none',
  },
});

class NaviList extends React.Component {

  constructor(props) {
    super(props);

    const { items, selectedItem } = props;
    const selectedPanelIndex = items.findIndex(item =>
      item.children.some(subItem => subItem.id === selectedItem)
    );
    const collapse = { 0: true };
    if (selectedPanelIndex > 0) {
      collapse[selectedPanelIndex] = true;
    }
    this.state = { collapse };
  }

  toggleCollapse(index) {
    this.setState({
      collapse: {
        ...this.state.collapse,
        [index]: !this.state.collapse[index],
      },
    });
  }

  isOpen(index) {
    return this.state.collapse[index];
  }

  render() {
    const { items, classes, selectedItem } = this.props;

    return (
      <MenuList>
        {items.map((item, i) =>
          [
            <MenuItem
              key={item.id}
              divider
              classes={{
                root: classes.root,
              }}
              onClick={() => this.toggleCollapse(i)}
            >
              <ListItemText
                secondary={item.title}
                secondaryTypographyProps={{
                  style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
              <Arrow>
                {this.isOpen(i) ?
                  <FontAwesomeIcon icon={faAngleUp} />
                  :
                  <FontAwesomeIcon icon={faAngleDown} />
                }
              </Arrow>
            </MenuItem>,
            <Collapse
              key={`sub-${item.id}`}
              in={this.isOpen(i)}
              timeout="auto"
              unmountOnExit
            >
              <MenuList disablePadding>
                {item.children.map((subItem, j) =>
                  <MenuItem
                    classes={{
                      root: classes.root,
                      selected: classes.selected,
                    }}
                    component={Link}
                    to={`/chemotherapy/${subItem.id}`}
                    divider={j === item.children.length - 1}
                    key={subItem.id}
                    selected={subItem.id === selectedItem}
                  >
                    <Num>C{subItem.cycle}</Num>
                    <ListItemText
                      inset
                      primary={subItem.title}
                      primaryTypographyProps={{
                        style: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        },
                      }}
                    />
                    {subItem.status === 'active' &&
                      <Status
                        type="info"
                        style={{ marginLeft: '0.5em' }}
                      >
                        {subItem.status}
                      </Status>
                    }
                    {subItem.status !== 'active' &&
                      <Typography variant="caption">
                        {subItem.date}
                      </Typography>
                    }
                  </MenuItem>
                )}
              </MenuList>
            </Collapse>,
            i === 0 ? (
              <MenuItem
                classes={{
                  root: classes.disabledMenuItem,
                }}
              >
                Previous regimens
              </MenuItem>
            ) : '',
          ].filter(el => el)
        )}
      </MenuList>
    );
  }
}

NaviList.propTypes = {
  items: PropTypes.array,
  classes: PropTypes.object.isRequired,
  selectedItem: PropTypes.string,
};

export default withStyles(styles)(NaviList);

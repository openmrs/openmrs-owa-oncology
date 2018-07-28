/**
 *
 * NaviList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import grey from '@material-ui/core/colors/grey';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import Status from 'components/Status';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const Arrow = styled.div`
  margin-left: 1em;
  font-size: 1.2em;
`;

const Num = styled.div`
  background: ${grey[100]};
  color: ${grey[900]};
  width: 40px;
  padding-top: 0.5em;
  height: 40px;
  text-align: center;
  border-radius: 50%;
`;

class NaviList extends React.Component {
  state = { open: 0 };

  toggleCollapse(index) {
    this.setState({ open: index });
  }

  render() {
    const { items } = this.props;
    return (
      <List>
        {items.map((item, i) =>
          [
            <ListItem
              key={item.id}
              button
              divider
              onClick={() => this.toggleCollapse(i)}
            >
              <ListItemText
                secondary={item.title}
              />
              <Status type={item.status === 'completed' ? 'success' : 'info'}>{item.status}</Status>
              <Arrow>
                {this.state.open === i ?
                  <FontAwesomeIcon icon={faAngleUp} />
                  :
                  <FontAwesomeIcon icon={faAngleDown} />
                }
              </Arrow>
            </ListItem>,
            <Collapse
              key={`sub-${item.id}`}
              in={this.state.open === i}
              timeout="auto"
              unmountOnExit
            >
              <List disablePadding>
                {item.children.map((subItem, j) =>
                  <ListItem key={subItem.id} button divider>
                    <Num>C{j + 1}</Num>
                    <ListItemText
                      inset
                      primary={subItem.title}
                      secondary={subItem.date}
                    />
                    <Status
                      type={subItem.status === 'completed' ? 'success' : 'info'}
                      style={{ marginRight: '1.5em' }}
                    >
                      {subItem.status}
                    </Status>
                  </ListItem>
                )}
              </List>
            </Collapse>,
          ]
        )}
      </List>
    );
  }
}

NaviList.propTypes = {
  items: PropTypes.array,
};

export default NaviList;

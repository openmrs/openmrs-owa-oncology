/**
 *
 * Status
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const Wrapper = styled.span`
  background: ${props => props.color[100]};
  padding: 0 0.5em;
  border-radius: 4px;
  font-size: 0.7rem;
`;

function Status(props) {
  const { type } = props;

  const colorMap = {
    success: green,
    info: blue,
  }

  return (
    <Wrapper color={colorMap[type]}>
      {props.children}
    </Wrapper>
  )
}

Status.propTypes = {
  type: PropTypes.oneOf(['success', 'info']),
  children: PropTypes.node,
};

Status.defaultProps = {
  type: 'success',
};

export default Status;

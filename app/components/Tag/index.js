/**
 *
 * Tag
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import yellow from '@material-ui/core/colors/yellow';

const Wrapper = styled.span`
  display: inline-block;
  border-radius: 4px;
  padding: 0.5em 1em;
  background: ${yellow[200]};
`;

const Sign = styled.span`
  font-weight: bold;
`;

function Tag(props) {
  return (
    <Wrapper>
      <Sign>{props.sign}</Sign>
      {props.value}
    </Wrapper>
  );
}

Tag.propTypes = {
  value: PropTypes.string,
  sign: PropTypes.any,
};

export default Tag;

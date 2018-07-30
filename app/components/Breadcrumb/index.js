/**
 *
 * Breadcrumb
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  margin: 0;
`;

const ItemText = styled.span`
  padding: 0.4em 0.5em;
  display: inline-block;
  font-weight: bold;
`;

const ItemArrow = styled.span`
  vertical-align: -2px;
`;

function Breadcrumb(props) {
  const { items } = props;
  return (
    <Wrapper>
      {items.map(item =>
        <Item
          key={`item-${item.label}`}
        >
          {item.link && [
            <Button
              key={`btn-${item.label}`}
              component={Link}
              to={item.link}
              size="small"
              style={{
                minWidth: 40,
                textTransform: 'none',
              }}
            >
              {item.label}
            </Button>,
            <ItemArrow
              key={`arrow-${item.label}`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </ItemArrow>,
          ]}
          {!item.link &&
            <Typography variant="body1">
              <ItemText>
                {item.label}
              </ItemText>
            </Typography>
          }
        </Item>
      )}
    </Wrapper>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Breadcrumb;

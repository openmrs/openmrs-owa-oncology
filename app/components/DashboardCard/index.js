/**
 *
 * DashboardCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const Wrapper = styled.div`
`;
const Head = styled.div`
  border-bottom: 4px solid ${props => props.borderColor};
`;
const Title = styled.div`
`;
const TopActions = styled.div`
`;
const Content = styled.div`
  padding: 1em;
  background: ${grey[100]};
`;
const Footer = styled.div`
  text-align: center;
  padding: 1em 0;
`;

function DashboardCard(props) {
  const { children, title, footer, theme } = props;
  const { main } = theme.palette.primary;

  return (
    <Wrapper>
      <Head borderColor={main}>
        <Title>{title}</Title>
        <TopActions></TopActions>
      </Head>
      <Content>
        {children}
        <Footer>{footer}</Footer>
      </Content>
    </Wrapper>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.any,
  children: PropTypes.node,
  footer: PropTypes.any,
  theme: PropTypes.object.isRequired,
};

export default withTheme()(DashboardCard);

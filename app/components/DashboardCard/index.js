/**
 *
 * DashboardCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTheme } from '@material-ui/core/styles';


const Wrapper = styled.div`
`;
const Head = styled.div`
padding-top: 20px;
>svg{
  color: #501D3D;
}
  display: flex;
  border-bottom: 4px solid ${props => props.borderColor};
`;
const Title = styled.div`
  margin-bottom: 4px;
  color: #501D3D;
`;
const TopActions = styled.div`
`;
const Content = styled.div`
  ul > li{
    padding-top:2px;
    padding-bottom: 2px;
  }
  padding: 1em;
  background: #eee;
`;
const Footer = styled.div`
  text-align: center;
  padding: 1em 0;
`;

// const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
//   margin-right: 10px;
// `;

function DashboardCard(props) {
  const { children, title, footer, theme, icon} = props;
  const { main } = theme.palette.primary;

  return (
    <Wrapper>
      <Head borderColor={main}>
        {icon}
        <Title>{title}</Title>
        <TopActions></TopActions>
      </Head>
      <Content>
        {children}
        {footer &&
          <Footer>{footer}</Footer>
        }
      </Content>
    </Wrapper>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.any,
  icon: PropTypes.any,
  children: PropTypes.node,
  footer: PropTypes.any,
  theme: PropTypes.object.isRequired,
};

export default withTheme()(DashboardCard);

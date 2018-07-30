/**
 *
 * Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import grey from '@material-ui/core/colors/grey';

const PageWrapper = styled.div`
  background: #FFFFFF;
`;

const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 65px;
  bottom: 0;
  background: ${grey[100]};
  width: 350px;
  overflow: auto;
`;

const Content = styled.div`
  background: #FFFFFF;
  position: absolute;
  top: 65px;
  right: 0;
  bottom: 0;
  left: 360px;
  padding: 2rem;
  overflow: auto;
`;

const Center = styled.div`
  width: 980px;
  padding: 2rem;
  margin: 0 auto;
`;

function Page(props) {
  return (
    <PageWrapper>
      <Center>
        {props.children}
      </Center>
    </PageWrapper>
  );
}

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
export { PageWrapper, Sidebar, Content };

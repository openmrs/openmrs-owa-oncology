/**
 *
 * Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background: #FFFFFF;
  margin: 0 0.5em;
`;

const Sidebar = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #FFFFFF;
  width: 450px;
`;

const Content = styled.div`
  background: #FFFFFF;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 460px;
  padding: 2rem;
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

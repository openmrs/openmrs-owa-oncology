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
  min-height: calc(100vh - 160px);
`;

const Sidebar = styled.aside`
  position: sticky;
  float: left;
  top: 55px;
  left: 0;
  background: ${grey[100]};
  width: 300px;
  height: calc(100vh - 55px);
  overflow: auto;
`;

const Content = styled.div`
  background: #FFFFFF;
  margin-left: 310px;
  padding: 2rem;
  overflow: auto;
  min-height: calc(100vh - 55px);
`;

const Center = styled.div`
  max-width: 980px;
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

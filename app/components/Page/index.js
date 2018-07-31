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
  top: 155px;
  bottom: 0;
  background: ${grey[100]};
  width: 300px;
  overflow: auto;
`;

const Content = styled.div`
  background: #FFFFFF;
  position: absolute;
  top: 155px;
  right: 0;
  bottom: 0;
  left: 310px;
  padding: 2rem;
  overflow: auto;
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

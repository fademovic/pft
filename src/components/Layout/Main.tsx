// Main wrapper around my app
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  margin: auto;
  padding: 50px 100px;
  height: 100%;

  @media (max-width: 960px) {
    padding: 30px;
  }
`;

export default MainLayout;
